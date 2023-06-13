import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import HeaderFromThongke from "./helper/HeadeFormThongKe";
import TableChange from "./helper/MainTable";
import { useAppSelector ,RootState} from "../../store/configureStore";
const { RangePicker } = DatePicker;

const TableThongKeMarketWatch = () => {
  const { KeyMenuChildren } = useAppSelector((state:RootState) => state.table);
  // console.log("KeyMenuChildren",KeyMenuChildren)
  // const [products, setProducts] = useState([]);

  // const params = useParams<{ id: string }>()
  // const paramstock  = stocks.find(
  //   paramstock => paramstock.id === params.id
  // )
  // useEffect(()=>{
  //     if(paramstock){
  //      if(paramstock.id){
  //        fetchTable(paramstock.id)
  //      }
  //      else{
  //        fetchTable("HNX")
  //      }
  //     }
  //    },[paramstock?.id])
  //   //console.log(products)
  //  // useEffect(()=>{
  //  //     dispatch(fetchTableHNXAsync())
  //  //     //dispatch(fetchStatusAsync())
  //  // },[dispatch])
  //  const fetchTable = async(param:string) => {
  //    let valueParam ="thong-ke-index";
  //     switch(param) {
  //      case "thong-ke-index":
  //        valueParam= "s=bi";
  //        break;
  //        case "thong-ke-gia":
  //          valueParam = "s=bi";
  //          break;
  //           case "thong-ke-dat-lenh":
  //             valueParam = "s=bi";
  //             break;
  //               case "Giao-dich-KL-NDTNN":
  //                 valueParam = "s=bi";
  //                 break;
  //                 case "Giao-dich-TT-NDTNN":
  //                   valueParam = "s=bi";
  //                   break;
  //        default:
  //          break;
  //     }
  //      const res = await fetch(`http://marketstream.fpts.com.vn/hnx/data.ashx?${valueParam}`);
  //      const data = await res.json();
  //      setProducts(data)
  //  }
  let time = new Date()
  const formattedDate = time.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const defaultDate: Dayjs = dayjs();
  const [floor,setFloor ] = useState<string>("1")
  const [Dot,setDot ] = useState<string>("1")
  const [TimeStart,setTimeStart ] = useState<any>(formattedDate)
  const [TimeEnd,setTimeEnd] = useState<any>(formattedDate)
  const converTime = (e:any)=>{
    const convertedDate = new Date(e.$d);
    const year = convertedDate.getFullYear();
    const month = convertedDate.getMonth(); 
    const day = convertedDate.getDate();
    return year +"//" +( month + 1) + "//" + day
  }
const tets = (e:any)=>{
 let a =  converTime(e)
 console.log("converted",a , defaultDate)
}

  const HandeFillter = ()=>{
  
    let data = {
      floor ,
      TimeStart
    }
    console.log("voo"  ,defaultDate)
  }

  return (
    <div>
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
              onChange={(e)=>setFloor(e.target.value)}
                className="col-xs-8 col-sm-8 input"
                id="slCenterHIST_INDEX"
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
                <option label="VN30" value={5}>
                  VN30
                </option>
                <option label="HNX30" value={6}>
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
              >
                <option label="Tất cả" value={0}>
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
              <label className="label_price col-priceboard">Từ ngày</label>
              <Space direction="vertical" size={12}>
                <DatePicker
                  defaultValue={defaultDate}
                  showToday={true}
                  renderExtraFooter={() => "extra footer"}
                  onChange={(e)=>tets(e)}
                />
              </Space>
            </div>
            <div
              className="flex form-group col-xs-2 col-sm-2 col-priceboard div-group-stt-price"
              style={{}}
            >
              <label className="label_price col-priceboard">Đến ngày</label>

              <Space direction="vertical" size={12}>
                <DatePicker
                  showToday={true}
                  defaultValue={defaultDate}
                  renderExtraFooter={() => "extra footer"}
                />
              </Space>
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
            <tbody>{/*Content*/}</tbody>
          </table>
        </>
      ) : (
        <>
          <HeaderFromThongke />
          <TableChange />
        </>
      )}
    </div>
  );
};

export default TableThongKeMarketWatch;
