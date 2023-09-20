import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { fetchChartOptionAsync, fetchChartOptiongHistoryAsync } from "../chartOptionSlice";

interface TablePopupContextData {
  value: string;
  data: (string | number)[];
  option: string;
  select: string;
  setSelect: (value: string) => void;
  setOption: (value: string) => void;
}

export const TablePopupConext = React.createContext<
  TablePopupContextData | undefined
>(undefined);

const TableContextProvider: React.FC<any> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.popupTable);
  const { dataChartOption } = useAppSelector((state) => state.chartOption);
  const [option, setOption] = useState<string>("gw_realtime");
  //tạo option để lưu data theo 1day,1week,3month,6month,1year,2year
  const [select, setSelect] = useState<string>("1D");
  useEffect(() => {
    if (option === "gw_realtime") {
      dispatch(fetchChartOptionAsync({ symbol: code, action: "gw_realtime" }));
    } else {
      dispatch(fetchChartOptiongHistoryAsync({symbol: code, action: "gw_history"}))
    }
  }, [code, dispatch, option]);

  return (
    <TablePopupConext.Provider
      value={{
        value: code,
        data: dataChartOption,
        option,
        setOption,
        select,
        setSelect,
      }}
    >
      {children}
    </TablePopupConext.Provider>
  );
};

export default TableContextProvider;

export const useContextTablePopup = (): TablePopupContextData => {
  const context = useContext(TablePopupConext);
  if (!context) {
    throw new Error("Something wrong here!!!!");
  }
  return context;
};
