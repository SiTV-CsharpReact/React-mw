import React, { useState } from "react";  
import Select from 'react-select'
const CompleteStock = () => {
  const [ma , setMa] = useState("")
const handeMa  =(e:any )=>{
  const nameCate = localStorage.getItem("nameCategory")
  const Rowate = localStorage.getItem("RowCate")
 
}
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
  return (
    // <div className="input_complete form-control relative" id="addSymbol">
    //   <div className="ms-sel-ctn">
    //     <input
    //       type="text"
    //       placeholder="Thêm mã vào danh mục"
    //       autoComplete="off"
    //       role="presentation"
    //       id="txtF1"
    //       onBlur={(e)=>handeMa(e.target.value)}
    //     />
    //     <div style={{ display: "none" }} />
    //   </div>

    //   <div className="ms-trigger">
    //     <div className="ms-trigger-ico" />
    //     <select name="" id="">
    //       <option value="1">  xin chào </option>
    //     </select>
    //   </div>
    // </div>

        <Select options={options}
          placeholder= "Thêm mã vào danh mục "
          
        />
  );
};

export default CompleteStock;
