import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./slide.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ObjectMenuHNX, ObjectMenuHSX } from "../../models/modelListMenuHSX";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import axios from "axios";
import {
  setColorMenuMarket,
  iconColorMenuMarket,
  fStatusMarketHNX,
  fStatusMarketUPCOM,
} from "../../utils/util";
import { AppContext } from "../../Context/AppContext";

const SlidesMarketWatch = () => {
  const height = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const [valueHSX, setValueHSX] = useState<ObjectMenuHSX | null>(null);
  const [valueHNX, setValueHNX] = useState<ObjectMenuHNX | null>(null);
  const screenWidth = window.innerWidth;
  const slideWidth = 220;
  const slidesToShow = Math.floor(screenWidth / slideWidth);

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
  //kéo sang phải và sang trái liên tục
  const handleHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handleHoverLeft(e);
    handleHoverRight(e);
  }, [handleHoverLeft, handleHoverRight]);

  const handleLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handleLeaveLeft(e);
    handleLeaveRight(e);
  }, [handleLeaveLeft, handleLeaveRight]);
  
  const settings = {
    // className: "center",
    // centerMode: true,
    dots: false,
    speed: 3000,
    // infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow ,
    // slidesToShow: 7, // Hiển thị 3 slide trên một lần trượt
    // slidesToScroll: 7,
    autoplay: isHoveringLeft || isHoveringRight,
    autoplaySpeed: 4000,
    cssEase: "linear",
    centerPadding: "50px",
    draggable: true,
    swipeToSlide: true,
    infinite: false,
    onMouseEnter: handleHover,
    onMouseLeave: handleLeave,
  };
  return (
    <div
      id="divIndexChart "
      className={`bg-headerMenuTableMarket ${
        height.expand === 27
          ? "max-h-[23px]"
          : height.expand === 67
          ? "max-h-[67px]"
          : "max-h-[unset]"
      }`}
    >
      <div
        className="scrollingHotSpotLeft"
        onMouseEnter={handleHoverLeft}
        onMouseLeave={handleLeaveLeft}
      />
      <ul className=" my-1 col-priceboard class-chart">
        <Slider
          {...(settings as any)}
          className="custom-carousel my-slider"
          ref={(slider) => setSliderRef(slider)}
          
        >
          <li className="dvChart">
            <div>
              <p className="text-sm">
                <span id="" className="mar_">
                  VNXALL:{" "}
                </span>
                <span
                  id="VNXALL_IndexValue"
                  className={`${setColorMenuMarket(
                    valueHSX?.VNALL_Change
                  )} px-0.5`}
                >
                  {valueHSX?.VNXALL_IndexValue}
                </span>
                <span
                  id="VNXALL_Image"
                  className={`${iconColorMenuMarket(
                    valueHSX?.VNALL_Change
                  )} px-0.5`}
                ></span>
                <span
                  id="VNXALL_Change"
                  className={`${setColorMenuMarket(
                    valueHSX?.VNALL_Change
                  )} px-0.5`}
                >
                  {valueHSX?.VNALL_Change}
                </span>
                <span
                  id=""
                  className={`${setColorMenuMarket(
                    valueHSX?.VNALL_Change
                  )} px-0.5`}
                >
                  <span
                    id="VNXALL_ChangePercent"
                    className={`${setColorMenuMarket(
                      valueHSX?.VNALL_Change
                    )} px-0.5`}
                  >
                    {valueHSX?.VNALL_ChangePercent}
                  </span>
                  %
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="VNXALL_TotalSharesAOM" className="mar_ txtIndex">
                  {valueHSX?.VNXALL_TotalSharesAOM}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="VNXALL_TotalValuesAOM" className="mar_ txtIndex">
                  {valueHSX?.VNXALL_TotalValuesAOM}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="VNXALL_Up" className="maru txtIndex">
                  {valueHSX?.VNXALL_Up}
                </span>
                <span className="marc txtIndex">
                  (<span id="VNXALL_Ceiling">{valueHSX?.VNXALL_Ceiling}</span>)
                </span>
                <span className="square" />
                <span id="VNXALL_NoChange" className="marn txtIndex">
                  63
                </span>
                <span className="arrowDown" />
                <span id="VNXALL_Down" className="mard txtIndex">
                  {valueHSX?.VNXALL_Down}
                </span>
                <span className="marf txtIndex">
                  (<span id="VNXALL_Floor">{valueHSX?.VNXALL_Floor}</span>)
                </span>
                <span className="HO_MarketStat txtIndex">Liên tục</span>
              </p>
            </div>
          </li>
          <li className="dvChart">
            <div>
              <p className="text-sm">
                <span id="" className="mar_">
                  VNI:{" "}
                </span>
                <span
                  id="VNI_IndexValue"
                  className={`${setColorMenuMarket(
                    valueHSX?.VNI_Change
                  )} px-0.5`}
                >
                  {valueHSX?.VNI_IndexValue}
                </span>
                <span
                  id="VNI_Image"
                  className={`${iconColorMenuMarket(
                    valueHSX?.VNI_Change
                  )} px-0.5`}
                ></span>
                <span
                  id="VNI_Change"
                  className={`${setColorMenuMarket(
                    valueHSX?.VNI_Change
                  )} px-0.5`}
                >
                  {valueHSX?.VNI_Change}
                </span>
                <span
                  id=""
                  className={`${setColorMenuMarket(
                    valueHSX?.VNI_ChangePercent
                  )} px-0.5`}
                >
                  <span
                    id="VNI_ChangePercent"
                    className={`${setColorMenuMarket(
                      valueHSX?.VNI_ChangePercent
                    )} px-0.5`}
                  >
                    {valueHSX?.VNI_ChangePercent}
                  </span>
                  %
                </span>
              </p>
              <p className="text-xs text-center">
                <span className="mar_ spQtty">KL:</span>
                <span id="VNI_TotalSharesAOM" className="mar_ txtIndex">
                  {valueHSX?.VNI_TotalSharesAOM}
                </span>
                <span className="mar_ spValue">GT:</span>
                <span id="VNI_TotalValuesAOM" className="mar_ txtIndex">
                  {valueHSX?.VNI_TotalValuesAOM}
                </span>
                <span className="mar_ spUnit">tỷ</span>
              </p>
              <p className="text-xs text-center">
                <span className="arrowUp" />
                <span id="VNI_Up" className="maru txtIndex">
                  {valueHSX?.VNI_Up}
                </span>
                <span className="marc txtIndex">
                  (<span id="VNI_Ceiling">{valueHSX?.VNI_Ceiling}</span>)
                </span>
                <span className="square" />
                <span id="VNI_NoChange" className="marn txtIndex">
                  {valueHSX?.VNI_NoChange}
                </span>
                <span className="arrowDown" />
                <span id="VNI_Down" className="mard txtIndex">
                  {valueHSX?.VNI_Down}
                </span>
                <span className="marf txtIndex">
                  (<span id="VNI_Floor">{valueHSX?.VNI_Floor}</span>)
                </span>
                <span className="HO_MarketStat txtIndex">Liên tục</span>
              </p>
            </div>
          </li>
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
                  (
                  <span className="marc" id="i02_x251c">
                    {valueHNX?.i02_x251c}
                  </span>
                  )
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
                  (
                  <span className="marf" id="i02_x253f">
                    {valueHNX?.i02_x253f}
                  </span>
                  )
                </span>
                <span id="i02_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i02_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
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
                  (
                  <span id="i41_x251c" className="marc">
                    {valueHNX?.i41_x251c}
                  </span>
                  )
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
                  (
                  <span className="marf" id="i41_x253f">
                    {valueHNX?.i41_x253f}
                  </span>
                  )
                </span>
                <span id="i41_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i41_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
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
              <p className="text-sm ">
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
                  <span id="i03_6" className="px-0.5 ">
                    {valueHNX?.i03_6}
                  </span>
                  %
                </span>
              </p>
              <p className="text-xs text-center ">
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
              <p className="text-xs text-center whitespace-nowrap">
                <span className="arrowUp" />
                <span id="i03_x251" className="maru txtIndex">
                  {valueHNX?.i03_x251}
                </span>
                <span className="marc txtIndex">
                  (
                  <span className="marc" id="i03_x251c">
                    {valueHNX?.i03_x251c}
                  </span>
                  )
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
                  (
                  <span id="i03_x253f" className="marf">
                    {valueHNX?.i03_x253f}
                  </span>
                  )
                </span>
                <span id="i03_x336x340" className="UP_MarketStat txtIndex">
                  {fStatusMarketUPCOM(valueHNX?.i03_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm whitespace-nowrap">
                <span className="mar_">HNXSMCAP: </span>
                <span
                  id="i28_3"
                  className={`${setColorMenuMarket(valueHNX?.i28_5)} px-0.5`}
                >
                  {valueHNX?.i28_3}
                </span>
                <span
                  id="i28_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i28_5)} px-0.5`}
                />
                <span
                  id="i28_5"
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
                  (
                  <span id="i28_x251c" className="marc">
                    {valueHNX?.i28_x251c}
                  </span>
                  )
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
                  (
                  <span id="i28_x253f" className="marf">
                    {valueHNX?.i28_x253f}
                  </span>
                  )
                </span>
                <span id="i28_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i28_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXLCAP: </span>
                <span
                  id="i26_3"
                  className={`${setColorMenuMarket(valueHNX?.i26_5)} px-0.5`}
                >
                  {valueHNX?.i26_3}
                </span>
                <span
                  id="i26_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i26_5)} px-0.5`}
                />
                <span
                  id="i26_5"
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
                  (
                  <span id="i26_x251c" className="marc">
                    {valueHNX?.i26_x251c}
                  </span>
                  )
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
                  (
                  <span id="i26_x253f" className="marf">
                    {valueHNX?.i26_x253f}
                  </span>
                  )
                </span>
                <span id="i26_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i26_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXFIN: </span>
                <span
                  id="i39_3"
                  className={`${setColorMenuMarket(valueHNX?.i39_5)} px-0.5`}
                >
                  {valueHNX?.i39_3}
                </span>
                <span
                  id="i39_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i39_5)} px-0.5`}
                />
                <span
                  id="i39_5"
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
                  (
                  <span id="i39_x251c" className="marc">
                    {valueHNX?.i39_x251c}
                  </span>
                  )
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
                  (
                  <span id="i39_x253f" className="marf">
                    {valueHNX?.i39_x253f}
                  </span>
                  )
                </span>
                <span id="i39_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i39_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXMAN: </span>
                <span
                  id="i310_3"
                  className={`${setColorMenuMarket(valueHNX?.i310_5)} px-0.5`}
                >
                  {valueHNX?.i310_3}
                </span>
                <span
                  id="i310_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i310_5)} px-0.5`}
                />
                <span
                  id="i310_5"
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
                  (
                  <span id="i310_x251c" className="marc">
                    {valueHNX?.i310_x251c}
                  </span>
                  )
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
                  (
                  <span id="i310_x253f" className="marf">
                    {valueHNX?.i310_x253f}
                  </span>
                  )
                </span>
                <span id="i310_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i310_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
            </div>
          </li>
          <li className="dvChart">
            <div id="<!Id>" className="<!Class>">
              <p className="mard text-sm">
                <span className="mar_">HNXCON: </span>
                <span
                  id="i311_3"
                  className={`${setColorMenuMarket(valueHNX?.i311_5)} px-0.5`}
                >
                  {valueHNX?.i311_3}
                </span>
                <span
                  id="i311_Image"
                  className={`${iconColorMenuMarket(valueHNX?.i311_5)} px-0.5`}
                />
                <span
                  id="i311_5"
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
                  (
                  <span id="i311_x251c" className="marc">
                    {valueHNX?.i311_x251c}
                  </span>
                  )
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
                  (
                  <span id="i311_x253f" className="marf">
                    {valueHNX?.i311_x253f}
                  </span>
                  )
                </span>
                <span id="i311_x336x340" className="HA_MarketStat txtIndex">
                  {fStatusMarketHNX(valueHNX?.i311_x336x340)}
                </span>
              </p>
            </div>
            <div>
              <span
                className={`chart3d ${
                  height.expand === 27
                    ? "hidden"
                    : height.expand === 67
                    ? "hidden"
                    : "block"
                }`}
              ></span>
            </div>
          </li>
        </Slider>
      </ul>
      <div
        className="scrollingHotSpotRight"
        onMouseEnter={handleHoverRight}
        onMouseLeave={handleLeaveRight}
      />
    </div>
  );
};

export default SlidesMarketWatch;
