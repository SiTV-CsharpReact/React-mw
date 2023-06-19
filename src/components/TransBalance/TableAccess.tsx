import React, { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../../store/configureStore";
import { formatNumber, formatNumberMarket } from "../../utils/util";
import axios from "axios";
import io from 'socket.io-client';
const TableAsset = (props: any) => {
    const { assetReport } = useAppSelector((state) => state.assetReport);
    const [dataTable, setDataTable] = useState([])
    const [dataHSX, setDataHSX] = useState<any[]>([])
    const [dataHNX, setDataHNX] = useState<any[]>([])
    const [short, setShort] = useState(false);
    const [sort, setSort] = useState("asc");
    const [label, setLabel] = useState("");
    const { mode } = useAppSelector((state) => state.settingColorMode);

    useEffect(() => {
        if (props.short)
        setShort(!short);
    }, [props.short]);
    const handleSort = (key: string) => {
        setLabel(key);
        if (sort === "asc") {
            const sorted: any = [...dataTable].sort((a: any, b: any) => {
                if (a[key] === "string" && b[key] === "string") {
                    return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
                }
                return a[key] > b[key] ? 1 : -1;
            });
            setDataTable(sorted);
            setSort("desc");
        }
        if (sort === "desc") {
            const sorted: any = [...dataTable].sort((a: any, b: any) => {
                if (a[key] === "string" && b[key] === "string") {
                    return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
                }
                return a[key] < b[key] ? 1 : -1;
            });
            setDataTable(sorted);
            setSort("asc");
        }
    };
    useEffect(() => {
        let arr = assetReport?.Table1?.map((item: any) => item);
        const sorted = arr?.sort((a: any, b: any) =>
            a.ASTOCKCODE > b.ASTOCKCODE ? 1 : -1
        );
        setLabel("ASTOCKCODE");
        setDataTable(sorted);
    }, [assetReport]);
    useEffect(() => {
        dataTable?.forEach((item: any) => {
            const code = item?.Value.StockCode;
            fetchDataHSN(code);
            fetchDataHNN(code)
        });
    }, [dataTable]);
    let dataArrHSX : any[]  = [];
    let dataArrHNX = [];
    
    const fetchDataHSN = async (code: string) => {
        const { data } = await axios.get(`https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${code}`)
        
        data.map((item: any) =>
              dataArrHSX.push([item?.Info?.[0][1], "HSX", item?.Info?.[31][1]])
        )
        if (dataArrHSX?.length > 0) {

        }

    }
    console.log("first item", dataArrHSX)
    const fetchDataTable = async () => {
        const { data } = await axios.get("http://localhost:3111/Data")
        
        setDataTable(data)
    }
    const fetchDataHNN = async (code: string) => {
        const { data } = await axios.get(`https://marketstream.fpts.com.vn/hnx/data.ashx?s=quote&l=${code}`)
          data.map((item: any) =>
            dataArrHNX.push([item?.Info?.[12][1], "HNX", item?.Info?.[31][1]])
        )
        if (dataArrHNX?.length > 0) {
        }
        setDataHNX(data)
    }
     useEffect(() => {
        fetchDataTable()
     }, [])
    
const mergedData = dataTable?.map((item: any) => {
  const dataHSXItem = dataArrHSX?.find((dataItem: any) => dataItem[0] === item.Key);
  console.log("dataHSXItem", dataArrHSX);

  return {
    ...item,
    dataHSXItem: dataHSXItem ? dataHSXItem[0] : null,
  };
});
    console.log("first merged", mergedData)
    return (
        <div className={`table_detail_BCTS !h-[614px] mt-5 ${mode}-bg`}>
            {short ? (
                <table>
                    <thead>
                        <tr role="row" className="font-bold bg-[#F3F3F3]">
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs `}
                                style={{ width: "5%" }}
                                onClick={() => handleSort("ASTOCKCODE")}
                            >
                                <div className={`relative ${mode}-text`}>
                                    Mã CK
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "ASTOCKCODE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "ASTOCKCODE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-left pl-1 !text-xs ${mode}-text`}
                                style={{ width: "6.2%" }}
                                onClick={() => handleSort("ATRADING_READY_TOTAL")}
                            >
                                <div className="relative">
                                    SL có thể <br /> đặt bán
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "ATRADING_READY_TOTAL" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "ATRADING_READY_TOTAL" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}

                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "6%" }}
                            >
                                <div>SL bán  <br /> chờ khớp</div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                            >
                                <div>Bán T0</div>
                            </td>
                            <td
                                colSpan={3}

                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "7%" }}
                            >
                                <div>CK mua chờ về</div>
                            </td>
                            <td
                                rowSpan={2}


                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "6%" }}
                            >
                                <div> CK <br /> quyền  <br /> chờ về</div>
                            </td>

                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                            >
                                <div>Hạn chế</div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-left pl-1 !text-xs ${mode}-text`}
                                style={{ width: "5.7%" }}
                                onClick={() => handleSort("ATOTAL_AMOUNT")}
                            >
                                <div className="relative">
                                    Tổng KL
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "ATOTAL_AMOUNT" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "ATOTAL_AMOUNT" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>

                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                                onClick={() => handleSort("AMARKET_VALUE")}
                            >
                                <div className="relative">
                                    Giá TT
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "AMARKET_VALUE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">

                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">

                                                </span>
                                            </>
                                        ) : label === "AMARKET_VALUE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                            >
                                <div>Giá trị <br /> thị trường</div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "6%" }}
                                onClick={() => handleSort("AROOT_VALUE")}
                            >
                                <div className="relative">
                                    Giá TB <br /> tạm tính
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "AROOT_VALUE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">

                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">

                                                </span>
                                            </>
                                        ) : label === "AROOT_VALUE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-left pl-1 !text-xs ${mode}-text`}
                                style={{ width: "5.3%" }}
                                onClick={() => handleSort("APROFIT_LOSS_VAL")}
                            >
                                <div className="relative">
                                    Giá trị gốc
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "APROFIT_LOSS_VAL" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "APROFIT_LOSS_VAL" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-left !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                                onClick={() => handleSort("APROFIT_LOSS_VAL")}
                            >
                                <div className="relative">
                                    Lãi/Lỗ  <br /> dự kiến
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "APROFIT_LOSS_VAL" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "APROFIT_LOSS_VAL" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-left !text-xs ${mode}-text`}
                                style={{ width: "5.8%" }}
                                onClick={() => handleSort("APROFIT_LOSS_RATE")}
                            >
                                <div className="relative">
                                    % Lãi/Lỗ  <br /> dự kiến
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "APROFIT_LOSS_RATE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "APROFIT_LOSS_RATE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                        </tr>

                        <tr role="row" className="bg-[#F3F3F3]">

                            <td className={`!text-center font-bold !text-xs ${mode}-text`}>
                                <div>T0</div>
                            </td>
                            <td className={`!text-center font-bold !text-xs ${mode}-text`}>
                                <div>T1</div>
                            </td>
                            <td className={`!text-center font-bold !text-xs ${mode}-text`}>
                                <div>T2</div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable?.map((item: any, index: number) => {
                            const dataHSXItem = dataHSX[index];
                            return <tr key={item.Key}>
                                <td className={`!text-center !text-xs ${mode}-text`}>
                                    {item?.Value.StockCode}
                                </td>
                                <td className={`!text-center !text-xs ${mode}-text`}>
                                    {formatNumberMarket(item?.Value.AvailableOrderSecurities)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.AvailableOrderSecuritiesMar)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>{item.ABUY_INTRADY}</td>
                                <td className={`${mode}-text !text-xs`}>{item.AT1}</td>
                                <td className={`${mode}-text !text-xs`}>{item.AT2}</td>
                                <td className={`${mode}-text !text-xs`}>
                                    {item.AWAIT_REC_RIGHT}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {item.AMORTGATE_BANK}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {item.ATRANSFER_RESTRICTED}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.TotalAmount)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {/* {formatNumberMarket(item?.Value.MarketPrice)}  */}
                                    {dataHSXItem?.Info?.[31][1]}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.RootValue)}
                                </td>

                                <td
                                    className={`!text-xs `}
                                >
                                    {formatNumberMarket(item?.Value.AveragePrice)}
                                </td>
                                <td
                                    className={`!text-xs `}
                                >
                                    {formatNumberMarket(item?.Value.RootValue)}
                                </td>
                                <td className={`${mode}-text !text-xs ${item?.Value.AveragePrice < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}>
                                    {item.ACAPITAL_STRUCTURE}%
                                </td>
                                <td className={`${mode}-text !text-xs ${item?.Value.AveragePrice < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}>
                                    {item.APORTFOLIO_RATE}%
                                </td>

                            </tr>

                        })}
                    </tbody>
                    <tfoot>
                        <tr role="row">
                            <td
                                className="!text-center uppercase font-bold !text-xs"
                                colSpan={10}
                            >
                                TỔNG
                            </td>
                            <td className="font-bold !text-xs">
                                {formatNumber(
                                    assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.AMARKET_VALUE,
                                        0
                                    )
                                )}
                            </td>
                            <td className="!text-xs"></td>
                            <td className="font-bold !text-xs">
                                {formatNumber(
                                    assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.AROOT_VALUE,
                                        0
                                    )
                                )}
                            </td>
                            <td
                                className={`!text-xs ${formatNumber(
                                    assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                                        0
                                    )
                                ) < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}
                            >
                                {formatNumber(
                                    assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                                        0
                                    )
                                )}
                            </td>
                            <td
                                className={`!text-xs ${formatNumber(
                                    assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.APROFIT_LOSS_RATE,
                                        0
                                    )
                                ) < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}
                            >
                                {(
                                    (assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                                        0
                                    ) /
                                        assetReport?.Table1?.reduce(
                                            (a: any, b: any) => a + b.AROOT_VALUE,
                                            0
                                        )) *
                                    100
                                ).toFixed(2)}
                                %
                            </td>
                            <td
                                className={`!text-xs ${formatNumber(
                                    assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.APROFIT_LOSS_RATE,
                                        0
                                    )
                                ) < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}
                            >
                                {(
                                    (assetReport?.Table1?.reduce(
                                        (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                                        0
                                    ) /
                                        assetReport?.Table1?.reduce(
                                            (a: any, b: any) => a + b.AROOT_VALUE,
                                            0
                                        )) *
                                    100
                                ).toFixed(2)}
                                %
                            </td>

                        </tr>
                    </tfoot>
                </table>
            ) : (
                <table >
                    <thead>
                        <tr role="row" className="font-bold bg-[#F3F3F3] ">
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs !py-4`}
                                style={{ width: "5%" }}
                                onClick={() => handleSort("ASTOCKCODE")}
                            >
                                <div className={`relative ${mode}-text`}>
                                    Mã CK
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "ASTOCKCODE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "ASTOCKCODE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "6.2%" }}
                                onClick={() => handleSort("ATRADING_READY_TOTAL")}
                            >
                                <div className="relative">
                                    SL có thể <br />đặt bán
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "ATRADING_READY_TOTAL" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "ATRADING_READY_TOTAL" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "7%" }}
                            >
                                <div> SL bán <br /> chờ khớp</div>
                            </td>

                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "6%" }}
                            >
                                <div>CK chờ về</div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5.7%" }}
                                onClick={() => handleSort("ATOTAL_AMOUNT")}
                            >
                                <div className="relative">
                                    Tổng KL
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "ATOTAL_AMOUNT" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "ATOTAL_AMOUNT" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                            >
                                <div>Giá TT</div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "7%" }}
                                onClick={() => handleSort("AMARKET_VALUE")}
                            >
                                <div className="relative">
                                    Giá trị <br />  thị trường
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "AMARKET_VALUE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "AMARKET_VALUE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                            >
                                <div>Giá TB <br /> tạm tính</div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "7.5%" }}
                                onClick={() => handleSort("AROOT_VALUE")}
                            >
                                <div className="relative">
                                    Giá trị gốc
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "AROOT_VALUE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "AROOT_VALUE" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5%" }}
                                onClick={() => handleSort("APROFIT_LOSS_VAL")}
                            >
                                <div className="relative">
                                    Lãi/Lỗ <br /> dự kiến
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "APROFIT_LOSS_VAL" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "APROFIT_LOSS_VAL" && sort === "asc" ? (
                                            <span className="absolute -top-2">
                                                <i className="fa fa-caret-down" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2">
                                                <i className="fa fa-caret-up" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                            <td
                                rowSpan={2}
                                className={`!text-center !text-xs ${mode}-text`}
                                style={{ width: "5.8%" }}
                                onClick={() => handleSort("APROFIT_LOSS_RATE")}
                            >
                                <div className="relative">
                                    % Lãi/Lỗ  <br /> dự kiến
                                    <span className="absolute translate-y-1/2 top-1/2 right-2">
                                        {label !== "APROFIT_LOSS_RATE" ? (
                                            <>
                                                <span className="absolute top-[65%] -translate-y-[65%]">
                                                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                                                </span>
                                                <span className="absolute -bottom-[65%] translate-y-[65%]">
                                                    <i
                                                        className="fa fa-caret-down"
                                                        aria-hidden="true"
                                                    ></i>
                                                </span>
                                            </>
                                        ) : label === "APROFIT_LOSS_RATE" && sort === "asc" ? (
                                            <span className="absolute -top-2 !text-[#717171]">
                                                <i className="fa fa-caret-down !text-[#717171]" aria-hidden="true"></i>
                                            </span>
                                        ) : (
                                            <span className="absolute -bottom-2 !text-[#717171]">
                                                <i className="fa fa-caret-up !text-[#717171]" aria-hidden="true"></i>
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable?.map((item: any, index: number) => (
                            <tr key={item.Key}>
                                <td className={`!text-center cursor-pointer !font-bold !text-[#007DB7] !text-xs ${mode}-text`}>
                                    {item.Value.StockCode}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.AvailableOrderSecurities)}
                                </td>

                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.AvailableOrderSecuritiesMar)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.WaitingReceiveRightSecurities)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.TotalAmount)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.MarketPrice)}
                                </td>
                                <td className={`${mode}-text !text-xs`}>
                                    {formatNumberMarket(item?.Value.RootValue)}
                                </td>
                                <td
                                    className={`!text-xs `}
                                >
                                    {formatNumberMarket(item?.Value.AveragePrice)}
                                </td>
                                <td
                                    className={`!text-xs`}
                                >
                                    {formatNumberMarket(item?.Value.RootValue)}
                                </td>
                                <td className={`${mode}-text !text-xs ${item?.Value.AveragePrice < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}>
                                    {item.ACAPITAL_STRUCTURE}
                                </td>
                                <td className={`${mode}-text ${item?.Value.AveragePrice < 0
                                        ? "!text-[#FF0000]"
                                        : "!text-[#00b050]"
                                    }`}>
                                    {item.APORTFOLIO_RATE}%
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={6} className="!text-center">TỔNG</td>
                            <td>50,451,750</td>
                            <td></td>
                            <td>51,282,365</td>
                            <td>-830,615</td>
                            <td>-1.62%</td>

                        </tr>
                    </tfoot>

                </table>
            )}
        </div>
    );
};

export default TableAsset;
