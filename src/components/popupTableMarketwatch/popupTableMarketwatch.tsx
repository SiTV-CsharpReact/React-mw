import React, { useEffect, useRef, useState } from 'react'

interface Props {
    x: number; 
    y: number;
    value: string;
    status:boolean
  }
  interface Popup {
    selectedValue: Props;
    setSelectedValueProp: React.Dispatch<React.SetStateAction<Props>>;
  }
  const PopupTableMarketwatch = ({ selectedValue, setSelectedValueProp  }: Popup) =>  {
    // const [selectedValue, setselectedValue] = useState({ x: 0, y: 0, value: "" });
    // const handleContextMenu = (e: any) => {
    //   e.preventDefault();
    //   const trValue = e.target.parentElement.getAttribute("data-tr-value");
    //   if (trValue) {
    //     setselectedValue({ x: e.clientX, y: e.clientY, value: trValue });
    //     setPopupVisible(true);
    //   }
    // };
    const popupRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(e: any) {
          if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setSelectedValueProp({...selectedValue, status: false});       
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [popupRef]);
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
          <li>
            <i className="fa fa-arrow-left text-[#00A4FF]"></i>
            <span>
              Mua <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-arrow-right text-[#f44336]"></i>
            <span>
              Bán <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-language text-[#22B14C]"></i>
            <span>
              Thông tin doanh nghiệp <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-sign-out text-[#2371AF]"></i>
            <span>
              Chi tiết <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-history text-[#009688]"></i>
            <span>
              Lịch sử giá <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-bar-chart text-[#795548]"></i>
            <span>
              Phân tích Kỹ thuật <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-close text-[#f44336]"></i>
            <span>
              Bỏ mã <b>{selectedValue.value}</b>
            </span>
          </li>
          <li>
            <i className="fa fa-info-circle text-[#949831]"></i>
            <span>Ghi thành DM mặc định</span>
          </li>
        </ul>
      </div>
  )
}

export default PopupTableMarketwatch
