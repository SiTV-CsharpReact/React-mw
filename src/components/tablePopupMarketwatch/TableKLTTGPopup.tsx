import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/util";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const TableKLTTGPopup = () => {
  const [indexValue, setIndexValue] = useState(0);
  // const [dataTable, setDataTable] = useState<TableKLTTG | null>(null);
  const { code } = useAppSelector((state) => state.popupTable);
  const { dataTableKLTTG, dataDetailPopup } = useAppSelector(
    (state) => state.dataPopupDetail
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetchDataTableKLTTGAsync(code));
    // const RP = {
    //   action: "le",
    //   symbol: props?.stockCode,
    //   max_score: 0,
    // };
    // const fetchDataTableKLTTG = async () => {
    //   const dataRP = await agent.dataTableBasic.postFormData(RP);
    //   setDataTable(dataRP.data);
    // };
    // fetchDataTableKLTTG();
  }, [code, dispatch]);

  useEffect(() => {
    dataDetailPopup?.map((item: any) => {
      // eslint-disable-next-line array-callback-return
      return item.Info?.map((e: any, ind: number) => {
        if (ind === 1) {
          setIndexValue(e[1]);
        }
      });
    });
  }, [dataDetailPopup]);

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
        {dataTableKLTTG?.Body?.map((item: any) => item)
          .reverse()
          .map((item: any, index: any) => (
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
                {formatNumber(item.MQ * 10)}
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
                {formatNumber(item.TQ * 10)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableKLTTGPopup;
