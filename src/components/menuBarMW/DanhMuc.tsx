import React from "react";
import { Link } from "react-router-dom";

const DanhMuc = () => {
  return (
    <div className="group list-sub-menu  ">
      <span className="text-13px">Danh mục</span>
      <ul className="absolute hidden text-black group-hover:block z-40 sub-menu">
        <li>
          <Link className=" " to="/chung-khoan/VNI">
            van si
          </Link>
          <span id="btDel0" className="imgDel   keep"/>
        </li>
        <li>
          <Link className=" " to="/chung-khoan/VNI">
            VNI
          </Link>
          <span id="btDel0" className="imgDel   keep"/>
        </li>
        <li>
          <Link className=" " to="/chung-khoan/VNI">
            VNI
          </Link>
          <span id="btDel0" className="imgDel   keep"/>
        </li>
       
      </ul>
    </div>
  );
};

export default DanhMuc;
