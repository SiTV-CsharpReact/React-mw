// import React, { useEffect } from "react";
// import { Link,  } from "react-router-dom";
// import { RootState, useAppDispatch } from "../../store/configureStore";
// import  { listStock } from "./codeListSlice";
// import { fetchCategoryAsync } from "./danhmucSlice";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const DanhMuc = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { isLoading, data, status } = useSelector(
//     (state: RootState) => state.categories
//   );
//  console.log({ isLoading, data, status })
//  useEffect(() => {
//   dispatch(fetchCategoryAsync());
// }, [dispatch]);
// function handleDispatch() {
//   // Xử lý logic của dispatch
//   // Chuyển hướng đến trang chủ
//   navigate('/chung-khoan/danh-muc');
// }
//   const handelAdd = () => {
    
//   }
//   return (
//     <div className="group list-sub-menu">
//     <span className="text-13px">Danh mục</span>
//       <ul className="absolute z-40 hidden text-black group-hover:block sub-menu">
//       {data && data.Data.map((item: any, index: number) => (
//           <React.Fragment key={item.Score}>
//             <li className="relative">
//               <Link to="/chung-khoan/danh-muc" className=""  onClick={() => dispatch(listStock(item.List))}> 
//                 {item.Name}
//             </Link>  
           
//               <span id={`btDel${index}`} className="imgDel keep" />
//           </li>
        
//           </React.Fragment>
//       ))}
//           <li>
//              <input  onChange={} />
//           </li>
//         <li className="relative">
//           <input className="textBox" placeholder="Thêm danh mục"></input>
//           <span onClick={ handelAdd} id="btAdd" className="imgAdd keep">
//             <span></span>
//           </span>
          
//         </li>
//       </ul>
//   </div>
  
//   );
// };

// export default DanhMuc;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/configureStore";
import { listStock } from "./codeListSlice";
import { fetchCategoryAsync } from "./danhmucSlice";
import { useSelector } from "react-redux";

const DanhMuc = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, data, status } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategoryAsync());
  }, [dispatch]);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(data.Data || []);
  const handleAdd = () => {
    if (newCategory.trim() !== "") {
      const newCategoryItem = {
        Name: newCategory,
        List: [],
        Score: categories.length + 1,
      };

      const updatedCategories:any = [...categories, newCategoryItem];
      setCategories(updatedCategories);
      setNewCategory("");
      navigate("/chung-khoan/danh-muc")

    }
  };

  return (
    <div className="group list-sub-menu">
      <span className="text-13px">Danh mục</span>
      <ul className="absolute z-40 hidden text-black group-hover:block sub-menu">
        {categories.map((item, index) => (
          <React.Fragment key={item.Score}>
            <li className="relative">
              <Link
                to="/chung-khoan/danh-muc"
                className=""
                onClick={() => dispatch(listStock(item.List))}
              >
                {item.Name}
              </Link>
              <span id={`btDel${index}`} className="imgDel keep" />
            </li>
          </React.Fragment>
        ))}
        <li>
          <input
            className="textBox"
            placeholder="Add category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <span onClick={handleAdd} id="btAdd" className="imgAdd keep">
            <span> + </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DanhMuc;

