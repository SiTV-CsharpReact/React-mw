import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchTableHNXAsync } from "./tableSlice";
import {
  checkSTTMarket,
  formatNumber,
  formatNumberMarket,
  setColorMarket,
  tinhGiaCT,
  tinhGiaTC,
} from "../../utils/util";
import "../../styles/MW.css";
import axios from "axios";
import { ObjectMenuHSX } from "../../models/modelListMenuHSX";
import { useParams } from "react-router-dom";
import { stocks } from "../../models/marketwacthTable";
import HeaderMarketW from "../headerMarketwat/HeaderMarket";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DataTable } from "../../models/modelTableHNX";
const showKLPT = (value: string) => {
  console.log(value);
  if (value === "showPT") {
    const element = document.getElementsByClassName("price-ot");
    const elementFirst = document.getElementsByClassName("price-ot")[0];
    const elementPriceChange = document.getElementsByClassName("price-change");
    const elementKhopLenhPT = document.getElementById("showKhopLenhPT");
    if (elementFirst.classList.contains("d-block-kl")) {
      for (let j = 0; j < element.length; j++) {
        const elementOT = element.item(j);
        elementOT?.classList.remove("d-block-kl");
        elementOT?.classList.add("d-none-kl");

        // In ra danh sách các lớp của phần tử
      }
      for (let i = 0; i < elementPriceChange.length; i++) {
        const elementChange = elementPriceChange.item(i);
        elementChange?.classList.remove("d-none-kl");
        elementChange?.classList.add("d-block-kl");
        // In ra danh sách các lớp của phần tử
      }
      if (elementKhopLenhPT) elementKhopLenhPT.innerHTML = "+/-";
    } else {
      for (let j = 0; j < element.length; j++) {
        const elementOT = element.item(j);
        elementOT?.classList.remove("d-none-kl");
        elementOT?.classList.add("d-block-kl");
        // In ra danh sách các lớp của phần tử
      }
      for (let i = 0; i < elementPriceChange.length; i++) {
        const elementChange = elementPriceChange.item(i);
        elementChange?.classList.remove("d-block-kl");
        elementChange?.classList.add("d-none-kl");
        // In ra danh sách các lớp của phần tử
      }
      if (elementKhopLenhPT) elementKhopLenhPT.innerHTML = "%";
    }
    // if(element) {
    //   element.classList.remove("d-block-kl")
    //   element.classList.add("d-none-kl")
    // }
  }
};
const TableMarketWatch = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 ,value:""});
  //const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [sortedColumn, setSortedColumn] = useState("");
  const [statusMarket, setStatusMarket] = useState<ObjectMenuHSX | null>(null);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const params = useParams<{ id: string }>();
  const paramstock = stocks.find((paramstock) => paramstock.id === params.id); // const { productsLoaded,productParams} = useAppSelector(state => state.table); //const  products = useAppSelector(state => state.table.table);

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

  const fetchTable = async (param: string) => {
    let valueParam = "HNX";
    switch (param) {
      // case "":
      //   valueParam = "s=quote&l=HNXIndex";
      //   break;
      case "HNX":
        valueParam = "s=quote&l=HNXIndex";
        break;
      case "HNX30":
        valueParam = "s=quote&l=HNX30";
        break;
      case "BOND":
        valueParam = "s=quote&l=BOND";
        break;
      case "UPCOM":
        valueParam = "s=quote&l=HNXUpcomIndex";
        break;
      default:
        break;
    }
    const res = await fetch(
      `http://marketstream.fpts.com.vn/hnx/data.ashx?${valueParam}`
    );
    const data = await res.json();
    setProducts(data);
  };
  //const [users, setUsers] = useState([]);
  // const handleTypeOptionClick = (type:string) => {
  //   const newData = products.slice().sort((a, b) => {
  //     if (a.RowID === type) return -1;
  //     if (b.RowID === type) return 1;
  //     return 0;
  //   });
  //   setProducts(newData);
  //   console.log(products);
  // };
  
  const handleTypeOptionClick = (id: any, index: any) => {
    // Lấy ra phần tử cần đưa lên đầu mảng
    const itemToMove = products[index];
    // Lấy ra các phần tử trước và sau phần tử cần đưa lên
    const head = products.slice(0, index);
    const tail = products.slice(index + 1);
    // Gộp lại các phần tử theo thứ tự mới và cập nhật vào state
    setProducts([itemToMove, ...head, ...tail]);
    console.log(products)
  };
  
  
  
  

  // lay index td (map 1:1 vs products)
 // const index = 3;

  // clone 1 thang obj co index da lay dc (3)
  //const cloneObj = products[index];

  // xoa di khoi products
 // products.slice(index,1)

  // insert vao vi tri index
  // 1. lay 1 mang tu 0 > index - 1 (1)
  // 2. lay 1 mang tu index -> cuoi (2)
  // 3. merge (1) (3) (2)
  // const arr1 = products.slice(0, index);
  // const arr2 = products.slice(index, last);

  // newData = [...1,..2,...3]
 
  

  
  const handleDragEnd = (e: any) => {
    if (!e.destination) return;
    let tempData = Array.from(products);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setProducts(tempData);
  };

  const [order, setorder] = useState("ASC");
  const sorting = (col: any) => {
    //console.log("aa", sorting);
    if (order === "ASC") {
      const sorted = [...products].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setProducts(sorted);
      console.log("sorting", sorted);
      setorder("DSC");
      setSortedColumn(col);
    } else {
      const sorted = [...products].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? -1 : 1
      );
      setProducts(sorted);
      setSortedColumn(col);
      setorder("ASC");
    }
  };

  const sortData = (param: string) => {
    Number(param);
    if (order === "DSC") {
      const sortedData = [...products].sort(
        (a, b) => a.Info[param][1] - b.Info[param][1]
      );
      setProducts(sortedData);
      setSortedColumn(param);
      setorder("ASC");
    } else {
      const sortedData = [...products].sort(
        (a, b) => b.Info[param][1] - a.Info[param][1]
      );
      setProducts(sortedData);
      setSortedColumn(param);
      setorder("DSC");
    }
  };
  const handleContextMenu = (e:any) => {
    e.preventDefault();
    const trValue = e.target.parentElement.getAttribute('data-tr-value');
    if(trValue){
      setPopupPosition({ x: e.clientX, y: e.clientY, value:trValue });
      setPopupVisible(true);
    } 
  }
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e:any) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);
  function handleClick() {
    setPopupVisible(false);
  }
 // console.log(sortedColumn);
 console.log(products)
  return (
    <>
        <div className="popup" ref={popupRef}    style={{display: popupVisible?'block':'none'  , position: 'absolute', top: popupPosition.y, left: popupPosition.x }}>
        <ul className="context-menu-list" id="idContextMenu">
          <li>
          <i className="fa fa-arrow-left text-[#00A4FF]"></i>
          <span>
          Mua <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-arrow-right text-[#f44336]"></i>
          <span>
          Bán <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-language text-[#22B14C]"></i>
          <span>
          Thông tin doanh nghiệp <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-sign-out text-[#2371AF]"></i>
          <span>
          Chi tiết <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-history text-[#009688]"></i>
          <span>
          Lịch sử giá <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-bar-chart text-[#795548]"></i>
          <span>
          Phân tích Kỹ thuật <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-close text-[#f44336]"></i>
          <span>
          Bỏ mã <b>{popupPosition.value}</b> 
          </span> 
          </li>
          <li>
          <i className="fa fa-info-circle text-[#949831]"></i>
          <span>
         Ghi thành DM mặc định
          </span> 
          </li>
        </ul>
        <button onClick={handleClick}>Close</button>
        </div>
      <DragDropContext onDragEnd={handleDragEnd}>      
        <table className="w-full tableMW table-priceboard"   onContextMenu={handleContextMenu} >
      
          <thead>
            <tr>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "RowID"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => {
                  sorting("RowID");
                }}
                style={{ width: "6%" }}
              >
                Mã
                {sortedColumn === "RowID" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "13"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                // onClick={sortData(12)}
                onClick={() => {
                  sortData("13");
                }}
              >
                TC
                {sortedColumn === "13" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "15"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                // onClick={sortData}
                onClick={() => sortData("15")}
              >
                Trần
                {sortedColumn === "15" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "14"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                // onClick={sortData}
                onClick={() => sortData("14")}
              >
                Sàn
                {sortedColumn === "14" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className=" text-textHeadTableMarket"
                colSpan={6}
                onClick={() => sortData("14")}
              >
                Mua
              </th>
              <th
                className=" text-textHeadTableMarket bg-BGTableHoverMarket"
                colSpan={3}
                onClick={() => sortData("14")}
              >
                Khớp lệnh
              </th>
              <th className=" text-textHeadTableMarket" colSpan={6}>
                Bán
              </th>
              <th
                className={`border border-borderHeadTableMarket bg-BGTableHoverMarket px-2 py-1.5 text-textHeadTableMarket sort-table  ${
                  sortedColumn === "20"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("20")}
              >
                Tổng KL
                {sortedColumn === "20" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "20"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("21")}
              >
                Mở cửa
                {sortedColumn === "21" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "22"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("22")}
              >
                Cao nhất
                {sortedColumn === "22" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "23"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("23")}
              >
                Thấp nhất
                {sortedColumn === "23" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "25"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("25")}
              >
                NN mua
                {sortedColumn === "25" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "26"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("26")}
              >
                NN bán
                {sortedColumn === "26" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "27"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("27")}
              >
                Room còn lại
                {sortedColumn === "27" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
            </tr>
            <tr>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "8"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("8")}
              >
                G3
                {sortedColumn === "8" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "9"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("9")}
              >
                KL3
                {sortedColumn === "9" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "4"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("4")}
              >
                G2
                {sortedColumn === "4" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "5"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("5")}
              >
                KL2
                {sortedColumn === "5" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "0"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("0")}
              >
                G1
                {sortedColumn === "0" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "1"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("1")}
              >
                KL1
                {sortedColumn === "1" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket bg-BGTableHoverMarket sort-table  ${
                  sortedColumn === "18"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("18")}
              >
                Giá
                {sortedColumn === "18" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket bg-BGTableHoverMarket sort-table  ${
                  sortedColumn === "19"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("19")}
              >
                KL
                {sortedColumn === "19" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th className="border border-borderHeadTableMarket text-textHeadTableMarket bg-BGTableHoverMarket relative sort-table w-12">
                <div className="flex justify-between pt-[20px]">
                  <button
                    className="inset-y-0 absolute left-0 w-4 bg-BGTableHoverMarket hover:bg-hoverKL "
                    onClick={() => showKLPT("showPT")}
                  >
                    <div className="arrow arrow-left"></div>
                  </button>
                  <div
                    className="child-center"
                    id="showKhopLenhPT"
                    onClick={() => sortData("13")}
                  >
                    %
                    {sortedColumn === "13" ? (
                      order === "ASC" ? (
                        <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                      ) : (
                        <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                      )
                    ) : (
                      ""
                    )}
                  </div>

                  <button
                    className="inset-y-0 absolute right-0 w-4 bg-BGTableHoverMarket hover:bg-hoverKL sort-table"
                    onClick={() => showKLPT("showPT")}
                  >
                    <div className="arrow arrow-right"></div>
                  </button>
                </div>
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "2"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("2")}
              >
                G1
                {sortedColumn === "2" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "3"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("3")}
              >
                KL1
                {sortedColumn === "3" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "6"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("6")}
              >
                G2
                {sortedColumn === "6" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "7"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("7")}
              >
                KL2
                {sortedColumn === "7" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "10"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("10")}
              >
                G3
                {sortedColumn === "10" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "11"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("11")}
              >
                KL3
                {sortedColumn === "11" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {products?.map((dataTable: any,index) => (
                  <Draggable
                    key={dataTable.RowID}
                    draggableId={dataTable.RowID}
                    index={index}
                  >
                    {(provider) => (
                      <tr
                    
                      data-tr-value={dataTable.RowID}
                        key={dataTable.RowID}
                        id={`tr${dataTable.RowID}`}
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                     
                        // style={{ backgroundColor: selectedRowId === dataTable.RowID ? 'yellow' : 'white' }}
                      >
                        <td
                          data-index = {index} key={index}
                          onClick={() => handleTypeOptionClick(dataTable.RowID,index)}
                          {...provider.dragHandleProps}
                          className={`${setColorMarket(
                            dataTable.Info[13][1],
                            dataTable.Info[18][1],
                            dataTable.Info[15][1],
                            dataTable.Info[14][1]
                          )}`}
                          id={`${dataTable.RowID}`}
                        >
                          <input
                            type="checkbox"
                            id={`cb${dataTable.RowID}`}
                           
                            className="cbTop priceboard"
                          ></input>
                          <span className="pl-0.5"> {dataTable.RowID}</span>
                        </td>

                        {/* TTham chiếu */}
                        <td
                       
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[13][1]}
                          id={`${dataTable.RowID}_TC`}
                          className=" text-right bg-BGTableHoverMarket text-textTableMarketTC"
                        >
                          {formatNumber(dataTable.Info[13][1])}
                        </td>
                        {/* Trần */}
                        <td
                                {...provider.dragHandleProps}
                          data-sort={dataTable.Info[15][1]}
                          id={`${dataTable.RowID}_Tran`}
                          className=" text-right bg-BGTableHoverMarket text-textTableMarketTran"
                        >
                          {formatNumber(dataTable.Info[15][1])}
                        </td>
                        {/* Sàn */}
                        <td
                                {...provider.dragHandleProps}
                          data-sort={dataTable.Info[14][1]}
                          id={`${dataTable.RowID}_San`}
                          className=" text-right bg-BGTableHoverMarket text-textTableMarketSan"
                        >
                          {formatNumber(dataTable.Info[14][1])}
                        </td>
                        {/* G3 Mua*/}
                        <td
                                {...provider.dragHandleProps}
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
                                {...provider.dragHandleProps}
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
                                {...provider.dragHandleProps}
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
                                {...provider.dragHandleProps}
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
                                {...provider.dragHandleProps}
                          data-sort={dataTable.Info[0][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[0][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[13][1],
                            dataTable.Info[0][1],
                            dataTable.Info[15][1],
                            dataTable.Info[14][1]
                          )}`}
                        >
                          {checkSTTMarket(
                            formatNumberMarket(dataTable.Info[0][1]),
                            statusMarket?.STAT_ControlCode,
                            dataTable.Info[1][1]
                          )}
                          {/* {formatNumberMarket(dataTable.Info[0][1])} */}
                        </td>
                        {/* KL1 */}
                        <td
                                {...provider.dragHandleProps}
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
                                {...provider.dragHandleProps}
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
                                {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
                          data-sort={tinhGiaTC(
                            dataTable.Info[13][1],
                            dataTable.Info[18][1]
                          )}
                          className={` text-right bg-BGTableHoverMarket ${setColorMarket(
                            dataTable.Info[13][1],
                            dataTable.Info[18][1],
                            dataTable.Info[15][1],
                            dataTable.Info[14][1]
                          )}`}
                        >
                          <span>
                            <div
                              className="price-ot d-block-kl"
                              id={`${dataTable.RowID}_PT`}
                            >
                              {tinhGiaTC(
                                dataTable.Info[13][1],
                                dataTable.Info[18][1]
                              )}
                            </div>
                            <div
                              className="price-change d-none-kl"
                              id={`${dataTable.RowID}_CT`}
                            >
                              {tinhGiaCT(
                                dataTable.Info[13][1],
                                dataTable.Info[18][1]
                              )}
                            </div>
                          </span>
                        </td>
                        {/* G1 Ban*/}
                        <td
                         {...provider.dragHandleProps}
                          data-sort={dataTable.Info[2][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[2][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[13][1],
                            dataTable.Info[2][1],
                            dataTable.Info[15][1],
                            dataTable.Info[14][1]
                          )}`}
                        >
                          {checkSTTMarket(
                            formatNumberMarket(dataTable.Info[2][1]),
                            statusMarket?.STAT_ControlCode,
                            dataTable.Info[3][1]
                          )}
                        </td>
                        {/* KL1 */}
                        <td
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
                          data-sort={dataTable.Info[20][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[20][0]}`}
                          className=" text-right bg-BGTableHoverMarket "
                        >
                          {formatNumberMarket(dataTable.Info[20][1])}
                        </td>
                        <td
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
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
                         {...provider.dragHandleProps}
                          data-sort={dataTable.Info[25][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[25][0]}`}
                          className=" text-right bg-BGTableHoverMarket"
                        >
                          {formatNumberMarket(dataTable.Info[25][1])}
                        </td>
                        <td
                         {...provider.dragHandleProps}
                          data-sort={dataTable.Info[26][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[26][0]}`}
                          className=" text-right bg-BGTableHoverMarket"
                        >
                          {formatNumberMarket(dataTable.Info[26][1])}
                        </td>
                        <td
                         {...provider.dragHandleProps}
                          data-sort={dataTable.Info[27][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[27][0]}`}
                          className=" text-right bg-BGTableHoverMarket"
                        >
                          {formatNumberMarket(dataTable.Info[27][1])}
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </>
  );
};

export default TableMarketWatch;

  //     const param = window.location.search;
  //     const urlParams = new URLSearchParams(param);
  // console.log(urlParams)
  //const productssss = useAppSelector(productSelectors.selectAll);
  //const  statusMarket = useAppSelector(state => state.table.table);
    //console.log(products)
  // useEffect(()=>{
  //     dispatch(fetchTableHNXAsync())
  //     //dispatch(fetchStatusAsync())
  // },[dispatch])

    // a === b ? 0 :
  //console.log("product", products);
  //   const sortData = (param:string) => {
  //     Number(param)
  //     if (order === "ASC") {
  // const sortedData = [...products].sort((a, b) =>
  // ((b.Info[param][1]) - (a.Info[param][1]))
  //   );
  //       setProducts(sortedData);
  //       console.log("aa",sortedData);
  //       setorder("DSC");
  //     }else {
  //       const sortedData = [...products].sort((a, b) =>
  // ((a.Info[param][1]) - (b.Info[param][1]))
  //   );
  //       setProducts(sortedData);
  //       console.log("aa",sortedData);
  //       setorder("ASC");

  //     }
  //   };
  

  


  // const renderTableData = () => {
  //   return data.map((item) => {
  //     const { id, name, typescript } = item;
  //     return (
  //       <tr key={id}>
  //         <td>{id}</td>
  //         <td onClick={() => handleClick(id)}>{name}</td>
  //         <td>{typescript ? "Yes" : "No"}</td>
  //       </tr>
  //     );
  //   });
  // };
