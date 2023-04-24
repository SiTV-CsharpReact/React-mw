import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../layout/LoaddingComponent";
import {
  checkSTTMarket,
  formatNumber,
  formatNumberMarket,
  setColorMarket,
  tinhGiaTC,
} from "../../utils/util";
import HeaderMarketW from "../headerMarketwatch/HeaderMarket";
import "../../styles/MW.css";
import MenuMarketWatch from "../indexMarketWatch/MenuMarketWatch";
import MenuBarMW from "../menuBarMW/MenuBarMW";
import OrderMarketW from "../orderFormMarketwatch/OrderFormMarketWatch";
import { ObjectMenuHSX } from "../../models/modelListMenuHSX";
import FooterMarket from "../footerMarketwatch/FooterMarket";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
const HSXMarketWatch = () => {
  const [statusMarket, setStatusMarket] = useState<ObjectMenuHSX | null>(null);
  //const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);

  const params = useParams<{ id: string }>();
  const paramstock = stocks.find((paramstock) => paramstock.id === params.id); // const { productsLoaded,productParams} = useAppSelector(state => state.table); //const  products = useAppSelector(state => state.table.table);
  //     const param = window.location.search;
  //     const urlParams = new URLSearchParams(param);
  // console.log(urlParams)
  //const productssss = useAppSelector(productSelectors.selectAll);
  //const  statusMarket = useAppSelector(state => state.table.table);
  useEffect(() => {
    async function fetchData() {
      try {
        const responsesttHNX = await axios.get(
          `http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`
        );
        setStatusMarket(responsesttHNX.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [paramstock?.id]);
  useEffect(() => {
    if (paramstock) {
      if (paramstock.id) {
        fetchTable(paramstock.id);
      } else {
        fetchTable("HNX");
      }
    }
  }, [paramstock?.id]);
  //console.log(products)
  // useEffect(()=>{
  //     dispatch(fetchTableHNXAsync())
  //     //dispatch(fetchStatusAsync())
  // },[dispatch])

  const fetchTable = async (param: string) => {
    let valueParam = "VNI";
    switch (param) {
      case "VNI":
        valueParam = "s=quote&l=All";
        break;
      case "VN30":
        valueParam = "s=quote&l=VN30";
        break;
      case "VNXALL":
        valueParam = "s=quote&l=VNXALL";
        break;
      case "VN100":
        valueParam = "s=quote&l=VN100";
        break;
      case "VNALL":
        valueParam = "s=quote&l=VNALL";
        break;
        case "VNMID":
          valueParam = "s=quote&l=VNMID";
          break;
        case "VNSML":
          valueParam = "s=quote&l=VNSML";
          break;
          case "CW":
            valueParam = "s=quote&l=CACB2208,CACB2301,CFPT2210,CFPT2212,CFPT2213,CFPT2214,CFPT2301,CFPT2302,CFPT2303,CHPG2225,CHPG2226,CHPG2227,CHPG2301,CHPG2302,CHPG2303,CHPG2304,CHPG2305,CHPG2306,CMBB2211,CMBB2213,CMBB2214,CMBB2215,CMBB2301,CMBB2302,CMBB2303,CMSN2214,CMSN2215,CMWG2213,CMWG2214,CMWG2215,CMWG2301,CMWG2302,CPOW2210,CSTB2224,CSTB2225,CSTB2301,CSTB2302,CSTB2303,CTCB2212,CTCB2214,CTCB2215,CTCB2216,CTCB2301,CTPB2301,CVHM2216,CVHM2218,CVHM2219,CVHM2220,CVIB2201,CVIB2301,CVNM2211,CVNM2212,CVPB2212,CVPB2214,CVPB2301,CVPB2302,CVRE2216,CVRE2219,CVRE2220,CVRE2221,CVRE2301";
            break;
      default:
        break;
    }
    const res = await fetch(
      `http://marketstream.fpts.com.vn/hsx/data.ashx?${valueParam}`
    );
    const data = await res.json();
    setProducts(data);
  };
  const showKLPT =(value:string) =>{
    console.log(value)
    if(value === "showPT"){
      const element =   document.getElementsByClassName("price-ot");
      const elementFirst = document.getElementsByClassName("price-ot")[0];
      const element2 =   document.getElementsByClassName("price-change")
      const element3 =   document.getElementById("showKhopLenhPT")
      if(elementFirst.classList.contains("d-block-kl")){
        for (let j = 0; j < element.length; j++) {
          const elementOT = element.item(j);
          elementOT?.classList.remove("d-block-kl");
          elementOT?.classList.add("d-none-kl");
        
           // In ra danh sách các lớp của phần tử
        }
        for (let i = 0; i < element2.length; i++) {
          const elementChange = element2.item(i);
          elementChange?.classList.remove("d-none-kl")
          elementChange?.classList.add("d-block-kl")
           // In ra danh sách các lớp của phần tử
        }
        if(element3) element3.innerHTML = "+/-";
      }
      else{
        for (let j = 0; j < element.length; j++) {
          const elementOT = element.item(j);
          elementOT?.classList.remove("d-none-kl")
          elementOT?.classList.add("d-block-kl")
           // In ra danh sách các lớp của phần tử
        }
        for (let i = 0; i < element2.length; i++) {
          const elementChange = element2.item(i);
          elementChange?.classList.remove("d-block-kl")
          elementChange?.classList.add("d-none-kl")
           // In ra danh sách các lớp của phần tử
        }
        if(element3) element3.innerHTML = "%";
      }
      // if(element) {
      //   element.classList.remove("d-block-kl") 
      //   element.classList.add("d-none-kl")
      // } 
  
    
     
    }
  }
  const [data,setdate] = useState<DataTable[]>();
  type DataTable = {
    RowID: string,
    info:[]
  }
  const [order,setorder]= useState("ASC");
  const sorting = (col: keyof DataTable) => {
    console.log("aa",sorting)
    if (Array.isArray(data)) {
      if (order === "ASC") {
        const sorted = [...data].sort((a, b) => a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1);
        setdate(sorted);
        console.log("sorting",sorted);
        setorder("DSC");
      } else {
        const sorted = [...data].sort((a, b) => a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? -1 : 1);
        setdate(sorted);
        setorder("ASC");
      }
    }
  };
  return (
    <>
      {/* <HeaderMarketW /> */}
      <table className="w-full tableMW table-priceboard">
      <thead>
          <tr>
            <th
              className="border border-borderHeadTableMarket  cursor-pointer"
              rowSpan={2}
              onClick={() => sorting("RowID")}
            >
              Mã
            </th>
            <th
              className="border border-borderHeadTableMarket  "
              rowSpan={2}
            >
              TC
            </th>
            <th
              className="border border-borderHeadTableMarket  "
              rowSpan={2}
            >
              Trần
            </th>
            <th
              className="border border-borderHeadTableMarket  "
              rowSpan={2}
            >
              Sàn
            </th>
            <th
              className="border border-borderHeadTableMarket "
              colSpan={6}
            >
              Mua
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              colSpan={3}
            >
              Khớp lệnh
            </th>
            <th
              className="border border-borderHeadTableMarket "
              colSpan={6}
            >
              Bán
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Tổng KL
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Mở cửa
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Cao nhất
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Thấp nhất
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN mua
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN bán
            </th>
            <th
              className="border border-borderHeadTableMarket  bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Room còn lại
            </th>
          </tr>
          <tr>
            <th className="border border-borderHeadTableMarket ">
              G3
            </th>
            <th className="border border-borderHeadTableMarket ">
              KL3
            </th>
            <th className="border border-borderHeadTableMarket ">
              G2
            </th>
            <th className="border border-borderHeadTableMarket ">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket ">
              G1
            </th>
            <th className="border border-borderHeadTableMarket ">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket  bg-BGTableHoverMarket">
              Giá
            </th>
            <th className="border border-borderHeadTableMarket  bg-BGTableHoverMarket">
              KL
            </th>
            <th className="border border-borderHeadTableMarket text-textHeadTableMarket bg-BGTableHoverMarket relative w-12 min-w-[50px]">
              <div className='flex justify-between'>
                <button className='inset-y-0 absolute left-0 w-4 bg-BGTableHoverMarket hover:bg-hoverKL' onClick={() => showKLPT("showPT")}> 
                <div className="arrow arrow-left"></div>
                </button>
             <div className='child-center' id="showKhopLenhPT">
            %
             </div>
            
              <button className='inset-y-0 absolute right-0 w-4 bg-BGTableHoverMarket hover:bg-hoverKL' onClick={() => showKLPT("showPT")}>
                <div className="arrow arrow-right"></div>
                </button>
              </div>
           
            </th>
            <th className="border border-borderHeadTableMarket ">
              G1
            </th>
            <th className="border border-borderHeadTableMarket ">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket ">
              G2
            </th>
            <th className="border border-borderHeadTableMarket ">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket ">
              G3
            </th>
            <th className="border border-borderHeadTableMarket ">
              KL3
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((dataTable: any) => (
            <tr key={dataTable.RowID}  data-tr-value={dataTable.Info[0][1]}>
              <td
              
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[11][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                  <input
                            type="checkbox"
                            id={`cb${dataTable.RowID}`}
                            // onClick={() => handleTypeOptionClick(dataTable.RowID)}
                            className="cbTop priceboard"
                          ></input>
                          <span className="pl-0.5"> {dataTable.Info[0][1]}</span>
                {/* {" "}
                {dataTable.Info[0][1]} */}
              </td>
              <td className=" bg-BGTableHoverMarket text-textTableMarketTC">
                {formatNumber(dataTable.Info[1][1])}
              </td>
              {/* Trần */}
              <td className=" bg-BGTableHoverMarket text-textTableMarketTran">
                {formatNumber(dataTable.Info[2][1])}
              </td>
              {/* Sàn */}
              <td className=" bg-BGTableHoverMarket text-textTableMarketSan">
                {formatNumber(dataTable.Info[3][1])}
              </td>
              {/* G3 Mua*/}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[5][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[5][1])}
              </td>
              {/* KL3 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[5][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[6][1])}
              </td>
              {/* G2 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[7][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[7][1])}
              </td>
              {/* KL2 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[7][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[8][1])}
              </td>
              {/* G1 */}
              {/* <td className={` ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[9][1])}</td> */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[9][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {" "}
                {checkSTTMarket(
                  formatNumberMarket(dataTable.Info[9][1]),
                  statusMarket?.STAT_ControlCode,
                  dataTable.Info[10][1]
                )}
              </td>
              {/* KL1 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[9][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[10][1])}
              </td>
              {/* Gia Khơp lenh */}
              <td
                className={` bg-BGTableHoverMarket  ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[11][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[11][1])}
              </td>
              {/* KL */}
              <td
                className={` bg-BGTableHoverMarket  ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[11][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[12][1])}
              </td>
              {/* +-*/}
              <td
                className={` bg-BGTableHoverMarket  ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[11][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {tinhGiaTC(dataTable.Info[1][1], dataTable.Info[11][1])}
              </td>
              {/* G1 Ban*/}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[14][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[14][1])}
              </td>
              {/* KL1 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[14][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[15][1])}
              </td>
              {/* G2 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[16][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[16][1])}
              </td>
              {/* KL2 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[16][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[17][1])}
              </td>
              {/* G3 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[18][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[18][1])}
              </td>
              {/* KL3 */}
              <td
                className={` ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[18][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[19][1])}
              </td>
              {/* TKL */}
              <td className=" bg-BGTableHoverMarket ">
                {formatNumberMarket(dataTable.Info[21][1])}
              </td>
              <td
                className={` bg-BGTableHoverMarket ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[22][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[22][1])}
              </td>
              <td
                className={` bg-BGTableHoverMarket ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[23][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[23][1])}
              </td>
              <td
                className={` bg-BGTableHoverMarket  ${setColorMarket(
                  dataTable.Info[1][1],
                  dataTable.Info[24][1],
                  dataTable.Info[2][1],
                  dataTable.Info[3][1]
                )}`}
              >
                {formatNumberMarket(dataTable.Info[24][1])}
              </td>
              <td className=" bg-BGTableHoverMarket">
                {formatNumberMarket(dataTable.Info[26][1])}
              </td>
              <td className=" bg-BGTableHoverMarket">
                {formatNumberMarket(dataTable.Info[27][1])}
              </td>
              <td className=" bg-BGTableHoverMarket">
                {formatNumberMarket(dataTable.Info[28][1])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FooterMarket />
    </>
  );
};

export default HSXMarketWatch;
