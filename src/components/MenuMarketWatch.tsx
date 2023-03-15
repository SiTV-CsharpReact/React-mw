import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { ObjectMenuHNX, ObjectMenuHSX } from '../models/modelListMenuHSX';
import { iconColorMenuMarket, setColorMenuMarket } from '../utils/util';
const MenuMarketWatch = () => {
    const [valueHSX, setValueHSX] = useState<ObjectMenuHSX | null>(null);
    const [valueHNX, setValueHNX] = useState<ObjectMenuHNX | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
          .get(`/hsx/data.ashx?s=index`)
          .then((res) => setValueHSX(res.data))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      }, []);
   
    useEffect(() => {
        axios
          .get(`/hnx/data.ashx?s=index`)
          .then((res) => setValueHNX(res.data))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setLoading(false));
      }, []);
     console.log(valueHSX)
     if (loading) return <div className="">Loading...</div>
  return (
   
    <div>
    <ul className="flex p-1">
<li className="mr-10">
<p className="text-sm"><span id="" className="mar_">VNXALL: </span><span id="VNXALL_IndexValue" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} pr-0.5`}>{valueHSX?.VNXALL_IndexValue}</span><span id="VNXALL_Image" className={`${iconColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}></span><span id="VNXALL_Change" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNALL_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}><span id="VNXALL_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNALL_ChangePercent}</span>%</span></p>

</li>
<li className="mr-10">
<p className="text-sm"><span id="" className="mar_">VNI: </span><span id="VNI_IndexValue" className={`${setColorMenuMarket(valueHSX?.VNI_Change)} pr-0.5`}>{valueHSX?.VNI_IndexValue}</span><span id="VNI_Image" className={`${iconColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}></span><span id="VNI_Change" className={`${setColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}>{valueHSX?.VNI_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VNI_ChangePercent)} px-0.5`}><span id="VNI_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VNI_ChangePercent)} px-0.5`}>{valueHSX?.VNI_ChangePercent}</span>%</span></p>
</li>
<li className="mr-10">
<p className="text-sm"><span id="" className="mar_">HNX: </span><span id="i02_3" className={`${setColorMenuMarket(valueHNX?.i02_5)} pr-0.5`}>{valueHNX?.i02_3}</span><span id="i02_Image" className={`${iconColorMenuMarket(valueHNX?.i02_5)} px-0.5`}></span><span id="i02_5" className={`${setColorMenuMarket(valueHNX?.i02_5)} px-0.5`}>{valueHNX?.i02_5}</span><span id="" className={`${setColorMenuMarket(valueHNX?.i02_6)} px-0.5`}><span id="i02_6" className={`${setColorMenuMarket(valueHNX?.i02_6)} px-0.5`}>{valueHNX?.i02_6}</span>%</span></p>
</li>
<li className="mr-10">
<p className="text-sm"><span id="" className="mar_">HNX30: </span><span id="i41_3" className={`${setColorMenuMarket(valueHNX?.i41_5)} pr-0.5`}>{valueHNX?.i41_3}</span><span id="i41_Image" className={`${iconColorMenuMarket(valueHNX?.i02_5)} px-0.5`}></span><span id="i41_5" className={setColorMenuMarket(valueHNX?.i41_5)}>{valueHNX?.i41_5}</span><span id="" className={`${setColorMenuMarket(valueHNX?.i41_6)} px-0.5`}><span id="i41_6" className={`${setColorMenuMarket(valueHNX?.i41_6)} px-0.5`}>{valueHNX?.i41_6}</span>%</span></p>
</li>
<li className="mr-10">
<p className="text-sm"><span id="" className="mar_">VN30: </span><span id="VN30_IndexValue" className={`${setColorMenuMarket(valueHSX?.VN30_Change)} pr-0.5`}>{valueHSX?.VN30_IndexValue}</span><span id="VN30_Image" className={`${iconColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}></span><span id="VN30_Change" className={`${setColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}>{valueHSX?.VN30_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VN30_ChangePercent)} px-0.5`}><span id="VN30_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VN30_ChangePercent)} px-0.5`}>{valueHSX?.VN30_ChangePercent}</span>%</span></p>
</li>
<li className="mr-10">
<p className="text-sm"><span id="" className="mar_">UPCOM: </span><span id="i03_3" className={`${setColorMenuMarket(valueHNX?.i03_5)} pr-0.5`}>{valueHNX?.i03_3}</span><span id="i03_Image" className={`${iconColorMenuMarket(valueHNX?.i03_5)} px-0.5`}></span><span id="i03_5" className={`${setColorMenuMarket(valueHNX?.i03_5)} px-0.5`}>{valueHNX?.i03_5}</span><span id="" className={`${setColorMenuMarket(valueHNX?.i03_6)} px-0.5`}><span id="i03_6" className='px-0.5'>{valueHNX?.i03_6}</span>%</span></p>
</li>
</ul>
    </div>
  )
}

export default MenuMarketWatch