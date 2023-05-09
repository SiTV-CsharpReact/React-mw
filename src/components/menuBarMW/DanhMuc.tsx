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
          `http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C000700`
        );
        setData(response.data);
        console.log("dataCategory", response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // kiểm tra và xử lý Data trước khi sử dụng map()
  const dataToRender = Array.isArray(Data) ? Data : [];
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const codeList = e.currentTarget.getAttribute("data-codeList");
    console.log(codeList);
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
  console.log(Data.Data)
  return (
    <div className="group list-sub-menu">
    <span className="text-13px">Danh mục</span>
      <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
      {Data && Data.Data.map((item: any, index: number) => (
          <React.Fragment key={item.Score}>
            <li className="relative">
              <Link className=" " data-codeList={item.List} to={`/chung-khoan/danh-muc`} onClick={() => dispatch(listStock(item.List))}> 
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
