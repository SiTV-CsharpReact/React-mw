import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/configureStore";
import { useTranslation } from "react-i18next";
import TableAssetReportFull from "./TableAssetReportFull";
import TableAssetReportShort from "./TableAssetReportShort";

export interface IpropsTableReport {
  short: boolean;
  setShort: (state: boolean) => void;
  handleSort: (key: string) => void;
  label: string;
  sort: string;
  data: any[];
}
const TableAssetReport = () => {
  const { t } = useTranslation(["home"]);
  const { assetReport } = useAppSelector((state) => state.assetReport);
  const [data, setData] = useState([]);
  const [short, setShort] = useState(false);
  const [sort, setSort] = useState("asc");
  const [label, setLabel] = useState("");
  const { mode } = useAppSelector((state) => state.settingColorMode);

  const handleSort = (key: string): void => {
    setLabel(key);
    if (sort === "asc") {
      const dataSort = data.sort((a: any, b: any) => {
        if (a[key] === "string" && b[key] === "string") {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
        }
        return a[key] > b[key] ? 1 : -1;
      });
      setData(dataSort);
      setSort("desc");
    }
    if (sort === "desc") {
      const dataSort = data.sort((a: any, b: any) => {
        if (a[key] === "string" && b[key] === "string") {
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
      });
      setData(dataSort);
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
    setSort("desc");
  }, [assetReport]);
  return (
    <div className={`table_detail_BCTS ${mode}-bg`}>
      {short ? (
        <TableAssetReportShort
          short={short}
          setShort={setShort}
          handleSort={handleSort}
          label={label}
          sort={sort}
          data={data}
        />
      ) : (
        <TableAssetReportFull
          short={short}
          setShort={setShort}
          handleSort={handleSort}
          label={label}
          sort={sort}
          data={data}
        />
      )}
    </div>
  );
};

export default TableAssetReport;
