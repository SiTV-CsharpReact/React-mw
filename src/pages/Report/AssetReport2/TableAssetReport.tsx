import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/configureStore";
import { formatNumber } from "../../../utils/util";
import { useTranslation } from "react-i18next";

const TableAssetReport = () => {
  const { t } = useTranslation(["home"]);
  const { assetReport } = useAppSelector((state) => state.assetReport);
  const [data, setData] = useState([]);
  const [short, setShort] = useState(false);
  const [sort, setSort] = useState("asc");
  const [label, setLabel] = useState("");
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const handleSort = (key: string) => {
    // console.log(t);
    setLabel(key);
    if (sort === "asc") {
      const sorted: any = [...data].sort((a: any, b: any) => {
        if (a[key] === "string" && b[key] === "string") {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
        }
        return a[key] > b[key] ? 1 : -1;
      });
      setData(sorted);
      setSort("desc");
    }
    if (sort === "desc") {
      const sorted: any = [...data].sort((a: any, b: any) => {
        if (a[key] === "string" && b[key] === "string") {
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
      });
      setData(sorted);
      setSort("asc");
    }
  };
  useEffect(() => {
    let arr = assetReport?.Table1?.map((item: any) => item);
    const sorted = arr?.sort((a: any, b: any) =>
      a.ASTOCKCODE > b.ASTOCKCODE ? 1 : -1
    );
    setLabel("ASTOCKCODE");
    setData(sorted);
  }, [assetReport]);
  return (
    <div className={`table_detail_BCTS ${mode}-bg`}>
      {short ? (
        <table>
          <thead>
            <tr role="row" className="tablesorter-headerRow">
              <td colSpan={6} className="!text-left">
                <div>
                  <span className={`font-bold ${mode}-text`}>
                      ẾT CHỨNG KHOÁN
                    <span
                      className={`font-medium cursor-pointer text-normalText underline italic ${mode}-text ml-2`}
                      onClick={() => setShort(!short)}
                    >
                      ({t("home:Order.View_Full")})
                    </span>
                  </span>
                </div>
              </td>
              <td colSpan={4} className={`!text-center ${mode}-text`}>
                <div>
                  <strong>LÃI/LỖ DỰ KIẾN</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td
                className={`!text-center !text-xs`}
                style={{ width: "5%" }}
                onClick={() => handleSort("ASTOCKCODE")}
              >
                <div className={`relative ${mode}-text`}>
                  Mã CK
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                className={`!text-center !text-xs ${mode}-text `}
                style={{ width: "6%" }}
                onClick={() => handleSort("ATRADING_READY_TOTAL")}
              >
                <div className="relative">
                  CK có sẵn
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "6%" }}
                onClick={() => handleSort("AWAIT_REC_RIGHT")}
              >
                <div className="relative">
                  CK chở về
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
                    {label !== "AWAIT_REC_RIGHT" ? (
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
                    ) : label === "AWAIT_REC_RIGHT" && sort === "asc" ? (
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
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "5%" }}
                onClick={() => handleSort("ATOTAL_AMOUNT")}
              >
                <div className="relative">
                  Tổng KL
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "5%" }}
              >
                <div>Giá TT</div>
              </td>
              <td
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "6%" }}
                onClick={() => handleSort("AMARKET_VALUE")}
              >
                <div className="relative">
                  Thành tiền
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "5%" }}
              >
                <div>Giá vốn TB</div>
              </td>
              <td
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "8%" }}
                onClick={() => handleSort("AROOT_VALUE")}
              >
                <div className="relative">
                  Tổng giá vốn
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                className={`!text-center !text-xs ${mode}-text `}
                style={{ width: "5%" }}
                onClick={() => handleSort("APROFIT_LOSS_VAL")}
              >
                <div className="relative">
                  Lãi/Lỗ
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                className={`!text-center !text-xs ${mode}-text `}
                style={{ width: "5%" }}
                onClick={() => handleSort("APROFIT_LOSS_RATE")}
              >
                <div className="relative">
                  % Lãi/Lỗ
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={item.ASTOCKCODE}>
                <td className={`!text-center !text-xs ${mode}-text`}>
                  {item.ASTOCKCODE}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {item.ATRADING_READY_TOTAL}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {item.ATRANSFER_RESTRICTED}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {item.ATOTAL_AMOUNT}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AMARKET_PRICE)}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AMARKET_VALUE)}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AAVG_PRICE)}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AROOT_VALUE)}
                </td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_VAL < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {formatNumber(item.APROFIT_LOSS_VAL)}
                </td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_RATE < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {item.APROFIT_LOSS_RATE}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr role="row">
              <td
                className="!text-left uppercase font-bold !text-xs"
                colSpan={5}
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
                className={`!text-xs ${
                  formatNumber(
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
                className={`!text-xs ${
                  formatNumber(
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
        <table>
          <thead>
            <tr role="row" className="tablesorter-headerRow">
              <td colSpan={11} className="!text-left">
                <div>
                  <span className={`font-bold ${mode}-text`}>
                    CHI TIẾT CHỨNG KHOÁN
                    <span
                      className={`font-medium cursor-pointer text-normalText underline italic ${mode}-text ml-1`}
                      onClick={() => setShort(!short)}
                    >
                      (Xem rút gọn)
                    </span>
                  </span>
                </div>
              </td>
              <td colSpan={4} className={`!text-center ${mode}-text`}>
                <div>
                  <strong>LÃI/LỖ DỰ KIẾN</strong>
                </div>
              </td>
              <td
                rowSpan={3}
                className="!text-center"
                style={{ width: "5.8%" }}
                onClick={() => handleSort("ACAPITAL_STRUCTURE")}
              >
                <div className={`relative ${mode}-text`}>
                  <strong>
                    Cơ cấu <br /> Vốn
                  </strong>
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
                    <span className="relative flex flex-col">
                      {label !== "ACAPITAL_STRUCTURE" ? (
                        <>
                          <span className="absolute top-[65%] -translate-y-[65%]">
                            <i
                              className="fa fa-caret-up"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <span className="absolute -bottom-[65%] translate-y-[65%]">
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </>
                      ) : label === "ACAPITAL_STRUCTURE" && sort === "asc" ? (
                        <span className="absolute -top-2">
                          <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      ) : (
                        <span className="absolute -bottom-2">
                          <i className="fa fa-caret-up" aria-hidden="true"></i>
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </td>
              <td
                rowSpan={3}
                className="!text-center"
                style={{ width: "6.8%" }}
                onClick={() => handleSort("APORTFOLIO_RATE")}
              >
                <div className={`relative ${mode}-text`}>
                  <strong>
                    Tỉ trọng <br /> DM
                  </strong>
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
                    {label !== "APORTFOLIO_RATE" ? (
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
                    ) : label === "APORTFOLIO_RATE" && sort === "asc" ? (
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
            <tr role="row" className="font-bold bg-[#ececec]">
              <td
                rowSpan={2}
                className={`!text-center !text-xs `}
                style={{ width: "5%" }}
                onClick={() => handleSort("ASTOCKCODE")}
              >
                <div className={`relative ${mode}-text`}>
                  Mã CK
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                  CK có sẵn
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                colSpan={3}
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "12%" }}
              >
                <div>CK mua trở về</div>
              </td>
              <td
                rowSpan={2}
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "7%" }}
              >
                <div>CK quyền trở về</div>
              </td>
              <td
                rowSpan={2}
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "7%" }}
              >
                <div>CK cầm cố NH</div>
              </td>
              <td
                rowSpan={2}
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "6%" }}
              >
                <div>CK hạn chế GD</div>
              </td>
              <td
                rowSpan={2}
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "5.7%" }}
                onClick={() => handleSort("ATOTAL_AMOUNT")}
              >
                <div className="relative">
                  Tổng KL
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                  Thành tiền
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                <div>Giá vốn TB</div>
              </td>
              <td
                rowSpan={2}
                className={`!text-center !text-xs ${mode}-text`}
                style={{ width: "7.5%" }}
                onClick={() => handleSort("AROOT_VALUE")}
              >
                <div className="relative">
                  Tổng giá vốn
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                  Lãi/Lỗ
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
                  % Lãi/Lỗ
                  <span className="absolute top-1/2 translate-y-1/2 right-2">
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
            <tr role="row">
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
            {data?.map((item: any, index: number) => (
              <tr key={item.ASTOCKCODE}>
                <td className={`!text-center !text-xs ${mode}-text`}>
                  {item.ASTOCKCODE}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {item.ATRADING_READY_TOTAL}
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
                  {item.ATOTAL_AMOUNT}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AMARKET_PRICE)}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AMARKET_VALUE)}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AAVG_PRICE)}
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {formatNumber(item.AROOT_VALUE)}
                </td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_VAL < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {formatNumber(item.APROFIT_LOSS_VAL)}
                </td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_RATE < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {item.APROFIT_LOSS_RATE}%
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {item.ACAPITAL_STRUCTURE}%
                </td>
                <td className={`${mode}-text !text-xs`}>
                  {item.APORTFOLIO_RATE}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr role="row">
              <td
                className="!text-left uppercase font-bold !text-xs"
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
                className={`!text-xs ${
                  formatNumber(
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
                className={`!text-xs ${
                  formatNumber(
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
              <td className="!text-xs"></td>
              <td className="!text-xs"></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default TableAssetReport;
