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
import {
  fetchChartIndexAsync,
  fetchConfigChartIndexAsync,
  setDataChartRealTime,
} from "../chartIndex/chartIndexSlice";
import agent from "../../api/agent";
import {
  IACTION_LIST,
  IDataCDT,
  IRP,
} from "./interface/slidemarket.config";
import { IChartIndex } from "../chartIndex/interface/interface.config";
import { ARRAY_CHART_NAME } from "../../configs/app.config";
// chart 
const DivIndex = (
  nameIndex:string,idIndex:string[],valueIndexChange:string,valueChange:string,valueChangePercent:string,visible:boolean,
  valueTotalSharesAOM:string,valueTotalValuesAOM:string,
  valueUp:string,valueCeiling:string,valueNoChange:string,valueDown:string,valueFloor:string, status:string,san:string,dataChartIndex:IChartIndex
  )=>(
  <SlideMarketItem
  name={nameIndex}
  id={idIndex}
  valueIndexChange={valueIndexChange}
  valueChange={valueChange}
  valueChangePercent={valueChangePercent}
  visible={visible}
  valueTotalSharesAOM={valueTotalSharesAOM}
  valueTotalValuesAOM={valueTotalValuesAOM}
  valueUp={valueUp}
  valueCeiling={valueCeiling}
  valueNoChange={valueNoChange}
  valueDown={valueDown}
  valueFloor={valueFloor}
  status={status}
  san={san}

/>
 )
