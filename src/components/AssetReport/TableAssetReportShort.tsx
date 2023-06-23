import React from "react";
import { IpropsTableReport } from "./TableAssetReport";
import { formatNumber } from "../../utils/util";
import { useAppSelector } from "../../store/configureStore";

const TableAssetReportShort: React.FC<IpropsTableReport> = ({
  short,
  setShort,
  handleSort,
  label,
  sort,
  data,
}: IpropsTableReport) => {
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const { assetReport } = useAppSelector((state) => state.assetReport);

  return (
    <table className="w-full border-collapse text-center my-0 mx-auto bg-white text-[#002060] border-spacing-0">
      <thead className="table_detail_BCTS_thead bg-red-500">
        <tr>
          <td colSpan={6} className="text-left">
            <div>
              <span className="font-bold text-black cursor-default">
                CHI TIẾT CHỨNG KHOÁN{" "}
                <span
                  className="font-medium text-normalText text-sm cursor-pointer underline italic"
                  onClick={() => setShort(!short)}
                >
                  (Xem đầy đủ)
                </span>
              </span>
            </div>
          </td>
          <td colSpan={4}>
            <div>
              <strong className="text-black">LÃI/LỖ DỰ KIẾN</strong>
            </div>
          </td>
        </tr>
        <tr>
          <td
            className="text-xs font-bold"
            style={{ width: "5%" }}
            onClick={() => handleSort("ASTOCKCODE")}
          >
            <div>
              Mã CK
              {label !== "ASTOCKCODE" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "ASTOCKCODE" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "6%" }}
            onClick={() => handleSort("ATRADING_READY_TOTAL")}
          >
            <div>
              CK có sẵn
              {label !== "ATRADING_READY_TOTAL" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "ATRADING_READY_TOTAL" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "6%" }}
            onClick={() => handleSort("AWAIT_REC_RIGHT")}
          >
            <div>
              CK chở về{" "}
              {label !== "AWAIT_REC_RIGHT" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "AWAIT_REC_RIGHT" && sort === "desc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "5%" }}
            onClick={() => handleSort("ATOTAL_AMOUNT")}
          >
            <div>
              Tổng KL
              {label !== "ATOTAL_AMOUNT" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "ATOTAL_AMOUNT" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td className="text-xs font-bold" style={{ width: "5%" }}>
            <div>Giá TT</div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "6%" }}
            onClick={() => handleSort("AMARKET_VALUE")}
          >
            <div>
              Thành tiền{" "}
              {label !== "AMARKET_VALUE" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "AMARKET_VALUE" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td className="text-xs font-bold" style={{ width: "5%" }}>
            <div>Giá vốn TB</div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "8%" }}
            onClick={() => handleSort("AROOT_VALUE")}
          >
            <div>
              Tổng giá vốn
              {label !== "AROOT_VALUE" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "AROOT_VALUE" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "5%" }}
            onClick={() => handleSort("APROFIT_LOSS_VAL")}
          >
            <div>
              Lãi/Lỗ{" "}
              {label !== "APROFIT_LOSS_VAL" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "APROFIT_LOSS_VAL" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
            </div>
          </td>
          <td
            className="text-xs font-bold"
            style={{ width: "5%" }}
            onClick={() => handleSort("APROFIT_LOSS_RATE")}
          >
            <div>
              % Lãi/Lỗ{" "}
              {label !== "APROFIT_LOSS_RATE" ? (
                <div className="absolute top-1/2 -translate-y-1/2 right-3">
                  <span className="text-sm text-hoverKL">
                    <i
                      className="fa fa-caret-up absolute -bottom-1"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-caret-down absolute -top-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
              ) : label === "APROFIT_LOSS_RATE" && sort === "asc" ? (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
              ) : (
                <span className="absolute top-1/2 -translate-y-1/2 right-1 text-sm text-hoverKL">
                  <i className="fa fa-caret-up" aria-hidden="true"></i>
                </span>
              )}
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
            <td className={`${mode}-text !text-xs`}>{item.ATOTAL_AMOUNT}</td>
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
          <td className="!text-left uppercase font-bold !text-xs" colSpan={5}>
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
  );
};

export default TableAssetReportShort;
