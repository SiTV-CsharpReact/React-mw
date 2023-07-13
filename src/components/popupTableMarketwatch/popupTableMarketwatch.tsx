import React, { useEffect, useRef, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../store/configureStore";
import { showDetailStock } from "./popupTableSlice";
import TablePopupMarketwatch from "../tablePopupMarketwatch/TablePopupMarketwatch";
import { handleHistoryPrices } from "../tableMarketwatch/tableTestSlice";
import { setHistoryMenu } from "../menuBarMW/menuSlice";
import { historyPriceActiveMenu } from "../menuBarMW/danhmucSlice";

interface Props {
  x: number;
  y: number;
  value: string;
  status: boolean;
}
interface Popup {
  selectedValue: Props;
  setSelectedValueProp: React.Dispatch<React.SetStateAction<Props>>;
}

const PopupTableMarketwatch = ({
  selectedValue,
  setSelectedValueProp,
}: Popup) => {
  const dispatch = useAppDispatch();
  const { keyMenu, nameMenu, floor } = useAppSelector(
    (state: RootState) => state.menuBar
  );

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: any) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setSelectedValueProp({ ...selectedValue, status: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);
  const handleTest = (e: any) => {
    let data = {
      stockCode: e,
      keyMenu,
      nameMenu,
      floor,
    };
    console.log("data", data);
    dispatch(handleHistoryPrices(data)); // thay đổi sàn
    dispatch(setHistoryMenu()); // chuyển sang table giá
    dispatch(historyPriceActiveMenu()); // chặn chuyển tab sang danh mục cá nhân
    setSelectedValueProp({ ...selectedValue, status: false }); // tắt popuptable
  };
  const historyStock = () => {
    dispatch(showDetailStock({ visible: true, code: selectedValue.value }));
    setSelectedValueProp({ ...selectedValue, status: false });
    console.log({ floor });
  };
  return (
    <div
      className={`popup z-[1000]`}
      ref={popupRef}
      style={{
        display: selectedValue.status ? "block" : "none",
        position: "absolute",
        top: selectedValue.y,
        left: selectedValue.x,
      }}
    >
      <ul className="context-menu-list" id="idContextMenu">
        <li
          onClick={() =>
            setSelectedValueProp({ ...selectedValue, status: false })
          }
        >
          <i className="fa fa-arrow-left text-[#00A4FF]"></i>
          <span>
            Mua <b>{selectedValue.value}</b>
          </span>
        </li>
        <li
          onClick={() =>
            setSelectedValueProp({ ...selectedValue, status: false })
          }
        >
          <i className="fa fa-arrow-right text-[#f44336]"></i>
          <span>
            Bán <b>{selectedValue.value}</b>
          </span>
        </li>
        <li
          onClick={() =>
            setSelectedValueProp({ ...selectedValue, status: false })
          }
        >
          <i className="fa fa-language text-[#22B14C]"></i>
          <span>
            Thông tin doanh nghiệp <b>{selectedValue.value}</b>
          </span>
        </li>
        <li onClick={() => historyStock()}>
          <i className="fa fa-sign-out text-[#2371AF]"></i>
          <span>
            Chi tiết <b>{selectedValue.value}</b>
          </span>
        </li>
        <li
          onClick={() => {
            handleTest(selectedValue.value);
          }}
        >
          <i className="fa fa-history text-[#009688]"></i>
          <span>
            Lịch sử giá <b>{selectedValue.value}</b>
          </span>
        </li>
        <li
          onClick={() =>
            setSelectedValueProp({ ...selectedValue, status: false })
          }
        >
          <i className="fa fa-bar-chart text-[#795548]"></i>
          <span>
            Phân tích Kỹ thuật <b>{selectedValue.value}</b>
          </span>
        </li>
        <li
          onClick={() =>
            setSelectedValueProp({ ...selectedValue, status: false })
          }
        >
          <i className="fa fa-close text-[#f44336]"></i>
          <span>
            Bỏ mã <b>{selectedValue.value}</b>
          </span>
        </li>
        <li
          onClick={() =>
            setSelectedValueProp({ ...selectedValue, status: false })
          }
        >
          <i className="fa fa-info-circle text-[#949831]"></i>
          <span>Ghi thành DM mặc định</span>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(PopupTableMarketwatch);
