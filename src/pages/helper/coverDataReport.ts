import { ReportData } from "../Report/models/models";

export const converReport = (data:ReportData[])=>{
    const grupData: { [key: string]: ReportData[] } = {};
    data.forEach((item:ReportData) => {
      const stockCode = item.ASTOCKCODE;
      if (!grupData[stockCode]) {
        grupData[stockCode] = [];
      }
      grupData[stockCode].push(item);
    });
    return grupData
}