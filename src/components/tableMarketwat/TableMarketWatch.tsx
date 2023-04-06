import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { fetchTableAsync } from './tableSlice';
import { useTable,useSortBy  } from 'react-table';
import { formatNumber, formatNumberMarket, setColorMarket } from '../../utils/util';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../styles/MW.css";
const TableMarketWatch = () => {
    const dispatch = useAppDispatch();
  //const productssss = useAppSelector(productSelectors.selectAll);
 // const { productsLoaded,productParams} = useAppSelector(state => state.table);
  const  products = useAppSelector(state => state.table.table);
 console.log(products)
useEffect(()=>{
    dispatch(fetchTableAsync())
},[dispatch])


const [users, setUsers] = useState([])
const handleDragEnd = (e:any) => {
  if (!e.destination) return;
  let tempData = Array.from(users);
  let [source_data] = tempData.splice(e.source.index, 1);
  tempData.splice(e.destination.index, 0, source_data);
  setUsers(tempData);
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
// const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data }, useSortBy);


  return (
    <>
    
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
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket"
              rowSpan={2}
            >
              Mã
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1.5 text-textHeadTableMarket "
              rowSpan={2}
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
     
      <DragDropContext onDragEnd={handleDragEnd}>
      <table className="w-full tableMW">
        <colgroup>
          <col className="col-symbol" />
          <col className="show-on-mobile col-price" />
          <col className="show-on-mobile col-price" />
          <col className="show-on-mobile col-price" />
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
        <Droppable droppableId="tbody">
          {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {products?.map((dataTable: any) => (
                <Draggable
                  key={dataTable.RowID}
                  draggableId={dataTable.RowID}
                  index={dataTable}
                >
                  {(provided) => (
                    <tr key={dataTable.RowID} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[11][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}> {dataTable.Info[0][1]}</td>
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTC'>{formatNumber(dataTable.Info[1][1])}</td>
                      {/* Trần */}
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketTran'>{formatNumber(dataTable.Info[2][1])}</td>
                      {/* Sàn */}
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket text-textTableMarketSan'>{formatNumber(dataTable.Info[3][1])}</td>
                      {/* G3 Mua*/}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[5][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[5][1])}</td>
                      {/* KL3 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[5][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[6][1])}</td>
                      {/* G2 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[7][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[7][1])}</td>
                      {/* KL2 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[7][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[8][1])}</td>
                      {/* G1 */}
                      {/* <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1],dataTable.Info[9][1],dataTable.Info[2][1],dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[9][1])}</td> */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[9][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}> oke</td>
                      {/* KL1 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[9][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[10][1])}</td>
                      {/* Gia Khơp lenh */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1], dataTable.Info[11][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[11][1])}</td>
                      {/* KL */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1], dataTable.Info[11][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[12][1])}</td>
                      {/* +-*/}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1], dataTable.Info[11][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>oke</td>
                      {/* G1 Ban*/}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[14][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[14][1])}</td>
                      {/* KL1 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[14][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[15][1])}</td>
                      {/* G2 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[16][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[16][1])}</td>
                      {/* KL2 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[16][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[17][1])}</td>
                      {/* G3 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[18][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[18][1])}</td>
                      {/* KL3 */}
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right ${setColorMarket(dataTable.Info[1][1], dataTable.Info[18][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[19][1])}</td>
                      {/* TKL */}
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket '>{formatNumberMarket(dataTable.Info[21][1])}</td>
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[1][1], dataTable.Info[22][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[22][1])}</td>
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket ${setColorMarket(dataTable.Info[1][1], dataTable.Info[23][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[23][1])}</td>
                      <td className={`border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket  ${setColorMarket(dataTable.Info[1][1], dataTable.Info[24][1], dataTable.Info[2][1], dataTable.Info[3][1])}`}>{formatNumberMarket(dataTable.Info[24][1])}</td>
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[26][1])}</td>
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[27][1])}</td>
                      <td className='border px-1 py-0.5 font-normal border-borderBodyTableMarket text-xs text-right bg-BGTableHoverMarket'>{formatNumberMarket(dataTable.Info[28][1])}</td>
                    </tr>
                  )}
                </Draggable>
              )
              )}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext></> 
  )
}

export default TableMarketWatch