const SlidesMarketWatch = () => {
  const dispatch = useAppDispatch();
  const { visible } = useAppSelector((state) => state.chart);
  const height = useContext(AppContext);
  const { dataChartIndex, configChartIndex, dataChartIndexTime } =useAppSelector((state) => state.chartIndex);
  console.log(dataChartIndex,configChartIndex)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [sttFetchData, setSTTFetchData] = useState(true);
  const INTERVAL = 30000; // 60000 milliseconds = 1 minute
  const ACTION_LIST: IACTION_LIST = {
    GET_SS: "ss", // get snapshot data (update) , can phai co Max
    GET_CDT: "cdt", // get check date time
  };
  // console.log(dataChartIndexTime)
  // console.log({ dataChart });
  // console.log({ dataChartIndex: dataChartIndex});

  const {
    marketHSX: { valueHSX },
  } = useAppSelector((state) => state.marketHSX);
  const {
    marketHNX: { valueHNX },
  } = useAppSelector((state) => state.marketHNX);
  const { INDEX } = useAppSelector( (state) => state.settingMarketwatch
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API đầu tiên
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
            // ko null thi moi xu ly
            // if (self.m_TimerProcID) // khac null
            // {
            if (
              !dataCDT.IsWorkingDay || // ko phai NGAY LAM VIEC >> destroy timer
              (dataCDT.IsWorkingDay &&
                new Date(dataCDT.Now).getHours() >= HOUR_STOP_UPDATE) // la NGAY LAM VIEC + tu sau 15h00 => destroy timer
            ) {
              setSTTFetchData(false);
            }
            // }
          }
          if (data)
            if (data?.SS !== null) {
              var obj = data.SS;
              for (var k = 0; k < obj.length; k++) {
                var child = obj[k];
                for (var i = 0; i < ARRAY_CHART_NAME.length; i++) {
                  console.log(child)
                  dispatch(setDataChartRealTime(child));
                }
                }
           
            }
        }
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error("Error fetching second API data:", error);
      }
      if (!sttFetchData || !configChartIndex) {
        // Kiểm tra biến trạng thái và configChartIndex
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
  }, [dispatch, configChartIndex, sttFetchData]);
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
    const x = event.pageX - divRef.current.offsetLeft;
    const walk = x - startX; // Tốc độ kéo
    divRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  let speed = 0; // Biến lưu trữ giá trị speed

  let handleMouseEnter = (value: any, event: any, speed: any) => {
    if (value === "right") {
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
    console.log(speed);
  };

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
        className={`scrollingHotSpotLeft ${visible ? "!h-full" : ""}`}
        onMouseEnter={(e) => {
          handleMouseEnter("left", e, 2);
        }}
        onMouseLeave={(e: any) => {
          handleMouseLeave(e);
        }}
      />
      <ul className="py-1 col-priceboard class-chart bg-black">
        <div
          className="flex w-full overflow-x-hidden whitespace-nowrap cursor-grab"
          ref={divRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {INDEX.VNXALL && ( 
            DivIndex("VNXALL",VNXALL,valueHSX?.VNXALL_IndexValue,valueHSX?.VNXALL_Change,valueHSX?.VNXALL_ChangePercent,visible,valueHSX?.VNXALL_TotalSharesAOM,valueHSX?.VNXALL_TotalValuesAOM,valueHSX?.VNXALL_Up,valueHSX?.VNXALL_Ceiling ,valueHSX?.VNXALL_NoChange,valueHSX?.VNXALL_Down,valueHSX?.VNXALL_Floor,fStatusMarketHSX(valueHSX?.STAT_ControlCode),"HSX",dataChartIndex)
                    

          )}
          {INDEX.VNI && (
             DivIndex("VNI",VNI,valueHSX?.VNI_IndexValue,valueHSX?.VNI_Change,valueHSX?.VNI_ChangePercent,visible,valueHSX?.VNI_TotalSharesAOM,valueHSX?.VNI_TotalValuesAOM,valueHSX?.VNI_Up,valueHSX?.VNI_Ceiling ,valueHSX?.VNI_NoChange,valueHSX?.VNI_Down,valueHSX?.VNI_Floor,fStatusMarketHSX(valueHSX?.STAT_ControlCode),"HSX",dataChartIndex)
          )}
          {INDEX.VN30 && (
              DivIndex("VN30",VN30,valueHSX?.VN30_IndexValue,valueHSX?.VN30_Change,valueHSX?.VN30_ChangePercent,visible,valueHSX?.VN30_TotalSharesAOM,valueHSX?.VN30_TotalValuesAOM,valueHSX?.VN30_Up,valueHSX?.VN30_Ceiling ,valueHSX?.VN30_NoChange,valueHSX?.VN30_Down,valueHSX?.VN30_Floor,fStatusMarketHSX(valueHSX?.STAT_ControlCode),"HSX",dataChartIndex)
          )}
          {INDEX.VN100 && (
             DivIndex("VN100",VN100,valueHSX?.VN100_IndexValue,valueHSX?.VN100_Change,valueHSX?.VN100_ChangePercent,visible,valueHSX?.VN100_TotalSharesAOM,valueHSX?.VN100_TotalValuesAOM,valueHSX?.VN100_Up,valueHSX?.VN100_Ceiling ,valueHSX?.VN100_NoChange,valueHSX?.VN100_Down,valueHSX?.VN100_Floor,fStatusMarketHSX(valueHSX?.STAT_ControlCode),"HSX",dataChartIndex)
          )}
          {INDEX.VNALL && (
          DivIndex("VNALL", VNALL, valueHSX?.VNALL_IndexValue, valueHSX?.VNALL_Change, valueHSX?.VNALL_ChangePercent, visible, valueHSX?.VNALL_TotalSharesAOM, valueHSX?.VNALL_TotalValuesAOM, valueHSX?.VNALL_Up, valueHSX?.VNALL_Ceiling, valueHSX?.VNALL_NoChange, valueHSX?.VNALL_Down, valueHSX?.VNALL_Floor, fStatusMarketHSX(valueHSX?.STAT_ControlCode), "HSX", dataChartIndex)
          )}
          {INDEX.VNMID && (
           DivIndex("VNMID", VNMID, valueHSX?.VNMID_IndexValue, valueHSX?.VNMID_Change, valueHSX?.VNMID_ChangePercent, visible, valueHSX?.VNMID_TotalSharesAOM, valueHSX?.VNMID_TotalValuesAOM, valueHSX?.VNMID_Up, valueHSX?.VNMID_Ceiling, valueHSX?.VNMID_NoChange, valueHSX?.VNMID_Down, valueHSX?.VNMID_Floor, fStatusMarketHSX(valueHSX?.STAT_ControlCode), "HSX", dataChartIndex)
          )}
          {INDEX.VNSML && (
          DivIndex("VNSML", VNMSL, valueHSX?.VNSML_IndexValue, valueHSX?.VNSML_Change, valueHSX?.VNSML_ChangePercent, visible, valueHSX?.VNSML_TotalSharesAOM, valueHSX?.VNSML_TotalValuesAOM, valueHSX?.VNSML_Up, valueHSX?.VNSML_Ceiling, valueHSX?.VNSML_NoChange, valueHSX?.VNSML_Down, valueHSX?.VNSML_Floor, fStatusMarketHSX(valueHSX?.STAT_ControlCode), "HSX", dataChartIndex)
          )}
          {INDEX.HNX && (
            DivIndex("HNX", HNX, valueHNX?.i02_3, valueHNX?.i02_5, valueHNX?.i02_6, visible, valueHNX?.i02_7, valueHNX?.i02_14, valueHNX?.i02_x251, valueHNX?.i02_x251c, valueHNX?.i02_x252, valueHNX?.i02_x253, valueHNX?.i02_x253f, fStatusMarketHNX(valueHNX?.i02_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.HNX30 && (
            DivIndex("HNX30", HNX30, valueHNX?.i41_3, valueHNX?.i41_5, valueHNX?.i41_6, visible, valueHNX?.i41_7, valueHNX?.i41_14, valueHNX?.i41_x251, valueHNX?.i41_x251c, valueHNX?.i41_x252, valueHNX?.i41_x253, valueHNX?.i41_x253f, fStatusMarketHNX(valueHNX?.i41_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.HNXLCAP && (
            DivIndex("HNXLCAP", HNXLCAP, valueHNX?.i26_3, valueHNX?.i26_5, valueHNX?.i26_6, visible, valueHNX?.i26_7, valueHNX?.i26_14, valueHNX?.i26_x251, valueHNX?.i26_x251c, valueHNX?.i26_x252, valueHNX?.i26_x253, valueHNX?.i26_x253f, fStatusMarketHNX(valueHNX?.i26_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.HNXSMCAP && (
            DivIndex("HNXSMCAP", HNXSMCAP, valueHNX?.i28_3, valueHNX?.i28_5, valueHNX?.i28_6, visible, valueHNX?.i28_7, valueHNX?.i28_14, valueHNX?.i28_x251, valueHNX?.i28_x251c, valueHNX?.i28_x252, valueHNX?.i28_x253, valueHNX?.i28_x253f, fStatusMarketHNX(valueHNX?.i28_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.HNXFIN && (
           DivIndex("HNXFIN", HNXFIN, valueHNX?.i39_3, valueHNX?.i39_5, valueHNX?.i39_6, visible, valueHNX?.i39_7, valueHNX?.i39_14, valueHNX?.i39_x251, valueHNX?.i39_x251c, valueHNX?.i39_x252, valueHNX?.i39_x253, valueHNX?.i39_x253f, fStatusMarketHNX(valueHNX?.i39_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.HNXMAN && (
           DivIndex("HNXMAN", HNXMAN, valueHNX?.i310_3, valueHNX?.i310_5, valueHNX?.i310_6, visible, valueHNX?.i310_7, valueHNX?.i310_14, valueHNX?.i310_x251, valueHNX?.i310_x251c, valueHNX?.i310_x252, valueHNX?.i310_x253, valueHNX?.i310_x253f, fStatusMarketHNX(valueHNX?.i310_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.HNXCON && (
          DivIndex("HNXCON", HNXCON, valueHNX?.i311_3, valueHNX?.i311_5, valueHNX?.i311_6, visible, valueHNX?.i311_7, valueHNX?.i311_14, valueHNX?.i311_x251, valueHNX?.i311_x251c, valueHNX?.i311_x252, valueHNX?.i311_x253, valueHNX?.i311_x253f, fStatusMarketHNX(valueHNX?.i311_x336x340), "HNX", dataChartIndex)
          )}
          {INDEX.UPCOM && (
         DivIndex("UPCOM", UPCON, valueHNX?.i03_3, valueHNX?.i03_5, valueHNX?.i03_6, visible, valueHNX?.i03_7, valueHNX?.i03_14, valueHNX?.i03_x251, valueHNX?.i03_x251c, valueHNX?.i03_x252, valueHNX?.i03_x253, valueHNX?.i03_x253f, fStatusMarketUPCOM(valueHNX?.i03_x336x340), "HNX", dataChartIndex)
          )}
        </div>
      </ul>
      <div
        className={`scrollingHotSpotRight ${visible ? "!h-full" : ""}`}
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
