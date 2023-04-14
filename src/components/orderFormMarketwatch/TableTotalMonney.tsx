import React from 'react'
import CachedIcon from '@mui/icons-material/Cached';
interface IMyProps {
  status: boolean,
}
const TableTotalMonney: React.FC<IMyProps> = (status:IMyProps) => {
  console.log(status)
  return (
    <div className={`bottom__sdTien ml-[13%] mr-[3%] float-left  SDTM ${status.status?'ml-[13%]':'absolute top-[110px] ml-[25px]'}`}>
          <div className=" bg-[#b3b3b3] h-[25px] ">
            <span className="px-2.5 text-[#0055ba] uppercase text-15px leading-[25px]">
              Số dư tiền
            </span>
            <CachedIcon style={{color:'#1d60bc',fontSize:18,fontWeight:600,marginBottom:2}}/>
            <i
              title="Cập nhật số dư tiền"
              className="glyphicon glyphicon-refresh"
              id="spnRefreshDataCookieTien"
            ></i>
          </div>
          <div className='text-13px'>
          <div className="bottom__sdTien__title flex justify-between  text-13px	">
            <span className="">Số dư tiền mặt:</span>
            <span className="font-bold">7,860,601,494</span>
          </div>
          <div className="bottom__sdTien__title  flex justify-between text-13px	">
            <span className="">Tiền ứng trước</span>

            <span className="font-bold">0</span>
          </div>
          <div className="bottom__sdTien__title  flex justify-between text-13px	">
            <span className="">Tiền cho FPTS vay</span>

            <span className="font-bold">0</span>
          </div>
           <div className="tt-t"></div>
          <div className="bottom__sdTien__title   flex justify-between text-13px">
            <span className="">Số dư có thể giao dịch:</span>
            <span className="font-bold">7,860,601,494</span>
          </div>
          </div>
        </div>
  )
}

export default TableTotalMonney