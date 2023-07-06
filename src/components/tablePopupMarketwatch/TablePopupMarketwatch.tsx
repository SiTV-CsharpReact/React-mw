import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./TablePopup.scss";
import { showDetailStock } from "../popupTableMarketwatch/popupTableSlice";
import TableDetailPopup from "./TableDetailPopup";
import TableBasicPopup from "./TableBasicPopup";
import TableReportingPopup from "./TableReportingPopup";
import TableGDTTPopup from "./TableGDTTPopup";
import TableGDLLPopup from "./TableGDLLPopup";
import TableKLTTGPopup from "./TableKLTTGPopup";
import ChartPopup from "./ChartPopup";
import axios from "axios";
import { getCompanyNameByCode } from "../../utils/util";
import { DataTable } from "../../models/modelTableHNX";
import ChartWithOption from "./ChartWithOption";
import { fetchChartOptionAsync } from "./chartOptionSlice";
import NewsPopup from "./NewsPopup";
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
const TablePopupMarketwatch = () => {
  const dispatch = useAppDispatch();
  const [dataKLTTG, setDataKLTTG] = useState([]);
  const [dataResultSearch, setDataResultSearch] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [dataCheck, setDataCheck] = useState("");
  const [dataItemHNX, setDataItemHNX] = useState<any[]>([]);
  const [dataItemHSX, setDataItemHSX] = useState<any[]>([]);
  const stockDetail = useSelector((state: RootState) => state.popupTable.code);
  // console.log("s",{ stockDetail });
  const fetchDataTableHSX = async (code?: string) => {
    if (code !== "" && code !== undefined) {
      const res = await axios.get(
        `https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${code}`
      );
      setDataItemHSX(res.data);
      return res.data;
    } else {
      const res = await axios.get(
        `https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${stockDetail}`
      );
      setDataItemHSX(res.data);
      return res.data;
    }
  };
  const fetchDataTableHNX = async (code?: string) => {
    if (code !== "" && code !== undefined) {
      const res: any = await axios.get(
        `https://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=${code}`
      );
      console.log("");
      res.data.map((obj: DataTable) =>
        obj.Info?.sort((a: any, b: any) => {
          const indexA = Number(a[0]);
          const indexB = Number(b[0]);
          if (indexA < indexB) {
            return -1;
          }
          if (indexA > indexB) {
            return 1;
          }
          return 0;
        })
      );
      setDataItemHNX(res.data);
      return res.data;
    } else {
      const res: any = await axios.get(
        `https://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=${stockDetail}`
      );
      res.data.map((obj: DataTable) =>
        obj.Info?.sort((a: any, b: any) => {
          const indexA = Number(a[0]);
          const indexB = Number(b[0]);
          if (indexA < indexB) {
            return -1;
          }
          if (indexA > indexB) {
            return 1;
          }
          return 0;
        })
      );
      setDataItemHNX(res.data);
      return res.data;
    }
  };

  useEffect(() => {
    const fethData = async () => {
      const { data } = await axios.get("http://localhost:9999/Data");
      setDataKLTTG(data);
    };
    const fethDataSearch = async () => {
      const { data } = await axios.get("http://localhost:6868/Data");
      console.log("data", data);
      setDataResultSearch(data);
    };
    fethData();
    fethDataSearch();
  }, []);
  useEffect(() => {
    fetchDataTableHNX();
    fetchDataTableHSX();
  }, [stockDetail]);
  const handleChange = (e: any) => {
    setDataCheck(e.target.value.toUpperCase());
    setShowPopup(true);
  };
  useEffect(() => {
    const results = dataResultSearch.filter(
      (item: any) => item.Code.toUpperCase().includes(dataCheck)
      // console.log("filteredData", dataCheck)
    );
    setFilteredData(results);
  }, [dataCheck, dataResultSearch]);

  const [position, setPosition] = useState({
    x: (window.innerWidth - 1230) / 2, // - đi witdh tablle chia 2
    y: (window.innerHeight - 721 - 40) / 2,
  });
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
    // if (onDrag) {
    //   onDrag(e, ui);
    // }
  };
  // const componentVisible = useSelector(
  //     (state: RootState) => state.chart.visible
  //   );
  // const status = useSelector(((state: RootState) => state.popupTable.visible))
  // console.log(status)
  const handelClick = () => {
    setShowPopup(!showPopup);
  };
  const handleShowDetail = async (code: string) => {
    setShowPopup(!showPopup);
    // let result = [];
    // dispatch(updateDetialStock())
    let dataHSX: [] = await fetchDataTableHSX(code);
    let dataHNX: [] = await fetchDataTableHNX(code);
    if (dataHNX.length !== 0) {
      setDataItemHNX(dataHNX);
    } else {
      if (dataHSX.length !== 0) {
        setDataItemHSX(dataHSX);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchChartOptionAsync({ stockCode: stockDetail }));
  }, [dispatch, stockDetail]);
  // console.log(dataItemHNX, dataItemHSX)
  // Kiểm tra và đặt lại giá trị cho dataMouse.maF và dataMouseBuy.maB nếu selectedCode tồn tại
  return (
    <Draggable handle=".pu-header" position={position} onDrag={handleDrag}>
      <div className="pu-window text-[#B9B9B9]">
        <div className="pu-header">
          <div className="flex pu-grtitle">
            <div className="m-auto">
              <div className="pu-div-search">
                <div
                  className="relative ms-ctn form-control"
                  style={{ border: "1px solid #ccc" }}
                  id="ipSearchCode"
                >
                  <div className="ms-sel-ctn">
                    <input
                      type="text"
                      placeholder="Nhập mã Chứng khoán"
                      autoComplete="nofill"
                      onChange={handleChange}
                      onClick={handelClick}
                      className="cursor-pointer"
                      value={dataCheck.toUpperCase()}
                    />
                  </div>
                  <div className="ms-trigger">
                    <div className="fa fa-search top-[2px] absolute left-[2px]" />
                  </div>
                </div>
              </div>
              <div className="inline-block pu-div-title">
                <h2 className="pu-title">
                  {dataItemHNX.length !== 0
                    ? dataItemHNX[0]?.Info[0][1]
                    : dataItemHSX[0]?.Info[0][1]}{" "}
                  - {getCompanyNameByCode(dataItemHNX[0]?.Info[0][1])}
                </h2>
              </div>
            </div>
            {/*  */}
            {showPopup && (
              <div
                style={{ overflowY: "scroll" }}
                className="w-[500px]  overflow-hidden shadow-2xl left-[25%] top-[36px] z-50 h-[310px] bg-[#FBFBFB] rounded-sm absolute"
              >
                {showPopup &&
                  filteredData.map((item: any, index: any) => {
                    let parts = item.Code.split(
                      new RegExp(`(${dataCheck})`, "gi")
                    );
                    return (
                      <div
                        onClick={() => handleShowDetail(item.Code)}
                        className="py-1 cursor-pointer pl-2 border-b hover:bg-[#EEEEEE]"
                        key={index}
                      >
                        <p className="!font-medium">
                          {parts.map((part: any, partIndex: any) => (
                            <span
                              key={partIndex}
                              style={{
                                color:
                                  part.toUpperCase() === dataCheck
                                    ? "#FF0000"
                                    : "inherit",
                                fontWeight:
                                  part.toUpperCase() === dataCheck
                                    ? "bold"
                                    : "medium",
                              }}
                            >
                              {part}
                            </span>
                          ))}
                          <span> - {item.ScripName}</span>
                        </p>
                        <p></p>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* vd */}
          </div>
          <div className="pu-div-button">
            <i
              className="fa fa-refresh fa-lg !text-sm"
              title="Cập nhật lại dữ liệu"
            />
            <span
              className="pu-close"
              title="Đóng cửa sổ"
              onClick={() => dispatch(showDetailStock({visible:false,code:""}))}
            >
              <i className="fa fa-times fa-lg !text-sm" />
            </span>
          </div>
        </div>
        <div>
          <TableDetailPopup
            dataItem={dataItemHNX.length !== 0 ? dataItemHNX : dataItemHSX}
          />
        </div>
        <div className="flex pu-info mt-[5px]">
          <div className="pu-basic w-[409px] mx-1">
            <TableBasicPopup stockCode={stockDetail} />
            <TableReportingPopup stockCode={stockDetail} />
          </div>
          <div className="pu-hrz-realtime w-[391px] mx-1">
            <div
              className="pu-vertical pu-div-realtime"
              onScroll={function (e: any) {
                if (e.currentTarget.scrollTop > 0) {
                  e.target.classList.add("stick");
                } else {
                  e.target.classList.remove("stick");
                }
              }}
            >
              <TableKLTTGPopup stockCode={stockDetail} />
            </div>
            <div className="w-full pu-div-PT">
              <TableGDTTPopup />
            </div>
            <div className="pu-vertical pu-div-oddlot">
              <TableGDLLPopup stockCode={stockDetail}/>
            </div>
          </div>
          <div className="pu-hrz-chart">
            <ChartPopup />
            <ChartWithOption
              dataItem={dataItemHNX.length !== 0 ? dataItemHNX : dataItemHSX}
            />
            {/* <ChartWithOption stockCode={stockDetail} /> */}
            <NewsPopup stockCode={stockDetail}/>
          </div>
         
        </div>
      </div>
    </Draggable>
  );
};
export default React.memo(TablePopupMarketwatch);
