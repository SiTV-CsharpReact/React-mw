import React, { useEffect, useState } from "react";
import "./table.scss";
import { formatNumber } from "../../utils/util";
import { useAppSelector, RootState } from "../../store/configureStore";

const TableGDTTMarketWatch = () => {
  const prices = useAppSelector((state: RootState) => state.table.DataBi);
  const products = useAppSelector((state: RootState) => state.table.DataPt);
  const floor = useAppSelector((state: RootState) => state.table.NameFloor);
  return (
    <div id="dvFixedH">
      <div className="dvContentLP border-t border-borderHeadTableMarket">
        <div className="grid grid-cols-4 p-3">
          <div className="text-center">
            <input
              placeholder="Nhập mã cần tìm"
              className="col-span-1 w-44 h-24 pl-1"
            ></input>
          </div>
          {/* check floor  */}
          {prices ?   floor === "hnx" ? (
            <div className="col-span-2 flex justify-around font-bold pt-1">
              <span>
                Tổng KL GDTT :<label> {formatNumber(prices[4]?.f240)}</label>
              </span>
              <span>
                Tổng KL GDTT : <label> {formatNumber(prices[4]?.f241)}</label>
              </span>
            </div>
          ) : (
            <div className="col-span-2 flex justify-around font-bold pt-1">
              <span>
                Tổng KL GDTT :<label> {formatNumber(prices[4]?.f240)}</label>
              </span>
              <span>
                Tổng KL GDTT : <label> {formatNumber(prices[4]?.f241)}</label>
              </span>
            </div>
          ) : " "}
         

          <div className="col-span-1"></div>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-1 pr-2">
            <table
              id="tbBuyPT_HA"
              className="table table-PT table-bordered table-priceboard w-full"
            >
              <thead style={{}}>
                <tr>
                  <th
                    className="hbrc text-textHeaderTableGDTT text-13px"
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
              className="table table-PT table-bordered table-priceboard w-full"
            >
              <thead style={{}}>
                <tr>
                  <th
                    className="hbrc text-textHeaderTableGDTT text-13px"
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
              {products != null ? (
                <tbody id="tbdPT_HA">
                  {products.length > 0
                    ? products?.map((product: any) => (
                        <tr key={product.RowID}>
                          <td>{product.Info[0][1]}</td>
                          <td className="text-right">
                            {formatNumber(product.Info[7][1])}
                          </td>
                          <td className="text-right">
                            {formatNumber(product.Info[6][1])}
                          </td>
                          <td className="text-right">
                            {formatNumber(product.Info[8][1])}
                          </td>
                          <td className="text-right">
                            {formatNumber(product.Info[9][1])}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              ) : (
                ""
              )}
            </table>
          </div>
          <div className="col-span-1 pl-2">
            <table
              id="tbBuyPT_HA"
              className="table table-PT table-bordered table-priceboard w-full"
            >
              <thead style={{}}>
                <tr>
                  <th
                    className="hbrc text-textHeaderTableGDTT text-13px"
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

export default TableGDTTMarketWatch;
