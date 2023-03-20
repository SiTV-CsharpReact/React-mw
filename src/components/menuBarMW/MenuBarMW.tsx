import { Button, DialogContentText, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { formatNumberMarket, fStatusMarketHNX, fStatusMarketUPCOM, tinhGiaCT, tinhGiaTC } from "../../utils/util";
import { NavLink } from "react-router-dom";
function Clock() {
 
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);
  // Format lại chuỗi thời gian và ngày theo định dạng mong muốn
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const formattedDate = time.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  //const formattedDate = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  return (
    <div className="flex float-right pr-4">
      <label id="lbTradingDate"></label>
      <span className="text-xs font-bold px-1.5" id="lbDate">
        {formattedDate}
      </span>
      <span className="text-xs font-bold px-1.5" id="lbClock">
        {formattedTime}
      </span>
    </div>
  );
}
let stateIndex = 0;
const callExpand = (id: string, hideClass: string) => {
  const divIndex = document.getElementById("divIndexChart");
  const spExpand = document.getElementById("spExpand");
  var charts = document.querySelectorAll(".chart3d");
  if (spExpand?.className === "imgExpand") {
    spExpand.className = "imgExpandOpen";
    for (var i = 0; i < charts.length; i++) {
      charts[i].classList.add("hidden");
    }
    if (divIndex) divIndex.style.maxHeight = "";
    stateIndex = 0;
  } else {
    if (stateIndex === 0) {
      if (divIndex) divIndex.style.maxHeight = "67px";
      //divIndex.className = CLASS_EXPAND_OPEN;
    } else if (stateIndex === 1) {
      if (spExpand) spExpand.className = "imgExpand";
      if (divIndex) divIndex.style.maxHeight = "unset";
      for (var i = 0; i < charts.length; i++) {
        charts[i].classList.remove("hidden");
        charts[i].classList.add("block");
      }
      //divIndex.className = CLASS_EXPAND_OPEN;
    }
    stateIndex++;
  }
};
const MenuBarMW = () => {
  const arrayPrice =[5,7,9,11,14,16,18]
  const arrayKL =[6,8,10,12,15,17,19]
  //const arrayColor ="text-red text-green text-blue text-white text-yellow text-violet";
  const arrayColor =["text-red", "text-green" ,"text-blue", "text-white", "text-yellow", "text-violet"];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  const updateTableHNX = (dataHNX:any)=>{
    const arrRowID = dataHNX.RowID
    const arrInfo = dataHNX.Info
   if(dataHNX){
    // data trả ra object có arrRowId
    if(arrRowID){
      if(dataHNX.Info.length>1){
        dataHNX.Info.map((dataInfo:any)=>(
          updateDataTable(arrRowID,dataInfo[0],dataInfo[1])
        ))
      }
      else{
        updateDataTable(arrRowID,arrInfo[0][0],arrInfo[0][1])
      }
    }
    else{
      //console.log(dataHNX[0])
     const tdIndexMenu = document.getElementById(`${dataHNX[0]}`);
     //const tdImageIndexMenu = document.getElementById(`${dataHNX[0]}_Image`);
      //console.log(tdIndexMenu)
     if(tdIndexMenu) {
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
      if(price===0){
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
    const tdIndex = document.getElementById(`${arrRowID}_${arrInfo}`);
    const valueTC= document.getElementById(`${arrRowID}_TC`)?.innerHTML;       
    const valueTran= document.getElementById(`${arrRowID}_Tran`)?.innerHTML;
    const valueSan= document.getElementById(`${arrRowID}_San`)?.innerHTML;
    const valuePT= document.getElementById(`${arrRowID}_PT`);
    const valueCT= document.getElementById(`${arrRowID}_CT`);
    if (tdIndex)  {
      tdIndex.innerHTML = `${formatNumberMarket(arrValue)}`
      tdIndex.style.backgroundColor ="#888888"
      setTimeout(function() {
        tdIndex.style.backgroundColor =""
      }, 500);
      const indexPrice = arrayPrice.indexOf(arrInfo)
      if(indexPrice !== -1)
      {
      if(valueTC && valueTran && valueSan)
      {
        // check khớp lệnh giá ==11 thì tính pt và set color
        if(arrInfo === 11){
          const PT =  tinhGiaTC(Number(valueTC),arrValue)
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
        else if(arrInfo === 24 || arrInfo === 22 || arrInfo === 23){
          console.log(valueTC,valueTran,valueSan,arrValue)
          const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
          console.log(textColor)
        }
        else{
          //const statusMarketW =statusMarket?.STAT_ControlCode
          //console.log(statusMarketW,arrInfo)
        //   if((arrInfo === 2 && statusMarketW=== "A") || "P"){
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
        //     const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
        //     // eslint-disable-next-line array-callback-return
        //    arrayColor.map((arrayColorText:string)=>{       
        //     tdIndex.classList.remove(arrayColorText)
        //     document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        // })
        // tdIndex.classList.add(textColor)
        // document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
        //   }
       
            const textColor=  colorTextTD(valueTC,valueTran,valueSan,arrValue)
            // eslint-disable-next-line array-callback-return
        arrayColor.map((arrayColorText:string)=>{       
            tdIndex.classList.remove(arrayColorText)
            document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.remove(arrayColorText)
        })
        tdIndex.classList.add(textColor)
        document.getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)?.classList.add(textColor)
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
  return (
    <div className="flex justify-between h-35 bg-headerMenuTableMarket relative">
      <div className="flex ">
        <div className="group bg-activeListMarketWatch inline-block py-0.5 px-1  border-r border-black rounded-t cursor-pointer">
          <span className="uppercase text-sm ">HNX </span>
          <ul className="absolute hidden text-black pt-1.5 group-hover:block z-40">
            <li>
              <NavLink
                to="/"
                
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                HNX
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketwatch-hnx30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                HNX30
              </NavLink>
            </li>
            <li>
              <Link
                to="/"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                BOND
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch py-1.5 px-2.5 text-xs block whitespace-no-wrap  text-white rounded-b"
              >
                Giao dịch thỏa thuận
              </Link>
            </li>
          </ul>
        </div>

        <div className="group inline-block py-0.5 px-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          {/* <span className="  uppercase text-sm ">HOSE</span> */}
          <span className="  uppercase text-sm ">HOSE</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <NavLink
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-0.5 px-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="  uppercase text-sm ">UPCOM</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-0.5 px-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="text-sm ">Ngành</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-0.5 px-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="text-sm ">Thống kê</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-0.5 px-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="text-sm ">Chứng quyền</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div className="group inline-block py-0.5 px-1 border-r border-black bg-noActiveListMarketWatch rounded-t cursor-pointer">
          <span className="text-sm ">Danh mục</span>
          <ul className="absolute hidden text-gray-700 pt-2 group-hover:block z-50">
            <li>
              <Link
                to="/marketwatch-hsx"
                className=" bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap border-b border-bdListMarketWatch text-white"
              >
                VNI
              </Link>
            </li>
            <li>
              <Link
                to="/marketwatch-vn30"
                className="bg-bgListMarketWatch hover:bg-activeListDropMarketWatch  py-1.5 px-2.5 text-xs block whitespace-no-wrap text-white"
              >
                VN30
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Tooltip title="Hiện đồ thị">
            <span
              id="spExpand"
              className="imgExpandOpen"
              onClick={() => callExpand("spExpand", "imgExpandOpen")}
            ></span>
          </Tooltip>
          {/* <Tooltip title="Hiện đồ thị">
          <span id="spExpand" className="imgExpandClose" onClick={()=>callExpand("spExpand","imgExpandOpen")}></span>
        </Tooltip> */}
        </div>
      </div>
      <div className="flex">
        <div>
          <Tooltip title="Đồ thị">
            <button className="btn btn-sm btn-chart">
              <InsertChartIcon style={{ fontSize: 30, marginRight: 10 }} />
            </button>
          </Tooltip>
        </div>

        <div className="btn-setting">
          <Tooltip title="Thiết lập Giao diện">
            {/* <Button  className="imgCustom" variant="outlined" >
      </Button> */}
            <span
              id="btCustom"
              className="imgCustom"
              data-toggle="modal"
              data-target="#mdCustom"
              onClick={handleClickOpen}
            />
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thiết lập Giao diện"}
            </DialogTitle>
            <DialogContent sx={{width:950,maxWidth:"95%"}}>
              <DialogContentText id="alert-dialog-description">
                <div className="modal-body">
                  <div
                    className="item-settings index-settings"
                    id="index-settings"
                  >
                    <div className="settings-content">
                      <div className="settings-header">
                        <div className="content">
                          <span className="imgChart" />
                          <label className="lbText">Lựa chọn chỉ số</label>
                        </div>
                      </div>
                      <div className="settings-body">
                        <div className="flex">
                          <div
                            className="text-right"
                            style={{ width: "100px", paddingLeft: "20px" }}
                          >
                            HOSE :{" "}
                          </div>
                          <div className="col-md-10 col-xs-10 ">
                            <div className="flex">
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VNXALL"
                                    id="cbChartVNXALL"
                                  />
                                  <label htmlFor="cbChartVNXALL">VNXALL</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VNI"
                                    id="cbChartVNI"
                                  />
                                  <label htmlFor="cbChartVNI">VNI</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VN30"
                                    id="cbChartVN30"
                                  />
                                  <label htmlFor="cbChartVN30">VN30</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VN100"
                                    id="cbChartVN100"
                                  />
                                  <label htmlFor="cbChartVN100">VN100</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VNALL"
                                    id="cbChartVNALL"
                                  />
                                  <label htmlFor="cbChartVNALL">VNALL</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VNMID"
                                    id="cbChartVNMID"
                                  />
                                  <label htmlFor="cbChartVNMID">VNMID</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="VNSML"
                                    id="cbChartVNSML"
                                  />
                                  <label htmlFor="cbChartVNSML">VNSML</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div
                            className="text-right"
                            style={{ width: "100px", paddingLeft: "20px" }}
                          >
                            HNX.NY :{" "}
                          </div>
                          <div className="col-md-10 col-xs-10">
                            <div className="flex">
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNX"
                                    id="cbChartHNX"
                                  />
                                  <label htmlFor="cbChartHNX">HNX</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNX30"
                                    id="cbChartHNX30"
                                  />
                                  <label htmlFor="cbChartHNX30">HNX30</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNXLCAP"
                                    id="cbChartHNXLCAP"
                                  />
                                  <label htmlFor="cbChartHNXLCAP">
                                    HNXLCAP
                                  </label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNXSMCAP"
                                    id="cbChartHNXSMCAP"
                                  />
                                  <label htmlFor="cbChartHNXSMCAP">
                                    HNXSMCAP
                                  </label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNXFIN"
                                    id="cbChartHNXFIN"
                                  />
                                  <label htmlFor="cbChartHNXFIN">HNXFIN</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNXMAN"
                                    id="cbChartHNXMAN"
                                  />
                                  <label htmlFor="cbChartHNXMAN">HNXMAN</label>
                                </div>
                              </div>
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="HNXCON"
                                    id="cbChartHNXCON"
                                  />
                                  <label htmlFor="cbChartHNXCON">HNXCON</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div
                            className="text-right"
                            style={{ width: "100px", paddingLeft: "20px" }}
                          >
                            HNX.UPCOM :{" "}
                          </div>
                          <div className="col-md-10 col-xs-10">
                            <div className="flex">
                              <div className="col" style={{}}>
                                <div className="clsAllIndex">
                                  <input
                                    type="checkbox"
                                    className="cbCheck priceboard2"
                                    name="UPCOM"
                                    id="cbChartUPCOM"
                                  />
                                  <label htmlFor="cbChartUPCOM">UPCOM</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="item-settings priceboard-settings"
                    id="priceboard-settings"
                  >
                    <div className="settings-content">
                      <div className="settings-header">
                        <div className="content">
                          <span className="imgTable" />
                          <label className="lbText">
                            Lựa chọn cột thông tin
                          </label>
                        </div>
                      </div>
                      <div className="settings-body">
                        <div className="flex">
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                          
                                id="cbcol4"
                              />
                              <label htmlFor="cbcol4">Dư mua - KL4</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                            
                                id="cbcol20"
                              />
                              <label htmlFor="cbcol20">Dư bán - KL4</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                              
                                id="cbcol25"
                              />
                              <label htmlFor="cbcol25">Trung bình</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                       
                                id="cbcol28"
                              />
                              <label htmlFor="cbcol28">Room còn lại</label>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                            
                                id="cbcol22"
                              />
                              <label htmlFor="cbcol22">Mở cửa</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                             
                                id="cbcol23"
                              />
                              <label htmlFor="cbcol23">Cao nhất</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                               
                                id="cbcol24"
                              />
                              <label htmlFor="cbcol24">Thấp nhất</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                               
                                id="cbcol26"
                              />
                              <label htmlFor="cbcol26">NN mua</label>
                            </div>
                          </div>
                          <div className="col-sm-2 col-md-2" style={{}}>
                            <div className="clsAllIndex">
                              <input
                                type="checkbox"
                                className="cbCheck priceboard2"
                           
                                id="cbcol27"
                              />
                              <label htmlFor="cbcol27">NN bán</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="item-settings smart-symbole-settings"
                    id="smart-symbole-settings"
                  >
                    <div className="settings-content">
                      <div className="settings-header">
                        <div className="content">
                          <span className="imgTable" />
                          <label className="lbText">
                            Tính năng thêm mã thông minh
                          </label>
                          <label
                            className="switch"
                            title="Tắt tính năng thêm mã thông minh"
                          >
                            <input
                              type="checkbox"
                              
                              id="SymbolSmartOnOFF"
                            />
                            <span className="slider round" />
                          </label>
                        </div>
                      </div>
                      <div className="settings-body">
                        <div className="flex">
                          <div className="col-md-2">
                            <b
                              style={{
                                marginLeft: "30px",
                                height: "18px",
                                display: "inline-block",
                                verticalAlign: "bottom",
                                marginTop: "3px",
                              }}
                            >
                              Vị trí thêm mã mới:
                            </b>
                          </div>
                          <div className="col-md-2">
                            <div style={{ marginLeft: "17px" }}>
                              <div className="clsAllIndex">
                                <input
                                  type="radio"
                                  className="cbRadio priceboard2"
                                  name="smart_symbol"
                                  id="up"
                                  style={{
                                    verticalAlign: "sub",
                                    margin: "4px 4px 0 4px",
                                    lineHeight: "normal !important",
                                  }}
                                />
                                <label htmlFor="up">Đầu danh mục</label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div style={{ marginLeft: "9px" }}>
                              <div className="clsAllIndex">
                                <input
                                  type="radio"
                                  className="cbRadio priceboard2"
                                  name="smart_symbol"
                                  id="down"
                                  style={{
                                    verticalAlign: "sub",
                                    margin: "4px 4px 0 4px",
                                    lineHeight: "normal !important",
                                  }}
                                />
                                <label htmlFor="down">Cuối danh mục</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="item-settings prior-textbox-settings"
                    id="prior-textbox-settings"
                  >
                    <div className="settings-content">
                      <div className="settings-header">
                        <div className="content">
                          <span className="imgTable" />
                          <label className="lbText">
                            Lựa chọn nhập thông tin Giá / Khối lượng trước
                          </label>
                        </div>
                      </div>
                      <div className="settings-body">
                        <div className="flex">
                          <div className="col-md-2">
                            <b
                              style={{
                                marginLeft: "30px",
                                height: "18px",
                                display: "inline-block",
                                verticalAlign: "bottom",
                                marginTop: "3px",
                              }}
                            >
                              Ưu tiên:
                            </b>
                          </div>
                          <div className="col-md-2">
                            <div style={{ marginLeft: "17px" }}>
                              <div className="clsAllIndex">
                                <input
                                  type="radio"
                                  className="cbRadio priceboard2"
                                  name="prior_textbox"
                                  id="priceF"
                                  style={{
                                    verticalAlign: "sub",
                                    margin: "4px 4px 0 4px",
                                    lineHeight: "normal !important",
                                  }}
                                />
                                <label htmlFor="priceF">Nhập Giá trước</label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div style={{ marginLeft: "9px" }}>
                              <div className="clsAllIndex">
                                <input
                                  type="radio"
                                  className="cbRadio priceboard2"
                                  name="prior_textbox"
                                  id="qtyF"
                                  style={{
                                    verticalAlign: "sub",
                                    margin: "4px 4px 0 4px",
                                    lineHeight: "normal !important",
                                  }}
                                />
                                <label htmlFor="qtyF">
                                  Nhập Khối lượng trước
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-settings">
                    <div className="flex">
                      <div className="col-md-12">
                        <button
                          id="btnResetChart"
                          className="btn btn-profile"
                          type="button"
                          style={{ marginLeft: "30px" }}
                        >
                          Thiết lập mặc định
                        </button>
                        {/* <p className="sp-reset-chart">
                          Vui lòng chọn Lưu để hoàn tất thiết lập
                        </p> */}
                        <p />
                        <div />
                      </div>
                      <div className="item-settings">
                        <div className="row">
                          <div className="col-md-12">
                            <p />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Lưu</Button>
              <Button onClick={handleClose} autoFocus>
                Đóng
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Clock />
        <div className="px-1">
          <Tooltip title="Hướng dẫn sử dụng">
            <input
              className="imgHelp"
              type="button"
              id="btHelp"
              data-toggle="modal"
              data-target="#mdHelp"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MenuBarMW;
