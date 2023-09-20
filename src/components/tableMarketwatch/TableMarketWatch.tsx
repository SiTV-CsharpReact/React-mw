import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
// import { fetchTableHNXAsync } from "./tableSlice";
import {
  checkSTTMarket,
  formatNumber,
  formatNumberMarket,
  getCompanyNameByCode,
  setColorMarket,
  tinhGiaCT,
  tinhGiaTC,
} from "../../utils/util";
import "../../styles/MW.css";
import { ObjectMenuHSX } from "../../models/modelListMenuHSX";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FooterMarket from "../footerMarketwatch/FooterMarket";
import { statusChartMarketwatch } from "../chartMarketwatch/chartMarketwatchSlice";
import { useSelector } from "react-redux";
import { fetchCompanyAsync } from "../companyMarketwatch/companyMarketwatchSlice";
import { dispatchDataTable } from "./orderComanSlice";
import { getDataTable } from "./tableSlice";
import { fetchCategoryAsync } from "../menuBarMW/danhmucSlice";
const showKLPT = (value: string) => {
  // console.log(value);
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
  }
};

const TableMarketWatch = () => {
  const accountname = useAppSelector(
    (state) => state.ProfileAccount.ClientName
  );
  const dataTables = useAppSelector((state) => state.table.ListDataTable);
  const { INDEX } = useAppSelector(
    (state: RootState) => state.settingMarketwatch
  );
  const [sortedColumn, setSortedColumn] = useState("");
  const [statusMarket, setStatusMarket] = useState<ObjectMenuHSX | null>(null);
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<any[]>([]);
  const codeList = useSelector((state: RootState) => state.codeList.codeList);
  const handleDoubleClick = (e: any, val: any) => {
    if (e.detail === 2) {
      dispatch(statusChartMarketwatch(val));
    }
  };
  // call api
  const handelGetData = useCallback(
    (Data: any) => {
      dispatch(getDataTable(Data));
    },
    [dispatch]
  );
  useEffect(() => {
    // async function HanDelCate() {
    // if(accountname) {
    //   let result = await dispatch(fetchCategoryAsync(accountname));
    //   if (result?.payload?.Data[0]?.List) {
    //     let data = {
    //       Floor: "danh-muc",
    //       Query: result?.payload?.Data[0]?.List,
    //     };
    //     await handelGetData(data);
    //   } else {
    //     let data = {
    //       Floor: "HSX",
    //       Query: "s=quote&l=All",
    //     };
    //     await handelGetData(data);
    //   }}
    // }
    // HanDelCate();
  }, [dispatch]);
  // const fetchDataCompany = async () => {
  //   await
  // };

  // Call `fetchData` to fetch data when component mounts
  // useEffect(() => {
  //   if (!localStorage.getItem("CacheSi")) {
  //     dispatch(fetchCompanyAsync());
  //   }
  // }, [dispatch]);

  // su kien click mua ban ma
  const handleClick = (dataTable: any) => {
    console.log("dataTable", dataTable);
    dispatch(dispatchDataTable(dataTable));
  };
  const handleClickBuy = (dataTable: any) => {
    console.log("dataTable", dataTable);
  };
  // sort products
  products.forEach((obj) =>
    obj.Info.sort((a: any, b: any) => {
      const indexA = Number(a[0]);
      const indexB = Number(b[0]);
      if (indexA < indexB) {
        return -1;
      }
      if (indexA > indexB) {
        return 1;
      }
      return 0;
    })
  );

  const [lastCheckboxChecked, setLastCheckboxChecked] = useState("");

  const handleTypeOptionClick = (type: string) => {
    // update the last checkbox checked
    setLastCheckboxChecked(type);
    const newData = products.map((item) =>
      item.RowID === type
        ? {
            ...item,
            pinned: !item.pinned,
            originalIndex:
              item.originalIndex !== undefined
                ? item.originalIndex
                : products.length,
          }
        : item
    );

    // sắp xếp lại dữ liệu
    newData.sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      } else if (!a.pinned && b.pinned) {
        return 1;
      } else {
        return a.originalIndex - b.originalIndex;
      }
    });

    setProducts(newData);

    if (!newData.find((item) => item.pinned)) {
      handleResetClick();
    }
  };

  const handleResetClick = () => {
    const newData = products.map((item) =>
      item.pinned ? { ...item, pinned: false } : item
    );

    newData.sort((a, b) => a.originalIndex - b.originalIndex); // sắp xếp lại dữ liệu theo originalIndex

    setProducts(newData);
  };

  const handleDragEnd = (e: any) => {
    if (!e.destination) return;
    let tempData = Array.from(products);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setProducts(tempData);
  };

  const [order, setorder] = useState("ASC");
  const sorting = (col: any) => {
    const pinned = products.filter((item) => item.pinned); // Lọc ra các sản phẩm đã được click
    const unpinned = products.filter((item) => !item.pinned); // Lọc ra các sản phẩm chưa được click

    if (order === "ASC") {
      pinned.sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      unpinned.sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      const sorted = [...pinned, ...unpinned]; // Ghép lại 2 mảng đã được sort
      setProducts(sorted);
      setorder("DSC");
      setSortedColumn(col);
    } else {
      pinned.sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? -1 : 1
      );
      unpinned.sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? -1 : 1
      );
      const sorted = [...pinned, ...unpinned]; // Ghép lại 2 mảng đã được sort
      setProducts(sorted);
      setSortedColumn(col);
      setorder("ASC");
    }
  };

  const sortData = (param: string) => {
    Number(param);
    if (order === "DSC") {
      const sortedData = [...products].sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return a.Info[param][1] - b.Info[param][1];
        }
      });
      setProducts(sortedData);
      setSortedColumn(param);
      setorder("ASC");
    } else {
      const sortedData = [...products].sort((a, b) => {
        if (a.pinned && !b.pinned) {
          return -1;
        } else if (!a.pinned && b.pinned) {
          return 1;
        } else {
          return b.Info[param][1] - a.Info[param][1];
        }
      });
      setProducts(sortedData);
      setSortedColumn(param);
      setorder("DSC");
    }
  };
  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="w-full tableMW table-priceboard">
          <thead>
            <tr>
              <th
                className={` text-textHeadTableMarket sort-table  ${
                  sortedColumn === "0"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => {
                  sorting("RowID");
                }}
                style={{ width: "6%", minWidth: "90px" }}
              >
                Mã
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
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "1"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                // onClick={sortData(12)}
                onClick={() => {
                  sortData("1");
                }}
              >
                TC
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
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "2"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                // onClick={sortData}
                onClick={() => sortData("2")}
              >
                Trần
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
                className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                  sortedColumn === "3"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                // onClick={sortData}
                onClick={() => sortData("3")}
              >
                Sàn
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
                className=" text-textHeadTableMarket"
                colSpan={INDEX.cbcol4 ? 7 : 6}
                // onClick={() => sortData("4")}
              >
                Mua
              </th>
              <th
                className=" text-textHeadTableMarket bg-BGTableHoverMarket"
                colSpan={3}
                // onClick={() => sortData("14")}
              >
                Khớp lệnh
              </th>
              <th
                className=" text-textHeadTableMarket"
                colSpan={INDEX.cbcol20 ? 7 : 6}
              >
                Bán
              </th>
              <th
                className={`border border-borderHeadTableMarket bg-BGTableHoverMarket px-2 py-1.5 text-textHeadTableMarket sort-table  ${
                  sortedColumn === "21"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                rowSpan={2}
                onClick={() => sortData("21")}
              >
                Tổng KL
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
              {INDEX.cbcol22 && (
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
                  Mở cửa
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
              )}
              {INDEX.cbcol23 && (
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
                  Cao nhất
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
              )}
              {INDEX.cbcol24 && (
                <th
                  className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                    sortedColumn === "24"
                      ? order === "ASC"
                        ? "headerSortUp"
                        : "headerSortUp"
                      : ""
                  }`}
                  rowSpan={2}
                  onClick={() => sortData("24")}
                >
                  Thấp nhất
                  {sortedColumn === "24" ? (
                    order === "ASC" ? (
                      <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                    ) : (
                      <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                    )
                  ) : (
                    ""
                  )}
                </th>
              )}
              {INDEX.cbcol26 && (
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
                  NN mua
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
              )}
              {INDEX.cbcol27 && (
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
                  NN bán
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
              )}
              {INDEX.cbcol28 && (
                <th
                  className={`bg-BGTableHoverMarket text-textHeadTableMarket sort-table  ${
                    sortedColumn === "28"
                      ? order === "ASC"
                        ? "headerSortUp"
                        : "headerSortUp"
                      : ""
                  }`}
                  rowSpan={2}
                  onClick={() => sortData("28")}
                >
                  Room còn lại
                  {sortedColumn === "28" ? (
                    order === "ASC" ? (
                      <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                    ) : (
                      <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                    )
                  ) : (
                    ""
                  )}
                </th>
              )}
            </tr>
            <tr>
              <th
                className={` text-textHeadTableMarket sort-table ${
                  INDEX.cbcol4 ? "block !border-0" : "hidden"
                }  ${
                  sortedColumn === "4"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("4")}
              >
                KL4
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
                G3
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
                  sortedColumn === "6"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("6")}
              >
                KL3
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
                G2
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
                  sortedColumn === "8"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("8")}
              >
                KL2
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
                G1
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
                  sortedColumn === "10"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("10")}
              >
                KL1
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
                className={` text-textHeadTableMarket bg-BGTableHoverMarket sort-table  ${
                  sortedColumn === "11"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("11")}
              >
                Giá
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
              <th
                className={` text-textHeadTableMarket bg-BGTableHoverMarket sort-table  ${
                  sortedColumn === "12"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("12")}
              >
                KL
                {sortedColumn === "12" ? (
                  order === "ASC" ? (
                    <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  ) : (
                    <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                  )
                ) : (
                  ""
                )}
              </th>
              <th className="border border-borderHeadTableMarket text-textHeadTableMarket bg-BGTableHoverMarket relative sort-table w-12 min-w-[50px]">
                <div className="flex justify-between pt-[20px]">
                  <button
                    className="absolute inset-y-0 left-0 w-4 bg-BGTableHoverMarket hover:bg-hoverKL "
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
                    {/* {sortedColumn === "13" ? (
                      order === "ASC" ? (
                        <i className="fa fa-caret-up text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                      ) : (
                        <i className="fa fa-caret-down text-16pxi absolute bottom-[-4px] left-[45%]"></i>
                      )
                    ) : (
                      ""
                    )} */}
                  </div>

                  <button
                    className="absolute inset-y-0 right-0 w-4 bg-BGTableHoverMarket hover:bg-hoverKL sort-table"
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
                className={` text-textHeadTableMarket sort-table ${
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
              <th
                className={` text-textHeadTableMarket sort-table ${
                  INDEX.cbcol20 ? "" : "hidden"
                }  ${
                  sortedColumn === "20"
                    ? order === "ASC"
                      ? "headerSortUp"
                      : "headerSortUp"
                    : ""
                }`}
                onClick={() => sortData("20")}
              >
                KL4
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
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {dataTables?.map((dataTable: any, index) => (
                  <Draggable
                    key={dataTable.RowID}
                    draggableId={dataTable.RowID}
                    index={index}
                  >
                    {(provider) => (
                      <tr
                        data-tr-value={dataTable.Info[0][1]}
                        // không đc pinned || không phải tr cuối cùng && tr hiện tại giống với tr sau || tr cuối cùng k đc pinned-> ''

                        className={`${
                          (index < products.length - 1 &&
                            dataTable.pinned === products[index + 1].pinned) ||
                          !dataTable.pinned
                            ? ""
                            : index === products.length - 1 && !dataTable.pinned
                            ? ""
                            : "border-bottom"
                        }`}
                        key={dataTable.RowID}
                        id={`tr${dataTable.RowID}`}
                        {...provider.draggableProps}
                        ref={provider.innerRef}

                        // style={{ backgroundColor: selectedRowId === dataTable.RowID ? 'yellow' : 'white' }}
                      >
                        <td
                          {...provider.dragHandleProps}
                          className={`${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[11][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )} text-left has-symbol company-tooltip`}
                          data-tooltip={getCompanyNameByCode(
                            dataTable.Info[0][1]
                          ).toString()}
                          id={`${dataTable.Info[1][1]}`}
                        >
                          {/* <ReactTooltip id="my-tooltip"  className="example" classNameArrow="arrow__tooltip"  place="bottom"/> */}
                          <input
                            type="checkbox"
                            id={`cb${dataTable.RowID}`}
                            onClick={() =>
                              handleTypeOptionClick(dataTable.RowID)
                            }
                            className="cbTop priceboard"
                          ></input>

                          <span
                            className="pl-0.5"
                            onDoubleClick={(e) =>
                              handleDoubleClick(e, dataTable.Info[0][1])
                            }
                          >
                            {" "}
                            {dataTable.Info[0][1]}
                          </span>
                        </td>
                        {/* TTham chiếu */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[13][1]}
                          id={`${dataTable.RowID}_TC`}
                          className="text-right bg-BGTableHoverMarket text-textTableMarketTC"
                        >
                          {formatNumber(dataTable.Info[1][1])}
                        </td>
                        {/* Trần */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[15][1]}
                          id={`${dataTable.RowID}_Tran`}
                          className="text-right bg-BGTableHoverMarket text-textTableMarketTran"
                        >
                          {formatNumber(dataTable.Info[2][1])}
                        </td>
                        {/* Sàn */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[14][1]}
                          id={`${dataTable.RowID}_San`}
                          className="text-right bg-BGTableHoverMarket text-textTableMarketSan"
                        >
                          {formatNumber(dataTable.Info[3][1])}
                        </td>
                        {/* D4 Mua*/}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[4][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[4][0]}`}
                          className={`text-right ${
                            INDEX.cbcol4 ? "" : "hidden"
                          }`}
                        >
                          {formatNumberMarket(dataTable.Info[4][1])}
                        </td>
                        {/* G3 Mua*/}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[8][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[5][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[5][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClick({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[5][1],
                            })
                          }
                          //{ma:dataTable.Info[0][1] , price:dataTable.Info[1][1]})
                        >
                          {formatNumberMarket(dataTable.Info[5][1])}
                        </td>
                        {/* KL3 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[9][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[6][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[5][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClick({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[5][1],
                            })
                          }
                        >
                          {formatNumberMarket(dataTable.Info[6][1])}
                        </td>
                        {/* G2 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[4][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[7][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[7][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClick({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[7][1],
                            })
                          }
                          //
                        >
                          {formatNumberMarket(dataTable.Info[7][1])}
                        </td>
                        {/* KL2 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[5][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[8][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[7][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClick({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[7][1],
                            })
                          }
                          //{ma:dataTable.Info[0][1] , price:dataTable.Info[1][1]}
                        >
                          {formatNumberMarket(dataTable.Info[8][1])}
                        </td>
                        {/* G1 */}
                        <td
                          {...provider.dragHandleProps}
                          id={`${dataTable.RowID}_${dataTable.Info[9][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[9][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClick({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[9][1],
                            })
                          }
                        >
                          {checkSTTMarket(
                            formatNumberMarket(dataTable.Info[9][1]),
                            statusMarket?.STAT_ControlCode,
                            dataTable.Info[10][1]
                          )}
                          {/* {formatNumberMarket(dataTable.RowID)} */}
                        </td>
                        {/* KL1 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[1][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[10][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[9][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClick({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[1][1],
                            })
                          }
                        >
                          {formatNumberMarket(dataTable.Info[10][1])}
                        </td>
                        {/* Gia Khơp lenh */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[18][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[11][0]}`}
                          className={` text-right bg-BGTableHoverMarket ${setColorMarket(
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
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[19][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[12][0]}`}
                          className={` text-right bg-BGTableHoverMarket ${setColorMarket(
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
                          {...provider.dragHandleProps}
                          data-sort={tinhGiaTC(
                            dataTable.Info[1][1],
                            dataTable.Info[11][1]
                          )}
                          className={` text-right bg-BGTableHoverMarket ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[11][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                        >
                          <span>
                            <div
                              className="price-ot d-block-kl"
                              id={`${dataTable.RowID}_PT`}
                            >
                              {tinhGiaTC(
                                dataTable.Info[1][1],
                                dataTable.Info[11][1]
                              )}
                            </div>
                            <div
                              className="price-change d-none-kl"
                              id={`${dataTable.RowID}_CT`}
                            >
                              {tinhGiaCT(
                                dataTable.Info[1][1],
                                dataTable.Info[11][1]
                              )}
                            </div>
                          </span>
                        </td>
                        {/* G1 Ban*/}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[2][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[14][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[14][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClickBuy({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[14][1],
                            })
                          }
                          //{ma:dataTable.Info[0][1] , price:dataTable.Info[14][1]}
                        >
                          {checkSTTMarket(
                            formatNumberMarket(dataTable.Info[14][1]),
                            statusMarket?.STAT_ControlCode,
                            dataTable.Info[15][1]
                          )}
                        </td>
                        {/* KL1 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[3][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[15][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[14][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClickBuy({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[14][1],
                            })
                          }
                        >
                          {formatNumberMarket(dataTable.Info[15][1])}
                        </td>
                        {/* G2 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[6][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[16][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[16][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClickBuy({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[16][1],
                            })
                          }
                          //
                        >
                          {formatNumberMarket(dataTable.Info[16][1])}
                        </td>
                        {/* KL2 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[7][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[17][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[16][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClickBuy({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[16][1],
                            })
                          }
                        >
                          {formatNumberMarket(dataTable.Info[17][1])}
                        </td>
                        {/* G3 */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[10][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[18][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[18][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClickBuy({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[18][1],
                            })
                          }
                          //{ma:dataTable.Info[0][1] , price:dataTable.Info[18][1]}
                        >
                          {formatNumberMarket(dataTable.Info[18][1])}
                        </td>
                        {/* KL3 */}
                        {/* đâsd */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[11][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[19][0]}`}
                          className={` text-right ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[18][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                          onClick={() =>
                            handleClickBuy({
                              ma: dataTable.Info[0][1],
                              price: dataTable.Info[18][1],
                            })
                          }
                        >
                          {formatNumberMarket(dataTable.Info[19][1])}
                        </td>
                        {/* TKL */}
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[20][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[20][0]}`}
                          className={` text-right ${
                            INDEX.cbcol20 ? "" : "hidden"
                          } ${setColorMarket(
                            dataTable.Info[1][1],
                            dataTable.Info[20][1],
                            dataTable.Info[2][1],
                            dataTable.Info[3][1]
                          )}`}
                        >
                          {formatNumberMarket(dataTable.Info[20][1])}
                        </td>
                        <td
                          {...provider.dragHandleProps}
                          data-sort={dataTable.Info[20][1]}
                          id={`${dataTable.RowID}_${dataTable.Info[21][0]}`}
                          className="text-right bg-BGTableHoverMarket"
                        >
                          {formatNumberMarket(dataTable.Info[21][1])}
                        </td>
                        {INDEX.cbcol22 && (
                          <td
                            {...provider.dragHandleProps}
                            data-sort={dataTable.Info[21][1]}
                            id={`${dataTable.RowID}_${dataTable.Info[22][0]}`}
                            className={` text-right bg-BGTableHoverMarket ${setColorMarket(
                              dataTable.Info[1][1],
                              dataTable.Info[22][1],
                              dataTable.Info[2][1],
                              dataTable.Info[3][1]
                            )}`}
                          >
                            {formatNumberMarket(dataTable.Info[22][1])}
                          </td>
                        )}

                        {INDEX.cbcol23 && (
                          <td
                            {...provider.dragHandleProps}
                            data-sort={dataTable.Info[22][1]}
                            id={`${dataTable.RowID}_${dataTable.Info[23][0]}`}
                            className={` text-right bg-BGTableHoverMarket ${setColorMarket(
                              dataTable.Info[1][1],
                              dataTable.Info[23][1],
                              dataTable.Info[2][1],
                              dataTable.Info[3][1]
                            )}`}
                          >
                            {formatNumberMarket(dataTable.Info[23][1])}
                          </td>
                        )}
                        {INDEX.cbcol24 && (
                          <td
                            {...provider.dragHandleProps}
                            data-sort={dataTable.Info[23][1]}
                            id={`${dataTable.RowID}_${dataTable.Info[24][0]}`}
                            className={` text-right bg-BGTableHoverMarket ${setColorMarket(
                              dataTable.Info[1][1],
                              dataTable.Info[24][1],
                              dataTable.Info[2][1],
                              dataTable.Info[3][1]
                            )}`}
                          >
                            {formatNumberMarket(dataTable.Info[24][1])}
                          </td>
                        )}
                        {INDEX.cbcol26 && (
                          <td
                            {...provider.dragHandleProps}
                            data-sort={dataTable.Info[25][1]}
                            id={`${dataTable.RowID}_${dataTable.Info[26][0]}`}
                            className="text-right bg-BGTableHoverMarket"
                          >
                            {formatNumberMarket(dataTable.Info[26][1])}
                          </td>
                        )}
                        {INDEX.cbcol27 && (
                          <td
                            {...provider.dragHandleProps}
                            data-sort={dataTable.Info[26][1]}
                            id={`${dataTable.RowID}_${dataTable.Info[27][0]}`}
                            className="text-right bg-BGTableHoverMarket"
                          >
                            {formatNumberMarket(dataTable.Info[27][1])}
                          </td>
                        )}
                        {INDEX.cbcol28 && (
                          <td
                            {...provider.dragHandleProps}
                            data-sort={dataTable.Info[27][1]}
                            id={`${dataTable.RowID}_${dataTable.Info[28][0]}`}
                            className="text-right bg-BGTableHoverMarket"
                          >
                            {formatNumberMarket(dataTable.Info[28][1])}
                          </td>
                        )}
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
      <FooterMarket />
    </div>
  );
};

export default React.memo(TableMarketWatch);

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
