import React, { useEffect } from "react";
import { Link,  } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/configureStore";
import  { listStock } from "./codeListSlice";
import { fetchCategoryAsync } from "./danhmucSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DanhMuc = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, data, status } = useSelector(
    (state: RootState) => state.categories
  );
//  console.log({ isLoading, data, status })
 useEffect(() => {
  dispatch(fetchCategoryAsync());
}, [dispatch]);
function handleDispatch() {
  // Xử lý logic của dispatch

  // Chuyển hướng đến trang chủ
  navigate('/chung-khoan/danh-muc');
  
}
  return (
    <div className="group list-sub-menu">
      <span className="text-13px">Danh mục</span>
      <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
      {data && data.Data.map((item: any, index: number) => (
          <React.Fragment key={item.Score}>
            <li className="relative">
              <Link to="/chung-khoan/danh-muc" className=" "  onClick={() => dispatch(listStock(item.List))}> 
              {/* <Link to="/chung-khoan/danh-muc" className=" "  onClick={() =>console.log("ok",item.List)}>  */}
                {item.Name}
              </Link>  
              <span id={`btDel${index}`} className="imgDel keep" />
            </li>
          </React.Fragment>
        ))}
        <li className="relative">
          <input
            className="textBox"
            placeholder="Thêm danh mục"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <span id="btAdd" className="imgAdd keep" onClick={handleAddCategory}>
            <span></span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DanhMuc;
