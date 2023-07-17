import React, { useEffect, useRef, useState } from "react";
import { formatNumber } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const TableKLTTGPopup = () => {
  const [priceTC, setPriceTC] = useState(0);
  const [priceTran, setPriceTran] = useState(0);
  const [priceSan, setPriceSan] = useState(0);

  // const [dataTable, setDataTable] = useState<TableKLTTG | null>(null);
  const { floorLTG } = useAppSelector((state) => state.popupTable);
  const { dataTableKLTTG, dataDetailPopup } = useAppSelector(
    (state) => state.dataPopupDetail
  );
  const dispatch = useAppDispatch();

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
      <div className="w-full">
        <div className="sticky top-0 left-0 w-full bg-black">
          <div className="grid-cols-8 text-center text-[8pt] text-[#B9B9B9] border border-[#333]">
            Khớp lệnh theo thời gian
          </div>
          <div className="grid grid-cols-8">
            <div className="col-span-2 text-center text-[8pt] text-[#B9B9B9] border-l border-b border-[#333]">
              Thời gian
            </div>
            <div className="col-span-2 text-center text-[8pt] text-[#B9B9B9] border-l border-b border-[#333]">
              Giá
            </div>
            <div className="col-span-2 text-center text-[8pt] text-[#B9B9B9] border-l border-b border-[#333]">
              khối lượng
            </div>
            <div className="col-span-2 text-center text-[8pt] text-[#B9B9B9] border-r border-b border-[#333]">
              Tổng KL
            </div>
          </div>
        </div>
        <div className="w-full">
          {dataTableKLTTG?.Body?.map((item: any) => item)
            .reverse()
            .map((item: any, ind: number) => (
              <div key={ind} className="grid grid-cols-8">
                <div
                  className="text-center col-span-2 border-[#333] text-[8pt] border-l border-b"
                  style={{
                    color: `${
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                >
                  {item.MT}
                </div>
                <div
                  className="text-center col-span-2 border-[#333] text-[8pt] border-l border-b"
                  style={{
                    color: `${
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                >
                  {formatNumber(item.MP)}
                </div>
                <div
                  className="text-center col-span-2 border-[#333] text-[8pt] border-l border-b"
                  style={{
                    color: `${
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                >
                  {floorLTG === "HSX"
                    ? formatNumber(item.MQ * 10)
                    : formatNumber(item.MQ)}
                </div>
                <div
                  className="text-center col-span-2 border-[#333] text-[8pt] border-r border-b"
                  style={{
                    color: `${
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
                        ? "#00ff00"
                        : "#ff0000"
                    }`,
                  }}
                >
                  {floorLTG === "HSX"
                    ? formatNumber(item.TQ * 10)
                    : formatNumber(item.TQ)}
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <table id="tbpuRT" className="w-full pu-table-realtime">
        <thead className="sticky top-0 left-0">
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
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
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
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
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
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
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
                      item?.MP === priceTC
                        ? "#f7ff31"
                        : item?.MP === priceTran
                        ? "#ff00ff"
                        : item?.MP === priceSan
                        ? "#66ccff"
                        : item?.MP > priceTC
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
      </table> */}
    </>
  );
};

export default TableKLTTGPopup;
