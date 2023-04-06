import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
import "./table.scss";
import { formatNumber } from "../../utils/util";

const TableGDTTMarketWatch = () => {
  const params = useParams<{ id: string }>();
  const paramstock = stocks.find((paramstock) => paramstock.id === params.id);
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState<any[]>([])
  useEffect(()=>{
    if(paramstock){
     if(paramstock.id){
       fetchTable(paramstock.id)
     }
     else{
       fetchTable("HNX")
     }
    }
   },[paramstock?.id])
  const fetchTable = async(param:string) => {
    // let valueParam ="thoathuanhnx";
    // let valueParamPrice ="s=bi";
    //  switch(param) {
    //   case "thoathuanhnx":
    //     valueParam= "s=pt";
    //     valueParamPrice=""
    //     break;
    //     // case "HNX30":
    //     //   valueParam = "s=quote&l=HNX30";
    //     //   break;
    //     //   case "BOND":
    //     //     valueParam = "s=quote&l=BOND";
    //     //     break;
    //     default:
    //       break;
    //  }
     //console.log(valueParam)
      const res = await fetch(`http://marketstream.fpts.com.vn/hnx/data.ashx?s=pt`);
      const resPrice = await fetch(`http://marketstream.fpts.com.vn/hnx/data.ashx?s=bi`);
      const data = await res.json();
    const dataPrice = await resPrice.json();
      setProducts(data.sort())
    setPrices(dataPrice.sort())
    }
  return (
    <div id="dvFixedH">
      <div className="dvContentLP border-t border-borderHeadTableMarket">
        <div className="grid grid-cols-4 p-3">
          <div className="text-center">
          <input placeholder="Nhập mã cần tìm" className="col-span-1 w-44 h-24 pl-1"></input>

          </div>
        
  
          {/* {prices?.map((price:any)=>(
              <div key={} className="col-span-2 flex justify-around font-bold">
           <span>
           Tổng KL GDTT :  
           <label> {formatNumber(price[3].f240) }</label>    
         </span>
         <span>
            Tổng KL GDTT : <label> { formatNumber(price[3].f241)}</label>
          </span>
         </div>
          ))} */}
         <div  className="col-span-2 flex justify-around font-bold pt-1">
           <span>
           Tổng KL GDTT :  
           <label> {formatNumber(prices[4]?.f240) }</label>    
         </span>
         <span>
            Tổng KL GDTT : <label> { formatNumber(prices[4]?.f241)}</label>
          </span>
         </div>
     
        
          <div className="col-span-1">

          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-1 pr-2">
            <table
              id="tbBuyPT_HA"
              className="table table-PT table-bordered table-priceboard w-full"
            >
              <thead style={{}}>
                <tr>
                  <th className="hbrc text-textHeaderTableGDTT text-13px" colSpan={4}>
                    Chào mua
                  </th>
                </tr>
                <tr>
                  <th className="hbrb">Mã</th>
                  <th className="hb_b">Giá</th>
                  <th className="hbrb">KL</th>
                  <th className="hbrb">Mã CTCK</th>
                </tr>
              </thead>
              <tbody id="tbdPT_HA" />
            </table>
          </div>
          <div className="col-span-2 px-2">
            <table
              id="tbBuyPT_HA"
              className="table table-PT table-bordered table-priceboard w-full"
            >
              <thead style={{}}>
                <tr>
                  <th className="hbrc text-textHeaderTableGDTT text-13px" colSpan={5}>
                    Thực hiện
                  </th>
                </tr>
                <tr>
                  <th className="hbrb">Mã</th>
                  <th className="hb_b">Giá</th>
                  <th className="hbrb">KL</th>
                  <th className="hbrb">Tổng KL</th>
                  <th className="hbrb">Tổng GT</th>
                </tr>
              </thead>
              <tbody id="tbdPT_HA" >
                {products?.map((product:any)=>(
                  <tr key={product.RowID}>
                    <td>{product.Info[0][1]}</td>  
                    <td className="text-right">{formatNumber(product.Info[7][1])}</td>
                    <td className="text-right">{formatNumber(product.Info[6][1])}</td>
                    <td className="text-right">{formatNumber(product.Info[8][1])}</td>
                    <td className="text-right">{formatNumber(product.Info[9][1])}</td>
                  </tr>
                ))}
                </tbody>
            </table>
          </div>
          <div className="col-span-1 pl-2">
            <table
              id="tbBuyPT_HA"
              className="table table-PT table-bordered table-priceboard w-full"
            >
              <thead style={{}}>
                <tr>
                  <th className="hbrc text-textHeaderTableGDTT text-13px" colSpan={4}>
                    Chào bán
                  </th>
                </tr>
                <tr>
                  <th className="hbrb">Mã</th>
                  <th className="hb_b">Giá</th>
                  <th className="hbrb">KL</th>
                  <th className="hbrb">Mã CTCK</th>
                </tr>
              </thead>
              <tbody id="tbdPT_HA" />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableGDTTMarketWatch;
