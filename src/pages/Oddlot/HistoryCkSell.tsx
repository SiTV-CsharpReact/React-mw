import React,{useState} from 'react'
import LayoutPage from '../Layout/LayoutPage'
import FromAction from '../FromAction/FromAction'
import SelectAction from '../FromAction/SelectAction';
import InputDateAction from '../FromAction/InputDateAction';
import { TTlenhHistorySell, getDateTime } from '../helper/DateTime';
type TypeValue = {
  SanGD: any;
  MaCK: any;
  TTlenh: any;
  tuNgay: any;
  denNgay: any;
  TTXX: any;
};
const HistoryCkSell = () => {
  const [data, setData] = useState<TypeValue>({
    SanGD: "",
    MaCK: "",
    TTlenh: "",
    tuNgay: "",
    denNgay: "",
    TTXX: "",
  });
  let {tuNgay,denNgay}  = getDateTime()
  const ChangeTTlenh = (e: any) => {
    setData({...data,TTlenh:e })
  };
  const ChangeTuNgay = (e: any) => {
    setData({...data,tuNgay:e })
  };
  const ChangeDenNgay = (e: any) => {
    setData({...data,denNgay:e })
  };
  return ( <> 
    <LayoutPage 
      PageTitle=' Lịch sử bán CK lô lẻ'
      content=' Lịch sử bán CK lô lẻ'
    > 
      <div >
        <div>
          <FromAction> 
          <SelectAction
            Title="Tình trạng lệnh"
            Options={TTlenhHistorySell}
            ChangeFuncion={ChangeTTlenh}
          />
          <InputDateAction Title="Từ Ngày" date={tuNgay} ChangeFuncion={ChangeTuNgay}/>
          <InputDateAction Title="Đến Ngày" date={denNgay} ChangeFuncion={ChangeDenNgay} />

          </FromAction>
        </div>
        <div className='contentAction'> 
        <div className='contentActionPading'>
        <table className="TablePage" id='idHistoryCkSell'>
        <thead>
                    <tr>
                        <th>STT</th>
                        <th>SHL</th>
                        <th>Ngày đặt</th>
                        <th>C.khoán </th>
                        <th>Sàn</th>
                        <th>KL đặt</th>
                        <th>Giá đặt</th>
                        <th>Tình trạng lệnh</th>
                        <th>Kiểu lệnh</th>
                        <th >Hủy</th>
                        <th>TranID</th>                     
                    </tr>
                </thead>
              <tbody></tbody>
            </table>
        </div>
        </div>
      </div>
    </LayoutPage>
    </>
  )
}

export default HistoryCkSell