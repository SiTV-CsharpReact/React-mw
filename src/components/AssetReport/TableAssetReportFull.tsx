import React from "react";
import { formatNumber, formatNumbertoDecimal } from "../../utils/util";
import { useAppSelector } from "../../store/configureStore";
import { IpropsTableReport } from "./TableAssetReport";
import { useWindowSize } from "usehooks-ts";
import { useTranslation } from "react-i18next";

const TableAssetReportFull: React.FC<IpropsTableReport> = ({
  short,
  setShort,
  handleSort,
  label,
  sort,
  data,
}: IpropsTableReport) => {
  const { assetReport } = useAppSelector((state) => state.assetReport);
  const { mode } = useAppSelector((state) => state.settingColorMode);
  const { width } = useWindowSize();
  const { t } = useTranslation(["report"]);

  return (
    <table className="w-full border-collapse text-center my-0 mx-auto bg-white text-[#002060] border-spacing-0">
      <thead className="table_detail_BCTS_thead bg-red-500">
        <tr>
          <td colSpan={11} className="text-left">
            <div>
              <span className="font-bold text-black cursor-default">
                {t("report:AcceptReport.Atr6")}{" "}
                <span
                  className="font-medium text-normalText text-sm cursor-pointer underline italic"
                  onClick={() => setShort(!short)}
                >
                  {t("report:AcceptReport.Atr7")}
                </span>
              </span>
            </div>
          </td>
          <td colSpan={4}>
            <div>
              <strong className="text-black">
                {t("report:AcceptReport.Atr8")}
              </strong>
            </div>
          </td>
          <td
            rowSpan={3}
            style={{ width: "5%" }}
            onClick={() => handleSort("ACAPITAL_STRUCTURE")}
            className={
              label !== "ACAPITAL_STRUCTURE"
                ? "tablesorter"
                : label === "ACAPITAL_STRUCTURE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }
          >
            <div>
              <strong className="text-black">
                Cơ cấu <br /> vốn
              </strong>
            </div>
          </td>
          <td
            rowSpan={3}
            style={{ width: "6.2%" }}
            onClick={() => handleSort("APORTFOLIO_RATE")}
            className={
              label !== "APORTFOLIO_RATE"
                ? "tablesorter"
                : label === "APORTFOLIO_RATE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }
          >
            <div>
              <strong className="text-black">
                Tỉ trọng <br /> DM
              </strong>
            </div>
          </td>
        </tr>
        <tr>
          <td
            rowSpan={2}
            className={`text-xs font-bold ${
              label !== "ASTOCKCODE"
                ? "tablesorter"
                : label === "ASTOCKCODE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5%" }}
            onClick={() => handleSort("ASTOCKCODE")}
          >
            <div>{t("report:AcceptReport.Atr9")}</div>
          </td>
          <td
            rowSpan={2}
            className={`text-xs font-bold ${
              label !== "ATRADING_READY_TOTAL"
                ? "tablesorter"
                : label === "ATRADING_READY_TOTAL" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "6.2%" }}
            onClick={() => handleSort("ATRADING_READY_TOTAL")}
          >
            <div>
              {width <= 1000 ? (
                <>{t("report:AcceptReport.Atr10")}</>
              ) : width >= 1001 && width <= 1200 ? (
                <>{t("report:AcceptReport.Atr10")}</>
              ) : width >= 1201 && width <= 1690 ? (
                <>{t("report:AcceptReport.Atr10")}</>
              ) : (
                <>{t("report:AcceptReport.Atr10")}</>
              )}
            </div>
          </td>
          <td
            colSpan={3}
            className="text-xs font-bold"
            style={{ width: "12%" }}
          >
            <div>CK mua chở về</div>
          </td>
          <td rowSpan={2} className="text-xs font-bold" style={{ width: "7%" }}>
            {width <= 1000 ? (
              <>
                CK
                <br />
                quyền
                <br />
                chở về
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                CK quyền <br /> chở về
              </>
            ) : width >= 1201 && width <= 1370 ? (
              <>
                CK
                <br />
                quyền <br /> chở <br />
                về
              </>
            ) : (
              <>
                CK quyền <br /> chở về
              </>
            )}
          </td>
          <td rowSpan={2} className="text-xs font-bold" style={{ width: "7%" }}>
            {width <= 1000 ? (
              <>
                CK cầm
                <br />
                cố NH
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                CK cầm cố
                <br />
                NH
              </>
            ) : width >= 1201 && width <= 1370 ? (
              <>
                CK <br /> cầm
                <br /> cố <br /> NH
              </>
            ) : width >= 1371 && width <= 1660 ? (
              <>
                CK cầm
                <br />
                cố NH
              </>
            ) : (
              <>CK cầm cố NH</>
            )}
          </td>
          <td rowSpan={2} className="text-xs font-bold" style={{ width: "6%" }}>
            {width <= 1000 ? (
              <>
                CK cầm
                <br />
                cố NH
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                CK cầm cố
                <br />
                NH
              </>
            ) : width >= 1201 && width <= 1360 ? (
              <>
                CK
                <br /> hạn <br />
                chế
                <br /> GD
              </>
            ) : width >= 1361 && width <= 1659 ? (
              <>
                CK hạn
                <br />
                chế GD
              </>
            ) : (
              <>
                CK hạn chế
                <br /> GD
              </>
            )}
          </td>
          <td
            rowSpan={2}
            className={`text-xs font-bold ${
              label !== "ATOTAL_AMOUNT"
                ? "tablesorter"
                : label === "ATOTAL_AMOUNT" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5.7%" }}
            onClick={() => handleSort("ATOTAL_AMOUNT")}
          >
            {width <= 1000 ? (
              <>
                Tổng
                <br />
                KL
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                Tổng
                <br />
                KL
              </>
            ) : width >= 1201 && width <= 1660 ? (
              <>
                Tổng
                <br />
                KL
              </>
            ) : (
              <>Tổng KL</>
            )}
          </td>
          <td rowSpan={2} className="text-xs font-bold" style={{ width: "5%" }}>
            Giá TT
          </td>
          <td
            rowSpan={2}
            className={`text-xs font-bold ${
              label !== "AMARKET_VALUE"
                ? "tablesorter"
                : label === "AMARKET_VALUE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "7%" }}
            onClick={() => handleSort("AMARKET_VALUE")}
          >
            {width <= 1000 ? (
              <>
                Thành
                <br />
                tiền
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                Thành
                <br />
                tiền
              </>
            ) : width >= 1201 && width <= 1660 ? (
              <>
                Thành
                <br />
                tiền
              </>
            ) : (
              <>Thành tiền</>
            )}
          </td>
          <td rowSpan={2} className="text-xs font-bold" style={{ width: "5%" }}>
            {width <= 1000 ? (
              <>
                Giá vốn
                <br />
                TB
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                Giá vốn
                <br />
                TB
              </>
            ) : width >= 1201 && width <= 1360 ? (
              <>
                Giá vốn
                <br />
                TB
              </>
            ) : width >= 1361 && width <= 1659 ? (
              <>
                Giá vốn
                <br />
                TB
              </>
            ) : (
              <>Giá vốn TB</>
            )}
          </td>
          <td
            rowSpan={2}
            className={`text-xs font-bold ${
              label !== "AROOT_VALUE"
                ? "tablesorter"
                : label === "AROOT_VALUE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "7.5%" }}
            onClick={() => handleSort("AROOT_VALUE")}
          >
            {width <= 1000 ? (
              <>
                Tổng giá
                <br />
                vốn
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                Tổng giá
                <br />
                vốn
              </>
            ) : width >= 1201 && width <= 1360 ? (
              <>
                Tổng giá
                <br />
                vốn
              </>
            ) : width >= 1361 && width <= 1739 ? (
              <>
                Tổng giá
                <br />
                vốn
              </>
            ) : (
              <>Tổng giá vốn</>
            )}
          </td>
          <td
            rowSpan={2}
            className={`text-xs font-bold  ${
              label !== "APROFIT_LOSS_VAL"
                ? "tablesorter"
                : label === "APROFIT_LOSS_VAL" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5%" }}
            onClick={() => handleSort("APROFIT_LOSS_VAL")}
          >
            Lãi/Lỗ
          </td>
          <td
            rowSpan={2}
            className={`text-xs font-bold ${
              label !== "APROFIT_LOSS_RATE"
                ? "tablesorter"
                : label === "APROFIT_LOSS_RATE" && sort === "asc"
                ? "tablesorter-headerAsc"
                : "tablesorter-headerDesc"
            }`}
            style={{ width: "5.8%" }}
            onClick={() => handleSort("APROFIT_LOSS_RATE")}
          >
            {width <= 1000 ? (
              <>
                %<br />
                Lãi/Lỗ
              </>
            ) : width >= 1001 && width <= 1200 ? (
              <>
                %<br />
                Lãi/Lỗ
              </>
            ) : width >= 1201 && width <= 1360 ? (
              <>
                %<br />
                Lãi/Lỗ
              </>
            ) : width >= 1361 && width <= 1659 ? (
              <>
                %<br />
                Lãi/Lỗ
              </>
            ) : (
              <>% Lãi/Lỗ</>
            )}
          </td>
        </tr>
        <tr>
          <td className="text-xs font-bold">T0</td>
          <td className="text-xs font-bold">T1</td>
          <td className="text-xs font-bold">T2</td>
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
            <td className={`${mode}-text !text-xs`}>{item.AWAIT_REC_RIGHT}</td>
            <td className={`${mode}-text !text-xs`}>{item.AMORTGATE_BANK}</td>
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
              {formatNumbertoDecimal(item.APROFIT_LOSS_RATE)}%
            </td>
            <td className={`${mode}-text !text-xs`}>
              {formatNumbertoDecimal(item.ACAPITAL_STRUCTURE)}%
            </td>
            <td className={`${mode}-text !text-xs`}>
              {formatNumbertoDecimal(item.APORTFOLIO_RATE)}%
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="!text-left uppercase font-bold !text-xs" colSpan={10}>
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
              assetReport?.Table1?.reduce(
                (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                0
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
  );
};

export default TableAssetReportFull;
