import ReactDatePicker from "react-datepicker";
import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "./index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
const HeaderFromThongke = () => {
  const [dataHSX, setDataHSX] = useState([])
  const [dataHNX, setDataHNX] = useState([])
  const [selectedExchange, setSelectedExchange] = useState(1); // Mặc định chọn HOSE
  const [filteredData, setFilteredData] = useState([]);

  
  const fetchDataHSX = async() => { 
    const {data} = await axios.get("http://localhost:2345/Data")
    setDataHSX(data)
  }
  const fetchDataHNX = async() => { 
    const {data} = await axios.get("http://localhost:3456/Data")
    console.log("respone", data)
    setDataHNX(data)
  }
  useEffect(() => {
    fetchDataHSX()
    fetchDataHNX()
  }, [])
    const handleExchangeChange = (e : any) => {
    setSelectedExchange(Number(e.target.value));
  };
  const defaultDate: Dayjs = dayjs();
  const HandeFilter  = ()=>{
  //    let filteredItems : any = [];
  //   if (selectedExchange === 1) {
  //     filteredItems = dataHSX;
  //   } else if (selectedExchange === 2) {
  //     filteredItems = dataHNX;
  //   }
  //   setFilteredData(filteredItems);
   }
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
          <option label="HNX30" value={6}>
            HNX30
          </option>
        </select>
      </div>
      <div className="from-grup fromThongke">
        <label className="titleFormThongke">Chứng Khoán</label>
        <select className="col-xs-8 col-sm-8 input" id="slCenterHIST_INDEX">
          <option className="pl-[8px] py-[1px]">Tất Cả</option>
              {selectedExchange === 1  && (
          dataHSX
            .sort((a : any, b : any) => a.Sy.localeCompare(b.Sy))
            .map((itemHSX: any, index: any) => (
              <option key={index} className="py-[1px]">
                {itemHSX?.Sy}
              </option>
            ))
        )}
        {selectedExchange === 2 && (
          dataHNX
            .sort((a : any, b : any) => a.Sy.localeCompare(b.Sy))
            .map((itemHNX: any, index: any) => (
              <option key={index} className="pl-[1px]">
                {itemHNX?.Sy}
              </option>
            ))
              )}
                {selectedExchange === 4 && (
          dataHNX
            .sort((a : any, b : any) => a.Sy.localeCompare(b.Sy))
            .map((itemHNX: any, index: any) => (
              <option key={index} className="pl-[1px]">
                {itemHNX?.Sy}
              </option>
            ))
              )}
                {selectedExchange === 6 && (
          dataHNX
            .sort((a : any, b : any) => a.Sy.localeCompare(b.Sy))
            .map((itemHNX: any, index: any) => (
              <option key={index} className="pl-[1px]">
                {itemHNX?.Sy}
              </option>
            ))
        )}

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
            <Space direction="vertical" size={16}>
              <DatePicker
                showToday={true}
                defaultValue={defaultDate}
                renderExtraFooter={() => "extra footer"}
              />
            </Space>
          </div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Đến ngày</label>
            <Space direction="vertical" size={16}>
              <DatePicker
                showToday={true}
                defaultValue={defaultDate}
                renderExtraFooter={() => "extra footer"}
              />
            </Space>
          </div>
        </div>
        {/* loại chứng khoán */}
        <div>
          <div className="from-grup fromThongke">
            <label className="titleFormThongke">Loại CK</label>
            <select
              className="col-xs-8 col-sm-8 input"
              id="slStockTypeHIST_PRICE"
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
              <button onClick={HandeFilter}
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
        </div>
      </div>
    </>
  );
};
export default HeaderFromThongke;
