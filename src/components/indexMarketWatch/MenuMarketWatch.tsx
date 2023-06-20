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
  colorTextMenu,
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
      "ws://eztrade.fpts.com.vn/hsx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=QFYjcEdKNTcQpQ5eM8gSgArpZ8iaLyhAzsOc2yA9Uzj6jAmKV%2Bnt5UMBQQ6IxAg2ytcl36jeKKHXgSbB5HdJNA%2FVdbAn7QKNCQ76UmWHPecxhUD87ZajL354hy24brH6&connectionData=%5B%7B%22name%22%3A%22hubhsx2%22%7D%5D&tid=8"
    );
    socketHSX.onopen = () => {
      console.log("WebSocket connection established.");
    };
    socketHSX.onmessage = (event) => {
      updateQuote(event.data);
      // updateDataRealTime(event.data);
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
      "ws://eztrade.fpts.com.vn/hnx/signalr/connect?transport=webSockets&clientProtocol=1.5&connectionToken=IWiKAtteQ0gfuDm%2Fq6LLyUusRcee06oM2k6xVYIgeWHtlePjfeRZFnHIYmMvGt2F1PSB1EsKRw5wHFLA7D0C6bNau3lUFHlFFPF59RMTl3KHk3PRDqc9rmfE904Oy5NV&connectionData=%5B%7B%22name%22%3A%22hubhnx2%22%7D%5D&tid=1"
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

  ;
  
  const updateDataTable = (
    arrRowID: string,
    arrInfo: number,
    arrValue: number
  ) => {
    // getID các giá trị cần lấy
    // const arrayPrice = [5, 7, 9, 11, 14, 16, 18];
    const tdIndex = document.getElementById(`${arrRowID}_${arrInfo}`);
    // const valueTC = document.querySelector(`div[data-index="5"][aria-rowindex="BCC"]`)?.innerHTML;
    // const valueTCS = document.querySelector(`div[data-index="${arrInfo}"][aria-rowindex="${arrRowID}"]`) as HTMLElement;
    // if(valueTCS){
    //   valueTCS.innerHTML = `${formatNumberMarket(arrValue)}`;
    //   // gán màu bg
    //   const test =  valueTCS.parentElement;
    //   if(test){
    //     test.style.backgroundColor = "#888888";
    //     setTimeout(function () {
    //       test.style.backgroundColor = "";
    //     }, 500);
    //   }
    //   // sau 0.5s xóa màu bg
      
    // }
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
         
          }
        }
      }
    }
  };

  const updateQuote = (objRealtime: any) => {
    // objRealtime = {"RowID":"BCC","Info":[[5,83.5],[7,83.6],[8,100],[11,84.1],[12,101900],[15,77500],[16,84.2],[17,12900],[18,84.3],[19,2000],[20,0],[21,839400],[22,84.2]]};
    //  updateTableHNX(objRealtime)
   
    var dataHNXRealTime = JSON.parse(objRealtime);
    var arrDatas = [];
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

  // const updateDataRealTime = (objRealtime: any) => {
  //   var dataHNXRealTime = JSON.parse(objRealtime);
  //   let arrDatas = [];
  //   if (typeof dataHNXRealTime !== "undefined") {
  //     const dataRT = Object.keys(dataHNXRealTime);

  //     if (dataRT.length !== 0) {
  //       const dataM = dataHNXRealTime.M;
  //       if (typeof dataM !== "undefined") {
  //         dataM.map(
  //           (dataLT: any) => (
  //             (arrDatas = dataLT.A[0]),
  //             //updateIndex(arrDatas),
  //             updateQuoteData(arrDatas)
  //           )
  //         );

  //         // console.log(dataM)
  //       }
  //     }
  //   } else {
  //     // console.log(dataHNXRealTime)
  //   }
  // };

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
