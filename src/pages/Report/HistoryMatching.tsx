import React, { useEffect, useState, useMemo } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import InputDateAction from "../FromAction/InputDateAction";

import {
  SanGD,
  MaCK,
  getDateTime,
  converDate,
} from "../helper/DateTime";

import LayoutPage from "../Layout/LayoutPage";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../store/configureStore";
import { getdata } from "./ResportSlice";
import { ReportData, } from "./models/models";
import {converReport } from "../helper/coverDataReport";
import { formatNumber, formatNumberMarket } from "../../utils/util";
let { tuNgay, denNgay } = getDateTime();
type TypeValue = {
  LoaiLenh: any;
  MaCK: any;
  tuNgay: any;
  denNgay: any;
};
const HistoryMatching = () => {
  const [data, setData] = useState<TypeValue>({
    LoaiLenh: "",
    MaCK: "",
    tuNgay: tuNgay,
    denNgay: denNgay,
  });
  const ChangeLoaiLenh = (e: any) => {
    setData({ ...data, LoaiLenh: e });
  };
  const ChangeMaCK = (e: any) => {
    setData({ ...data, MaCK: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  const updateData  = (e:any)=>{
    console.log("Cập Nhật " , e)
  }
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dataTradeLog } = useAppSelector((state: RootState) => state.report);
  const [showRowPansDate, setShowRowPansDate] = useState<number[]>([]);
  const [showRowPansMua, setShowRowPansMua] = useState<number[]>([]);
  const [showRowPansBan, setShowRowPansBan] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const hangdelCallapi = async () => {
      const { payload } = await dispatch(getdata());
      let arrayShow = payload.map(() => {
        return 0;
      });
      setShowRowPansDate(arrayShow);
      setShowRowPansBan(arrayShow);
      setShowRowPansMua(arrayShow);
    };
    hangdelCallapi().finally(()=>setIsLoading(true));
  }, [dispatch]);
  const handleSHowAll = () => {
    setShow(!show);
    if(!show){
      // show true
      const elements: NodeListOf<Element> = document.querySelectorAll(".showAllH");
      elements.forEach((item: Element) => {
        item.classList.remove("hidden");
      });
      const showAllU: NodeListOf<Element> = document.querySelectorAll(".showAllU");
      showAllU.forEach((item: Element) => {
        item.classList.add("hidden");
      });
        // tính span các phần tử 
    const TotalDate =   dataTradeLog.map((item: any, index: number) => {
        // mua
        const ArrayMua = item?.filter(
          (e: ReportData) =>
            e?.ASTOCKCODE !== null && e?.AORDERTYPE === "M"
        ); // 6 cả null

        const grupMua = converReport(ArrayMua);

        const summedDataMua = Object.entries(grupMua).map(
          ([key, values]) => {
            return {
              ValueArray: values,
            };
          }
        );
        let sumMua =  0
           summedDataMua.forEach((item)=>{
          if(item.ValueArray.length > 1){
            sumMua = sumMua + item.ValueArray.length
          }
           
        })
      
        // bán

        const ArrayBan = item?.filter(
          (e: ReportData) =>
            e?.ASTOCKCODE !== null && e?.AORDERTYPE ==="B"
        );

        const grupBan = converReport(ArrayBan);
          
        const summedDataBan = Object.entries(grupBan).map(
          ([key, values]) => {
              return values
          }
        );
        let sumBan =  0
        summedDataBan.forEach((item)=>{
       if(item.length > 1){
        sumBan = sumBan + item.length
       }
     
        })
     const SumMua = summedDataMua.length +1+  sumMua
     const SumBan = summedDataBan.length  +  sumBan
        const SumDate =
          (summedDataMua.length > 0 
            ? summedDataMua.length + 1
            : summedDataMua.length) + sumMua+ 
          (summedDataBan.length > 0
            ? summedDataBan.length + 1 + sumBan
            : summedDataBan.length) + 
          1;
          let dataResult = {
            SumMua,
            SumDate,
            SumBan
          }
          return dataResult 
      })
      setShowRowPansDate(TotalDate.map(item=>item.SumDate))
      setShowRowPansMua(TotalDate.map(item=>item.SumMua))
      setShowRowPansBan(TotalDate.map(item=>item.SumBan))

    }else{
      // showw false
        // ẩn chi tiết
      const elements: NodeListOf<Element> = document.querySelectorAll(".showAllH");
      elements.forEach((item: Element) => {
        item.classList.add("hidden");
      });
      const showAllU: NodeListOf<Element> = document.querySelectorAll(".showAllU");
      showAllU.forEach((item: Element) => {
        item.classList.remove("hidden");
        
      });
      const TotalDate =   dataTradeLog.map((item: any, index: number) => {
        // mua
        const ArrayMua = item?.filter(
          (e: ReportData) =>
            e?.ASTOCKCODE !== null && e?.AORDERTYPE === "M"
        ); // 6 cả null

        const grupMua = converReport(ArrayMua);

        const summedDataMua = Object.entries(grupMua).map(
          ([key, values]) => {
            return {
              ValueArray: values,
            };
          }
        );
        let sumMua =  0
           summedDataMua.forEach((item)=>{
          if(item.ValueArray.length > 1){
            sumMua = sumMua + item.ValueArray.length
          }
           
        })
      
        // bán

        const ArrayBan = item?.filter(
          (e: ReportData) =>
            e?.ASTOCKCODE !== null && e?.AORDERTYPE ==="B"
        );

        const grupBan = converReport(ArrayBan);
          
        const summedDataBan = Object.entries(grupBan).map(
          ([key, values]) => {
              return values
          }
        );
        let sumBan =  0
        summedDataBan.forEach((item)=>{
       if(item.length > 1){
        sumBan = sumBan + item.length
       }
     
        })
     const SumMua = summedDataMua.length +1
     const SumBan = summedDataBan.length 
        const SumDate =
          (summedDataMua.length > 0 
            ? summedDataMua.length + 1
            : summedDataMua.length) + 
          (summedDataBan.length > 0
            ? summedDataBan.length + 1 
            : summedDataBan.length) + 
          1;
          let dataResult = {
            SumMua,
            SumDate,
            SumBan
          }
          return dataResult 
      })
      setShowRowPansDate(TotalDate.map(item=>item.SumDate))
      setShowRowPansMua(TotalDate.map(item=>item.SumMua))
      setShowRowPansBan(TotalDate.map(item=>item.SumBan))
    }
  };
  // show Mua
  const showIcon = (address: any) => {
    const { nodeE, index, count, counValueArray, key, keyIcon, type } = address;
    setShowRowPansDate((prevState) => {
      const newState = [...prevState];
      if (newState[index] > 0) {
        newState[index] += counValueArray;
      } else {
        newState[index] = count + counValueArray; // 7
      }
      return newState;
    });
    if (type == "mua") {
      // mua
      setShowRowPansMua((prevState) => {
        const newState = [...prevState];
        if (newState[index] > 0) {
          newState[index] += counValueArray;
        } else {
          newState[index] = key + counValueArray;
        }
        return newState;
      });

      document
        .querySelector(`.IconUpTable${index}${keyIcon}`)
        ?.classList.remove("hidden");
      document
        .querySelector(`.IconDownTable${index}${keyIcon}`)
        ?.classList.add("hidden");
      const elements: NodeListOf<Element> = document.querySelectorAll(
        `.trChildren${index}${keyIcon}`
      );
      elements.forEach((item: Element) => {
        item.classList.remove("hidden");
      });
    } else {
      setShowRowPansBan((prevState) => {
        const newState = [...prevState];
        if (newState[index] > 0) {
          newState[index] += counValueArray;
        } else {
          newState[index] = key + counValueArray;
        }
        return newState;
      });
      document
        .querySelector(`.IconUpTableBan${index}${keyIcon}`)
        ?.classList.remove("hidden");
      document
        .querySelector(`.IconDownTableBan${index}${keyIcon}`)
        ?.classList.add("hidden");
      const elements: NodeListOf<Element> = document.querySelectorAll(
        `.trChildrenBan${index}${keyIcon}`
      );
      elements.forEach((item: Element) => {
        item.classList.remove("hidden");
      });
    }
  };
  // ẩn
  const HuyShowIcon = (address: any) => {
    const { nodeE, index, count, counValueArray, key, keyIcon, type } = address;
    // ngày tháng
    setShowRowPansDate((prevState) => {
      const newState = [...prevState];
      newState[index] -= counValueArray;
      return newState;
    });
    // mua
    if (type == "mua") {
      setShowRowPansMua((prevState) => {
        const newState = [...prevState];
        newState[index] -= counValueArray;
        return newState;
      });
      document
        .querySelector(`.IconUpTable${index}${keyIcon}`)
        ?.classList.add("hidden");
      document
        .querySelector(`.IconDownTable${index}${keyIcon}`)
        ?.classList.remove("hidden");
      const elements: NodeListOf<Element> = document.querySelectorAll(
        `.trChildren${index}${keyIcon}`
      );
      elements.forEach((item: Element) => {
        item.classList.add("hidden");
      });
    } else {
      setShowRowPansBan((prevState) => {
        const newState = [...prevState];
        newState[index] -= counValueArray;
        return newState;
      });
      document
        .querySelector(`.IconUpTableBan${index}${keyIcon}`)
        ?.classList.add("hidden");
      document
        .querySelector(`.IconDownTableBan${index}${keyIcon}`)
        ?.classList.remove("hidden");
      const elements: NodeListOf<Element> = document.querySelectorAll(
        `.trChildrenBan${index}${keyIcon}`
      );
      elements.forEach((item: Element) => {
        item.classList.add("hidden");
      });
    }
  };
  return (
    <>
      <LayoutPage content="Lịch sử khớp lệnh" PageTitle="Lịch sử khớp lệnh">
        <div className="ParentHeaderPage">
          <div className="HeaderTextShow" onClick={handleSHowAll}>
            {show ? "Xem rút gọn" : "Xem đầy đủ "}
          </div>
          <div className="HeaderPage">
            <div>
              <FromAction data={data} ChangeFuncion={updateData}>
                <SelectAction
                  Title="Loại Lệnh"
                  Options={SanGD}
                  ChangeFuncion={ChangeLoaiLenh}
                />
                <SelectAction
                  Title="Mã CK"
                  Options={MaCK}
                  ChangeFuncion={ChangeMaCK}
                />
                <InputDateAction
                  Title="Từ Ngày"
                  date={tuNgay}
                  ChangeFuncion={ChangeTuNgay}
                />
                <InputDateAction
                  Title="Đến Ngày"
                  date={denNgay}
                  ChangeFuncion={ChangeDenNgay}
                />
              </FromAction>
            </div>
            <div className="fileExcelPDF">
              <ExcelPdfAction />
            </div>
          </div>
        </div>
        <div className="contentActionGD">
          <table className="TablePage" id="tableHistoryMatChing">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Mua/Bán</th>
                <th>
                  CK
                  <i
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    title="Bấm vào từng dòng để xem chi tiết lệnh khớp – Bấm vào cả dòng mã đều xổ ra chi tiết"
                  ></i>
                </th>
                <th>KL Khớp</th>
                <th>Giá khớp</th>
                <th>Giá trị</th>
                <th>
                  Thuế TN từ Chuyển <br /> nhượng chứng khoán
                </th>
                <th>
                  Thuế TN từ Đầu tư <br /> vốn
                </th>
                <th>Phí </th>
              </tr>
            </thead>
            <tbody>
              {dataTradeLog.map((item: any, index: number) => {
                // mua
                const ArrayMua = item?.filter(
                  (e: ReportData) =>
                    e?.ASTOCKCODE !== null && e?.AORDERTYPE === "M"
                ); // 6 cả null

                const grupMua = converReport(ArrayMua);

                const summedDataMua = Object.entries(grupMua).map(
                  ([key, values]) => {
                    const AMATCHED_QTY = values.reduce(
                      (sum: number, item: ReportData) =>
                        sum + item.AMATCHED_QTY,
                      0
                    );
                    const AMATCHED_PRC = values.reduce(
                      (sum: number, item: ReportData) =>
                        sum + item.AMATCHED_PRC,
                      0
                    );
                    const AMATCHED_AMT = values.reduce(
                      (sum: number, item: ReportData) =>
                        sum + item.AMATCHED_AMT,
                      0
                    );
                    const ACHARGE3 = values.reduce(
                      (sum: number, item: ReportData) => sum + item.ACHARGE3,
                      0
                    );
                    const ACHARGE_DTV = values.reduce(
                      (sum: number, item: ReportData) => sum + item.ACHARGE_DTV,
                      0
                    );
                    const ACHARGE = values.reduce(
                      (sum: number, item: ReportData) => sum + item.ACHARGE,
                      0
                    );

                    return {
                      ASTOCKCODE: key,
                      AMATCHED_QTY: AMATCHED_QTY / values?.length,
                      AMATCHED_PRC,
                      AMATCHED_AMT,
                      ACHARGE3,
                      ACHARGE_DTV,
                      ACHARGE,
                      ValueArray: values,
                    };
                  }
                );
                const TongMua = item?.find(
                  (e: ReportData) =>
                    e?.ASTOCKCODE == null && e?.AORDERTYPE === "M"
                );
                // bán

                const ArrayBan = item?.filter(
                  (e: ReportData) =>
                    e?.ASTOCKCODE !== null && e?.AORDERTYPE === "B"
                );

                const grupBan = converReport(ArrayBan);
                const summedDataBan = Object.entries(grupBan).map(
                  ([key, values]) => {
                    const AMATCHED_QTY = values.reduce(
                      (sum: number, item: ReportData) =>
                        sum + item.AMATCHED_QTY,
                      0
                    );
                    const AMATCHED_PRC = values.reduce(
                      (sum: number, item: ReportData) =>
                        sum + item.AMATCHED_PRC,
                      0
                    );
                    const AMATCHED_AMT = values.reduce(
                      (sum: number, item: ReportData) =>
                        sum + item.AMATCHED_AMT,
                      0
                    );
                    const ACHARGE3 = values.reduce(
                      (sum: number, item: ReportData) => sum + item.ACHARGE3,
                      0
                    );
                    const ACHARGE_DTV = values.reduce(
                      (sum: number, item: ReportData) => sum + item.ACHARGE_DTV,
                      0
                    );
                    const ACHARGE = values.reduce(
                      (sum: number, item: ReportData) => sum + item.ACHARGE,
                      0
                    );

                    return {
                      ASTOCKCODE: key,
                      AMATCHED_QTY,
                      AMATCHED_PRC,
                      AMATCHED_AMT,
                      ACHARGE3,
                      ACHARGE_DTV,
                      ACHARGE,
                      ValueArray: values,
                    };
                  }
                );
              
                const TongBan = item.find(
                  (e: ReportData) =>
                    e?.ASTOCKCODE == null && e?.AORDERTYPE === "B"
                );
                const RowSPanCount =
                  (summedDataMua.length > 0
                    ? summedDataMua.length + 1
                    : summedDataMua.length) +
                  (summedDataBan.length > 0
                    ? summedDataBan.length + 1
                    : summedDataBan.length) +
                  1;
                return (
                  <>
                    <tr>
                      <td
                        className="textCenter"
                        rowSpan={
                          showRowPansDate[index] > 0
                            ? showRowPansDate[index]
                            : RowSPanCount
                        }
                      >
                        {converDate(item[0]?.ATRADEDATE)}
                        {/* {index} */}
                      </td>
                      {ArrayMua.length > 0 ? (
                        <td
                          className="textCenter"
                          rowSpan={
                            showRowPansMua[index] > 0
                              ? showRowPansMua[index]
                              : summedDataMua.length + 1
                          }
                        >
                          MUA
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                    {/* mua  */}
                    {summedDataMua.length > 0
                      ? summedDataMua?.map((element: any, key: number) => {
                          return (
                            <>
                              <tr key={key} className="tdHover">
                                <td className="stockCodeTD textCenter">
                                  <div> {element.ASTOCKCODE} </div>
                                  {element.ValueArray.length > 1 ? (
                                    <>
                                      <div className="icontable">
                                        <button
                                          className={`showAllU IconDownTable${index}${key}`}
                                          onClick={(e) =>
                                            showIcon({
                                              type: "mua",
                                              nodeE: e,
                                              index: index, // vi trí -ngay thang  0
                                              count: RowSPanCount, // span đầu tiên
                                              //  số lượng mảng  2
                                              counValueArray:
                                                element?.ValueArray?.length,
                                              key: summedDataMua.length + 1, // show mua  4
                                              keyIcon: key, //  viji trsi
                                            })
                                          }
                                        >
                                          <i className="fa fa-duotone fa-caret-down"></i>
                                        </button>
                                        <button
                                          // className="IconUpTable hidden "
                                          className={`showAllH IconUpTable${index}${key} hidden`}
                                          onClick={(e) =>
                                            HuyShowIcon({
                                              type: "mua",
                                              nodeE: e,
                                              index: index, // vi trí -ngay thang
                                              count: RowSPanCount, // span đầu tiên
                                              //  số lượng mảng
                                              counValueArray:
                                                element?.ValueArray?.length,
                                              key: summedDataMua.length + 1, // show mua
                                              keyIcon: key,
                                            })
                                          }
                                        >
                                          <i className="fa fa-duotone fa-caret-up"></i>
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td className="stockCodeTD">
                                  {formatNumber(element.AMATCHED_QTY)}
                                </td>
                                <td className="stockCodeTD">
                                  {formatNumber(element.AMATCHED_PRC)}
                                </td>
                                <td className="stockCodeTD">
                                  {formatNumber(element.AMATCHED_AMT)}
                                </td>
                                <td className="stockCodeTD">
                                  {formatNumber(element.ACHARGE3)}
                                </td>
                                <td className="stockCodeTD">
                                  {formatNumber(element.ACHARGE_DTV)}
                                </td>
                                <td className="stockCodeTD">
                                  {formatNumber(element.ACHARGE)}
                                </td>
                              </tr>
                              {/* chi tiết  */}
                              {element.ValueArray.length > 1
                                ? element.ValueArray.map(
                                    (eleItem: any, count: number) => {
                                      return (
                                        <tr
                                          className={`showAllH trChildren${index}${key} hidden tdHover`}
                                          key={count}
                                        >
                                          <td> </td>
                                          <td>
                                            {formatNumber(eleItem.AMATCHED_QTY)}
                                          </td>
                                          <td>
                                            {formatNumber(eleItem.AMATCHED_PRC)}
                                          </td>
                                          <td>
                                            {formatNumber(eleItem.AMATCHED_AMT)}
                                          </td>
                                          <td>
                                            {formatNumber(eleItem.ACHARGE3)}
                                          </td>
                                          <td>
                                            {formatNumber(eleItem.ACHARGE_DTV)}
                                          </td>
                                          <td>
                                            {formatNumber(eleItem.ACHARGE)}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )
                                : ""}
                            </>
                          );
                        })
                      : ""}
                    {/* tổng */}
                    {ArrayMua.length > 0 ? (
                      <tr className="totalBuySell">
                        <td className="textCenter" colSpan={4}>
                          Tổng Mua
                        </td>
                        <td>{formatNumber(TongMua.AMATCHED_AMT)} </td>
                        <td>{formatNumber(TongMua.ACHARGE3)} </td>
                        <td>{formatNumber(TongMua.ACHARGE_DTV)} </td>
                        <td>{formatNumber(TongMua.ACHARGE)} </td>
                      </tr>
                    ) : (
                      ""
                    )}
   {/* bán  */}
                    {ArrayBan.length > 0 ? (
                      <>
                      {/* mappp p pp  */}
             
                        <tr className="tdHover">
                          <td
                            className="sellHover textCenter"
                            rowSpan={
                              showRowPansBan[index] > 0
                                ? showRowPansBan[index]
                                : summedDataBan.length
                            }
                          >
                            Bán
                          </td>
                          <td className="textCenter stockCodeTD">
                            {summedDataBan[0].ASTOCKCODE}
                            {summedDataBan[0].ValueArray.length >1 ? (
                              <>
                                <div className="icontable">
                                  <button
                                    className={`showAllU IconDownTableBan${index}${0}`}
                                    onClick={(e) =>
                                      showIcon({
                                        type: "ban",
                                        nodeE: e,
                                        index: index, // vi trí -ngay thang  0
                                        count: RowSPanCount, // span đầu tiên
                                        //  số lượng mảng  2
                                        counValueArray:
                                          summedDataBan[0]?.ValueArray?.length,
                                        key: summedDataBan.length, // show mua  4
                                        keyIcon: 0, //  viji trsi
                                      })
                                    }
                                  >
                                    <i className="fa fa-duotone fa-caret-down"></i>
                                  </button>
                                  <button
                                    // className="IconUpTable hidden "
                                    className={`showAllH IconUpTableBan${index}${0} hidden`}
                                    onClick={(e) =>
                                      HuyShowIcon({
                                        type: "ban",
                                        nodeE: e,
                                        index: index, // vi trí -ngay thang
                                        count: RowSPanCount, // span đầu tiên
                                        //  số lượng mảng
                                        counValueArray:
                                          summedDataBan[0]?.ValueArray?.length,
                                        key: summedDataMua.length, // show mua
                                        keyIcon: 0,
                                      })
                                    }
                                  >
                                    <i className="fa fa-duotone fa-caret-up"></i>
                                  </button>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="stockCodeTD">
                            {formatNumber(summedDataBan[0].AMATCHED_QTY)}
                          </td>
                          <td className="stockCodeTD">
                            {formatNumber(summedDataBan[0].AMATCHED_PRC)}
                          </td>
                          <td className="stockCodeTD">
                            {formatNumber(summedDataBan[0].AMATCHED_AMT)}
                          </td>
                          <td className="stockCodeTD">
                            {formatNumber(summedDataBan[0].ACHARGE3)}
                          </td>
                          <td className="stockCodeTD">
                            {formatNumber(summedDataBan[0].ACHARGE_DTV)}
                          </td>
                          <td className="stockCodeTD">
                            {formatNumber(summedDataBan[0].ACHARGE)}
                          </td>
                        </tr>
                        {/* phần tử t2  */}
                      </>
                    ) : (
                      ""
                    )}
                    {summedDataBan[0]?.ValueArray.length > 1
                      ? summedDataBan[0]?.ValueArray.map(
                          (itemChildren: any, count: number) => {
                            return (
                              <>
                                <tr
                                  className={`showAllH trChildrenBan${index}${0} hidden tdHover`}
                                  key={count}
                                >
                                  <td> </td>
                                  <td>
                                    {formatNumber(itemChildren.AMATCHED_QTY)}
                                  </td>
                                  <td>
                                    {formatNumber(itemChildren.AMATCHED_PRC)}
                                  </td>
                                  <td>
                                    {formatNumber(itemChildren.AMATCHED_AMT)}
                                  </td>
                                  <td>{formatNumber(itemChildren.ACHARGE3)}</td>
                                  <td>
                                    {formatNumber(itemChildren.ACHARGE_DTV)}
                                  </td>
                                  <td>{formatNumber(itemChildren.ACHARGE)}</td>
                                </tr>
                              </>
                            );
                          }
                        )
                      : ""}

                    {summedDataBan.length > 0
                      ? summedDataBan?.map((element: any, key: number) => {
                          if (key > 0) {
                            return (
                              <>
                                <tr key={key} className="tdHover">
                                  <td className="textCenter stockCodeTD">
                                    {element.ASTOCKCODE}
                                    {element.ValueArray.length > 1 ? (
                                      <>
                                        <div className="icontable">
                                          <button
                                            className={`showAllU IconDownTableBan${index}${key}`}
                                            onClick={(e) =>
                                              showIcon({
                                                type: "ban",
                                                nodeE: e,
                                                index: index, // vi trí -ngay thang  0
                                                count: RowSPanCount, // span đầu tiên
                                                //  số lượng mảng  2
                                                counValueArray:
                                                  element?.ValueArray?.length,
                                                key: summedDataBan.length, // show mua  4
                                                keyIcon: key, //  viji trsi
                                              })
                                            }
                                          >
                                            <i className="fa fa-duotone fa-caret-down"></i>
                                          </button>
                                          <button
                                            // className="IconUpTable hidden "
                                            className={`showAllH IconUpTableBan${index}${key} hidden`}
                                            onClick={(e) =>
                                              HuyShowIcon({
                                                type: "ban",
                                                nodeE: e,
                                                index: index, // vi trí -ngay thang
                                                count: RowSPanCount, // span đầu tiên
                                                //  số lượng mảng
                                                counValueArray:
                                                  element?.ValueArray?.length,
                                                key: summedDataBan.length + 1, // show mua
                                                keyIcon: key,
                                              })
                                            }
                                          >
                                            <i className="fa fa-duotone fa-caret-up"></i>
                                          </button>
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                  <td className="stockCodeTD">
                                    {formatNumber(element.AMATCHED_QTY)}
                                  </td>
                                  <td className="stockCodeTD">
                                    {formatNumber(element.AMATCHED_PRC)}
                                  </td>
                                  <td className="stockCodeTD">
                                    {formatNumber(element.AMATCHED_AMT)}
                                  </td>
                                  <td className="stockCodeTD">
                                    {formatNumber(element.ACHARGE3)}
                                  </td>
                                  <td className="stockCodeTD">
                                    {formatNumber(element.ACHARGE_DTV)}
                                  </td>
                                  <td className="stockCodeTD">
                                    {formatNumber(element.ACHARGE)}
                                  </td>
                                </tr>
                                {element.ValueArray.length > 1
                                  ? element.ValueArray.map(
                                      (itemChildren: any, count: number) => {
                                        return (
                                          <>
                                            <tr
                                              className={`showAllH trChildrenBan${index}${key} hidden tdHover`}
                                              key={count}
                                            >
                                              <td></td>
                                              <td>
                                                {formatNumber(
                                                  itemChildren.AMATCHED_QTY
                                                )}
                                              </td>
                                              <td>
                                                {formatNumber(
                                                  itemChildren.AMATCHED_PRC
                                                )}
                                              </td>
                                              <td>
                                                {formatNumber(
                                                  itemChildren.AMATCHED_AMT
                                                )}
                                              </td>
                                              <td>
                                                {formatNumber(
                                                  itemChildren.ACHARGE3
                                                )}
                                              </td>
                                              <td>
                                                {formatNumber(
                                                  itemChildren.ACHARGE_DTV
                                                )}
                                              </td>
                                              <td>
                                                {formatNumber(
                                                  itemChildren.ACHARGE
                                                )}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      }
                                    )
                                  : ""}
                              </>
                            );
                          }
                        })
                      : ""}
                    {/* tổng bán  */}
                    {ArrayBan.length > 0 ? (
                      <tr className="totalBuySell">
                        <td className="textCenter" colSpan={4}>
                          Tổng Bán
                        </td>
                        <td>{formatNumber(TongBan.AMATCHED_AMT)} </td>
                        <td>{formatNumber(TongBan.ACHARGE3)} </td>
                        <td>{formatNumber(TongBan.ACHARGE_DTV)} </td>
                        <td>{formatNumber(TongBan.ACHARGE)} </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </LayoutPage>
    </>
  );
};
export default HistoryMatching;
