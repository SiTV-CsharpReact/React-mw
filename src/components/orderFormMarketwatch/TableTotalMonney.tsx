import React, { useEffect } from 'react'
import CachedIcon from '@mui/icons-material/Cached';
import { useTranslation } from 'react-i18next';
import { formatNumberMarket } from '../../utils/util';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { fetchClientBalence } from './ClientBalance';
interface IMyProps {
  status: boolean,
  priceMoney?: Number
}
const TableTotalMonney: React.FC<IMyProps> = ({priceMoney, status}:IMyProps) => {
  const dispatch = useAppDispatch()
  const dataMonney = useAppSelector((state)=> state.clientBalance)
  useEffect(()=>{
    dispatch(fetchClientBalence())
  }
  ,[])
  const { t } = useTranslation(["home"]);
  console.log(dataMonney)
  //console.log(status)
  return (
    <div className={`bottom__sdTien ml-[13%] mr-[3%] float-left  SDTM ${status?'ml-[13%]':'absolute top-[110px] ml-[25px]'}`}>
          <div className=" bg-[#b3b3b3] h-[25px] ">
            <span className="px-2.5 text-[#0055ba] uppercase text-15px leading-[25px]">
            {t("home:Order.CASH_SDT")} 
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
            <span className=""> Tiền bán CK chờ về:</span>
            <span className="font-bold">{formatNumberMarket(priceMoney)} </span>
          </div>
          <div className="bottom__sdTien__title  flex justify-between text-13px	">
            <span className="">{t("home:Order.CASH_TUT")}</span>

            <span className="font-bold">0</span>
          </div>
          <div className="bottom__sdTien__title  flex justify-between text-13px	">
            <span className="">{t("home:Order.CASH_TCFPTSV")}</span>
            <span className="font-bold">0</span>
          </div>
          <div className="bottom__sdTien__title  flex justify-between text-13px	">
            <span className="">Sức mua từ CK còn lại:</span>
            <span className="font-bold">0</span>
          </div>
           <div className="tt-t"></div>
          <div className="bottom__sdTien__title   flex justify-between text-13px">
            <span className="">Sức mua cơ sở:</span>
            <span className="font-bold">{formatNumberMarket(priceMoney)}</span>
          </div>
          <div className="bottom__sdTien__title   flex justify-between text-13px">
            <span className="">Sức mua tổng hợp:</span>
            <span className="font-bold">{formatNumberMarket(priceMoney)}</span>
          </div>
          <div className="bottom__sdTien__title   flex justify-between text-13px">
            <span className="">Hạn mức còn lại:</span>
            <span className="font-bold">{formatNumberMarket(priceMoney)}</span>
          </div>
          </div>
        </div>
  )
}

export default TableTotalMonney