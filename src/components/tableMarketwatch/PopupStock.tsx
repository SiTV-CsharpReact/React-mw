import  { useEffect, useRef, useState } from 'react'
type Props ={
  x:number,
  y:number,
  value:string,
}
const PopupStock = (value:Props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 ,value:""});
  const handleContextMenu = (e:any) => {
    e.preventDefault();
    const trValue = e.target.parentElement.getAttribute('data-tr-value');
    if(trValue){
      setPopupPosition({ x: e.clientX, y: e.clientY, value:trValue });
      setPopupVisible(true);
    } 
  }
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e:any) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);
  return (
    <>
     {popupVisible  && <div className="popup" ref={popupRef}    style={{ position: 'absolute', top: popupPosition.y, left: popupPosition.x }}>
    <ul className="context-menu-list" id="idContextMenu">
      <li>
      <i className="fa fa-arrow-left text-[#00A4FF]"></i>
      <span>
      Mua <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-arrow-right text-[#f44336]"></i>
      <span>
      Bán <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-language text-[#22B14C]"></i>
      <span>
      Thông tin doanh nghiệp <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-sign-out text-[#2371AF]"></i>
      <span>
      Chi tiết <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-history text-[#009688]"></i>
      <span>
      Lịch sử giá <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-bar-chart text-[#795548]"></i>
      <span>
      Phân tích Kỹ thuật <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-close text-[#f44336]"></i>
      <span>
      Bỏ mã <b>{popupPosition.value}</b> 
      </span> 
      </li>
      <li>
      <i className="fa fa-info-circle text-[#949831]"></i>
      <span>
     Ghi thành DM mặc định
      </span> 
      </li>
    </ul>
    </div>}
    </>
   
  )
}

export default PopupStock