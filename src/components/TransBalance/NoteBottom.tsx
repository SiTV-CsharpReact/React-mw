import React from 'react'
import { useTranslation } from 'react-i18next';

const NoteBottom = () => {
    const { t } = useTranslation(["report"]);

    return (
        <div>

            <div className='w-screen pl-5'>
                <p className='text-[#717171] text-[13px]  mt-5' > {t("report:Transbalance.Note")}:</p>
                <ul>
                    <li>
                          {t("report:Transbalance.Node1")} . <span className='font-bold text-[#000000] underline'> {t("report:Transbalance.Node2")}</span>
                    </li>
                    <li>
                         {t("report:Transbalance.Node3")} 
                    </li>
                    <li>
                      {t("report:Transbalance.Node4")} 
                        <span className='text-[#0070C0] underline'>   {t("report:Transbalance.Node5")} </span>
                    </li>
                </ul>


            </div>
            <div className='h-[32px] bg-[#034e94] mt-2'>
                <p className='items-center pt-2 font-medium text-center text-white'>© 2020 {t("report:Transbalance.Node6")}</p>
            </div>
        </div>

    )
}

export default NoteBottom