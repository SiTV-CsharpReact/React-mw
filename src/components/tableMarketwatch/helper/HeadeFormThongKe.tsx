import ReactDatePicker from "react-datepicker";
import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "./index.scss";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector,RootState } from "../../../store/configureStore";
import { dispatchDataThongke } from "./tableFormThongke";
import { DateTimeCover, getDateTime } from "../../../pages/helper/DateTime";
import { SortTableThongkeIndex } from "../tableTestSlice";
import { VARIBLE_ACTICON_TYPE } from "./varible";
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
  ChangeFuncion ?:any,
}
const HeaderFromThongke = ({ChangeFuncion } :Props) => {
  const { KeyMenuChildren } = useAppSelector((state: RootState) => state.table);
  const { tuNgay, denNgay } = getDateTime();
  const {StartDay, EndDay} = DateTimeCover()
  const [dataHSX, setDataHSX] = useState([]);
  const [dataHNX, setDataHNX] = useState([]);
  const [data, setData] = useState<DataValue>  ({
    action : "",
    center: 1,
    code: 0,
    type: 0,
    date: "",
    begin_date: StartDay,
    end_date: EndDay,
    selected_page: 1,
    page_size: 400,
  });
  useEffect(() =>{
    ChangeFuncion(data)
  },[])
  const [selectedExchange, setSelectedExchange] = useState(1); // Mặc định chọn HOSE
  const dispatch = useAppDispatch();

  const fetchDataHSX = async () => {
    const { data } = await axios.get("http://localhost:2345/Data");
    setDataHSX(data);
  };
  const fetchDataHNX = async () => {
    const { data } = await axios.get("http://localhost:3456/Data");
    console.log("respone", data);
    setDataHNX(data);
  };
  useEffect(() => {
    fetchDataHSX();
    fetchDataHNX();
  }, []);
  // sàn
  const handleExchangeChange = (e: any) => {
    setData({...data, center : e.target.value})
    setSelectedExchange(Number(e.target.value));
    ChangeFuncion({...data , center : e.target.value})
  };
  const handleTuNgay = (e:any) =>{
    let {StartDay} = DateTimeCover(e.target.value)
    setData({...data,begin_date : StartDay})
    ChangeFuncion({...data,end_date : StartDay})
  }
  const handleDenNgay = (e:any)=>{
    let {EndDay} = DateTimeCover(e.target.value)
    setData({...data,end_date : EndDay})
    ChangeFuncion({...data,end_date : EndDay})
  }
  const ChangeCode =(e:any) => {
    setData({...data , code:e });
    ChangeFuncion({...data , code:e })
}
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
              <option label="HNX" value={2}>
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
             
              onChange = {(e) => ChangeCode(e.target.value)}
              className="col-xs-8 col-sm-8 input"
              id="slCenterHIST_INDEX"
            >
              <option className="pl-[8px] py-[1px]" value="">
                Tất Cả
              </option>
              <>
                {selectedExchange === 1 &&
                  dataHSX
                    .sort((a: any, b: any) => a.Sy.localeCompare(b.Sy))
                    .map((itemHSX: any, index: any) => (
                      <Fragment key={index}>
                        <option value={itemHSX.Sy} className="py-[1px]">
                          {itemHSX?.Sy}
                        </option>
                      </Fragment>
                    ))}
              </>
              {selectedExchange === 2 &&
                dataHNX
                  .sort((a: any, b: any) => a.Sy.localeCompare(b.Sy))
                  .map((itemHNX: any, index: any) => (
                    <Fragment key={index}>
                      <option value={itemHNX.Sy} className="pl-[1px]">
                        {itemHNX?.Sy}
                      </option>
                    </Fragment>
                  ))}
              {selectedExchange === 4 &&
                dataHNX
                  .sort((a: any, b: any) => a.Sy.localeCompare(b.Sy))
                  .map((itemHNX: any, index: any) => (
                    <option value={itemHNX.Sy} key={index} className="pl-[1px]">
                      {itemHNX?.Sy}
                    </option>
                  ))}
              {selectedExchange === 6 &&
                dataHNX
                  .sort((a: any, b: any) => a.Sy.localeCompare(b.Sy))
                  .map((itemHNX: any, index: any) => (
                    <option value={itemHNX.Sy} key={index} className="pl-[1px]">
                      {itemHNX?.Sy}
                    </option>
                  ))}
            </select>
          </div>
          {/* <div className="from-grup fromThongke">
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
          <option label="HNX" value={2}>
            HNX
          </option>
          <option label="UPCOM" value={4}>
            UPCOM
          </option>
          <option label="HNX30" value={6}>
            HNX30
          </option>
        </select>
      </div>
      <div className="from-grup fromThongke">
        <label className="titleFormThongke">Chứng Khoán</label>
        <select className="col-xs-8 col-sm-8 input" id="slCenterHIST_INDEX">
          <option className="pl-[8px] py-[1px]">Tất Cả</option>
          {filteredData.map((item: any, index: any) => (
            <option key={index} className={selectedExchange === 2 ? "pl-[1px]" : "py-[1px]"}>
              {item?.Sy}
            </option>
          ))}
        </select>
      </div> */}
        </div>
        <div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Từ ngày</label>
            <input type="date" className="input" defaultValue={tuNgay} 
              onChange={(e)=> handleTuNgay(e)}
            />
          </div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Đến ngày</label>
            <input type="date" className="input" defaultValue={denNgay} 
              onChange={(e)=> handleDenNgay(e)}
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
              onChange={(e)=> setData({...data ,type : e.target.value  })}
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
