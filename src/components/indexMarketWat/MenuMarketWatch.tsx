import React, { useEffect, useState } from "react";

import axios from "axios";
import { ObjectMenuHNX, ObjectMenuHSX } from "../../models/modelListMenuHSX";
import { iconColorMenuMarket, setColorMenuMarket, fStatusMarketHNX, fStatusMarketUPCOM, formatNumberMarket, tinhGiaTC, tinhGiaCT, checkSTTMarket, checkSTTMarketValue } from "../../utils/util";
import { g_CLASS_INDEX } from "../../configs/app.config";
import "./styleMenuBarMW.css"
const MenuMarketWatch = () => {
  const [valueHSX, setValueHSX] = useState<ObjectMenuHSX | null>(null);
  const [valueHNX, setValueHNX] = useState<ObjectMenuHNX | null>(null);
  const [loading, setLoading] = useState(true);
  const arrayPrice =[5,7,9,11,14,16,18]
  const arrayKL =[6,8,10,12,15,17,19]
  //const arrayColor ="text-red text-green text-blue text-white text-yellow text-violet";
  const arrayColor =["text-red", "text-green" ,"text-blue", "text-white", "text-yellow", "text-violet"];
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const responseHSX = await axios.get(
          `http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`
        );
        const responseHNX = await axios.get(
          `http://marketstream.fpts.com.vn/hnx/data.ashx?s=index`
        );
        setValueHSX(responseHSX.data);
        setValueHNX(responseHNX.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  const [data, setData] = useState("{}");
  useEffect(() => {
    // const socket = io('ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=dnL897L7K8vCFfdm%2FU2B%2B8L3mgJxVC9qXt8YejdUGsaMoHgfj%2FPPyVumCVpn5PvW2sxZanXnmvvNU49qowDUIJ5hYyfNfe56xdHs6Gf3cOQ84am2ZKvvswyYk8wE4dyq&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1');

    // socket.on("newData", (data) => {
    //   console.log(data);
    // });
    const socket = new WebSocket(
      "ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=dnL897L7K8vCFfdm%2FU2B%2B8L3mgJxVC9qXt8YejdUGsaMoHgfj%2FPPyVumCVpn5PvW2sxZanXnmvvNU49qowDUIJ5hYyfNfe56xdHs6Gf3cOQ84am2ZKvvswyYk8wE4dyq&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1"
    );

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      setData(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);
  //console.log(valueHSX, valueHNX)
  const updateTableHNX = (dataHNX:any)=>{
    var vTextClass = '', vImageClass = '', vName = '', vStrs = '';
    const arrRowID = dataHNX.RowID
    const arrInfo = dataHNX.Info
   if(dataHNX){
    //console.log(dataHNX)
    // data trả ra object có arrRowId
    if(arrRowID){
      // data >2 map ra 
      if(dataHNX.Info.length>1){
        dataHNX.Info.map((dataInfo:any)=>(
          updateDataTable(arrRowID,dataInfo[0],dataInfo[1])
        ))
      }
      // data = 1 
      else{
        updateDataTable(arrRowID,arrInfo[0][0],arrInfo[0][1])
      }
    }
    else{
      //tạo biến tdIndex lấy element
      const tdIndexMenu = document.getElementById(`${dataHNX[0]}`);
       // lay gia trị đằng sau
      vStrs = dataHNX[0].split("_");
      
      var vIDImage = dataHNX[0].substring(0, dataHNX[0].indexOf('_'));
      const vCLassImage = document.getElementById(`${vIDImage}_Image`);
      const vCLassIndex = document.getElementById(`${vIDImage}_3`)
      const vCLassPT = document.getElementById(`${vIDImage}_6`)?.parentElement;
        /// check có tdIndex để bắt đầu add giá trị vào
      if(tdIndexMenu) {
        // neu = 5 thì update màu cho image và PT 
        if(vStrs[1] ==="5"){
          var v = parseFloat(dataHNX[1]);
                 if (v === 0) // = tham chieu, vang
                {
                  vTextClass = g_CLASS_INDEX[0][0];
                  vImageClass = g_CLASS_INDEX[0][1];
                }
                if (v > 0) // tang, xanh
                {
                  vTextClass = g_CLASS_INDEX[1][0];
                  vImageClass = g_CLASS_INDEX[1][1];
                }
                if (v < 0) // giam, do
                {
                  vTextClass = g_CLASS_INDEX[2][0];
                  vImageClass = g_CLASS_INDEX[2][1];
                }
                if(vCLassImage){
                  if(vImageClass){
                    vCLassImage.className = vImageClass
                   // console.log(vCLassImage,vTextClass)
                  }
                 } 
                 if(vCLassIndex){
                  if(vTextClass) {
                    vCLassIndex.className = vTextClass+" px-0.5";
                
                   // console.log(vCLassIndex,vTextClass)
                    //vCLassIndex.classList.add(vTextClass);
                  }
                 }
                 if(vCLassPT){
                  if(vTextClass) {
                    vCLassPT.className = vTextClass;    
                   // console.log(vCLassPT,vTextClass)
                    //vCLassIndex.classList.add(vTextClass);
                  }
                 }   
         }
         // check trạng thái thị trường HNX 
       if(fStatusMarketHNX(dataHNX[1]) !== "")
       {
         tdIndexMenu.innerHTML = fStatusMarketHNX(dataHNX[1]);
         tdIndexMenu.style.backgroundColor ="#888888";
         arrayColor.map((arrayColorText:string)=>{        
           tdIndexMenu.classList.remove(arrayColorText)
          })
         setTimeout(function() {
           tdIndexMenu.style.backgroundColor =""
          }, 500);
       }
       // check thị trường UPCOM
       else if(fStatusMarketUPCOM(dataHNX[1]) !== "")
       {
         tdIndexMenu.innerHTML = fStatusMarketUPCOM(dataHNX[1]);
         tdIndexMenu.style.backgroundColor ="#888888";
         arrayColor.map((arrayColorText:string)=>{        
           tdIndexMenu.classList.remove(arrayColorText)
          })
         setTimeout(function() {
           tdIndexMenu.style.backgroundColor =""
          }, 500);
       }
       else{
         tdIndexMenu.innerHTML = `${dataHNX[1]}`;
      tdIndexMenu.style.backgroundColor ="#888888";
      arrayColor.map((arrayColorText:string)=>{        
       tdIndexMenu.classList.remove(arrayColorText)
      })
      //tdIndexMenu.style.color = colorTextMenu(dataHNX[1]) 
      tdIndexMenu.classList.add(colorTextMenu(dataHNX[1]))
      //valuePT?.classList.add(textColor)
      setTimeout(function() {
       tdIndexMenu.style.backgroundColor =""
      }, 500);}
       }

      //console.log(dataHNX)
    }
   }
  }
  
  const colorTextTD = (tc?:string,tran?:string,san?:string,price?:number)=>{
    let Color ="text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if(price){
      if(price===0){
        Color="text-white"
    }
    else if(price=== Number(san)){
        Color="text-blue"
    }
    else if(price === Number(tran)){
        Color="text-violet"
    }
    else if(price === Number(tc)){
        Color="text-yellow"
    }
    else if(price > Number(tc)){
        Color="text-green"
    }
    else if(price<Number(tc) && price> Number(san)  )
    {
        Color="text-red"
    }
    }
   
    return Color;
  }
  const colorTextMenu = (price:number)=>{
    const  value =0
    let Color ="text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if(price){
      if(Number(price)===0){
        Color="text-yellow"
    }
    else if(price=== Number(value)){
      Color="text-yellow"
    }

    else if(price > Number(value)){
        Color="text-green"
    }
    else if(price<Number(value)  )
    {
        Color="text-red"
    }
    }
   
    return Color;
  }
  const updateDataTable= (arrRowID:string,arrInfo:number,arrValue:number) =>{ 
    // getID các giá trị cần lấy
    const tdIndex = document.getElementById(`${arrRowID}_${arrInfo}`);
    const valueTC= document.getElementById(`${arrRowID}_TC`)?.innerHTML;       
    const valueTran= document.getElementById(`${arrRowID}_Tran`)?.innerHTML;
    const valueSan= document.getElementById(`${arrRowID}_San`)?.innerHTML;
    const valuePT= document.getElementById(`${arrRowID}_PT`);
    const valueCT= document.getElementById(`${arrRowID}_CT`);
    // nếu lấy được element 
    if (tdIndex)  {
   
      // update value mới
      tdIndex.innerHTML = `${formatNumberMarket(arrValue)}`
      // gán màu bg
      tdIndex.style.backgroundColor ="#888888"
      // sau 0.5s xóa màu bg
      setTimeout(function() {
        tdIndex.style.backgroundColor =""
      }, 500);
      // check xem arrInfo trả về có chưa 1 giá trí trong mảng 5,7,9,11,14,16,18 để update màu KL giống bên cạnh
      const indexPrice = arrayPrice.indexOf(arrInfo)
      if(indexPrice !== -1)
      {
        // lấy dc giá trị TC trần sàn 
      if(valueTC && valueTran && valueSan)
      {
        // check khớp lệnh giá ==11 thì tính pt và set color
        if(arrInfo === 11){
          // giá pt
          const PT =  tinhGiaTC(Number(valueTC),arrValue)
          // giá ct
           const CT =  tinhGiaCT(Number(valueTC),arrValue)
          //console.log(Number(valueTC),arrValue,PT)
          const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
          if(valuePT) valuePT.innerHTML = `${PT}`
          if(valueCT) valueCT.innerHTML = `${CT}`
          // console.log(tdIndex.classList.contains("text-red text-green text-blue text-white text-yellow text-violet"))
          // eslint-disable-next-line array-callback-return
          arrayColor.map((arrayColorText:string)=>{        
              tdIndex.classList.remove(arrayColorText)
              document.getElementById(`${arrRowID}`)?.classList.remove(arrayColorText)
              document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
              valuePT?.classList.remove(arrayColorText)
              valueCT?.classList.remove(arrayColorText)
          })
          tdIndex.classList.add(textColor)
          document.getElementById(`${arrRowID}`)?.classList.add(textColor)
          document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
          valuePT?.classList.add(textColor)
          valueCT?.classList.add(textColor)
        }
        // gia mo cua cao nhap thap nhat
        else if(arrInfo === 24 || arrInfo === 22 || arrInfo === 23){
          console.log(valueTC,valueTran,valueSan,arrValue)
          const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
          arrayColor.map((arrayColorText:string)=>{       
            tdIndex.classList.remove(arrayColorText)        
        })
        tdIndex.classList.add(textColor)
          //console.log(textColor)
        }
        // con không thì up giá trị vào td như bt
        else{
          const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
          // eslint-disable-next-line array-callback-return
      arrayColor.map((arrayColorText:string)=>{       
          tdIndex.classList.remove(arrayColorText)
          document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
      })
      tdIndex.classList.add(textColor)
      document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
          // if(arrInfo === 2){
          //   checkSTTMarket(arrValue,valueHSX?.STAT_ControlCode)

          // }
          //checkSTTMarket(valueHSX?.STAT_ControlCode,)
          //{checkSTTMarket(formatNumberMarket(dataTable.Info[0][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[1][1]))}
          
        //   const statusMarketW =valueHSX?.STAT_ControlCode
        //   console.log(statusMarketW,arrInfo)
        //   if((arrInfo === 2 && statusMarketW=== "A") || "P"){
        //     tdIndex.innerHTML = `${checkSTTMarketValue(arrValue.toString(),statusMarketW,)}`
        //     const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
        //     // eslint-disable-next-line array-callback-return
        //    arrayColor.map((arrayColorText:string)=>{       
        //     tdIndex.classList.remove(arrayColorText)
        //     document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        // })
        // tdIndex.classList.add(textColor)
        // document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
        //   }
        //   else if((arrInfo === 0 && statusMarketW === "A") || "P"){
        //     tdIndex.innerHTML = `${checkSTTMarketValue(arrValue.toString(),statusMarketW,)}`
        //     const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
        //     // eslint-disable-next-line array-callback-return
        //    arrayColor.map((arrayColorText:string)=>{       
        //     tdIndex.classList.remove(arrayColorText)
        //     document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        // })
        // tdIndex.classList.add(textColor)
        // document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
        //   }
        // tdIndex.style.color = textColor
        } 
      }
    }
  }
}


  const datas = JSON.parse(data);
  if (typeof datas === "undefined") {
  } else {
    const dataRT = datas.M;
    let arrDatas = [];
    if (typeof dataRT !== "undefined") {
      dataRT.map(
        (dataLT: any) => (
          (arrDatas = JSON.parse(dataLT.A[0].Change)),
          arrDatas.map(
            (arrData: any) => ( 
              updateTableHNX(arrData)    
            ) 
          )
        )
      );
    }
  }
  if (loading) return <div className="bg-headerMenuTableMarket">Loading...</div>;
  return (
    <div className="relative overflow-hidden">
         <div id="divIndexChart" className="bg-headerMenuTableMarket max-h-27">
      <ul className=" col-priceboard class-chart">
        <div className="flex p-1 scrollableArea">
          {/* <li className="dvChart">
  <div>
  <p className="text-sm"><span id="" className="mar_">VNXALL: </span><span id="VNXALL_IndexValue" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNXALL_IndexValue}</span><span id="VNXALL_Image" className={`${iconColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}></span><span id="VNXALL_Change" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNALL_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}><span id="VNXALL_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNALL_ChangePercent}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="VNXALL_TotalSharesAOM" className="mar_ txtIndex">{valueHSX?.VNXALL_TotalSharesAOM}</span><span  className="mar_ spValue">GT:</span><span id="VNXALL_TotalValuesAOM" className="mar_ txtIndex" >{valueHSX?.VNXALL_TotalValuesAOM}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="VNXALL_Up" className="maru txtIndex" >{valueHSX?.VNXALL_Up}</span><span  className="marc txtIndex">(<span id="VNXALL_Ceiling"  >{valueHSX?.VNXALL_Ceiling}</span>)</span><span  className="square" /><span id="VNXALL_NoChange" className="marn txtIndex" >63</span><span  className="arrowDown" /><span id="VNXALL_Down" className="mard txtIndex" >{valueHSX?.VNXALL_Down}</span><span  className="marf txtIndex">(<span id="VNXALL_Floor" >{valueHSX?.VNXALL_Floor}</span>)</span><span  className="HO_MarketStat txtIndex">Liên tục</span></p>
  </div>

</li> */}
          {/* <li className="dvChart">
  <div>
<p className="text-sm"><span id="" className="mar_">VNI: </span><span id="VNI_IndexValue" className={`${setColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}>{valueHSX?.VNI_IndexValue}</span><span id="VNI_Image" className={`${iconColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}></span><span id="VNI_Change" className={`${setColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}>{valueHSX?.VNI_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VNI_ChangePercent)} px-0.5`}><span id="VNI_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VNI_ChangePercent)} px-0.5`}>{valueHSX?.VNI_ChangePercent}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="VNI_TotalSharesAOM" className="mar_ txtIndex" >{valueHSX?.VNI_TotalSharesAOM}</span><span  className="mar_ spValue">GT:</span><span id="VNI_TotalValuesAOM" className="mar_ txtIndex" >{valueHSX?.VNI_TotalValuesAOM}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="VNI_Up" className="maru txtIndex" >{valueHSX?.VNI_Up}</span><span  className="marc txtIndex">(<span id="VNI_Ceiling"  >{valueHSX?.VNI_Ceiling}</span>)</span><span  className="square" /><span id="VNI_NoChange" className="marn txtIndex" >{valueHSX?.VNI_NoChange}</span><span  className="arrowDown" /><span id="VNI_Down" className="mard txtIndex" >{valueHSX?.VNI_Down}</span><span className="marf txtIndex">(<span id="VNI_Floor">{valueHSX?.VNI_Floor}</span>)</span><span  className="HO_MarketStat txtIndex">Liên tục</span></p>
        </div>
</li> */}
          <li className="dvChart">
            <div>
              <p className="text-sm">
                <span id="" className="mar_">
                  HNX:{" "}
                </span>
                <span
                  id="i02_3"
                  className={`${setColorMenuMarket(valueHNX?.i02_5)} txtIndex`}
                >
                  {valueHNX?.i02_3}
                </span>
                <span
                  id="i02_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i02_5)} px-0.5`}
                ></span>
                <span
                  id="i02_5"
                  className={`${setColorMenuMarket(valueHNX?.i02_5)} px-0.5`}
                >
                  {valueHNX?.i02_5}
                </span>
                <span
                  id=""
                  className={`${setColorMenuMarket(valueHNX?.i02_6)} px-0.5`}
                >
                  <span
                    id="i02_6"
                    className={`${setColorMenuMarket(valueHNX?.i02_6)} px-0.5`}
                  >
                    {valueHNX?.i02_6}
                  </span>
                 %
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i02_7" className="mar_ txtIndex">
                  {valueHNX?.i02_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i02_14" className="mar_ txtIndex">
                  {valueHNX?.i02_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i02_x251" className="maru txtIndex">
                  {valueHNX?.i02_x251}
                </span>
                <span className="marc txtIndex">
                  (<span className="marc" id="i02_x251c">{valueHNX?.i02_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i02_x252" className="marn txtIndex">
                  {valueHNX?.i02_x252}
                </span>
                <span className="arrowDown" />
                <span id="i02_x253" className="mard txtIndex">
                  {valueHNX?.i02_x253}
                </span>
                <span className="marf txtIndex">
                  (<span className="marf" id="i02_x253f">{valueHNX?.i02_x253f}</span>)
                </span>
                <span id="i02_x336x340" className="HA_MarketStat txtIndex">
                {fStatusMarketHNX(valueHNX?.i02_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          <li className="dvChart">
            <div>
              <p className="text-sm">
                <span id="" className="mar_">
                  HNX30:{" "}
                </span>
                <span
                  id="i41_3"
                  className={`${setColorMenuMarket(valueHNX?.i41_5)} px-0.5`}
                >
                  {valueHNX?.i41_3}
                </span>
                <span
                  id="i41_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i41_5)} px-0.5`}
                ></span>
                <span
                  id="i41_5"
                  className={`${setColorMenuMarket(valueHNX?.i41_5)} px-0.5`}
                >
                  {valueHNX?.i41_5}
                </span>
                <span
                  id=""
                  className={`${setColorMenuMarket(valueHNX?.i41_6)} px-0.5`}
                >
                  <span
                    id="i41_6"
                    className={`${setColorMenuMarket(valueHNX?.i41_6)} px-0.5`}
                  >
                    {valueHNX?.i41_6}
                  </span>
                 %
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i41_7" className="mar_ txtIndex">
                  {valueHNX?.i41_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i41_14" className="mar_ txtIndex">
                  {valueHNX?.i41_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i41_x251" className="maru txtIndex">
                  {valueHNX?.i41_x251}
                </span>
                <span className="marc txtIndex">
                  (<span id="i41_x251c" className="marc">{valueHNX?.i41_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i41_x252" className="marn txtIndex">
                  {valueHNX?.i41_x252}
                </span>
                <span className="arrowDown" />
                <span id="i41_x253" className="mard txtIndex">
                  {valueHNX?.i41_x253}
                </span>
                <span className="marf txtIndex">
                  (<span className="marf" id="i41_x253f">{valueHNX?.i41_x253f}</span>)
                </span>
                <span id="i41_x336x340" className="HA_MarketStat txtIndex">
                   {fStatusMarketHNX(valueHNX?.i41_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          {/* <li className="dvChart">
  <div>
<p className="text-sm "><span id="" className="mar_">VN30: </span><span id="VN30_IndexValue" className={`${setColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}>{valueHSX?.VN30_IndexValue}</span><span id="VN30_Image" className={`${iconColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}></span><span id="VN30_Change" className={`${setColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}>{valueHSX?.VN30_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VN30_ChangePercent)} px-0.5`}><span id="VN30_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VN30_ChangePercent)} px-0.5`}>{valueHSX?.VN30_ChangePercent}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="VN30_TotalSharesAOM" className="mar_ txtIndex" >{valueHSX?.VN30_TotalSharesAOM}</span><span  className="mar_ spValue">GT:</span><span id="VN30_TotalValuesAOM" className="mar_ txtIndex" >{valueHSX?.VN30_TotalValuesAOM}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="VN30_Up" className="maru txtIndex" >{valueHSX?.VN30_Up}</span><span  className="marc txtIndex">(<span id="VN30_Ceiling" >{valueHSX?.VN30_Ceiling}</span>)</span><span  className="square" /><span id="VN30_NoChange" className="marn txtIndex" >{valueHSX?.VN30_NoChange}</span><span  className="arrowDown" /><span id="VN30_Down" className="mard txtIndex" >{valueHSX?.VN30_Down}</span><span  className="marf txtIndex">(<span id="VN30_Floor" >{valueHSX?.VN30_Floor}</span>)</span><span  className="HO_MarketStat txtIndex">Liên tục</span></p>
        </div>
</li> */}
          <li className="dvChart">
            <div>
              <p className="text-sm">
                <span id="" className="mar_">
                  UPCOM:{" "}
                </span>
                <span
                  id="i03_3"
                  className={`${setColorMenuMarket(valueHNX?.i03_5)} px-0.5`}
                >
                  {valueHNX?.i03_3}
                </span>
                <span
                  id="i03_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i03_5)} px-0.5`}
                ></span>
                <span
                  id="i03_5"
                  className={`${setColorMenuMarket(valueHNX?.i03_5)} px-0.5`}
                >
                  {valueHNX?.i03_5}
                </span>
                <span
                  id=""
                  className={`${setColorMenuMarket(valueHNX?.i03_6)} px-0.5`}
                >
                  <span id="i03_6" className="px-0.5">
                    {valueHNX?.i03_6}
                  </span>
                 %
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i03_7" className="mar_ txtIndex">
                  {valueHNX?.i03_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i03_14" className="mar_ txtIndex">
                  {valueHNX?.i03_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i03_x251" className="maru txtIndex">
                  {valueHNX?.i03_x251}
                </span>
                <span className="marc txtIndex">
                  (<span className="marc" id="i03_x251c">{valueHNX?.i03_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i03_x252" className="marn txtIndex">
                  {valueHNX?.i03_x252}
                </span>
                <span className="arrowDown" />
                <span id="i03_x253" className="mard txtIndex">
                  {valueHNX?.i03_x253}
                </span>
                <span className="marf txtIndex">
                  (<span id="i03_x253f" className="marf">{valueHNX?.i03_x253f}</span>)
                </span>
                <span id="i03_x336x340" className="UP_MarketStat txtIndex">
                {fStatusMarketUPCOM(valueHNX?.i03_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXSMCAP:{" "}</span>
                <span id="i28_3"
                    className={`${setColorMenuMarket(valueHNX?.i28_5)} px-0.5`}
                 >
                  {valueHNX?.i28_3}
                </span>
                <span id="i28_Image"
                    className={`${iconColorMenuMarket(valueHNX?.i28_5)} px-0.5`}
                 />
                <span id="i28_5"
                 className={`${setColorMenuMarket(valueHNX?.i28_5)} px-0.5`}
                 >
                  {valueHNX?.i28_5}
                </span>
                <span 
                className={`${setColorMenuMarket(valueHNX?.i28_6)} px-0.5`}
                >
                  <span id="i28_6">{valueHNX?.i28_6}</span>%
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i28_7" className="mar_ txtIndex">
                  {valueHNX?.i28_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i28_14" className="mar_ txtIndex">
                  {valueHNX?.i28_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i28_x251" className="maru txtIndex">
                  {valueHNX?.i28_x251}
                </span>
                <span className="marc txtIndex">
                  (<span id="i28_x251c" className="marc">{valueHNX?.i28_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i28_x252" className="marn txtIndex">
                  {valueHNX?.i28_x252}
                </span>
                <span className="arrowDown" />
                <span id="i28_x253" className="mard txtIndex">
                  {valueHNX?.i28_x253}
                </span>
                <span className="marf txtIndex">
                  (<span id="i28_x253f" className="marf">{valueHNX?.i28_x253f}</span>)
                </span>
                <span id="i28_x336x340" className="HA_MarketStat txtIndex">
                {fStatusMarketHNX(valueHNX?.i28_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXLCAP:{" "}</span>
                <span id="i26_3"
               className={`${setColorMenuMarket(valueHNX?.i26_5)} px-0.5`}
                 >
                  {valueHNX?.i26_3}
                </span>
                <span id="i26_Image" 
                className={`${iconColorMenuMarket(valueHNX?.i26_5)} px-0.5`}
                />
                <span id="i26_5"
                     className={`${setColorMenuMarket(valueHNX?.i26_5)} px-0.5`}
                 >
                  {valueHNX?.i26_5}
                </span>
                <span 
                 className={`${setColorMenuMarket(valueHNX?.i26_6)} px-0.5`}
                >
                  <span id="i26_6">{valueHNX?.i26_6}</span>%
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i26_7" className="mar_ txtIndex">
                  {valueHNX?.i26_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i26_14" className="mar_ txtIndex">
                  {valueHNX?.i26_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i26_x251" className="maru txtIndex">
                  {valueHNX?.i26_x251}
                </span>
                <span className="marc txtIndex">
                  (<span id="i26_x251c" className="marc">{valueHNX?.i26_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i26_x252" className="marn txtIndex">
                  {valueHNX?.i26_x252}
                </span>
                <span className="arrowDown" />
                <span id="i26_x253" className="mard txtIndex">
                  {valueHNX?.i26_x253}
                </span>
                <span className="marf txtIndex">
                  (<span id="i26_x253f" className="marf">{valueHNX?.i26_x253f}</span>)
                </span>
                <span id="i26_x336x340" className="HA_MarketStat txtIndex">
                {fStatusMarketHNX(valueHNX?.i26_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXFIN:{" "}</span>
                <span id="i39_3" 
                      className={`${setColorMenuMarket(valueHNX?.i39_5)} px-0.5`}
                >
                  {valueHNX?.i39_3}
                </span>
                <span id="i39_Image" 
                   className={`${iconColorMenuMarket(valueHNX?.i39_5)} px-0.5`}
                />
                <span id="i39_5"
                  className={`${setColorMenuMarket(valueHNX?.i39_5)} px-0.5`}
                 >
                  {valueHNX?.i39_5}
                </span>
                <span 
                className={`${setColorMenuMarket(valueHNX?.i39_6)} px-0.5`}
                >
                  <span id="i39_6">{valueHNX?.i39_6}</span>%
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i39_7" className="mar_ txtIndex">
                  {valueHNX?.i39_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i39_14" className="mar_ txtIndex">
                  {valueHNX?.i39_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i39_x251" className="maru txtIndex">
                  {valueHNX?.i39_x251}
                </span>
                <span className="marc txtIndex">
                  (<span id="i39_x251c" className="marc">{valueHNX?.i39_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i39_x252" className="marn txtIndex">
                  {valueHNX?.i39_x252}
                </span>
                <span className="arrowDown" />
                <span id="i39_x253" className="mard txtIndex">
                  {valueHNX?.i39_x253}
                </span>
                <span className="marf txtIndex">
                  (<span id="i39_x253f" className="marf">{valueHNX?.i39_x253f}</span>)
                </span>
                <span id="i39_x336x340" className="HA_MarketStat txtIndex">
                {fStatusMarketHNX(valueHNX?.i39_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXMAN:{" "}</span>
                <span id="i310_3"
               className={`${setColorMenuMarket(valueHNX?.i310_5)} px-0.5`}
                 >
                  {valueHNX?.i310_3}
                </span>
                <span id="i310_Image" 
                  className={`${iconColorMenuMarket(valueHNX?.i310_5)} px-0.5`}
                 />
                <span id="i310_5" 
               className={`${setColorMenuMarket(valueHNX?.i310_5)} px-0.5`}
                >
                  {valueHNX?.i310_5}
                </span>
                <span
                  className={`${setColorMenuMarket(valueHNX?.i310_6)} px-0.5`}
                 >
                  <span id="i310_6">{valueHNX?.i310_6}</span>%
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i310_7" className="mar_ txtIndex">
                  {valueHNX?.i310_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i310_14" className="mar_ txtIndex">
                  {valueHNX?.i310_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i310_x251" className="maru txtIndex">
                  {valueHNX?.i310_x251}
                </span>
                <span className="marc txtIndex">
                  (<span id="i310_x251c" className="marc">{valueHNX?.i310_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i310_x252" className="marn txtIndex">
                  {valueHNX?.i310_x252}
                </span>
                <span className="arrowDown" />
                <span id="i310_x253" className="mard txtIndex">
                  {valueHNX?.i310_x253}
                </span>
                <span className="marf txtIndex">
                  (<span id="i310_x253f" className="marf">{valueHNX?.i310_x253f}</span>)
                </span>
                <span id="i310_x336x340" className="HA_MarketStat txtIndex">
                {fStatusMarketHNX(valueHNX?.i310_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXCON:{" "}</span>
                <span id="i311_3" 
                 className={`${setColorMenuMarket(valueHNX?.i311_5)} px-0.5`}
                >
                  {valueHNX?.i311_3}
                </span>
                <span id="i311_Image"
                    className={`${iconColorMenuMarket(valueHNX?.i311_5)} px-0.5`}
                  />
                <span id="i311_5"
                  className={`${setColorMenuMarket(valueHNX?.i311_5)} px-0.5`}
                 >
                  {valueHNX?.i311_5}
                </span>
                <span
                   className={`${setColorMenuMarket(valueHNX?.i311_6)} px-0.5`}
                 >
                  <span id="i311_6">{valueHNX?.i311_6}</span>%
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="i311_7" className="mar_ txtIndex">
                  {valueHNX?.i311_7}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="i311_14" className="mar_ txtIndex">
                  {valueHNX?.i311_14}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="i311_x251" className="maru txtIndex">
                  {valueHNX?.i311_x251}
                </span>
                <span className="marc txtIndex">
                  (<span id="i311_x251c" className="marc">{valueHNX?.i311_x251c}</span>)
                </span>
                <span className="square" />
                <span id="i311_x252" className="marn txtIndex">
                  {valueHNX?.i311_x252}
                </span>
                <span className="arrowDown" />
                <span id="i311_x253" className="mard txtIndex">
                  {valueHNX?.i311_x253}
                </span>
                <span className="marf txtIndex">
                  (<span id="i311_x253f" className="marf">{valueHNX?.i311_x253f}</span>)
                </span>
                <span id="i311_x336x340" className="HA_MarketStat txtIndex">
                {fStatusMarketHNX(valueHNX?.i311_x336x340)}
                </span>
              </p>
            </div>
            <div>
                <span className="chart3d hidden"></span>
            </div>
          </li>
        </div>
      </ul>
    </div>
    </div>
 
  );
};

export default MenuMarketWatch;
