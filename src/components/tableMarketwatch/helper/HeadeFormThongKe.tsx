import ReactDatePicker from "react-datepicker";
import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "./index.scss";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../../store/configureStore";
import { dispatchDataThongke } from "./tableFormThongke";
import { DateTimeCover, getDateTime } from "../../../pages/helper/DateTime";
import { SortTableThongkeIndex } from "../tableTestSlice";
import { VARIBLE_ACTICON_TYPE } from "./varible";
import { dataCK } from "../../../models/modelTableHNX";
type DataValue = {
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
type Props = {
  ChangeFuncion?: any;
};
const HeaderFromThongke = ({ ChangeFuncion }: Props) => {
  const { stockCode, KeyMenuChildren } = useAppSelector(
    (state: RootState) => state.tableTest
  );
  const { keyMenu, nameMenu, floorMenu , dataHNX ,dataHSX ,dataUPCOM } = useAppSelector(
    (state: RootState) => state.tableTest
  );
  const center  = nameMenu == "UPCOM" ? 4 : floorMenu == "HNX"? 2 : 1
  const { tuNgay, denNgay } = getDateTime();
  const { StartDay, EndDay } = DateTimeCover();

  const [data, setData] = useState<DataValue>({
    action: "",
    center: nameMenu == "UPCOM" ? 4 : floorMenu == "HNX"? 2 : 1,
    code: stockCode ? stockCode : 0,
    type: 0,
    date: "",
    begin_date: StartDay,
    end_date: EndDay,
    selected_page: 1,
    page_size: 400,
  });
  useEffect(() => {
    ChangeFuncion(data);
    if (stockCode) {
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
      result.append("begin_date", data.begin_date);
      result.append("end_date", data.end_date);
      result.append("center", data.center);
      result.append("date", data.date);
      result.append("code", data.code);
      result.append("type", data.type);
      result.append("selected_page", data.selected_page);
      result.append("page_size", data.page_size);
      let query = {
        action: action_type,
        result: result,
      };
      dispatch(SortTableThongkeIndex(query));
    }
  }, []);
  const [selectedExchange, setSelectedExchange] = useState(nameMenu == "UPCOM" ? 4 : floorMenu == "HNX"? 2 : 1); // Mặc định chọn HOSE
  const [selectedStock, setSelectedStock] = useState(nameMenu == "UPCOM"? dataUPCOM:   floorMenu == "HNX"? dataHNX :dataHSX ) // mặc định HSX
  const [selectedCk ,setSelectedCk ] = useState(stockCode ? stockCode : 0)
  const dispatch = useAppDispatch();
  // sàn
  const handleExchangeChange = (e: any) => {
    setData({ ...data, center: e.target.value });
    setData({ ...data, code: 0 });
    setSelectedExchange(Number(e.target.value));
    ChangeFuncion({ ...data, center: e.target.value });
    setSelectedStock( e.target.value == 1 ? dataHSX :  e.target.value == 2 ?  dataHNX :  dataUPCOM)
  };
  const handleTuNgay = (e: any) => {
    let { StartDay } = DateTimeCover(e.target.value);
    setData({ ...data, begin_date: StartDay });
    ChangeFuncion({ ...data, end_date: StartDay });
  };
  const handleDenNgay = (e: any) => {
    let { EndDay } = DateTimeCover(e.target.value);
    setData({ ...data, end_date: EndDay });
    ChangeFuncion({ ...data, end_date: EndDay });
  };
  const ChangeCode = (e: any) => {
    setData({ ...data, code: e });
    ChangeFuncion({ ...data, code: e });
    setSelectedCk(e)
  };
  const handleClickTableThongKe = (dataThongke: any) => {
    // console.log("dataTable",dataTable)
    dispatch(dispatchDataThongke(dataThongke));
  };
  // call api
  const handelSubmit = () => {
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
    result.append("begin_date", data.begin_date);
    result.append("end_date", data.end_date);
    result.append("center", data.center);
    result.append("date", data.date);
    result.append("code", data.code);
    result.append("type", data.type);
    result.append("selected_page", data.selected_page);
    result.append("page_size", data.page_size);
    let query = {
      action: action_type,
      result: result,
    };
    dispatch(SortTableThongkeIndex(query));
  };
  return (
    <>
      <div id="dvSTTIndexs" className="" style={{}}>
        <div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Sàn</label>
            <select
              className="col-xs-8 col-sm-8 input"
              id="slCenterHIST_INDEX"
              onChange={handleExchangeChange}
              value={selectedExchange}
            >
              <option label="HOSE" value={1}>
                HOSE
              </option>
              <option label="HNX" selected value={2}>
                HNX
              </option>
              <option label="UPCOM" value={4}>
                UPCOM
              </option>
            </select>
          </div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Chứng Khoán</label>
            <select
              onChange={(e) => ChangeCode(e.target.value)}
              className="col-xs-8 col-sm-8 input"
              id="slCenterHIST_INDEX"
              value={selectedCk}
            >
              <option className="pl-[8px] py-[1px]" value="0">
                Tất Cả
              </option>  
             {selectedStock.map((item:dataCK,index:number)=>{
                return  <> 
                    <option key={index+1} value={item?.Sy}>{item.Sy}</option>
                </>
             })}
            </select>
          </div>
        </div>
        <div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Từ ngày</label>
            <input
              type="date"
              className="input"
              defaultValue={tuNgay}
              onChange={(e) => handleTuNgay(e)}
            />
          </div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Đến ngày</label>
            <input
              type="date"
              className="input"
              defaultValue={denNgay}
              onChange={(e) => handleDenNgay(e)}
            />
          </div>
        </div>
        {/* loại chứng khoán */}
        <div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Loại CK</label>
            <select
              className="col-xs-8 col-sm-8 input"
              id="slStockTypeHIST_PRICE"
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option label="Tất cả" value="0">
                Tất cả
              </option>
              <option label="Trái phiếu" value="1">
                Trái phiếu
              </option>
              <option label="Cổ phiếu" value="2">
                Cổ phiếu
              </option>
              <option label="Chứng chỉ quỹ" value="3">
                Chứng chỉ quỹ
              </option>
              <option label="ETF" value="6">
                ETF
              </option>
            </select>
          </div>
        </div>
        {/* action */}
        <div>
          <div className="from-grup fromThongke">
            <div
              className="form-group col-xs-2 col-sm-2 col-priceboard"
              style={{}}
            >
              <button
                className="btn btn-success button_Statistics"
                id="btnViewHIST_INDEX"
                onClick={handelSubmit}
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
        </div>
      </div>
    </>
  );
};
export default HeaderFromThongke;
