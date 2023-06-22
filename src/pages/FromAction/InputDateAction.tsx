import React,{useState} from "react";
import { DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
type Props = {
  Title ? : string,
  date ? : any,
  ChangeFuncion ? :any
}
const InputDateAction = ({Title , date, ChangeFuncion} : Props) => {
  const ChangeInput = (e:any)=>{
    if(e.target.value){
      ChangeFuncion(e.target.value)
    }else{
      ChangeFuncion(date)
    }
  }
  return <div>
        <label className="">{Title}</label>
            <input type="date" defaultValue={date} onChange={(e)=>ChangeInput(e)} />
          
  </div>;
};
export default InputDateAction;
