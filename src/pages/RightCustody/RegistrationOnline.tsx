import { useState } from "react"
import LayoutPage from "../Layout/LayoutPage"
import FromAction from "../FromAction/FromAction"
import SelectAction from "../FromAction/SelectAction"
import InputDateAction from "../FromAction/InputDateAction"
import { getDateTime } from "../helper/DateTime"
type TypeValue = {
  MaCK: any;
  tuNgay: any;
  denNgay: any;
};
const RegistrationOnline  = ()=>{
  let {tuNgay,denNgay} = getDateTime()
  const [data, setData] = useState<TypeValue>({
    MaCK: "",
    tuNgay: "",
    denNgay: "",
  });
  const ChangeMaCK = (e: any) => {
    setData({ ...data, MaCK: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
    return  <> 
        <LayoutPage
          content="Lưu ký trực tuyến "
          PageTitle="Lưu ký trực tuyến "
          Icon={true}
          TitleHover="Hướng dẫn sử dụng EzCustody"
          LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/luu-ky-chung-khoan/"
        > 
         <div> 
            <FromAction data= {data}> 
                <SelectAction Title="Mã Ck " ChangeFuncion={ChangeMaCK} /> 
                <InputDateAction Title="Từ Ngày" date={tuNgay} ChangeFuncion={ChangeTuNgay}/>
                <InputDateAction Title="Từ Ngày" date={denNgay} ChangeFuncion={ChangeDenNgay} />
                
            </FromAction>
          <div className="InformationOnlineResgistion">
            <p> nội dung đăng ký </p>
          </div>
         </div>
        </LayoutPage>
    </> 
}
export default RegistrationOnline