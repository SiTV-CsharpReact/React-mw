import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/configureStore";
import codeListSlice, { listStock } from "./codeListSlice";

const DanhMuc = () => {
  const dispatch = useAppDispatch();
  const [Data, setData] = useState<{ Data: any[] }>({ Data: [] });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C108101`
        );
        setData(response.data);
        console.log("dataCategory", response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  Data.Data.sort((a, b) => {
    if (a.Default_MarketWatch === "1" && b.Default_MarketWatch !== "1") {
      return -1;
    }
    if (a.Default_MarketWatch !== "1" && b.Default_MarketWatch === "1") {
      return 1;
    }
    return 0;
  });

  // kiểm tra và xử lý Data trước khi sử dụng map()
  const dataToRender = Array.isArray(Data) ? Data : [];
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const codeList = e.currentTarget.getAttribute("data-codeList");
    console.log(codeList);
  };
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const requestData = {
        Rows: [],
        Data: {
          Name: newCategory,
        }
      };
  
      setCategories(prevCategories => [...prevCategories, requestData.Data.Name]); // Chỉ cập nhật giá trị Name vào categories
  
      axios.post('http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C108101', requestData)
        .then(response => {
          const createdCategory = response.data.Data;
          setCategories(prevCategories => [...prevCategories, createdCategory]);
          setNewCategory(""); // Đặt lại giá trị ô input thành rỗng sau khi đã nhận phản hồi từ server

        })
        .catch(error => {
          console.error(error);
        });
    }

  };
  // Hàm xử lý xóa danh mục
  const handleDeleteCategory = (scoreToDelete:string) => {
    axios.delete('http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C108101', { data: { Score: parseFloat(scoreToDelete) } })
    .then(response => {
        // If the delete request is successful, update the categories state to reflect the deletion
          setCategories(categories.filter(category => category !== scoreToDelete.toString()));
          
          console.log("aaa",scoreToDelete)
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  
  
  //  return (
  //     <div className="group list-sub-menu  ">
  //       <span className="text-13px">Danh mục</span>
  //       <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
  //         <li>
  //           <Link className=" " to="/chung-khoan/VNI">
  //             van si
  //           </Link>
  //           <span id="btDel0" className="imgDel   keep"/>
  //         </li>
  //         <li>
  //           <Link className=" " to="/chung-khoan/VNI">
  //             VNI
  //           </Link>
  //           <span id="btDel0" className="imgDel   keep"/>
  //         </li>
  //         <li>
  //           <Link className=" " to="/chung-khoan/VNI">
  //             VNI
  //           </Link>
  //           <span id="btDel0" className="imgDel   keep"/>
  //         </li>
  //         <li className="relative">
  //           <input className="textBox" placeholder="Thêm danh mục">
  //           </input>
  //           <span id="btAdd" className="imgAdd keep"><span></span></span>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // console.log(Data.Data);
  return (
    <div className="group list-sub-menu">
      <span className="text-13px">Danh mục</span>
      <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
      {Data &&
  Data.Data.map((item: any, index: number) => (
    <React.Fragment key={item.Score}>
      <li className="relative">
        <Link
          className=" "
          data-codeList={item.List}
          to={`/chung-khoan/danh-muc`}
          onClick={() => dispatch(listStock(item.List))}
        >
          {item.Name}
        </Link>

        <span
          id={`btDel${index}`}
          className="imgDel keep"
          onClick={() => handleDeleteCategory(item.Score)} // Gọi hàm xóa khi ấn vào icon xóa
        />
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
