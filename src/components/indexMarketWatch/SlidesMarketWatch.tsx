import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./slide.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from "../../Context/AppContext";
import {
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
import { fetchHSXMarketAsync } from "./marketHSXSlice";
import { fetchHNXMarketAsync } from "./marketHNXSlice";
import SlideMarketItem from "./SlideMarketItem";
import {
  fetchChartIndexAsync,
  fetchConfigChartIndexAsync,
  setDataChartRealTime,
} from "../chartIndex/chartIndexSlice";
import agent from "../../api/agent";
import { IACTION_LIST, IDataCDT, IRP } from "./interface/slidemarket.config";
import {
  g_ARRAY_CHART_NAME,
  renderSlideMarket,
} from "./utils/renderSlideMarket";
import { setScreenSize } from "../layoutMarketwatch/ScreenSize";
interface KineticScrollProps {
  moved?: (settings: KineticSettings) => void;
}

interface KineticSettings {
  mouseDown: boolean;
  xpos: number | false;
  ypos: number | false;
  prevXPos: number | false;
  prevYPos: number | false;
  velocity: number;
  velocityY: number;
  scrollLeft: number;
  scrollTop: number;
  decelerate: boolean;
}

const SlidesMarketWatch: React.FC<KineticScrollProps> = ({ moved })  => {
  const dispatch = useAppDispatch();
  // show ẩn index
  const { visible } = useAppSelector((state) => state.chart);
  // tính height div
  const height = useContext(AppContext);
  // get config chart
  const {configChartIndex} =useAppSelector((state) => state.chartIndex);
  // lấy height, width màn hình window
  const { widthWindow, heightWindow } = useAppSelector((state) => state.screenSize);

  const  {quantityIndex}  = useAppSelector((state) => state.settingMarketwatch);
  // console.log(quantityIndex)
  // stt kéo thả
  const [isDragging, setIsDragging] = useState(false);
  // điểm bắt đầu
  const [startX, setStartX] = useState(0);
  // set scroll
  const [scrollLeft, setScrollLeft] = useState(0);
    // check stt hiển thị scroll left
    const [sttLocation, setSttLocation] = useState(false);
  // check stt hiển thị scroll left
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  // check stt hiển thị scroll right
  const [isHoveredRight, setIsHoveredRight] = useState(false);
  // tính width div index to
  const [widthIndex,setWidthIndex] =useState(quantityIndex*223)
  // stt fetch data
  const [sttFetchData, setSTTFetchData] = useState(true);
  // ref scroll left right
  const divScrollLeft = useRef<any>(null);
  const divScrollRight = useRef<any>(null);
  // ref scroll divchart
  const divRef = useRef<any>(null);

  const INTERVAL = 30000; // 60000 milliseconds = 1 minute
  let scrollInterval: any = null;
  const HOUR_STOP_UPDATE = 15;
  const ACTION_LIST: IACTION_LIST = {
    GET_SS: "ss", // get snapshot data (update) , can phai co Max
    GET_CDT: "cdt", // get check date time
  };
  const {
    marketHSX: { valueHSX },
  } = useAppSelector((state) => state.marketHSX);
  const {
    marketHNX: { valueHNX },
  } = useAppSelector((state) => state.marketHNX);
  const { INDEX } = useAppSelector( (state) => state.settingMarketwatch
  );
  // lấy data Index HSX
  useEffect(() => {
    dispatch(fetchHSXMarketAsync());
  }, [dispatch]);
// lấy data Index HNX
  useEffect(() => {
    dispatch(fetchHNXMarketAsync());
  }, [dispatch]);
// lấy data Chart Index
  useEffect(() => {
    dispatch(fetchChartIndexAsync());
  }, [dispatch]);
  // get data config chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchConfigChartIndexAsync());
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error("Error fetching first API data:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  // get width height window
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenSize({ width: window.innerWidth, height: window.innerHeight }));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
  // tinh width index
  useEffect(()=>{
    if(quantityIndex){
      setWidthIndex(quantityIndex*223)
    }
    // width Index < width màn hình thì không hiện scroll
    if(widthIndex <=  widthWindow){
      console.log(widthIndex,widthWindow)
      setIsHoveredLeft(false);
      setIsHoveredRight(false);
    } 
     else{
      setIsHoveredLeft(true);
      setIsHoveredRight(true);
     }
  },[quantityIndex,widthWindow,divRef,widthIndex])
  // hover show All Scroll
   const showAllScroll = ()=>{
    if(widthIndex >=  widthWindow+divRef.current.scrollLeft && isHoveredLeft && isHoveredRight){
      // console.log(divScrollLeft.current)
      divScrollLeft.current.classList.remove("hidden")
      divScrollLeft.current.classList.add("scrollingHotSpotLeftVisible")
      divScrollRight.current.classList.remove("hidden")
      divScrollRight.current.classList.add("scrollingHotSpotRightVisible")
    }

   }
   // ẩn all scroll khi bỏ hover
   const hideAllScroll = ()=>{
    divScrollLeft.current.classList.remove("scrollingHotSpotLeftVisible")
    divScrollRight.current.classList.remove("scrollingHotSpotRightVisible")
   }
   const handleMouseDown = (event: any) => {
     setIsDragging(true);
     setStartX(event.pageX - divRef.current.offsetLeft);
     setScrollLeft(divRef.current.scrollLeft);
   };
 
   const handleMouseMove = (event: any) => {
     if (!isDragging) return;
     event.preventDefault();
     // console.log(divRef)
     const x = event.pageX - divRef.current.offsetLeft;
     const walk = x - startX; // Tốc độ kéo
     divRef.current.scrollLeft = scrollLeft - walk;
   };
 
   const handleMouseUp = () => {
     setIsDragging(false);
     hideAllScroll()
     // setIsHoveredLeft(false)
   };
 
   let handleMouseEnter = (value: any, event: any, speed: any) => {
     // console.log(divRef)
     if (value === "right") {
      //  const { clientX } = event;
      //  const ulLeftEdge = divRef.current.getBoundingClientRect().right;
       !visible && event.target.classList.add("scrollingHotSpotRightVisible");
    
       scrollInterval = setInterval(() => {
         divRef.current.scrollLeft += speed; // tốc độc scroll
        if(widthIndex <=  widthWindow+divRef.current.scrollLeft){
          console.log(widthIndex , widthWindow+divRef.current.scrollLeft)
          setIsHoveredLeft(true);
          setIsHoveredRight(false);
        }
        else{
          setIsHoveredLeft(true);
          setIsHoveredRight(true);
        }
        //console.log(widthIndex,widthWindow+divRef.current.scrollLeft);
        console.log(divRef.current.scrollLeft);
         const divElement = divRef.current;
         const isAtRightEdge =
           divElement.scrollLeft + divElement.clientWidth >=
           divElement.scrollWidth;
 
         if (isAtRightEdge) {
           !visible &&
             event.target.classList.remove("scrollingHotSpotRightVisible");
           clearInterval(scrollInterval);
           handleMouseEnter(null, null, 0);
         }
       }, 1);
     }
 
     if (value === "left") {
 
       !visible && event.target.classList.add("scrollingHotSpotLeftVisible");
       scrollInterval = setInterval(() => {
         divRef.current.scrollLeft -= speed; // tốc độc scroll
         if (divRef.current.scrollLeft === 0) {
          console.log("về 0")
          setIsHoveredLeft(false);
          setIsHoveredRight(true);
           clearInterval(scrollInterval);
           event.target.classList.remove("scrollingHotSpotLeftVisible");
           handleMouseEnter(null, null, 0);
         }
        //  else{
        //   setIsHoveredRight(true);
        //  }
       }, 8);
     }
   };
   let speed=0;
   const handleMouseMoveButton = (event: any) => {
     // handleMouseEnter("right", event, 0);
     speed = event.clientX - event.target.getBoundingClientRect().left;
     //console.log(speed);
   };
   // console.log({
   //   data: g_ARRAY_CHART_NAME.map(item => renderSlideMarket(INDEX, item, valueHSX, valueHNX, visible))
   // })
 
   const handleMouseLeave = (e: any) => {
     clearInterval(scrollInterval); // Dừng cuộn tự động khi bỏ hover
     !visible && e.target.classList.remove("scrollingHotSpotRightVisible");
     !visible && e.target.classList.remove("scrollingHotSpotLeftVisible");
   };

   // xu ly data realtime
  useEffect(() => {
    const fetchDataCDT = async () => {
      try {
        // Sau khi có dữ liệu từ API đầu tiên, gọi API thứ hai với giá trị từ API đầu tiên
        if (configChartIndex) {
          var RP: IRP = { s: ACTION_LIST.GET_SS, m: configChartIndex };
          const dataCDT: IDataCDT = await agent.chartIndex.getCDT(
            ACTION_LIST.GET_CDT
          );
          const { data } = await agent.chartIndex.getTimeSS(RP);
          // dispatch(fetchChartIndexCDTAsync(ACTION_LIST.GET_CDT));
          // dispatch(fetchChartIndexTimeAsync(RP));
          if (dataCDT) {
            if (dataCDT.IsWorkingDay && new Date(dataCDT.Now).getHours() >= HOUR_STOP_UPDATE // la NGAY LAM VIEC + tu sau 15h00 => destroy timer
            ) {
              setSTTFetchData(false);
            }
            // }
          }
          if (data?.SS !== null) {
            dispatch(setDataChartRealTime(data));
          }
        }
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error("Error fetching second API data:", error);
      }
      if (!sttFetchData || !configChartIndex) {
        clearInterval(intervalId); // Dừng interval nếu không cần tiếp tục
      }
    };
    fetchDataCDT();
    // Thiết lập interval để gọi API mỗi 1 phút
    const intervalId = setInterval(fetchDataCDT, INTERVAL);
    // Trả về một hàm để xóa interval khi component unmount hoặc thay đổi
    return () => {
      clearInterval(intervalId);
    };
  }, [
    dispatch,
    configChartIndex,
    sttFetchData,
    ACTION_LIST.GET_SS,
    ACTION_LIST.GET_CDT,
  ]);
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
        ref={divScrollLeft}
        className={`scrollingHotSpotLeft ${
          visible ? "!h-full" : ""
        } ${isHoveredLeft ? "" : "hidden"}`}
        onMouseEnter={(e) => {
          handleMouseEnter("left", e, 2);
        }}
        onMouseLeave={(e: any) => {
          handleMouseLeave(e);
        }}
      />
      <div className="py-1 col-priceboard class-chart bg-black">
        <div
          className={`flex w-[${widthIndex}px] overflow-x-hidden whitespace-nowrap cursor-move`}
          // style={{width:widthIndex}}
          ref={divRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseEnter={showAllScroll}
        >
          {g_ARRAY_CHART_NAME.map((item) => (
            <SlideMarketItem
              key={item}
              data={renderSlideMarket(INDEX, item, valueHSX, valueHNX, visible)}
            />
          ))}
        </div>
      </div>
      <div
        className={`scrollingHotSpotRight ${visible ? "!h-full" : ""} ${isHoveredRight ? "" : "hidden"}`}
        onMouseEnter={(e) => {
          handleMouseEnter("right", e, 2);
        }}
        onMouseOut={(e: any) => {
          handleMouseLeave(e);
        }}
        onMouseMove={(e) => {
          handleMouseMoveButton(e);
        }}
        ref={divScrollRight}
      />
    </div>
  );
};

export default React.memo(SlidesMarketWatch);
