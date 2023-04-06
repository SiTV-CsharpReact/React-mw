import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import {  fetchTableHNXAsync } from './tableSlice';
import { checkSTTMarket, formatNumber, formatNumberMarket, setColorMarket, tinhGiaCT, tinhGiaTC } from '../../utils/util';
import "../../styles/MW.css";
import axios from 'axios';
import { ObjectMenuHSX } from '../../models/modelListMenuHSX';
import { useParams } from 'react-router-dom';
import { stocks } from '../../models/marketwacthTable';
import HeaderMarketW from '../headerMarketwat/HeaderMarket';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DataTable } from '../../models/modelTableHNX';
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
const TableMarketWatch = () => {
  const [statusMarket, setStatusMarket] = useState<ObjectMenuHSX | null>(null);
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<any[]>([]);

    const params = useParams<{ id: string }>()
    const paramstock  = stocks.find(
      paramstock => paramstock.id === params.id
    )
//     const param = window.location.search;
//     const urlParams = new URLSearchParams(param);
// console.log(urlParams)
  //const productssss = useAppSelector(productSelectors.selectAll);
 // const { productsLoaded,productParams} = useAppSelector(state => state.table);
  //const  products = useAppSelector(state => state.table.table);
//const  statusMarket = useAppSelector(state => state.table.table);
useEffect(() => {
  async function fetchData() {
      try { 
          const responsesttHNX = await axios.get(`http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`);
          setStatusMarket(responsesttHNX.data);
        } catch (error) {
          console.log(error);
        } 
    }
    fetchData();
 
}, [paramstock?.id]);
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
 //console.log(products)
// useEffect(()=>{
//     dispatch(fetchTableHNXAsync())
//     //dispatch(fetchStatusAsync())
// },[dispatch])

const fetchTable = async(param:string) => {
  let valueParam ="HNX";
   switch(param) {
    case "HNX":
      valueParam= "s=quote&l=HNXIndex";
      break;
      case "HNX30":
        valueParam = "s=quote&l=HNX30";
        break;
        case "BOND":
          valueParam = "s=quote&l=BOND";
          break;
      default:
        break;
   }
   //console.log(valueParam)
    const res = await fetch(`http://marketstream.fpts.com.vn/hnx/data.ashx?${valueParam}`);
    const data = await res.json();
    setProducts(data)
  }
  const [users, setUsers] = useState([]);

  const handleDragEnd = (e:any) => {
    if (!e.destination) return;
    let tempData = Array.from(users);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setUsers(tempData);
  };

// const rows = products?.map((dataTable: any) => (
//   <Draggable
//   key={dataTable.RowID}
//   draggableId={dataTable.RowID}
//   index={dataTable}
// >
//   {(provider) => (
//   <tr key={dataTable.RowID} id={`tr${dataTable.RowID}`}{...provider.draggableProps} ref={provider.innerRef}>
//     <td 
//       className={`${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[18][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//       id={`${dataTable.RowID}`}
//     >
//   <input type="checkbox" id={`cb${dataTable.RowID}`}  className="cbTop priceboard"></input>
//      <span className="pl-0.5"> {dataTable.RowID}</span>
//     </td>
  
//     {/* TTham chiếu */}
//     <td
//       data-sort={dataTable.Info[13][1]}
//       id={`${dataTable.RowID}_TC`}
//       className=" text-right bg-BGTableHoverMarket text-textTableMarketTC"
//     >
//       {formatNumber(dataTable.Info[13][1])}
//     </td>
//     {/* Trần */}
//     <td
//       data-sort={dataTable.Info[15][1]}
//       id={`${dataTable.RowID}_Tran`}
//       className=" text-right bg-BGTableHoverMarket text-textTableMarketTran"
//     >
//       {formatNumber(dataTable.Info[15][1])}
//     </td>
//     {/* Sàn */}
//     <td
//       data-sort={dataTable.Info[14][1]}
//       id={`${dataTable.RowID}_San`}
//       className=" text-right bg-BGTableHoverMarket text-textTableMarketSan"
//     >
//       {formatNumber(dataTable.Info[14][1])}
//     </td>
//     {/* G3 Mua*/}
//     <td
//       data-sort={dataTable.Info[8][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[8][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[8][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[8][1])}
//     </td>
//     {/* KL3 */}
//     <td
//       data-sort={dataTable.Info[9][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[9][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[8][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[9][1])}
//     </td>
//     {/* G2 */}
//     <td
//       data-sort={dataTable.Info[4][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[4][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[4][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[4][1])}
//     </td>
//     {/* KL2 */}
//     <td
//       data-sort={dataTable.Info[5][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[5][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[4][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[5][1])}
//     </td>
//     {/* G1 */}
//     <td
//       data-sort={dataTable.Info[0][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[0][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[0][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//              {checkSTTMarket(formatNumberMarket(dataTable.Info[0][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[1][1]))}
//       {/* {formatNumberMarket(dataTable.Info[0][1])} */}
//     </td>
//     {/* KL1 */}
//     <td
//       data-sort={dataTable.Info[1][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[1][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[0][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[1][1])}
//     </td>
//     {/* Gia Khơp lenh */}
//     <td
//       data-sort={dataTable.Info[18][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[18][0]}`}
//       className={` text-right bg-BGTableHoverMarket ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[18][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[18][1])}
//     </td>
//     {/* KL */}
//     <td
//       data-sort={dataTable.Info[19][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[19][0]}`}
//       className={` text-right bg-BGTableHoverMarket ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[18][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[19][1])}
//     </td>
//     {/* +-*/}
//     <td
//       data-sort={tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}     
//       className={` text-right bg-BGTableHoverMarket ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[18][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       <span>
//         <div className="price-ot d-block-kl"  id={`${dataTable.RowID}_PT`}>
//         {tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}
//         </div>
//         <div className="price-change d-none-kl" id={`${dataTable.RowID}_CT`}>
//         {tinhGiaCT(dataTable.Info[13][1], dataTable.Info[18][1])}
//         </div>
//       </span>
    
//     </td>
//     {/* G1 Ban*/}
//     <td
//       data-sort={dataTable.Info[2][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[2][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[2][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {checkSTTMarket(formatNumberMarket(dataTable.Info[2][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[3][1]))}
//     </td>
//     {/* KL1 */}
//     <td
//       data-sort={dataTable.Info[3][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[3][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[2][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[3][1])}
//     </td>
//     {/* G2 */}
//     <td
//       data-sort={dataTable.Info[6][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[6][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[6][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[6][1])}
//     </td>
//     {/* KL2 */}
//     <td
//       data-sort={dataTable.Info[7][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[7][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[6][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[7][1])}
//     </td>
//     {/* G3 */}
//     <td
//       data-sort={dataTable.Info[10][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[10][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[10][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[10][1])}
//     </td>
//     {/* KL3 */}
//     <td
//       data-sort={dataTable.Info[11][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[11][0]}`}
//       className={` text-right ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[10][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[11][1])}
//     </td>
//     {/* TKL */}
//     <td
//       data-sort={dataTable.Info[20][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[20][0]}`}
//       className=" text-right bg-BGTableHoverMarket "
//     >
//       {formatNumberMarket(dataTable.Info[20][1])}
//     </td>
//     <td
//       data-sort={dataTable.Info[21][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[21][0]}`}
//       className={` text-right bg-BGTableHoverMarket ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[21][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[21][1])}
//     </td>
//     <td
//       data-sort={dataTable.Info[22][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[22][0]}`}
//       className={` text-right bg-BGTableHoverMarket ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[22][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[22][1])}
//     </td>
//     <td
//       data-sort={dataTable.Info[23][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[23][0]}`}
//       className={` text-right bg-BGTableHoverMarket ${setColorMarket(
//         dataTable.Info[13][1],
//         dataTable.Info[23][1],
//         dataTable.Info[15][1],
//         dataTable.Info[14][1]
//       )}`}
//     >
//       {formatNumberMarket(dataTable.Info[23][1])}
//     </td>
//     <td
//       data-sort={dataTable.Info[25][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[25][0]}`}
//       className=" text-right bg-BGTableHoverMarket"
//     >
//       {formatNumberMarket(dataTable.Info[25][1])}
//     </td>
//     <td
//       data-sort={dataTable.Info[26][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[26][0]}`}
//       className=" text-right bg-BGTableHoverMarket"
//     >
//       {formatNumberMarket(dataTable.Info[26][1])}
//     </td>
//     <td
//       data-sort={dataTable.Info[27][1]}
//       id={`${dataTable.RowID}_${dataTable.Info[27][0]}`}
//       className=" text-right bg-BGTableHoverMarket"
//     >
//       {formatNumberMarket(dataTable.Info[27][1])}
//     </td>
//   </tr>
  
//       )}
// </Draggable>
// ))
;
  const [order,setorder]= useState("ASC");
  const sorting = (col: string) => {
    console.log("aa",sorting)
      if (order === "ASC") {
        const sorted = [...products].sort((a, b) => 
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
        setProducts(sorted);
        console.log("sorting",sorted);
        setorder("DSC");
      } else {
        const sorted = [...products].sort((a, b) =>
         a[col].toLowerCase() > b[col].toLowerCase() ? -1 : 1);
        setProducts(sorted);
        setorder("ASC");
      }
  };
 
  return (
    <>
    <DragDropContext onDragEnd={handleDragEnd}> 
    {/* <HeaderMarketW/> */}
    <div>
        <table className="w-full tableMW " >
        {/* <colgroup><col className="col-symbol" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-total-vol" /><col className="col-over-buy" /><col className="col-over-sell" /><col className="col-ave-price" /><col className="col-high-price" /><col className="col-low-price" /><col className="col-foreign-buy" /><col className="col-foreign-sell" /></colgroup>   */}
        <colgroup>
        <col className="col-symbol" />
        <col className="show-on-mobile col-price bg-BGTableHoverMarket" />
        <col className="show-on-mobile col-price bg-BGTableHoverMarket" />
        <col className="show-on-mobile col-price bg-BGTableHoverMarket" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol col-vol-sm" />
        <col className="col-diff" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-vol-total" />
        <col className="col-price-open" />
        <col className="col-price-high" />
        <col className="col-price-short" />
        <col className="col-vol-foreign-buy" />
        <col className="col-vol-foreign-sell" />
        <col className="col-vol-still" />
        </colgroup>
        <thead>
          <tr>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket cursor-pointer"
              rowSpan={2}
              onClick={() => sorting("RowID")}
            >
              Mã
            </th>
            <th
           
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket cursor-pointer"
              rowSpan={2}
              onClick={() => sorting("Info")}
            >
              TC
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket "
              rowSpan={2}
            >
              Trần
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket "
              rowSpan={2}
            >
              Sàn
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket"
              colSpan={6}
            >
              Mua
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              colSpan={3}
            >
              Khớp lệnh
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket"
              colSpan={6}
            >
              Bán
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Tổng KL
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Mở cửa
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Cao nhất
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Thấp nhất
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN mua
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN bán
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Room còn lại
            </th>
          </tr>
          <tr>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              G3
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              KL3
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              G2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              G1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket">
              Giá
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket bg-BGTableHoverMarket">
              KL
            </th>
            <th className="border border-borderHeadTableMarket text-textHeadTableMarket bg-BGTableHoverMarket relative">
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
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              G1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              G2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              G3
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket">
              KL3
            </th>
          </tr>
        </thead>
        </table>
    </div>
      <table className="w-full tableMW">
    <colgroup>
        <col className="col-symbol" />
        <col className="show-on-mobile col-price bg-BGTableHoverMarket" />
        <col className="show-on-mobile col-price bg-BGTableHoverMarket" />
        <col className="show-on-mobile col-price bg-BGTableHoverMarket" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol col-vol-sm" />
        <col className="col-diff" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-vol-total" />
        <col className="col-price-open" />
        <col className="col-price-high" />
        <col className="col-price-short" />
        <col className="col-vol-foreign-buy" />
        <col className="col-vol-foreign-sell" />
        <col className="col-vol-still" />
        </colgroup>
         <Droppable droppableId="droppable-1" >
            {(provider) => (    
        <tbody className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}>
           {products?.map((dataTable:any) =>(
  <Draggable
  key={dataTable.RowID}
  draggableId={dataTable.RowID}
  index={dataTable.Info}
  
>
  {(provider) => (
  <tr key={dataTable.RowID} id={`tr${dataTable.RowID}`} 
  {...provider.draggableProps}
  {...provider.dragHandleProps} ref={provider.innerRef}>
    <td 
      className={`${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[18][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
      id={`${dataTable.RowID}`}
    >
  <input type="checkbox" id={`cb${dataTable.RowID}`}  className="cbTop priceboard"></input>
     <span className="pl-0.5"> {dataTable.RowID}</span>
    </td>
  
    {/* TTham chiếu */}
    <td
      data-sort={dataTable.Info[13][1]}
      id={`${dataTable.RowID}_TC`}
      className=" text-right bg-BGTableHoverMarket text-textTableMarketTC"
    >
      {formatNumber(dataTable.Info[13][1])}
    </td>
    {/* Trần */}
    <td
      data-sort={dataTable.Info[15][1]}
      id={`${dataTable.RowID}_Tran`}
      className=" text-right bg-BGTableHoverMarket text-textTableMarketTran"
    >
      {formatNumber(dataTable.Info[15][1])}
    </td>
    {/* Sàn */}
    <td
      data-sort={dataTable.Info[14][1]}
      id={`${dataTable.RowID}_San`}
      className=" text-right bg-BGTableHoverMarket text-textTableMarketSan"
    >
      {formatNumber(dataTable.Info[14][1])}
    </td>
    {/* G3 Mua*/}
    <td
      data-sort={dataTable.Info[8][1]}
      id={`${dataTable.RowID}_${dataTable.Info[8][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[8][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[8][1])}
    </td>
    {/* KL3 */}
    <td
      data-sort={dataTable.Info[9][1]}
      id={`${dataTable.RowID}_${dataTable.Info[9][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[8][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[9][1])}
    </td>
    {/* G2 */}
    <td
      data-sort={dataTable.Info[4][1]}
      id={`${dataTable.RowID}_${dataTable.Info[4][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[4][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[4][1])}
    </td>
    {/* KL2 */}
    <td
      data-sort={dataTable.Info[5][1]}
      id={`${dataTable.RowID}_${dataTable.Info[5][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[4][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[5][1])}
    </td>
    {/* G1 */}
    <td
      data-sort={dataTable.Info[0][1]}
      id={`${dataTable.RowID}_${dataTable.Info[0][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[0][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
             {checkSTTMarket(formatNumberMarket(dataTable.Info[0][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[1][1]))}
      {/* {formatNumberMarket(dataTable.Info[0][1])} */}
    </td>
    {/* KL1 */}
    <td
      data-sort={dataTable.Info[1][1]}
      id={`${dataTable.RowID}_${dataTable.Info[1][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[0][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[1][1])}
    </td>
    {/* Gia Khơp lenh */}
    <td
      data-sort={dataTable.Info[18][1]}
      id={`${dataTable.RowID}_${dataTable.Info[18][0]}`}
      className={` text-right bg-BGTableHoverMarket ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[18][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[18][1])}
    </td>
    {/* KL */}
    <td
      data-sort={dataTable.Info[19][1]}
      id={`${dataTable.RowID}_${dataTable.Info[19][0]}`}
      className={` text-right bg-BGTableHoverMarket ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[18][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[19][1])}
    </td>
    {/* +-*/}
    <td
      data-sort={tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}     
      className={` text-right bg-BGTableHoverMarket ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[18][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      <span>
        <div className="price-ot d-block-kl"  id={`${dataTable.RowID}_PT`}>
        {tinhGiaTC(dataTable.Info[13][1], dataTable.Info[18][1])}
        </div>
        <div className="price-change d-none-kl" id={`${dataTable.RowID}_CT`}>
        {tinhGiaCT(dataTable.Info[13][1], dataTable.Info[18][1])}
        </div>
      </span>
    
    </td>
    {/* G1 Ban*/}
    <td
      data-sort={dataTable.Info[2][1]}
      id={`${dataTable.RowID}_${dataTable.Info[2][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[2][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {checkSTTMarket(formatNumberMarket(dataTable.Info[2][1]),statusMarket?.STAT_ControlCode,(dataTable.Info[3][1]))}
    </td>
    {/* KL1 */}
    <td
      data-sort={dataTable.Info[3][1]}
      id={`${dataTable.RowID}_${dataTable.Info[3][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[2][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[3][1])}
    </td>
    {/* G2 */}
    <td
      data-sort={dataTable.Info[6][1]}
      id={`${dataTable.RowID}_${dataTable.Info[6][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[6][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[6][1])}
    </td>
    {/* KL2 */}
    <td
      data-sort={dataTable.Info[7][1]}
      id={`${dataTable.RowID}_${dataTable.Info[7][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[6][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[7][1])}
    </td>
    {/* G3 */}
    <td
      data-sort={dataTable.Info[10][1]}
      id={`${dataTable.RowID}_${dataTable.Info[10][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[10][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[10][1])}
    </td>
    {/* KL3 */}
    <td
      data-sort={dataTable.Info[11][1]}
      id={`${dataTable.RowID}_${dataTable.Info[11][0]}`}
      className={` text-right ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[10][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[11][1])}
    </td>
    {/* TKL */}
    <td
      data-sort={dataTable.Info[20][1]}
      id={`${dataTable.RowID}_${dataTable.Info[20][0]}`}
      className=" text-right bg-BGTableHoverMarket "
    >
      {formatNumberMarket(dataTable.Info[20][1])}
    </td>
    <td
      data-sort={dataTable.Info[21][1]}
      id={`${dataTable.RowID}_${dataTable.Info[21][0]}`}
      className={` text-right bg-BGTableHoverMarket ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[21][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[21][1])}
    </td>
    <td
      data-sort={dataTable.Info[22][1]}
      id={`${dataTable.RowID}_${dataTable.Info[22][0]}`}
      className={` text-right bg-BGTableHoverMarket ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[22][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[22][1])}
    </td>
    <td
      data-sort={dataTable.Info[23][1]}
      id={`${dataTable.RowID}_${dataTable.Info[23][0]}`}
      className={` text-right bg-BGTableHoverMarket ${setColorMarket(
        dataTable.Info[13][1],
        dataTable.Info[23][1],
        dataTable.Info[15][1],
        dataTable.Info[14][1]
      )}`}
    >
      {formatNumberMarket(dataTable.Info[23][1])}
    </td>
    <td
      data-sort={dataTable.Info[25][1]}
      id={`${dataTable.RowID}_${dataTable.Info[25][0]}`}
      className=" text-right bg-BGTableHoverMarket"
    >
      {formatNumberMarket(dataTable.Info[25][1])}
    </td>
    <td
      data-sort={dataTable.Info[26][1]}
      id={`${dataTable.RowID}_${dataTable.Info[26][0]}`}
      className=" text-right bg-BGTableHoverMarket"
    >
      {formatNumberMarket(dataTable.Info[26][1])}
    </td>
    <td
      data-sort={dataTable.Info[27][1]}
      id={`${dataTable.RowID}_${dataTable.Info[27][0]}`}
      className=" text-right bg-BGTableHoverMarket"
    >
      {formatNumberMarket(dataTable.Info[27][1])}
    </td>
  </tr>
  
  )}
</Draggable>

      ))
}
          {provider.placeholder}
          </tbody>
        )}          
          </Droppable>
          </table>
</DragDropContext>  </>
  
  ) 
}

export default TableMarketWatch


