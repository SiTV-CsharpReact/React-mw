import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/configureStore";
import { listStock } from "./codeListSlice";
import { activeMenuDanhmuc, fetchCategoryAsync } from "./danhmucSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchTableHNXAsync, fetchTableHSXAsync, getDataTable, setProductParams } from "../tableMarketwatch/tableSlice";
import { setActiveMenu } from "./menuSlice";
import { getDataTable } from "../tableMarketwatch/tableTestSlice";
// import { fetchDataTableHNXAsync, } from "../tableMarketwatch/tableSlice";

// interface IProp {
//   setState: () => void;
// }
const DanhMuc = (props: any) => {
  const dispatch = useAppDispatch();
  const { isLoading, data, status, row, name } = useSelector(
    (state: RootState) => state.categories
  );
// function handleDispatch(item:string) {
//   dispatch(fetchTableHNXAsync(item))
//   dispatch(fetchTableHSXAsync(item))
  // Xử lý logic của dispatch

  // Chuyển hướng đến trang chủ
  // navigate('/chung-khoan/danh-muc');
// }
const handleItemChildClick = async (
  name: string,
  query: string,
  row: string,
  floor: string
) => {
  // setActiveMenuItemChild(name);
  localStorage.setItem("activePriceboardTabMenu", name);
  let data = {
    Floor: floor,
    Query: query,
    RowPined: row
  };
  let activeCate ={
    name, row
  }
  let activeMenu = {
    keyMenu : -1,
    nameMenu : ""
  }
  dispatch(setActiveMenu(activeMenu)) // cập nhật active menu 
  dispatch(activeMenuDanhmuc(activeCate )) // cập nhật active danh mục 
  await dispatch(getDataTable(data));
};
  return (
    <div
      className={`group list-sub-menu ${props.class} ${row && name ? "activeBgCate" : " "}`}
    >
      <span className="text-13px ">Danh mục{name ? `: ${name}` : ""}</span>
      <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
      {data && data.Data.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <li className="relative">
              <Link to="" className=" "  onClick={() => handleItemChildClick(item.Name,item.List ,item.Row ,'danh-muc',)}> 
                {item.Name}
              </Link>  
              <span id={`btDel${index}`} className="imgDel keep" />
            </li>
          </React.Fragment>
        ))}
         
        <li className="relative">
          <input className="textBox" placeholder="Thêm danh mục"></input>
          <span id="btAdd" className="imgAdd keep">
            <span></span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DanhMuc;
