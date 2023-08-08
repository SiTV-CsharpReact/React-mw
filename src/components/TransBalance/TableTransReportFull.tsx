import React, { useContext, useEffect, useMemo, useState } from "react";
import { formatNumber } from "../../utils/util";
import { MyContext } from "./TransBalance";

const TableTransReportFull:React.FC<any> = (props) => {
  const value = useContext(MyContext);
  const [sort, setSort] = useState('asc')
  const [label,setLabel] = useState('')
  const [data,setData] = useState<any>([])
  // const totalResult = useMemo(()=> {
  //   const total = props.renderReport?.reduce((acc:any,curr:any)=> acc + curr?.MarketPrice * curr?.AvailableOrderSecurities,0)
  //   value.setValueGTTT(total)

  //   return total
  // }, [props.renderReport, value])

  useEffect(()=> {
    value.setValueGTTT(props.renderReport?.reduce((acc:any,curr:any)=> acc + curr?.MarketPrice * curr?.AvailableOrderSecurities,0))
  },[props.renderReport])
    
  return (
    <table className="w-full border-collapse h-full text-center my-0 mx-auto border-spacing-0 bg-white">
      <thead className="table_trans_thead">
        <tr>
            <th rowSpan={2} onClick={()=> props.handleSort("StockCode")} className={`${props.label !== "StockCode"
                ? "tableprops.sorter"
                : props.label === "StockCode" && props.sort=== "desc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'6%'}}><div>Mã CK</div></th>
            <th rowSpan={2} onClick={()=> props.handleSort("AvailableOrderSecurities")} className={`${props.label !== "AvailableOrderSecurities"
                ? "tablesorter"
                : props.label === "AvailableOrderSecurities" && props.sort=== "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'6%'}}><div>SL có thể<br/>đặt bán</div></th>
            <th rowSpan={2} style={{width:'6%'}}><div>SL bán<br/>chờ khớp</div></th>
            <th rowSpan={2} style={{width:'6%'}}><div>Bán T0</div></th>
            <th colSpan={3} style={{width:'12%'}}><div>CK mua chờ về</div></th>
            <th rowSpan={2} style={{width:'6%'}}><div>CK quyền<br/> chờ về</div></th>
            <th rowSpan={2} style={{width:'7%'}}><div>Hạn chế</div></th>
            <th rowSpan={2} className={`${props.label !== "ACAPITAL_STRUCTURE"
                ? "tablesorter"
                : props.label === "ACAPITAL_STRUCTURE" && props.sort=== "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'5%'}}><div>Tổng KL</div></th>
            <th rowSpan={2} style={{width:'5%'}}><div>Giá TT</div></th>
            <th rowSpan={2} className={`${props.label !== "ACAPITAL_STRUCTURE"
                ? "tablesorter"
                : props.label === "ACAPITAL_STRUCTURE" && props.sort=== "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'5%'}}><div>Giá trị <br/> thị trường</div></th>
            <th rowSpan={2} style={{width:'6%'}}><div>Giá TB <br/> tạm tính</div></th>
            <th rowSpan={2} className={`${props.label !== "ACAPITAL_STRUCTURE"
                ? "tablesorter"
                : props.label === "ACAPITAL_STRUCTURE" && props.sort=== "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'5%'}}><div>Giá trị <br/>gốc</div></th>
            <th rowSpan={2} className={`${props.label !== "ACAPITAL_STRUCTURE"
                ? "tablesorter"
                : props.label === "ACAPITAL_STRUCTURE" && props.sort=== "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'5.8%'}}><div>Lãi/lỗ <br/>dự kiến</div></th>
            <th rowSpan={2} className={`${props.label !== "ACAPITAL_STRUCTURE"
                ? "tablesorter"
                : props.label === "ACAPITAL_STRUCTURE" && props.sort=== "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"}`} style={{width:'6%'}}><div>% Lãi/lỗ <br/>dự kiến</div></th>
        </tr>
        <tr>
            <th><div>T0</div></th>
            <th><div>T1</div></th>
            <th><div>T2</div></th>
        </tr>
      </thead>
      <tbody>
        {
          props.renderReport?.map((item:any, ind:number)=>(
            <tr key={item?.StockCode} aria-colindex={item?.RowID}>
              {/*ma ck  */}
              <td className="font-bold" style={{color: '#007DB7',padding: '1px 5px !important'}}>{item?.StockCode}</td>
              {/* so luong co the dat ban */}
              <td className="text-right">{item?.AvailableOrderSecurities}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              {/* tong KL */}
              <td className="text-right">
                <span className="tkl_show_title" data-title={`Trong đó Cổ phiếu thưởng/Cổ tức bằng cổ phiếu: ${item?.DividendBonusShare}`}>
                  <span className={`${item?.DividendBonusShare > 0 ? 'border-dotted border-b pb-[1px] border-black': 'border-b-0'}`}>{item?.AvailableOrderSecurities > 0 ? item?.TotalAmount : '-'}</span>
                </span>
              </td>
              {/* Gia TT */}
              <td className="text-right">{formatNumber(parseFloat((item?.MarketPrice).toFixed(0)))}</td>
              {/* Gia tri thi truong */}
              <td className="text-right">
                {item?.AvailableOrderSecurities>0?formatNumber(parseFloat((item?.MarketPrice * item?.AvailableOrderSecurities).toFixed(0))):'-'}
              </td>
              {/* Gia TB tam tinh */}
              <td className="text-right">{item?.AvailableOrderSecurities>0?formatNumber(item?.AveragePrice):'-'}</td>
              {/* Gia tri goc */}
              <td className="text-right">{item?.AvailableOrderSecurities>0?formatNumber(item?.RootValue):'-'}</td>
              {/* Lai lo du kien */}
              <td className="text-right" style={{color: `${item?.MarketPrice * item?.TotalAmount - item?.RootValue > 0 ? '#00b050':'#FF0000'}`}}>
                {formatNumber(Number((item?.MarketPrice * item?.TotalAmount - item?.RootValue).toFixed(1)))}
              </td>
              {/* %Lai lo du kien */}
              <td className="text-right" style={{color: `${item?.AvailableOrderSecurities<=0 ?'#000000':((item?.MarketPrice - item?.AveragePrice) / item?.AveragePrice)*100 > 0 ? '#00b050':'#FF0000'}`}}>
                {item?.AvailableOrderSecurities>0?((item?.MarketPrice - item?.AveragePrice) / item?.AveragePrice *100).toFixed(2)+'%':'-'}
              </td>
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={11} className="font-bold"><div>TỐNG</div></td>
          {/* Tổng giá trị thị trường */}
          <td className="font-bold text-right">
          {
            formatNumber(props.renderReport?.reduce((acc:any,curr:any)=> acc + curr?.MarketPrice * curr?.AvailableOrderSecurities,0))
          }
          </td>
          <td className="font-bold text-right"></td>
          {/* Tong gia tri goc */}
          <td className="font-bold text-right">
            {
              formatNumber(props.renderReport?.reduce((acc:any,curr:any)=> acc + curr?.RootValue, 0))
            }
          </td>
          <td className="font-bold text-right" style={{
            color: `${props?.renderReport?.reduce((acc:any,curr:any)=> {
              const value = curr?.MarketPrice * curr?.TotalAmount - curr?.RootValue
              return acc + value;
            },0) > 0 ? '#00b050':'#FF0000'}`
          }}>
            {
              formatNumber(props?.renderReport?.reduce((acc:any,curr:any)=> {
                const value = curr?.MarketPrice * curr?.TotalAmount - curr?.RootValue
                return acc + value;
              },0))
            }
          </td>
          {/* Tong % Lai/Lo tam tinh */}
          <td className="font-bold text-right" style={{
            color: `${props?.renderReport?.reduce((acc:any,curr:any)=>{
              const value = ((curr?.MarketPrice - curr?.AveragePrice) / curr?.AveragePrice *100)
              return acc + value
            },0) > 0 ? '#00b050':'#FF0000'}`
          }}>
            {
              (props?.renderReport?.reduce((acc:any,curr:any)=> {
                const value = curr?.MarketPrice * curr?.TotalAmount - curr?.RootValue
                return acc + value;
              },0) / props.renderReport?.reduce((acc:any,curr:any)=> acc + curr?.RootValue, 0) * 100).toFixed(2)
            }%
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default React.memo(TableTransReportFull);
