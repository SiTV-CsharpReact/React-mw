import React, { useState } from 'react'
// import { DataTable } from '../../models/modelTableHNX';
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

type DataTable = {
  RowID: string,
  info:[]
}


const HeaderMarketW = () => {
  // const tableInstance = useTable(
  //   {
  //     columns,
  //     data
  //   },
  //   useSortBy
  // )

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow
  // } = tableInstance
  const [data,setdate] = useState<DataTable[]>();
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
  )
}

export default HeaderMarketW