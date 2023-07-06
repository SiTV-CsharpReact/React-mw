import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "./slide.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from "../../Context/AppContext";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
import { fetchHSXMarketAsync } from "./marketHSXSlice";
import { fetchHNXMarketAsync } from "./marketHNXSlice";
import SlideMarketItem from "./SlideMarketItem";
import {
  HNX,
  HNX30,
  HNXCON,
  HNXFIN,
  HNXLCAP,
  HNXMAN,
  HNXSMCAP,
  UPCON,
  VN100,
  VN30,
  VNALL,
  VNI,
  VNMID,
  VNMSL,
  VNXALL,
} from "./className";
import {
  fStatusMarketHNX,
  fStatusMarketHSX,
  fStatusMarketUPCOM,
} from "../../utils/util";
import { fetchChartIndexAsync } from "../chartIndex/chartIndexSlice";

const SlidesMarketWatch = () => {
  const { visible } = useAppSelector((state) => state.chart);
  const height = useContext(AppContext);
  // const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  // const [isHoveringRight, setIsHoveringRight] = useState(false);
  // const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  // const screenWidth = visible ? window.innerWidth - 650 : window.innerWidth;
  // const slideWidth = 220;
  const { dataChartIndex } = useAppSelector((state) => state.chartIndex);
  const [speed, setSpeed] = useState(0);

  const dispatch = useAppDispatch();
  const {
    marketHSX: { valueHSX },
  } = useAppSelector((state) => state.marketHSX);
  const {
    marketHNX: { valueHNX },
  } = useAppSelector((state) => state.marketHNX);
  const { INDEX } = useAppSelector(
    (state: RootState) => state.settingMarketwatch
  );

  useEffect(() => {
    dispatch(fetchHSXMarketAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchHNXMarketAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchChartIndexAsync());
  }, [dispatch]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // const [scrollInterval, setScrollInterval] = useState<any>(null);
  const scrollRef = useRef(null);
  const divRef = useRef<any>(null);
  let scrollInterval: any = null;
  // const [mouseX, setMouseX] = useState(0);
  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    setStartX(event.pageX - divRef.current.offsetLeft);
    setScrollLeft(divRef.current.scrollLeft);
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - divRef.current.offsetLeft;
    const walk = x - startX; // Tốc độ kéo
    divRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = (e: any) => {
    console.log(e)
    clearInterval(scrollInterval); // Dừng cuộn tự động khi bỏ hover
    // scrollInterval = null;
    !visible &&
      e.target.classList.remove("scrollingHotSpotRightVisible");
    !visible && e.target.classList.remove("scrollingHotSpotLeftVisible");
    // handleMouseMoveButton(null);
    // handleMouseEnter(null, null);
  };

  let handleMouseEnter = (value: any, event: any, speed:number) => {
    if (value === "right") {
      !visible &&
        event.target.classList.add("scrollingHotSpotRightVisible");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollInterval = setInterval(() => {
        
        divRef.current.scrollLeft += speed; // tốc độc scroll
        const divElement = divRef.current;
        const isAtRightEdge =
          divElement.scrollLeft + divElement.clientWidth >=
          divElement.scrollWidth;
        if (isAtRightEdge) {
            // console.log(event)
            event.target.classList.remove(
              "scrollingHotSpotRightVisible"
            );
            // console.log( event.currentTarget)
          clearInterval(scrollInterval);
          handleMouseEnter(null, null,0);
        }
        
      }, 0);
    }

    if (value === "left") {
      !visible &&
        event.target.classList.add("scrollingHotSpotLeftVisible");
      scrollInterval = setInterval(() => {
        divRef.current.scrollLeft -= speed; // tốc độc scroll
        if (divRef.current.scrollLeft === 0) {
          clearInterval(scrollInterval);
          event.target.classList.remove("scrollingHotSpotLeftVisible");
          handleMouseEnter(null, null,0);
        }
      }, 0);
    }
  };
  return (
    <div
      id="divIndexChart "
      className={`bg-headerMenuTableMarket ${visible ? "relative" : ""} ${
        height.expand === 27
          ? "max-h-[23px]"
          : height.expand === 67
          ? "max-h-[67px]"
          : "max-h-[unset]"
      }`}
    >
      <div
        className={`scrollingHotSpotLeft ${visible ? "!h-full" : ""}`}
        onMouseEnter={(e) => {
          handleMouseEnter("left", e,4);
        }}
        onMouseLeave={(e: any) => {
          handleMouseLeave(e);
        }}
      />
      <ul className="my-1 col-priceboard class-chart">
        <div
          className="flex w-full overflow-x-hidden whitespace-nowrap cursor-grab"
          ref={divRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {INDEX.VNXALL && (
            <SlideMarketItem
              name="VNXALL"
              id={VNXALL}
              valueIndexChange={valueHSX?.VNXALL_IndexValue}
              valueChange={valueHSX?.VNXALL_Change}
              valueChangePercent={valueHSX?.VNXALL_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VNXALL_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VNXALL_TotalValuesAOM}
              valueUp={valueHSX?.VNXALL_Up}
              valueCeiling={valueHSX?.VNXALL_Ceiling}
              valueNoChange={valueHSX?.VNXALL_NoChange}
              valueDown={valueHSX?.VNXALL_Down}
              valueFloor={valueHSX?.VNXALL_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.VNI && (
            <SlideMarketItem
              name="VNI"
              id={VNI}
              valueIndexChange={valueHSX?.VNI_IndexValue}
              valueChange={valueHSX?.VNI_Change}
              valueChangePercent={valueHSX?.VNI_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VNI_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VNI_TotalValuesAOM}
              valueUp={valueHSX?.VNI_Up}
              valueCeiling={valueHSX?.VNI_Ceiling}
              valueNoChange={valueHSX?.VNI_NoChange}
              valueDown={valueHSX?.VNI_Down}
              valueFloor={valueHSX?.VNI_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.VN30 && (
            <SlideMarketItem
              name="VN30"
              id={VN30}
              valueIndexChange={valueHSX?.VN30_IndexValue}
              valueChange={valueHSX?.VN30_Change}
              valueChangePercent={valueHSX?.VN30_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VN30_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VN30_TotalValuesAOM}
              valueUp={valueHSX?.VN30_Up}
              valueCeiling={valueHSX?.VN30_Ceiling}
              valueNoChange={valueHSX?.VN30_NoChange}
              valueDown={valueHSX?.VN30_Down}
              valueFloor={valueHSX?.VN30_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.VN100 && (
            <SlideMarketItem
              name="VN100"
              id={VN100}
              valueIndexChange={valueHSX?.VN100_IndexValue}
              valueChange={valueHSX?.VN100_Change}
              valueChangePercent={valueHSX?.VN100_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VN100_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VN100_TotalValuesAOM}
              valueUp={valueHSX?.VN100_Up}
              valueCeiling={valueHSX?.VN100_Ceiling}
              valueNoChange={valueHSX?.VN100_NoChange}
              valueDown={valueHSX?.VN100_Down}
              valueFloor={valueHSX?.VN100_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.VNALL && (
            <SlideMarketItem
              name="VNALL"
              id={VNALL}
              valueIndexChange={valueHSX?.VNALL_IndexValue}
              valueChange={valueHSX?.VNALL_Change}
              valueChangePercent={valueHSX?.VNALL_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VNALL_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VNALL_TotalValuesAOM}
              valueUp={valueHSX?.VNALL_Up}
              valueCeiling={valueHSX?.VNALL_Ceiling}
              valueNoChange={valueHSX?.VNALL_NoChange}
              valueDown={valueHSX?.VNALL_Down}
              valueFloor={valueHSX?.VNALL_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.VNMID && (
            <SlideMarketItem
              name="VNMID"
              id={VNMID}
              valueIndexChange={valueHSX?.VNMID_IndexValue}
              valueChange={valueHSX?.VNMID_Change}
              valueChangePercent={valueHSX?.VNMID_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VNMID_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VNMID_TotalValuesAOM}
              valueUp={valueHSX?.VNMID_Up}
              valueCeiling={valueHSX?.VNMID_Ceiling}
              valueNoChange={valueHSX?.VNMID_NoChange}
              valueDown={valueHSX?.VNMID_Down}
              valueFloor={valueHSX?.VNMID_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.VNSML && (
            <SlideMarketItem
              name="VNSML"
              id={VNMSL}
              valueIndexChange={valueHSX?.VNSML_IndexValue}
              valueChange={valueHSX?.VNSML_Change}
              valueChangePercent={valueHSX?.VNSML_ChangePercent}
              visible={visible}
              valueTotalSharesAOM={valueHSX?.VNSML_TotalSharesAOM}
              valueTotalValuesAOM={valueHSX?.VNSML_TotalValuesAOM}
              valueUp={valueHSX?.VNSML_Up}
              valueCeiling={valueHSX?.VNSML_Ceiling}
              valueNoChange={valueHSX?.VNSML_NoChange}
              valueDown={valueHSX?.VNSML_Down}
              valueFloor={valueHSX?.VNSML_Floor}
              status={fStatusMarketHSX(valueHSX?.STAT_ControlCode)}
              san="HSX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNX && (
            <SlideMarketItem
              name="HNX"
              id={HNX}
              valueIndexChange={valueHNX?.i02_3}
              valueChange={valueHNX?.i02_5}
              valueChangePercent={valueHNX?.i02_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i02_7}
              valueTotalValuesAOM={valueHNX?.i02_14}
              valueUp={valueHNX?.i02_x251}
              valueCeiling={valueHNX?.i02_x251c}
              valueNoChange={valueHNX?.i02_x252}
              valueDown={valueHNX?.i02_x253}
              valueFloor={valueHNX?.i02_x253f}
              status={fStatusMarketHNX(valueHNX?.i02_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNX30 && (
            <SlideMarketItem
              name="HNX30"
              id={HNX30}
              valueIndexChange={valueHNX?.i41_3}
              valueChange={valueHNX?.i41_5}
              valueChangePercent={valueHNX?.i41_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i41_7}
              valueTotalValuesAOM={valueHNX?.i41_14}
              valueUp={valueHNX?.i41_x251}
              valueCeiling={valueHNX?.i41_x251c}
              valueNoChange={valueHNX?.i41_x252}
              valueDown={valueHNX?.i41_x253}
              valueFloor={valueHNX?.i41_x253f}
              status={fStatusMarketHNX(valueHNX?.i41_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNXLCAP && (
            <SlideMarketItem
              name="HNXLCAP"
              id={HNXLCAP}
              valueIndexChange={valueHNX?.i26_3}
              valueChange={valueHNX?.i26_5}
              valueChangePercent={valueHNX?.i26_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i26_7}
              valueTotalValuesAOM={valueHNX?.i26_14}
              valueUp={valueHNX?.i26_x251}
              valueCeiling={valueHNX?.i26_x251c}
              valueNoChange={valueHNX?.i26_x252}
              valueDown={valueHNX?.i26_x253}
              valueFloor={valueHNX?.i26_x253f}
              status={fStatusMarketHNX(valueHNX?.i26_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNXSMCAP && (
            <SlideMarketItem
              name="HNXSMCAP"
              id={HNXSMCAP}
              valueIndexChange={valueHNX?.i28_3}
              valueChange={valueHNX?.i28_5}
              valueChangePercent={valueHNX?.i28_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i28_7}
              valueTotalValuesAOM={valueHNX?.i28_14}
              valueUp={valueHNX?.i28_x251}
              valueCeiling={valueHNX?.i28_x251c}
              valueNoChange={valueHNX?.i28_x252}
              valueDown={valueHNX?.i28_x253}
              valueFloor={valueHNX?.i28_x253f}
              status={fStatusMarketHNX(valueHNX?.i28_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNXFIN && (
            <SlideMarketItem
              name="HNXFIN"
              id={HNXFIN}
              valueIndexChange={valueHNX?.i39_3}
              valueChange={valueHNX?.i39_5}
              valueChangePercent={valueHNX?.i39_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i39_7}
              valueTotalValuesAOM={valueHNX?.i39_14}
              valueUp={valueHNX?.i39_x251}
              valueCeiling={valueHNX?.i39_x251c}
              valueNoChange={valueHNX?.i39_x252}
              valueDown={valueHNX?.i39_x253}
              valueFloor={valueHNX?.i39_x253f}
              status={fStatusMarketHNX(valueHNX?.i39_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNXMAN && (
            <SlideMarketItem
              name="HNXMAN"
              id={HNXMAN}
              valueIndexChange={valueHNX?.i310_3}
              valueChange={valueHNX?.i310_5}
              valueChangePercent={valueHNX?.i310_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i310_7}
              valueTotalValuesAOM={valueHNX?.i310_14}
              valueUp={valueHNX?.i310_x251}
              valueCeiling={valueHNX?.i310_x251c}
              valueNoChange={valueHNX?.i310_x252}
              valueDown={valueHNX?.i310_x253}
              valueFloor={valueHNX?.i310_x253f}
              status={fStatusMarketHNX(valueHNX?.i310_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.HNXCON && (
            <SlideMarketItem
              name="HNXCON"
              id={HNXCON}
              valueIndexChange={valueHNX?.i311_3}
              valueChange={valueHNX?.i311_5}
              valueChangePercent={valueHNX?.i311_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i311_7}
              valueTotalValuesAOM={valueHNX?.i311_14}
              valueUp={valueHNX?.i311_x251}
              valueCeiling={valueHNX?.i311_x251c}
              valueNoChange={valueHNX?.i311_x252}
              valueDown={valueHNX?.i311_x253}
              valueFloor={valueHNX?.i311_x253f}
              status={fStatusMarketHNX(valueHNX?.i311_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
          {INDEX.UPCOM && (
            <SlideMarketItem
              name="UPCOM"
              id={UPCON}
              valueIndexChange={valueHNX?.i03_3}
              valueChange={valueHNX?.i03_5}
              valueChangePercent={valueHNX?.i03_6}
              visible={visible}
              valueTotalSharesAOM={valueHNX?.i03_7}
              valueTotalValuesAOM={valueHNX?.i03_14}
              valueUp={valueHNX?.i03_x251}
              valueCeiling={valueHNX?.i03_x251c}
              valueNoChange={valueHNX?.i03_x252}
              valueDown={valueHNX?.i03_x253}
              valueFloor={valueHNX?.i03_x253f}
              status={fStatusMarketUPCOM(valueHNX?.i03_x336x340)}
              san="HNX"
              dataChartIndex={dataChartIndex}
            />
          )}
        </div>
      </ul>
      <div
        className={`scrollingHotSpotRight ${visible ? "!h-full" : ""}`}
        onMouseEnter={(e) => {
          handleMouseEnter("right", e,3);
        }}
        onMouseLeave={(e: any) => {
          handleMouseLeave(e);
        }}
        // onMouseMove={(e) => {
        //   handleMouseMoveButton(e);
        // }}
      />
    </div>
  );
};

export default SlidesMarketWatch;
