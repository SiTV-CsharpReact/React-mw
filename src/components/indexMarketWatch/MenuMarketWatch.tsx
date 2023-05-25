import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { ObjectMenuHNX, ObjectMenuHSX } from "../../models/modelListMenuHSX";
import {
  iconColorMenuMarket,
  setColorMenuMarket,
  fStatusMarketHNX,
  fStatusMarketUPCOM,
  formatNumberMarket,
  tinhGiaTC,
  tinhGiaCT,
  checkSTTMarket,
  checkSTTMarketValue,
  updateQuoteData,
} from "../../utils/util";
import {
  ARRAY_COL_ATO_ATC_QTTY,
  g_CLASS_INDEX,
} from "../../configs/app.config";
import "./styleMenuBarMW.css";
import { AppContext } from "../../Context/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SlidesMarketWatch from "./SlidesMarketWatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
const MenuMarketWatch = () => {
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const screenWidth = window.innerWidth;
  const slideWidth = 220;
  const slidesToShow = Math.floor(screenWidth / slideWidth);
  const [valueHSX, setValueHSX] = useState<ObjectMenuHSX | null>(null);
  const [valueHNX, setValueHNX] = useState<ObjectMenuHNX | null>(null);
  const [loading, setLoading] = useState(true);
  const arrayPrice = [5, 7, 9, 11, 14, 16, 18];
  const arrayKL = [6, 8, 10, 12, 15, 17, 19];
  //const arrayColor ="text-red text-green text-blue text-white text-yellow text-violet";
  const arrayColor = [
    "text-red",
    "text-green",
    "text-blue",
    "text-white",
    "text-yellow",
    "text-violet",
  ];
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

  const [dataHNX, setDataHNX] = useState("{}");
  const [dataHSX, setDataHSX] = useState("{}");
  useEffect(() => {
    // const socket = io('ws://eztradereact.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=dnL897L7K8vCFfdm%2FU2B%2B8L3mgJxVC9qXt8YejdUGsaMoHgfj%2FPPyVumCVpn5PvW2sxZanXnmvvNU49qowDUIJ5hYyfNfe56xdHs6Gf3cOQ84am2ZKvvswyYk8wE4dyq&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1');

    // socket.on("newData", (data) => {
    //   console.log(data);
    // });
    const socketHSX = new WebSocket(
      "ws://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=bDYLcs%2B7ou7yVBAIId%2BQc%2FRWcWGpCc5WZoMWYn%2BqCRcgH7mAlK5EYGdCRmUwTy5zHRnKY9S3uIzDqCvirVHN9TW5ATENCpjtP4%2BDH2AgCHa1D78%2BhMHj59nTqayG1xsd&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=7"
    );
    socketHSX.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socketHSX.onmessage = (event) => {
      updateQuote(event.data);
      updateDataRealTime(event.data);
      // updateQuote(event.data)
      // setDataHNX(event.data);
    };
    socketHSX.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    return () => {
      socketHSX.close();
    };
  }, []);
  useEffect(() => {
    const socketHNX = new WebSocket(
      "ws://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=bdy3U9a%2F0tpzX9q9z729layK8mNDzAHxk8FGdgJ%2F8tl%2BXZ7%2B5KlJ2TSoivItO6rBwNIQvfCBVqiqQ3i9Te9pWFjWZnFmi0l5JNURAZTmLMm9OVwjF1Y%2FrBUaZGPghyOv&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=6"
    );
    socketHNX.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socketHNX.onmessage = (event) => {
      // updateQuote(event.data)
      updateQuote(event.data);
      // setDataHNX(event.data);
    };
    socketHNX.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    return () => {
      socketHNX.close();
    };
  }, []);
  useEffect(() => {
    // const currentSlide = sliderRef?.innerSlider
    // const totalSlides = sliderRef?.current?.slickGetOption('slidesToShow');
    if (sliderRef && (isHoveringLeft || isHoveringRight)) {
      //console.log(sliderRef?.innerSlider)
      if (isHoveringLeft) {
        sliderRef.slickPrev();
      }
      if (isHoveringRight) {
        sliderRef.slickNext();
      }
      // thời gian delay giữa các lần chuyển slide
    }
  }, [isHoveringLeft, isHoveringRight, sliderRef]);

  const handleHoverRight = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringRight(true);
    e.currentTarget.classList.add("scrollingHotSpotRightVisible");
  };

  const handleLeaveRight = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringRight(false);
    e.currentTarget.classList.remove("scrollingHotSpotRightVisible");
  };
  const handleHoverLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringLeft(true);
    e.currentTarget.classList.add("scrollingHotSpotLeftVisible");
  };

  const handleLeaveLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringLeft(false);
    e.currentTarget.classList.remove("scrollingHotSpotLeftVisible");
  };
  //console.log(valueHSX, valueHNX)
  // const updateQuote = (objRoot:any)=>{
  //   var quoteFlag = 1;
  // 	try {
  // 		var arrData = JSON.parse(objRoot.Change);

  // 		// var ChartLayout = document.getElementById("chart-layout");
  // 		// if (ChartLayout) {
  // 		// 	if (ChartLayout.style.display != "none") {
  // 		// 		// chi update vào sidebar khi mở sidebar
  // 		// 		if (g_SideBar) {
  // 		// 			g_SideBar.updateQuote(arrData);
  // 		// 		}
  // 		// 	}
  // 		// }
  // 		for (var i = 0; i < arrData.length; i++) {
  // 			//console.info(arrData[i]);
  // 			const vTR = document.getElementById('tr' + arrData[i].RowID) as HTMLTableRowElement;
  //       // if(vTR && vTR.cells !== void 0){
  //       //      //console.log(vTR.cells)
  //       // }
  // 			if (vTR && vTR.cells !== void 0) {
  // 				for (var j = 0; j < arrData[i].Info.length; j++) {
  // 					var vCellIndex = arrData[i].Info[j][0];
  // 					var vCell = vTR.cells[vCellIndex]; // error js
  // 					var vValue = arrData[i].Info[j][1];
  // 					// namld debug
  // 					//if (vValue === parseFloat(vCell.innerHTML.ReplaceAll(',', ''))) {
  // 					//    console.log("Loi du lieu khong doi ma van update ", vTR, vCell, vValue);
  // 					//}
  // 					vValue = this?.GetPrice(vCellIndex, vValue);
  // 					var vClass = this?.getClass4UpdateSnapshot(vCellIndex, vValue, vTR.cells[1].innerHTML, vTR.cells[2].innerHTML, vTR.cells[3].innerHTML, vTR);

  // 					// update tooltip
  // 					//this.updateHistAttr(vCell, objRoot.Time);

  // 					// update gia tri trong TD
  // 					this.UpdateCell(vCellIndex, vCell, vValue, vClass, quoteFlag);
  // 					var vCode = vTR.firstChild.getElementsByTagName('span')[0].innerHTML;
  // 					//if (vCode == 'KTB') {
  // 					//    console.log('KTBupdate')
  // 					//}
  // 					// IF BQ1>0 AND BP1=0 AND Code="P" >> update BP1="ATO"
  // 					for (var x = 0; x < ARRAY_COL_ATO_ATC_QTTY.length; x++) {
  // 						if (vCellIndex == ARRAY_COL_ATO_ATC_QTTY[x]) // neu la o QTTY cua cap gia/KL co ATO/ATC
  // 						{
  // 							if (parseFloat(vValue) > 0) // neu KL >0 ....
  // 							{
  // 								if (vTR.cells[ARRAY_COL_ATO_ATC_QTTY[x] - 1].innerHTML == '') // ... gia cung cap voi no dang la blank >>> phai hien thi la ATO/ATC tuy theo ControlCode
  // 								{
  // 									// update color trong TD QUANTITY theo mau ATO/ATC
  // 									// brd => br_
  // 									vClass = vClass.substring(0, 2) + g_ARRAY_COLOR_CLASS[6];
  // 									this.UpdateCell(vCellIndex, vCell, vValue, vClass, quoteFlag);
  // 									//var vCode = vTR.firstChild.getElementsByTagName('span')[0].innerHTML;
  // 									//if (vCode == 'KTB') {
  // 									//    console.log('KTBupdate')
  // 									//}
  // 									vValue = this.GetPriceATOATC(vCode, objRoot);
  // 									vCell = vTR.cells[ARRAY_COL_ATO_ATC_QTTY[x] - 1];
  // 									vCellIndex = ARRAY_COL_ATO_ATC_QTTY[x] - 1;
  // 									vClass = g_ARRAY_COL_CLASS[vCellIndex].replace('*', g_ARRAY_COLOR_CLASS[6]);

  // 									vValue = this.CheckUndefined(vValue);

  // 									// update tooltip
  // 									//this.updateHistAttr(vCell, objRoot.Time);

  // 									// update gia tri trong TD
  // 									this.UpdateCell(vCellIndex, vCell, vValue, vClass, quoteFlag);
  // 								}
  // 							}

  // 							if (parseFloat(vValue) == 0) // neu KL = 0 ....
  // 							{
  // 								// gia cung cap voi no la dang hien ATO/ATC
  // 								if (vTR.cells[ARRAY_COL_ATO_ATC_QTTY[x] - 1].innerHTML == ARRAY_COL_ATO_ATC_DATA[0][2]
  // 									|| vTR.cells[ARRAY_COL_ATO_ATC_QTTY[x] - 1].innerHTML == ARRAY_COL_ATO_ATC_DATA[1][2]) {
  // 									// thi phai xoa text ATO/ATC o cell gia
  // 									vValue = '0';
  // 									vCell = vTR.cells[ARRAY_COL_ATO_ATC_QTTY[x] - 1];
  // 									vCellIndex = ARRAY_COL_ATO_ATC_QTTY[x] - 1;
  // 									vClass = g_ARRAY_COL_CLASS[vCellIndex].replace('*', g_ARRAY_COLOR_CLASS[6]);

  // 									// update tooltip
  // 									//this.updateHistAttr(vCell, objRoot.Time);

  // 									// update gia tri trong TD
  // 									this.UpdateCell(vCellIndex, vCell, vValue, vClass, quoteFlag);
  // 								}

  // 							}
  // 						}
  // 					}

  // 					if (vCellIndex == 13) {
  // 						var _text = this.changeDiffToPercent(parseFloat(vTR.cells[1].innerHTML), parseFloat(vTR.cells[11].innerHTML));
  // 						vTR.cells[13].innerHTML = _text;
  // 					}

  // 				}
  // 			}
  // 		}

  // 		//console.log("update")
  // 	} catch (e) {
  // 		console.log('update ERROR_UPDATESTOCK:---', e, objRoot);
  // 	}
  // }
  const updateTableHNX = (dataHNX: any) => {
    // console.log(dataHNX)
    var vTextClass = "",
      vImageClass = "",
      vName = "",
      vStrs = "";
    const arrRowID = dataHNX.RowID;
    const arrInfo = dataHNX.Info;
    if (dataHNX) {
      //console.log(dataHNX)
      // data trả ra object có arrRowId
      if (arrRowID) {
        // data >2 map ra
        if (dataHNX.Info.length > 1) {
          dataHNX.Info.map((dataInfo: any) =>
            updateDataTable(arrRowID, dataInfo[0], dataInfo[1])
          );
        }
        // data = 1
        else {
          updateDataTable(arrRowID, arrInfo[0][0], arrInfo[0][1]);
        }
      } else {
        //tạo biến tdIndex lấy element
        const tdIndexMenu = document.getElementById(`${dataHNX[0]}`);
        // lay gia trị đằng sau
        vStrs = dataHNX[0].split("_");

        var vIDImage = dataHNX[0].substring(0, dataHNX[0].indexOf("_"));
        const vCLassImage = document.getElementById(`${vIDImage}_Image`);
        const vCLassIndex = document.getElementById(`${vIDImage}_3`);
        const vCLassPT = document.getElementById(
          `${vIDImage}_6`
        )?.parentElement;
        /// check có tdIndex để bắt đầu add giá trị vào
        if (tdIndexMenu) {
          // neu = 5 thì update màu cho image và PT
          if (vStrs[1] === "5") {
            var v = parseFloat(dataHNX[1]);
            if (v === 0) {
              // = tham chieu, vang
              vTextClass = g_CLASS_INDEX[0][0];
              vImageClass = g_CLASS_INDEX[0][1];
            }
            if (v > 0) {
              // tang, xanh
              vTextClass = g_CLASS_INDEX[1][0];
              vImageClass = g_CLASS_INDEX[1][1];
            }
            if (v < 0) {
              // giam, do
              vTextClass = g_CLASS_INDEX[2][0];
              vImageClass = g_CLASS_INDEX[2][1];
            }
            if (vCLassImage) {
              if (vImageClass) {
                vCLassImage.className = vImageClass;
                // console.log(vCLassImage,vTextClass)
              }
            }
            if (vCLassIndex) {
              if (vTextClass) {
                vCLassIndex.className = vTextClass + " px-0.5";

                // console.log(vCLassIndex,vTextClass)
                //vCLassIndex.classList.add(vTextClass);
              }
            }
            if (vCLassPT) {
              if (vTextClass) {
                vCLassPT.className = vTextClass;
                // console.log(vCLassPT,vTextClass)
                //vCLassIndex.classList.add(vTextClass);
              }
            }
          }
          // check trạng thái thị trường HNX
          if (fStatusMarketHNX(dataHNX[1]) !== "") {
            tdIndexMenu.innerHTML = fStatusMarketHNX(dataHNX[1]);
            tdIndexMenu.style.backgroundColor = "#888888";
            arrayColor.map((arrayColorText: string) => {
              tdIndexMenu.classList.remove(arrayColorText);
            });
            setTimeout(function () {
              tdIndexMenu.style.backgroundColor = "";
            }, 500);
          }
          // check thị trường UPCOM
          else if (fStatusMarketUPCOM(dataHNX[1]) !== "") {
            tdIndexMenu.innerHTML = fStatusMarketUPCOM(dataHNX[1]);
            tdIndexMenu.style.backgroundColor = "#888888";
            arrayColor.map((arrayColorText: string) => {
              tdIndexMenu.classList.remove(arrayColorText);
            });
            setTimeout(function () {
              tdIndexMenu.style.backgroundColor = "";
            }, 500);
          } else {
            tdIndexMenu.innerHTML = `${dataHNX[1]}`;
            tdIndexMenu.style.backgroundColor = "#888888";
            arrayColor.map((arrayColorText: string) => {
              tdIndexMenu.classList.remove(arrayColorText);
            });
            //tdIndexMenu.style.color = colorTextMenu(dataHNX[1])
            tdIndexMenu.classList.add(colorTextMenu(dataHNX[1]));
            //valuePT?.classList.add(textColor)
            setTimeout(function () {
              tdIndexMenu.style.backgroundColor = "";
            }, 500);
          }
        }

        //console.log(dataHNX)
      }
    }
  };

  const colorTextTD = (
    tc?: string,
    tran?: string,
    san?: string,
    price?: number
  ) => {
    let Color = "text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if (price) {
      if (price === 0) {
        Color = "text-white";
      } else if (price === Number(san)) {
        Color = "text-blue";
      } else if (price === Number(tran)) {
        Color = "text-violet";
      } else if (price === Number(tc)) {
        Color = "text-yellow";
      } else if (price > Number(tc)) {
        Color = "text-green";
      } else if (price < Number(tc) && price > Number(san)) {
        Color = "text-red";
      }
    }

    return Color;
  };
  const colorTextMenu = (price: number) => {
    const value = 0;
    let Color = "text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if (price) {
      if (Number(price) === 0) {
        Color = "text-yellow";
      } else if (price === Number(value)) {
        Color = "text-yellow";
      } else if (price > Number(value)) {
        Color = "text-green";
      } else if (price < Number(value)) {
        Color = "text-red";
      }
    }

    return Color;
  };
  const updateDataTable = (
    arrRowID: string,
    arrInfo: number,
    arrValue: number
  ) => {
    // getID các giá trị cần lấy
    const tdIndex = document.getElementById(`${arrRowID}_${arrInfo}`);
    const valueTC = document.getElementById(`${arrRowID}_TC`)?.innerHTML;
    const valueTran = document.getElementById(`${arrRowID}_Tran`)?.innerHTML;
    const valueSan = document.getElementById(`${arrRowID}_San`)?.innerHTML;
    const valuePT = document.getElementById(`${arrRowID}_PT`);
    const valueCT = document.getElementById(`${arrRowID}_CT`);
    // nếu lấy được element
    if (tdIndex) {
      // update value mới
      tdIndex.innerHTML = `${formatNumberMarket(arrValue)}`;
      // gán màu bg
      tdIndex.style.backgroundColor = "#888888";
      // sau 0.5s xóa màu bg
      setTimeout(function () {
        tdIndex.style.backgroundColor = "";
      }, 500);
      // check xem arrInfo trả về có chưa 1 giá trí trong mảng 5,7,9,11,14,16,18 để update màu KL giống bên cạnh
      const indexPrice = arrayPrice.indexOf(arrInfo);
      if (indexPrice !== -1) {
        // lấy dc giá trị TC trần sàn
        if (valueTC && valueTran && valueSan) {
          // check khớp lệnh giá ==11 thì tính pt và set color
          if (arrInfo === 11) {
            // giá pt
            const PT = tinhGiaTC(Number(valueTC), arrValue);
            // giá ct
            const CT = tinhGiaCT(Number(valueTC), arrValue);
            //console.log(Number(valueTC),arrValue,PT)
            const textColor = colorTextTD(
              valueTC,
              valueTran,
              valueSan,
              arrValue
            );
            if (valuePT) valuePT.innerHTML = `${PT}`;
            if (valueCT) valueCT.innerHTML = `${CT}`;
            // console.log(tdIndex.classList.contains("text-red text-green text-blue text-white text-yellow text-violet"))
            // eslint-disable-next-line array-callback-return
            arrayColor.map((arrayColorText: string) => {
              tdIndex.classList.remove(arrayColorText);
              document
                .getElementById(`${arrRowID}`)
                ?.classList.remove(arrayColorText);
              document
                .getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)
                ?.classList.remove(arrayColorText);
              valuePT?.classList.remove(arrayColorText);
              valueCT?.classList.remove(arrayColorText);
            });
            tdIndex.classList.add(textColor);
            document.getElementById(`${arrRowID}`)?.classList.add(textColor);
            document
              .getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)
              ?.classList.add(textColor);
            valuePT?.classList.add(textColor);
            valueCT?.classList.add(textColor);
          }
          // gia mo cua cao nhap thap nhat
          else if (arrInfo === 24 || arrInfo === 22 || arrInfo === 23) {
            console.log(valueTC, valueTran, valueSan, arrValue);
            const textColor = colorTextTD(
              valueTC,
              valueTran,
              valueSan,
              arrValue
            );
            arrayColor.map((arrayColorText: string) => {
              tdIndex.classList.remove(arrayColorText);
            });
            tdIndex.classList.add(textColor);
            //console.log(textColor)
          }
          // con không thì up giá trị vào td như bt
          else {
            const textColor = colorTextTD(
              valueTC,
              valueTran,
              valueSan,
              arrValue
            );
            // eslint-disable-next-line array-callback-return
            arrayColor.map((arrayColorText: string) => {
              tdIndex.classList.remove(arrayColorText);
              document
                .getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)
                ?.classList.remove(arrayColorText);
            });
            tdIndex.classList.add(textColor);
            document
              .getElementById(`${arrRowID}_${arrayKL[indexPrice]}`)
              ?.classList.add(textColor);
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
  };

  const updateQuote = (objRealtime: any) => {
    var dataHNXRealTime = JSON.parse(objRealtime);
    let arrDatas = [];
    if (typeof dataHNXRealTime !== "undefined") {
      const dataRT = Object.keys(dataHNXRealTime);

      if (dataRT.length !== 0) {
        const dataM = dataHNXRealTime.M;
        if (typeof dataM !== "undefined") {
          dataM.map(
            (dataLT: any) => (
              // console.log(dataM),
              (arrDatas = JSON.parse(dataLT.A[0].Change)),
              // console.log(arrDatas),
              arrDatas.map((arrData: any) => updateTableHNX(arrData))
            )
          );
          // console.log(dataM)
        }
      }
    } else {
      // console.log(dataHNXRealTime)
    }
  };

  const updateDataRealTime = (objRealtime: any) => {
    var dataHNXRealTime = JSON.parse(objRealtime);
    let arrDatas = [];
    if (typeof dataHNXRealTime !== "undefined") {
      const dataRT = Object.keys(dataHNXRealTime);

      if (dataRT.length !== 0) {
        const dataM = dataHNXRealTime.M;
        if (typeof dataM !== "undefined") {
          dataM.map(
            (dataLT: any) => (
              (arrDatas = dataLT.A[0]),
              //updateIndex(arrDatas),
              updateQuoteData(arrDatas)
            )
          );

          // console.log(dataM)
        }
      }
    } else {
      // console.log(dataHNXRealTime)
    }
  };

  if (loading)
    return <div className="bg-headerMenuTableMarket">Loading...</div>;
  const settings = {
    // className: "center",
    // centerMode: true,
    dots: false,
    speed: 500,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    // slidesToShow: 7, // Hiển thị 3 slide trên một lần trượt
    // slidesToScroll: 7,
    autoplay: isHoveringLeft || isHoveringRight,
    autoplaySpeed: 500,
    cssEase: "linear",
    center: "5px",
  };
  return <SlidesMarketWatch />;
};

export default React.memo(MenuMarketWatch);
