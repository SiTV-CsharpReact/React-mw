import React, { useState } from "react";
import ListMenuBar from "../menuBarMW/ListMenuBar";
import TableMarketWatch from "../tableMarketwatch/TableMarketWatch";
import DanhMuc from "../menuBarMW/DanhMuc";
import DateTime from "../menuBarMW/DateTime";
import SettingTable from "../menuBarMW/helper/SettingTable";
import PopupTableMarketwatch from "../popupTableMarketwatch/popupTableMarketwatch";
import { useAppSelector } from "../../store/configureStore";
import TablePopupMarketwatch from "../tablePopupMarketwatch/TablePopupMarketwatch";
import CompleteStock from "../menuBarMW/CompleteStock";

const TablePrice = () => {
  const status = useAppSelector((state) => state.popupTable.visible);
  const [selectedValue, setSelectedValue] = useState({
    x: 0,
    y: 0,
    value: "",
    status: false,
  });
  const handleContextMenu = (e: any) => {
    e.preventDefault();
    const trValue = e.target.parentElement.getAttribute("data-tr-value");
    console.log(trValue);
    if (trValue) {
      setSelectedValue({
        x: e.clientX,
        y: e.clientY - 40,
        value: trValue,
        status: true,
      });
    }
  }
  // console.log(status)
  return (
    <>
      
      <div className="bg-headerMenuTableMarket flex h-30 justify-between">
        <div className="flex">
          <ListMenuBar />
          <DanhMuc />
          <CompleteStock/>
          </div>
          <div className="flex">
            <SettingTable />
            <DateTime />
          </div>
       
      </div>
      <div 
       className="relative"
        onContextMenu={handleContextMenu}>
      <TableMarketWatch />
      <PopupTableMarketwatch
        selectedValue={selectedValue}
        setSelectedValueProp={setSelectedValue}
      />
       {status ? (
        <TablePopupMarketwatch/>
      ) : (
        ""
      )}
      </div>
   
    </>
  );
};

export default React.memo(TablePrice);
