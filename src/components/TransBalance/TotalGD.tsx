
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { formatNumber } from '../../utils/util'
import { useTranslation } from 'react-i18next';

const TotalGD = () => {
        const { t } = useTranslation(["report"]);
        const [dataTotal, setDataTotal] = useState<any>()
        const fetchData = async() => {
        const {data} = await axios.get("http://localhost:3109/Data")
        setDataTotal(data)
        }
        useEffect(() => {
            fetchData()
        },[])
  return (
      <div>
          <div className='w-[380px] h-[614px] pr-2 mt-5 ml-5 bg-[#ECECEC]'>
              <div className='flex items-center justify-between px-2 pt-3'>
                  <p className='text-[12px] text-[#000000] !font-bold'>{t("report:Transbalance.TradeableMoney")}</p>
                  <p className='text-[12px] text-[#000000] !font-bold'>{ formatNumber(dataTotal?.PurchasingPowerTotal)}</p>
              </div>
              <div className='flex items-center justify-between mt-2'>
                  <div></div>
                  <button onClick={()=>alert(" buy success")} className='px-[35px] py-[3.9px] bg-[#0055ba] text-white !rounded-[4px]'>{t("report:Transbalance.Buy")}</button>
              </div>

              <div className='pl-3 '>
                   <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                      <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.MonneyBefore")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.CashAmount)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.LendingToFPTS")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.FSaving)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.AdvanceAmount")}	</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.BuyingPowerFromStocks")} <i className='fa fa-info-circle text-[#717171]'></i></p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.PendingBuyOrders")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.CashSuspendedForBuyingMtched")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.CashInTransit")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-[5px] hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.OtherUnpaidFees")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>
              </div>
              
              <div className='hover:bg-[#EEFFEE] flex items-center justify-between'>
                  <p className='text-[12px] text-[#000000]  px-2 pt-3 !font-bold'>{t("report:Transbalance.TotalCash")} <i className='fa fa-info-circle text-[#717171]'></i> </p>
                <p className='text-[12px] text-[#000000]  px-2 pt-3 !font-bold'>{ formatNumber(dataTotal?.RemainingCashAmount)}</p>
              </div>

              <div className='pl-3 '>
                   <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.RemainingCash")}<i className='fa fa-info-circle text-[#717171]'></i></p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.RemainingCashAmount)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.SavingsLendings")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.FSaving)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.CashPendingPayment")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>1,305,660</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium pl-5'>T0 </p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.ReceivableCashT0)}</p>
              </div>

                <div className='flex items-center justify-between px-2  pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium  pl-5'>T1</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.ReceivableCashT1)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium pl-5'>T2	</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.ReceivableCashT2)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.CashDividendPendingForSettlement")}</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>{ formatNumber(dataTotal?.ReceivableCashTotal)}</p>
              </div>

                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-medium'>{t("report:Transbalance.OtherCashPendingForSettlement")}	</p>
                  <p className='text-[12px] text-[#000000] !font-medium'>0</p>
              </div>
              </div>
             
                <div className='flex items-center justify-between px-2 pt-3 hover:bg-[#EEFFEE]'>
                  <p className='text-[12px] text-[#000000] !font-bold'>{t("report:Transbalance.Marginloans")}	</p>
                  <p className='text-[12px] text-[#000000] !font-bold'>0</p>
              </div>
              
          </div>
    </div>
  )
}

export default TotalGD