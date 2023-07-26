import React, { useEffect, useRef, useState } from "react";
import { formatNumber } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const TableKLTTGPopup = () => {
  const [priceTC, setPriceTC] = useState(0);
  const [priceTran, setPriceTran] = useState(0);
  const [priceSan, setPriceSan] = useState(0);

  // const [dataTable, setDataTable] = useState<TableKLTTG | null>(null);
  const { code } = useAppSelector((state) => state.popupTable);
  const { dataTableKLTTG, dataDetailPopup } = useAppSelector(
    (state) => state.dataPopupDetail
  );
  const { floor } = useAppSelector((state) => state.menuBar);

  useEffect(() => {
    dataDetailPopup?.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      return item.Info?.map((e: any, ind: number) => {
        if (ind === 1) {
          setPriceTC(e[1]);
        }
        if (ind === 2) {
          setPriceTran(e[1]);
        }
        if (ind === 3) {
          setPriceSan(e[1]);
        }
      });
    });
  }, [dataDetailPopup]);

  return (
    <>
      <div className="tempHeadTfoot">
        <table className="pu-table-realtime">
          <thead>
            <tr style={{ height: "22px" }}>
              <th colSpan={4}>Khớp lệnh theo thời gian</th>
            </tr>
            <tr className="border" style={{ height: "22.5px" }}>
              <th style={{ width: "101.7px" }}>Thời gian</th>
              <th style={{ width: "58.77px" }}>Giá</th>
              <th style={{ width: "119.73px" }}>Khối lượng</th>
              <th style={{ width: "99.8px" }}>Tổng KL</th>
            </tr>
          </thead>
        </table>
      </div>
      <table id="tbpuRT" className="pu-table-realtime w-full">
        <thead>
          <tr style={{ height: "22px" }}>
            <th colSpan={4}>Khớp lệnh theo thời gian</th>
          </tr>
          <tr className="border" style={{ height: "22.5px" }}>
            <th>Thời gian</th>
            <th>Giá</th>
            <th>Khối lượng</th>
            <th>Tổng KL</th>
          </tr>
        </thead>
        <tbody>
          {dataTableKLTTG?.Body?.map((item: any) => item)
            .reverse()
            .map((item: any, index: any) => (
              <tr key={index} style={{ height: "22px" }}>
                <td
                  style={{
                    color: `${
                      item?.MP === Number(priceTC)
                        ? "#f7ff31"
                        : item?.MP === Number(priceTran)
                        ? "#ff00ff"
                        : item?.MP === Number(priceSan)
                        ? "#66ccff"
                        : item?.MP > Number(priceTC)
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                  className="text-center pu-w"
                >
                  {item.MT}
                </td>
                <td
                  style={{
                    color: `${
                      item?.MP === Number(priceTC)
                        ? "#f7ff31"
                        : item?.MP === Number(priceTran)
                        ? "#ff00ff"
                        : item?.MP === Number(priceSan)
                        ? "#66ccff"
                        : item?.MP > Number(priceTC)
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                  className="pu-w"
                >
                  {formatNumber(item.MP)}
                </td>
                <td
                  style={{
                    color: `${
                      item?.MP === Number(priceTC)
                        ? "#f7ff31"
                        : item?.MP === Number(priceTran)
                        ? "#ff00ff"
                        : item?.MP === Number(priceSan)
                        ? "#66ccff"
                        : item?.MP > Number(priceTC)
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                  className="pu-w"
                >
                  {floor === "HSX"
                    ? formatNumber(item.MQ * 10)
                    : formatNumber(item.MQ)}
                </td>
                <td
                  style={{
                    color: `${
                      item?.MP === Number(priceTC)
                        ? "#f7ff31"
                        : item?.MP === Number(priceTran)
                        ? "#ff00ff"
                        : item?.MP === Number(priceSan)
                        ? "#66ccff"
                        : item?.MP > Number(priceTC)
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                  className="pu-w"
                >
                  {floor === "HSX"
                    ? formatNumber(item.TQ * 10)
                    : formatNumber(item.TQ)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TableKLTTGPopup;
