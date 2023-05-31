import React, { useEffect, useState } from "react";
import excell from "../../images/excel.png";
import pfd from "../../images/pdf.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import axios from "axios";
import _ from "lodash";
import { uniqWith, isEqual } from "lodash";
import { formatNumber } from "../../utils/util";
const Tbody = (props:any) => {
  const [drop, setDrop] = React.useState(false);
  console.log(props.data.filter((e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE).slice(1));
    useEffect(() => {
    if (props.drop) {
      setDrop(true);
    } else {
      setDrop(false);
    }
  }, [props.drop]);
  return (
    <>
      <tr onClick={() => setDrop(!drop)}>
        <td className="border  font-bold text-[#2371AF] relative border-gray-300 text-start pl-1  pr-2">{props.item.ASTOCKCODE}
          
          {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE).length === 1 ? <></> : <>
            {
              drop ? <i
  className="absolute text-down-text fa fa-caret-down text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"
 
          ></i> : <i className="absolute text-down-text fa fa-caret-up text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"></i>
          }
          </>}
        </td>

        <td className="border   font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(
          props.data
        .filter(( e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any)=>a+b.AQUANTITY,0)
        )}</td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(
          props.data.filter((e:any)=> e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any) => a+b.APRICE,0)
        )}</td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{
          formatNumber(
          props.data.filter((e:any)=> e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any) => a+b.ATOTALVALUE,0)
        )
        }</td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{
           formatNumber(
          props.data.filter((e:any)=> e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any) => a+b.ATOTALVALUE,0)
        )
        }</td>
        <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{props.item.AMATCH_TIME}</td>
      </tr>
    
      {
        props.data
        .filter(( e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE).length >=2 ? props.data
        .filter(( e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
        .map((x : any,index:any) => (
          <tr key={index} style={{ display: `${drop ? "" : "none"}` }}>
            <td className="  font-bold text-[#2371AF] border-gray-300 text-start pl-1  pr-2"></td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.AQUANTITY)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.APRICE)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{x.AMATCH_TIME}</td>
          </tr>
        )) : props.data
            .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
            .slice(1)
        .map((x : any,index:any) => (
          <tr key={index} style={{ display: `${drop ? "" : "none"}` }}>
            <td className="  font-bold text-[#2371AF] border-gray-300 text-start pl-1  pr-2"></td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.AQUANTITY)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.APRICE)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#2371AF] border-gray-300 text-end  pr-2">{x.AMATCH_TIME}</td>
          </tr>
        ))
      }
    </>
  );
};
const TbodySell = (props:any) => {
  const [dropSell, setDropSell] = React.useState(false);
  console.log(props.data.filter((e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE).slice(1));
    useEffect(() => {
    if (props.dropSell) {
      setDropSell(true);
    } else {
      setDropSell(false);
    }
  }, [props.dropSell]);
  return (
    <>
      <tr onClick={() => setDropSell(!dropSell)}>
        <td className="border relative  font-bold text-[#9C0A0A] border-gray-300 text-start pl-1  pr-2">{formatNumber(props.item.ASTOCKCODE)}
        {props.data.filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE).length === 1 ? <></> : <>
            {
              dropSell ? <i
  className="absolute text-down-text fa fa-caret-down text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"
 
          ></i> : <i className="absolute text-down-text fa fa-caret-up text-iconShowOrder text-sm right-[7px] bottom-[0px] cursor-pointer"></i>
          }
          </>}
        </td>
         
        <td className="border   font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {formatNumber(
          props.data
        .filter(( e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any)=>a+b.AQUANTITY,0)
          )}
          
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {formatNumber(
          props.data.filter((e:any)=> e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any) => a+b.APRICE,0)
        )}
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{
          formatNumber(
          props.data.filter((e:any)=> e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any) => a+b.ATOTALVALUE,0)
        )
        }</td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">
          {
          formatNumber(
          props.data.filter((e:any)=> e.ASTOCKCODE === props.item.ASTOCKCODE).reduce((a:any,b:any) => a+b.ATOTALVALUE,0)
        )
        }
        </td>
        <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{ props.item.AMATCH_TIME}</td>
      </tr>
      {
        props.data
        .filter(( e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE).length >=2 ? props.data
        .filter(( e : any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
        .map((x : any,index:any) => (
          <tr key={index} style={{ display: `${dropSell ? "" : "none"}` }}>
            <td className="  font-bold text-[#9C0A0A] border-gray-300 text-start pl-1  pr-2"></td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.AQUANTITY)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.APRICE)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{x.AMATCH_TIME}</td>
          </tr>
        )) : props.data
            .filter((e: any) => e.ASTOCKCODE === props.item.ASTOCKCODE)
            .slice(1)
        .map((x : any,index:any) => (
          <tr key={index} style={{ display: `${dropSell ? "" : "none"}` }}>
            <td className="  font-bold text-[#9C0A0A] border-gray-300 text-start pl-1  pr-2"></td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.AQUANTITY)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.APRICE)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{formatNumber(x.ATOTALVALUE)}</td>
            <td className="border  font-bold text-[#9C0A0A] border-gray-300 text-end  pr-2">{x.AMATCH_TIME}</td>
          </tr>
        ))
      }
    </>
  );
};
const TradingResult = () => {
  const [dataArr, setDataArr] = useState([])
  const [drop, setDrop] = useState(false);
  const [dropSell, setDropSell] = useState(false);
  const [dataTotal, setDataTotal] = useState([])
  const[dataTotalSell, setDataTotalSell] = useState([])
  const [dataArrSell,setDataArrSell] = useState([])
  const [data, setData] = useState<any>([]);
  const [dataSell, setDataSell] = useState<any>([]);
  const handleExportToExcel = (e: any) => {
    e.preventDefault();

    const table = document.getElementById("table-id");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.xlsx";
    link.dispatchEvent(new MouseEvent("click"));
    URL.revokeObjectURL(url);
  };

  const handleExportToPDF = () => {
    const table = document.getElementById("table-id");
    const doc: any = new jsPDF("p", "pt");
    doc.addFont("Helvetica", "Helvetica", "normal");
    doc.setFont("Helvetica");
    if (table) {
      doc.autoTable({
        html: table,
        startX: 20,
        styles: {
          size: 10,
          fontSize: 4,
          cellPadding: 6,
          fillColor: "gray",
          font: "Helvetica",
          lowercase: true,
        },
        tableWidth: "auto",
        margin: { top: 20 },
      });
    }
    doc.save("filename.pdf");
  };

  const fetchBuyData = async () => {
    const { data } = await axios.get("http://localhost:3005/Data");
    const buyData = data.Table.filter((items: any) => items.ABUYSELL === "B");
    const uniqueData = _.uniqBy(buyData, "ASTOCKCODE");
    setDataTotal(buyData)
    setData(uniqueData);
    setDataArr(buyData)
    console.log("buyData", buyData);
  };
  useEffect(() => {
    fetchBuyData();
  }, []);

   const fetchBuyDataSell = async () => {
    const { data } = await axios.get("http://localhost:3005/Data");
    const sellData = data.Table.filter((items: any) => items.ABUYSELL === "S");
     const uniqueDataSell = _.uniqBy(sellData, "ASTOCKCODE"); 
     setDataSell(uniqueDataSell);
     setDataTotalSell(sellData)
     setDataArrSell(sellData)
    console.log("buyData", sellData);
  };
  useEffect(() => {
    fetchBuyDataSell();
  }, []);

  const calculateTotalQuantity = () => {
    if (dataTotal && dataTotal.length > 0) {
      const totalQuantity = dataTotal.reduce((accumulator: any, item: any) => {
        return accumulator + item.AQUANTITY;
      }, 0);
      return formatNumber(totalQuantity) ;
    }
    return 0;
  };

  const calculateaTOTALVALUE = () => {
    if (dataTotal && dataTotal.length > 0) {
      const ATOTALVALUE = dataTotal.reduce((accumulator: any, item: any) => {
        return accumulator + item.ATOTALVALUE;
      }, 0);
      return formatNumber(ATOTALVALUE) ;
    }
    return 0;
  };

     const calculateTotalQuantitySell = () => {
    if (dataTotalSell && dataTotalSell.length > 0) {
      const totalQuantity = dataTotalSell.reduce((accumulator: any, item: any) => {
        return accumulator + item.AQUANTITY;
      }, 0);
      return formatNumber(totalQuantity) ;
    }
    return 0;
  };

  const calculateaTOTALVALUESell = () => {
    if (dataTotalSell && dataTotalSell.length > 0) {
      const ATOTALVALUE = dataTotalSell.reduce((accumulator: any, item: any) => {
        return accumulator + item.ATOTALVALUE;
      }, 0);
      return formatNumber(ATOTALVALUE) ;
    }
    return 0;
  };
  const handelSetDrop = () => {
    setDrop(!drop);
    setDropSell(!dropSell);
  };

  return (
    <div className="min-h-[500px]">
      <div className="flex items-center justify-between">
        <div>
          <p  onClick={handelSetDrop}  className="text-[15px] text-[#2371AF] cursor-pointer underline	pl-5">
            Xem đầy đủ
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button className="p-1 cursor-pointer  pl-5 pr-5 rounded-md text-white text-[13px] font-medium uppercase bg-[#0055ba]">
            Cập nhật
          </button>
          <form className="flex gap-2 mr-8">
            <img
              className="cursor-pointer "
              onClick={handleExportToExcel}
              src={excell}
              alt="excel"
            />
            <img
              className="cursor-pointer "
              onClick={handleExportToPDF}
              src={pfd}
              alt="pfd"
            />
          </form>
        </div>
      </div>

      <div className="flex gap-3 mx-auto mt-2 ml-5 mr-5 ">
        {/* buy */}
        <div className="w-1/2 border-gray-300 h-fit">
          <div className="flex relative   border-gray-300 gap-1 h-[30px] items-center bg-[#2371AF] ">
            <p className="mx-auto !text-sm font-bold text-center text-white">MUA</p>
            <i className="fa absolute fa-info-circle left-[52.5%] top-2  text-white"></i>
          </div>

          <table>
            <thead>
              <tr className="bg-[#F3F3F3]">
                <th className="border border-gray-300">Mã CK </th>
                <th className="border border-gray-300 w-[92px]">Khối lượng</th>
                <th className="border border-gray-300">Giá</th>
                <th className="w-1/6 border border-gray-300">Thành tiền</th>
                <th className="border border-gray-300">SHL</th>
                <th className="border border-gray-300">Giờ khớp</th>
              </tr>
            </thead>
            <tbody >
              {data.map((item: any) => (
  
            <Tbody drop={drop}  data={dataArr} key={item.id} item={item} />
              ))}
         <tr className="bg-[#F3F3F3]">
                <td className="pl-1 font-bold border border-gray-300 ">Tổng</td>
                <td className="font-bold border border-gray-300 text-end">
                  {calculateTotalQuantity()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="font-bold border border-gray-300 text-end">
                  {" "}
                  {calculateaTOTALVALUE()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
              </tr>
        </tbody>
          </table>
        </div>
        {/* sell */}
        <div className="w-1/2 border-gray-300 max-h-fit">
          <div className="flex relative gap-1 mx-auto  h-[30px] items-center bg-[#9C0A0A] ">
            <p className="mx-auto font-bold text-white ">BÁN </p>
            <i className="fa absolute fa-info-circle left-[52.5%] top-2  text-white"></i>
          </div>

          <table className="">
            <thead>
              <tr className="bg-[#F3F3F3]">
                <th className="border border-gray-300">Mã CK </th>
                <th className="border border-gray-300 w-[92px]">Khối lượng</th>
                <th className="border border-gray-300">Giá</th>
                <th className="w-1/6 border border-gray-300">Thành tiền</th>
                <th className="border border-gray-300">SHL</th>
                <th className="border border-gray-300">Giờ khớp</th>
              </tr>
            </thead>
            <tbody>
              {dataSell.map((item: any) => (
            <TbodySell dropSell={dropSell} data={dataArrSell} key={item.id} item={item} />
              ))}
               <tr className="bg-[#F3F3F3]">
                <td className="pl-1 font-bold border border-gray-300 ">Tổng</td>
                <td className="font-bold border border-gray-300 text-end">
                  {calculateTotalQuantitySell()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="font-bold border border-gray-300 text-end">
                  {" "}
                  {calculateaTOTALVALUESell()}
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradingResult;
