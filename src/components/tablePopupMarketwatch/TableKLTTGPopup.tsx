import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/util";

const TableKLTTGPopup: React.FC<any> = (props) => {
  const [indexValue, setIndexValue] = useState(0);

  useEffect(() => {
    props.dataItem?.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      return item.Info?.map((e: any, ind: number) => {
        if (ind === 1) {
          setIndexValue(e[1]);
        }
      });
    });
  }, [props.dataItem]);
  return (
    <table id="tbpuRT" className="pu-table-realtime">
      <thead style={{}}>
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
        {props.dataKLTTG.map((item: any, index: any) => {
          return (
            <tr key={index} style={{ height: "22px" }}>
              <td
                style={{
                  color: `${
                    item?.MP === indexValue
                      ? "#f7ff31"
                      : item?.MP > indexValue
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
                    item?.MP === indexValue
                      ? "#f7ff31"
                      : item?.MP > indexValue
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
                    item?.MP === indexValue
                      ? "#f7ff31"
                      : item?.MP > indexValue
                      ? "#00ff00"
                      : "#ff0000"
                  }`,
                }}
                className="pu-w"
              >
                {formatNumber(item.MQ)}
              </td>
              <td
                style={{
                  color: `${
                    item?.MP === indexValue
                      ? "#f7ff31"
                      : item?.MP > indexValue
                      ? "#00ff00"
                      : "#ff0000"
                  }`,
                }}
                className="pu-w"
              >
                {formatNumber(item.TQ)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableKLTTGPopup;
