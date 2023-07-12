import React, { useCallback, useEffect, useState } from "react";
import "./table.scss";
import { formatNumber, listDataCompany } from "../../utils/util";
import { useAppSelector, RootState } from "../../store/configureStore";

const TableGDTTMarketWatch = () => {
  const { keyMenu, nameMenu } = useAppSelector(
    (state: RootState) => state.menuBar
  );
  const { DataBi, DataPt, NameFloor } = useAppSelector(
    (state: RootState) => state.table
  );
  const [input, setInput] = useState<any>({
    value: "",
    filter: {},
    focus: false,
  });
  const [listDataStockCode, setListDataStockCode] = useState<any>({
    HA: [],
    HO: [],
    UPCOM: [],
  });
  const [data, setData] = useState<any>({
    filter: [],
    default: [],
  });
  const [iFloor, setIFloor] = useState<any>(NameFloor);

  // Lọc mã theo sàn
  const filterStockCodesByExchange = (listDataCompany: any) => {
    let listDataStockCodeHa: any = [];
    let listDataStockCodeHo: any = [];
    let listDataStockCodeUpcom: any = [];

    listDataCompany?.forEach((item: any) => {
      if (item.Ex === "HA") {
        listDataStockCodeHa.push(item.stock_code);
      } else if (item.Ex === "HO") {
        listDataStockCodeHo.push(item.stock_code);
      } else if (item.Ex === "UP") {
        listDataStockCodeUpcom.push(item.stock_code);
      }
    });

    setListDataStockCode({
      ...listDataStockCode,
      HA: listDataStockCodeHa,
      HO: listDataStockCodeHo,
      UPCOM: listDataStockCodeUpcom,
    });
  };

  // Gọi hàm filterStockCodesByExchange khi listDataCompany thay đổi
  useEffect(() => {
    filterStockCodesByExchange(listDataCompany);
  }, [listDataCompany]);

  // Gán mã theo sàn vào biến
  useEffect(() => {
    setInput({ ...input, value: "", filter: "" });
    if (keyMenu === 2 && nameMenu === "Giao dịch thỏa thuận") {
      setIFloor("upcom");
    } else {
      setIFloor(NameFloor);
    }
  }, [NameFloor, keyMenu, nameMenu]);

  // Gán data product vào biến
  useEffect(() => {
    setInput({ ...input, value: "", filter: "" });
    if (iFloor === "HSX") {
      setData({ ...data, default: DataPt, filter: DataPt });
    } else if (iFloor === "HNX") {
      let newData = DataPt?.filter((item: any) => {
        return listDataStockCode.HA.includes(item.Info[0][1]);
      });
      setData({ ...data, default: newData, filter: newData });
    } else {
      let newData = DataPt?.filter((item: any) => {
        return listDataStockCode.UPCOM.includes(item.Info[0][1]);
      });
      setData({ ...data, default: newData, filter: newData });
    }
  }, [iFloor, listDataStockCode, DataPt]);

  // Lọc data theo Input nhập vào
  const filterData = (value: any) => {
    const filteredData = data.default?.filter((item: any) => {
      return NameFloor === "HSX"
        ? item.Info[1][1]?.includes(value?.toUpperCase())
        : item.Info[0][1]?.includes(value?.toUpperCase());
    });

    const uniqueValues = new Set(
      filteredData?.map((item: any) =>
        NameFloor === "HSX" ? item.Info[1][1] : item.Info[0][1]
      )
    );

    const uniqueValuesArray = Array.from(uniqueValues);

    setData({ ...data, filter: filteredData });
    setInput({ ...input, filter: uniqueValuesArray });
  };
  // Gọi hàm filterData khi input thay đổi
  useEffect(() => {
    filterData(input.value);
  }, [input.value]);

  // Render table body
  const renderTableBody = () => {
    if (data.filter != null && data.filter.length > 0) {
      const sortedData = data.filter?.slice().sort((a: any, b: any) => {
        const valueA = iFloor === "HSX" ? a.Info[1][1] : a.Info[0][1];
        const valueB = iFloor === "HSX" ? b.Info[1][1] : b.Info[0][1];

        // Sắp xếp theo thứ tự ABC
        if (typeof valueA === "string" && typeof valueB === "string") {
          return valueA.localeCompare(valueB);
        } else {
          return data.filter;
        }
      });

      return sortedData?.map((product: any) => {
        let colorClass = "";

        if (iFloor === "HSX") {
          colorClass =
            product.Info[5][1] === product.Info[4][1]
              ? "text-[#66CCFF]"
              : product.Info[5][1] === product.Info[2][1]
              ? "text-[#F7FF31]"
              : product.Info[5][1] === product.Info[3][1]
              ? "text-[#FF00FF]"
              : product.Info[5][1] > product.Info[4][1] &&
                product.Info[5][1] < product.Info[2][1]
              ? "text-[#FF0000]"
              : "text-[#00FF00]";
        } else if (iFloor === "HNX") {
          colorClass =
            product.Info[7][1] === product.Info[2][1]
              ? "text-[#66CCFF]"
              : product.Info[7][1] === product.Info[1][1]
              ? "text-[#F7FF31]"
              : product.Info[7][1] === product.Info[3][1]
              ? "text-[#FF00FF]"
              : product.Info[7][1] > product.Info[2][1] &&
                product.Info[7][1] < product.Info[1][1]
              ? "text-[#FF0000]"
              : "text-[#00FF00]";
        } else {
          colorClass =
            product.Info[7][1] === product.Info[2][1]
              ? "text-[#66CCFF]"
              : product.Info[7][1] === product.Info[1][1]
              ? "text-[#F7FF31]"
              : product.Info[7][1] === product.Info[3][1]
              ? "text-[#FF00FF]"
              : product.Info[7][1] > product.Info[2][1] &&
                product.Info[7][1] < product.Info[1][1]
              ? "text-[#FF0000]"
              : "text-[#00FF00]";
        }

        return (
          <tr key={product.RowID} className={colorClass}>
            <td>
              {iFloor === "HSX" ? product.Info[1][1] : product.Info[0][1]}
            </td>
            <td className="text-right">
              {iFloor === "HSX"
                ? formatNumber(product.Info[5][1])
                : formatNumber(product.Info[7][1])}
            </td>
            <td className="text-right">{formatNumber(product.Info[6][1])}</td>
            <td className="text-right text-white">
              {formatNumber(
                iFloor === "HSX"
                  ? formatNumber(product.Info[7][1])
                  : formatNumber(product.Info[8][1])
              )}
            </td>
            <td className="text-right text-white">
              {iFloor === "HSX"
                ? product.Info[8][1].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : product.Info[9][1].toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </td>
          </tr>
        );
      });
    }

    return null;
  };
  return (
    <div id="dvFixedH">
      <div className="border-t dvContentLP border-borderHeadTableMarket">
        <div className="grid grid-cols-4 p-3">
          <div className="relative flex flex-col items-center">
            <div className="relative h-auto max-w-min">
              <label
                className={`${
                  input.focus || input.value !== ""
                    ? "inputTableGDTT text-white"
                    : "top-[50%] -translate-y-[50%] "
                } absolute bg-[#131722] text-white text-[11px] ml-1 px-1 leading-[8px] cursor-text `}
                htmlFor="maCk"
              >
                {input.focus || input.value !== "" ? "Mã" : "Nhập mã cần tìm"}
              </label>
              <input
                className="h-24 bg-[#131722] focus:border-white col-span-1 pl-1 border outline-none w-44 border-borderBodyTableMarket text-white text-[11px]"
                onChange={(e: any) => {
                  setInput({ ...input, value: e.target.value });
                }}
                value={input.value}
                name="maCk"
                id="maCk"
                autoComplete="off"
                onFocus={() => {
                  setInput({ ...input, focus: true });
                }}
                onBlur={() => {
                  setInput({ ...input, focus: false });
                }}
              ></input>
            </div>
            <div
              className={`${
                input.focus && input.filter.length > 0
                  ? "absolute top-[25px] flex flex-col items-start w-full max-h-[200px] overflow-y-auto text-white bg-[#1e1e1e] border border-[#3d414b]"
                  : "hidden"
              } `}
            >
              {input.filter.length > 0 &&
                input.filter
                  .sort((a: string, b: string) => a.localeCompare(b))
                  .map((item: any) => (
                    <span
                      key={item}
                      className="cursor-pointer leading-[24px] text-left px-[7px] text-xs hover:bg-[#9e9e9e] whitespace-nowrap w-full"
                      onMouseDown={() => {
                        setInput({ ...input, value: item });
                      }}
                    >
                      {item}
                    </span>
                  ))}
            </div>
          </div>
          {/* check NameFloor  */}
          {DataBi ? (
            NameFloor === "HSX" ? (
              <div className="flex justify-around col-span-2 pt-1 font-bold">
                <span>
                  Tổng KL GDTT :
                  <label>
                    {" "}
                    {parseFloat(
                      DataBi[4]?.f240?.replace(/,/g, "")
                    ).toLocaleString()}
                  </label>
                </span>
                <span>
                  Tổng KL GDTT :{" "}
                  <label>
                    {" "}
                    {parseFloat(
                      DataBi[4]?.f241?.replace(/,/g, "")
                    ).toLocaleString()}
                  </label>
                </span>
              </div>
            ) : (
              <div className="flex justify-around col-span-2 pt-1 font-bold">
                <span>
                  Tổng KL GDTT :
                  <label>
                    {" "}
                    {parseFloat(
                      DataBi[4]?.f240?.replace(/,/g, "")
                    ).toLocaleString()}
                  </label>
                </span>
                <span>
                  Tổng KL GDTT :{" "}
                  <label>
                    {" "}
                    {parseFloat(
                      DataBi[4]?.f241?.replace(/,/g, "")
                    ).toLocaleString()}
                  </label>
                </span>
              </div>
            )
          ) : (
            " "
          )}

          <div className="col-span-1"></div>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-1 pr-2">
            <table
              id="tbBuyPT_HA"
              className="table w-full table-PT table-bordered table-priceboard"
            >
              <thead style={{}}>
                <tr>
                  <th
                    className="hbrc text-textHeaderTableGDTT text-[13px] font-normal "
                    colSpan={4}
                  >
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
              className="table w-full table-PT table-bordered table-priceboard"
            >
              <thead style={{}}>
                <tr>
                  <th
                    className="hbrc text-textHeaderTableGDTT text-[13px] font-normal"
                    colSpan={5}
                  >
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
              <tbody id="tbdPT_HA">{renderTableBody()}</tbody>
            </table>
          </div>
          <div className="col-span-1 pl-2">
            <table
              id="tbBuyPT_HA"
              className="table w-full table-PT table-bordered table-priceboard"
            >
              <thead style={{}}>
                <tr>
                  <th
                    className="hbrc text-textHeaderTableGDTT text-[13px] font-normal"
                    colSpan={4}
                  >
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

export default React.memo(TableGDTTMarketWatch);
