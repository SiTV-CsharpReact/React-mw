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

const SlidesMarketWatch = () => {
  const dispatch = useAppDispatch();
  // show ẩn index
  const { visible } = useAppSelector((state) => state.chart);
  // tính height div
  const height = useContext(AppContext);
  // get config chart
  const {configChartIndex} =useAppSelector((state) => state.chartIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isUlHoveredLeft, setIsUlHoveredLeft] = useState(false);
  const [isUlHoveredRight, setIsUlHoveredRight] = useState(false);
  const [heightIndex,setHeightIndex] =useState(0)
  const [sttFetchData, setSTTFetchData] = useState(true);
  const INTERVAL = 30000; // 60000 milliseconds = 1 minute
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
  const HOUR_STOP_UPDATE = 15;
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
  const divWidth = 0;
  useEffect(()=>{
    const divWidth = divRef.current.children.length;
    if(divWidth){
      setHeightIndex(divWidth*223)
    }
    console.log(heightIndex)
  },[divWidth])
  // let speed = 0;
  const scrollRef = useRef<any>(null);
  const divRef = useRef<any>(null);
  let scrollInterval: any = null;
  // let scrollInterval1: any = null;
  // const [mouseX, setMouseX] = useState(0);
  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    setStartX(event.pageX - divRef.current.offsetLeft);
    setScrollLeft(divRef.current.scrollLeft);
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;
    event.preventDefault();
    console.log(divRef)
    const x = event.pageX - divRef.current.offsetLeft;
    const walk = x - startX; // Tốc độ kéo
    divRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsUlHoveredLeft(false)
  };

  let speed = 0; // Biến lưu trữ giá trị speed

  let handleMouseEnter = (value: any, event: any, speed: any) => {
    // console.log(divRef)
    if (value === "right") {
      const { clientX } = event;
      const ulLeftEdge = divRef.current.getBoundingClientRect().right;
      // if(clientX < ulLeftEdge + 75){
      //   setIsUlHoveredLeft(false)
      // }
      // else{
      //   setIsUlHoveredLeft(true)
      // }
      console.log(ulLeftEdge,clientX)
      !visible && event.target.classList.add("scrollingHotSpotRightVisible");
   
      scrollInterval = setInterval(() => {
        divRef.current.scrollLeft += speed; // tốc độc scroll
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
          clearInterval(scrollInterval);
          event.target.classList.remove("scrollingHotSpotLeftVisible");
          handleMouseEnter(null, null, 0);
        }
      }, 8);
    }
  };

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
        className={`scrollingHotSpotLeft ${
          visible ? "!h-full" : ""
        } ${isUlHoveredLeft ? "hidden" : ""}`}
        onMouseEnter={(e) => {
          handleMouseEnter("left", e, 2);
        }}
        onMouseLeave={(e: any) => {
          handleMouseLeave(e);
        }}
      />
      <div className="py-1 col-priceboard class-chart bg-black">
        <div
          className={`flex w-[${heightIndex}px] overflow-x-hidden whitespace-nowrap cursor-move`}
          style={{width:heightIndex}}
          ref={divRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
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
        className={`scrollingHotSpotRight ${visible ? "!h-full" : ""} ${isUlHoveredRight ? "hidden" : ""}`}
        onMouseEnter={(e) => {
          handleMouseEnter("right", e, 2);
        }}
        onMouseOut={(e: any) => {
          handleMouseLeave(e);
        }}
        onMouseMove={(e) => {
          handleMouseMoveButton(e);
        }}
        ref={scrollRef}
      />
    </div>
  );
};

export default React.memo(SlidesMarketWatch);
