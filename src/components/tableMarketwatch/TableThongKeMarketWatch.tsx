import React, { useCallback, useEffect, useState } from "react";
import { stocks } from "../../models/marketwacthTable";
import { DatePicker, Space } from "antd";
import HeaderFromThongke from "./helper/HeadeFormThongKe";
import TableChange from "./helper/MainTable";
import {
  useAppSelector,
  RootState,
  useAppDispatch,
} from "../../store/configureStore";
import { getDataChungKhoan, getdataTableThongKe, SortTableThongkeIndex } from "./tableTestSlice";
import { DateTimeCover, getDateTime } from "../../pages/helper/DateTime";
import { formatNumberMarket, formatNumberPhanTram } from "../../utils/util";
import PanigationTableThongKe from "./helper/Panigation";
import { VARIBLE_ACTICON_TYPE } from "./helper/varible";
type DateValue = {
  action: string;
  center: any;
  time: any;
  begin_date: any;
  end_date: any;
  selected_page: any;
  page_size: any;
};
type DataValues = {
  action: string;
  center: any; //san
  code: any; // max ck
  type: any; // loai ck
  date: any;
  begin_date: any;
  end_date: any;
  selected_page: any;
  page_size: any;
};
const TableThongKeMarketWatch = () => {
  const {
    KeyMenuChildren,
    dataTableThongkeIndex,
    dataTableThongkeTH,
    dataTableThongkePrice,
    dataTableThongkeOrderLenh,
    dataTableThongkeKhopLenh,
    paginationPageTbTKIndex,
    paginationPageTbTKPrice,
    paginationPageTbTKOrderLenh,
    paginationPageTbTKKhopLenh,
    paginationPageTbTKTH,
  } = useAppSelector((state: RootState) => state.tableTest);
  const { tuNgay, denNgay } = getDateTime(); // show input
  const { StartDay, EndDay } = DateTimeCover();
  const [data, setData] = useState<DateValue>({
    action: VARIBLE_ACTICON_TYPE.ACTION_INDEX,
    center: 1,
    time: 0,
    begin_date: StartDay,
    end_date: EndDay,
    selected_page: 1,
    page_size: 400,
  });
  const [resultSort, setReultSort] = useState<DataValues>({
    action: "",
    center: 1,
    code: 0,
    type: 0,
    date: "",
    begin_date: "",
    end_date: "",
    selected_page: 1,
    page_size: 400,
  });
  const dispatch = useAppDispatch();
  const handleChungKhoan = useCallback(()=>{
    dispatch(getDataChungKhoan())
  },[])
  useEffect(() => {
    dispatch(getdataTableThongKe());
    handleChungKhoan()
  }, [handleChungKhoan]);
  const ChangeBegin_time = (e: any) => {
    const { StartDay } = DateTimeCover(e.target.value);
    setData({ ...data, begin_date: StartDay });
  };
  const ChangeEnd_time = (e: any) => {
    const { EndDay } = DateTimeCover(e.target.value);
    setData({ ...data, end_date: EndDay });
  };
  const HandeFillter = () => {
    const result = new FormData();
    result.append("action", data.action);
    result.append("begin_date", data.begin_date);
    result.append("end_date", data.end_date);
    result.append("center", data.center);
    result.append("time", data.time);
    result.append("selected_page", data.selected_page);
    result.append("page_size", data.page_size);
    let query = {
      action: data.action,
      result: result,
    };
    dispatch(SortTableThongkeIndex(query));
  };
  const changePage = (page: any) => {
    if (KeyMenuChildren === 0) {
      const result = new FormData();
      result.append("action", data.action);
      result.append("begin_date", data.begin_date);
      result.append("end_date", data.end_date);
      result.append("center", data.center);
      result.append("time", data.time);
      result.append("selected_page", page);
      result.append("page_size", data.page_size);
      let query = {
        action: data.action,
        result: result,
      };
      dispatch(SortTableThongkeIndex(query));
    } else {
      const action_type =
        KeyMenuChildren == 1
          ? VARIBLE_ACTICON_TYPE.ACTION_PRICE
          : KeyMenuChildren == 2
          ? VARIBLE_ACTICON_TYPE.ACTION_ORDERLENH
          : KeyMenuChildren == 3
          ? VARIBLE_ACTICON_TYPE.ACTION_GDKL
          : VARIBLE_ACTICON_TYPE.ACTION_TH;
      const result = new FormData();
      result.append("action", action_type);
      result.append("begin_date", resultSort.begin_date);
      result.append("end_date", resultSort.end_date);
      result.append("center", resultSort.center);
      result.append("date", resultSort.date);
      result.append("code", resultSort.code);
      result.append("type", resultSort.type);
      result.append("selected_page", page);
      result.append("page_size", resultSort.page_size);
      let query = {
        action: action_type,
        result: result,
      };
      dispatch(SortTableThongkeIndex(query));
    }
  };
  return (
    <>
      {KeyMenuChildren === 0 ? (
        <>
          <div
            id="dvSTTIndex"
            className="grid grid-cols-6 gap-3 col-priceboard py-2.5 px-0.5"
            style={{}}
          >
            <div
              className="flex form-group col-xs-2 col-sm-2 col-priceboard div-group-stt-price"
              style={{}}
            >
              <label className="label_price col-priceboard">Sàn</label>
              <select
                onChange={(e) =>
                  setData({ ...data, center: Number(e.target.value) })
                }
                className="col-xs-8 col-sm-8 input"
                id="slCenterHIST_INDEX"
              >
                <option label="HOSE" value={1}>
                  HOSE
                </option>
                <option label="HNX" value={2}>
                  HNX
                </option>
                <option label="UPCOM" value={3}>
                  UPCOM
                </option>
                <option label="VN30" value={4}>
                  VN30
                </option>
                <option label="HNX30" value={5}>
                  HNX30
                </option>
              </select>
            </div>
            <div
              className="flex form-group col-xs-2 col-sm-2 col-priceboard div-group-stt-price"
              style={{}}
            >
              <label className="label_price col-priceboard">Đợt</label>
              <select
                className="col-xs-8 col-sm-8 input"
                id="slSessionHIST_INDEX"
                onChange={(e) =>
                  setData({ ...data, time: Number(e.target.value) })
                }
              >
                <option label="Tất cả" selected value={0}>
                  Tất cả
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div
              className="flex form-group col-xs-2 col-sm-2 col-priceboard div-group-stt-price"
              style={{}}
            >
              <label className="label_price col-priceboard" id="label_price">
                Từ ngày
              </label>
              <input
                className="input"
                type="date"
                defaultValue={tuNgay}
                onChange={(e) => ChangeBegin_time(e)}
              />
            </div>
            <div
              className="flex form-group col-xs-2 col-sm-2 col-priceboard div-group-stt-price"
              style={{}}
            >
              <label className="label_price col-priceboard" id="label_price">
                Đến ngày
              </label>
              <input
                className="input"
                type="date"
                defaultValue={denNgay}
                onChange={(e) => ChangeEnd_time(e)}
              />
            </div>
            <div
              className="form-group col-xs-2 col-sm-2 col-priceboard"
              style={{}}
            >
              <button
                onClick={HandeFillter}
                className="btn btn-success button_Statistics"
                id="btnViewHIST_INDEX"
              >
                Xem
              </button>
              <button
                className="btn btn-success button_Statistics"
                id="btnExportHIST_INDEX"
              >
                Excel
              </button>
            </div>
          </div>
          <table
            id="tbHIST_INDEX"
            className="table table-PT table-bordered table-priceboard"
          >
            <thead style={{}}>
              <tr>
                <th className="hbrb" rowSpan={2}>
                  Ngày
                </th>
                <th className="hbrb" rowSpan={2}>
                  Đợt
                </th>
                <th className="hbrb" rowSpan={2}>
                  Index
                </th>
                <th className="hbrb" colSpan={2}>
                  Thay đổi Index
                </th>
                <th className="hbrb" rowSpan={2}>
                  Tổng GTGD
                </th>
                <th className="hbrb" colSpan={2}>
                  Thay đổi GTGD
                </th>
                <th className="hbrb" rowSpan={2}>
                  Tổng KLGD
                </th>
                <th className="hbrb" colSpan={2}>
                  Thay đổi KLGD
                </th>
              </tr>
              <tr>
                <th className="hb_b">+/-</th>
                <th className="hbrb">%</th>
                <th className="hb_b">+/-</th>
                <th className="hbrb">%</th>
                <th className="hb_b">+/-</th>
                <th className="hbrb">%</th>
              </tr>
            </thead>
            <tbody>
              {dataTableThongkeIndex
                ? dataTableThongkeIndex.map((item: any, index: number) => {
                    return (
                      <tr>
                        <td>{item[0][1]}</td>
                        <td>{formatNumberMarket(item[1][1])}</td>
                        <td>{formatNumberMarket(item[2][1])}</td>
                        <td>{formatNumberMarket(item[3][1])}</td>
                        <td>{formatNumberPhanTram(item[4][1])}</td>
                        <td>{formatNumberMarket(item[5][1])}</td>
                        <td>{formatNumberMarket(item[6][1])}</td>
                        <td>{formatNumberPhanTram(item[7][1])}</td>
                        <td>{formatNumberMarket(item[8][1])}</td>
                        <td>{formatNumberMarket(item[9][1])}</td>
                        <td>{formatNumberPhanTram(item[10][1])}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <HeaderFromThongke ChangeFuncion={setReultSort} />
          <TableChange />
        </>
      )}
      {KeyMenuChildren == 0 &&  dataTableThongkeIndex.length > 0 ? (
        <div className="panigation">
          <PanigationTableThongKe panigation={paginationPageTbTKIndex} ChangeFucion={changePage} />
        </div>
      ) : (
        ""
      )}
      {KeyMenuChildren == 4 && dataTableThongkeTH.length > 0 ? (
        <div className="panigation">
          <PanigationTableThongKe panigation={paginationPageTbTKTH} ChangeFucion={changePage} />
        </div>
      ) : (
        ""
      )}
      { KeyMenuChildren == 1 && dataTableThongkePrice.length > 0 ? (
        <div className="panigation">
          <PanigationTableThongKe panigation={paginationPageTbTKPrice} ChangeFucion={changePage} />
        </div>
      ) : (
        ""
      )}
      { KeyMenuChildren == 2 && dataTableThongkeOrderLenh.length > 0 ? (
        <div className="panigation">
          <PanigationTableThongKe panigation={paginationPageTbTKOrderLenh} ChangeFucion={changePage} />
        </div>
      ) : (
        ""
      )}
      {KeyMenuChildren == 3 && dataTableThongkeKhopLenh.length > 0 ? (
        <div className="panigation">
          <PanigationTableThongKe panigation={paginationPageTbTKKhopLenh} ChangeFucion={changePage} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TableThongKeMarketWatch;
