import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { ObjectMenuHNX, ObjectMenuHSX } from '../models/modelListMenuHSX';
import { iconColorMenuMarket, setColorMenuMarket } from '../utils/util';
const MenuMarketWatch = () => {
    const [valueHSX, setValueHSX] = useState<ObjectMenuHSX | null>(null);
    const [valueHNX, setValueHNX] = useState<ObjectMenuHNX | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const responseHSX = await axios.get(`http://marketstream.fpts.com.vn/hsx/data.ashx?s=index`);
                const responseHNX = await axios.get(`http://marketstream.fpts.com.vn/hnx/data.ashx?s=index`);
                setValueHSX(responseHSX.data);
                setValueHNX(responseHNX.data);
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
          }
          fetchData();
       
      }, []);
     if (loading) return <div className="">Loading...</div>
  return (
   
    <div id="divIndexChart">
    <ul className=" col-priceboard class-chart">
      <div className='flex p-1 scrollableArea'>
<li className=" dvChart">
  <div>
  <p className="text-sm"><span id="" className="mar_">VNXALL: </span><span id="VNXALL_IndexValue" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} pr-0.5`}>{valueHSX?.VNXALL_IndexValue}</span><span id="VNXALL_Image" className={`${iconColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}></span><span id="VNXALL_Change" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNALL_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}><span id="VNXALL_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VNALL_Change)} px-0.5`}>{valueHSX?.VNALL_ChangePercent}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="VNXALL_TotalSharesAOM" className="mar_ txtIndex">{valueHSX?.VNXALL_TotalSharesAOM}</span><span  className="mar_ spValue">GT:</span><span id="VNXALL_TotalValuesAOM" className="mar_ txtIndex" >{valueHSX?.VNXALL_TotalValuesAOM}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="VNXALL_Up" className="maru txtIndex" >{valueHSX?.VNXALL_Up}</span><span  className="marc txtIndex">(<span id="VNXALL_Ceiling"  >{valueHSX?.VNXALL_Ceiling}</span>)</span><span  className="square" /><span id="VNXALL_NoChange" className="marn txtIndex" >63</span><span  className="arrowDown" /><span id="VNXALL_Down" className="mard txtIndex" >{valueHSX?.VNXALL_Down}</span><span  className="marf txtIndex">(<span id="VNXALL_Floor" >{valueHSX?.VNXALL_Floor}</span>)</span><span  className="HO_MarketStat txtIndex">Liên tục</span></p>
  </div>

</li>
<li className=" dvChart">
  <div>
<p className="text-sm"><span id="" className="mar_">VNI: </span><span id="VNI_IndexValue" className={`${setColorMenuMarket(valueHSX?.VNI_Change)} pr-0.5`}>{valueHSX?.VNI_IndexValue}</span><span id="VNI_Image" className={`${iconColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}></span><span id="VNI_Change" className={`${setColorMenuMarket(valueHSX?.VNI_Change)} px-0.5`}>{valueHSX?.VNI_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VNI_ChangePercent)} px-0.5`}><span id="VNI_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VNI_ChangePercent)} px-0.5`}>{valueHSX?.VNI_ChangePercent}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="VNI_TotalSharesAOM" className="mar_ txtIndex" >{valueHSX?.VNI_TotalSharesAOM}</span><span  className="mar_ spValue">GT:</span><span id="VNI_TotalValuesAOM" className="mar_ txtIndex" >{valueHSX?.VNI_TotalValuesAOM}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="VNI_Up" className="maru txtIndex" >{valueHSX?.VNI_Up}</span><span  className="marc txtIndex">(<span id="VNI_Ceiling"  >{valueHSX?.VNI_Ceiling}</span>)</span><span  className="square" /><span id="VNI_NoChange" className="marn txtIndex" >{valueHSX?.VNI_NoChange}</span><span  className="arrowDown" /><span id="VNI_Down" className="mard txtIndex" >{valueHSX?.VNI_Down}</span><span className="marf txtIndex">(<span id="VNI_Floor">{valueHSX?.VNI_Floor}</span>)</span><span  className="HO_MarketStat txtIndex">Liên tục</span></p>
        </div>
</li>
<li className=" dvChart">
  <div>
<p className="text-sm"><span id="" className="mar_">HNX: </span><span id="i02_3" className={`${setColorMenuMarket(valueHNX?.i02_5)} pr-0.5`}>{valueHNX?.i02_3}</span><span id="i02_Image" className={`${iconColorMenuMarket(valueHNX?.i02_5)} px-0.5`}></span><span id="i02_5" className={`${setColorMenuMarket(valueHNX?.i02_5)} px-0.5`}>{valueHNX?.i02_5}</span><span id="" className={`${setColorMenuMarket(valueHNX?.i02_6)} px-0.5`}><span id="i02_6" className={`${setColorMenuMarket(valueHNX?.i02_6)} px-0.5`}>{valueHNX?.i02_6}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="i02_7" className="mar_ txtIndex" >{valueHNX?.i02_7}</span><span  className="mar_ spValue">GT:</span><span id="i02_14" className="mar_ txtIndex" >{valueHNX?.i02_14}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="i02_x251" className="maru txtIndex" >{valueHNX?.i02_x251}</span><span  className="marc txtIndex">(<span id="i02_x251c"  >{valueHNX?.i02_x251c}</span>)</span><span  className="square" /><span id="i02_x252" className="marn txtIndex" >{valueHNX?.i02_x252}</span><span  className="arrowDown" /><span id="i02_x253" className="mard txtIndex" >{valueHNX?.i02_x253}</span><span  className="marf txtIndex">(<span id="i02_x253f">{valueHNX?.i02_x253f}</span>)</span><span id="i02_x336x340" className="HA_MarketStat txtIndex">{valueHNX?.i02_x336x340==="LIS_CON_NML_2"?"Nghỉ trưa":"Liên tục"}</span></p>
        </div>
</li>
<li className=" dvChart">
  <div>
<p className="text-sm"><span id="" className="mar_">HNX30: </span><span id="i41_3" className={`${setColorMenuMarket(valueHNX?.i41_5)} pr-0.5`}>{valueHNX?.i41_3}</span><span id="i41_Image" className={`${iconColorMenuMarket(valueHNX?.i41_5)} px-0.5`}></span><span id="i41_5" className={`${setColorMenuMarket(valueHNX?.i41_5)} px-0.5`}>{valueHNX?.i41_5}</span><span id="" className={`${setColorMenuMarket(valueHNX?.i41_6)} px-0.5`}><span id="i41_6" className={`${setColorMenuMarket(valueHNX?.i41_6)} px-0.5`}>{valueHNX?.i41_6}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="i41_7" className="mar_ txtIndex" >{valueHNX?.i41_7}</span><span  className="mar_ spValue">GT:</span><span id="i41_14" className="mar_ txtIndex" >{valueHNX?.i41_14}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="i41_x251" className="maru txtIndex" >{valueHNX?.i41_x251}</span><span  className="marc txtIndex">(<span id="i41_x251c" >{valueHNX?.i41_x251c}</span>)</span><span  className="square" /><span id="i41_x252" className="marn txtIndex" >{valueHNX?.i41_x252}</span><span  className="arrowDown" /><span id="i41_x253" className="mard txtIndex" >{valueHNX?.i41_x253}</span><span  className="marf txtIndex">(<span id="i41_x253f" >{valueHNX?.i41_x253f}</span>)</span><span id="i41_x336x340" className="HA_MarketStat txtIndex">{valueHNX?.i41_x336x340==="LIS_CON_NML_2"?"Nghỉ trưa":"Liên tục"}</span></p>
        </div>
</li>
<li className=" dvChart">
  <div>
<p className="text-sm "><span id="" className="mar_">VN30: </span><span id="VN30_IndexValue" className={`${setColorMenuMarket(valueHSX?.VN30_Change)} pr-0.5`}>{valueHSX?.VN30_IndexValue}</span><span id="VN30_Image" className={`${iconColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}></span><span id="VN30_Change" className={`${setColorMenuMarket(valueHSX?.VN30_Change)} px-0.5`}>{valueHSX?.VN30_Change}</span><span id="" className={`${setColorMenuMarket(valueHSX?.VN30_ChangePercent)} px-0.5`}><span id="VN30_ChangePercent" className={`${setColorMenuMarket(valueHSX?.VN30_ChangePercent)} px-0.5`}>{valueHSX?.VN30_ChangePercent}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="VN30_TotalSharesAOM" className="mar_ txtIndex" >{valueHSX?.VN30_TotalSharesAOM}</span><span  className="mar_ spValue">GT:</span><span id="VN30_TotalValuesAOM" className="mar_ txtIndex" >{valueHSX?.VN30_TotalValuesAOM}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="VN30_Up" className="maru txtIndex" >{valueHSX?.VN30_Up}</span><span  className="marc txtIndex">(<span id="VN30_Ceiling" >{valueHSX?.VN30_Ceiling}</span>)</span><span  className="square" /><span id="VN30_NoChange" className="marn txtIndex" >{valueHSX?.VN30_NoChange}</span><span  className="arrowDown" /><span id="VN30_Down" className="mard txtIndex" >{valueHSX?.VN30_Down}</span><span  className="marf txtIndex">(<span id="VN30_Floor" >{valueHSX?.VN30_Floor}</span>)</span><span  className="HO_MarketStat txtIndex">Liên tục</span></p>
        </div>
</li>
<li className=" dvChart">
  <div>
<p className="text-sm"><span id="" className="mar_">UPCOM: </span><span id="i03_3" className={`${setColorMenuMarket(valueHNX?.i03_5)} pr-0.5`}>{valueHNX?.i03_3}</span><span id="i03_Image" className={`${iconColorMenuMarket(valueHNX?.i03_5)} px-0.5`}></span><span id="i03_5" className={`${setColorMenuMarket(valueHNX?.i03_5)} px-0.5`}>{valueHNX?.i03_5}</span><span id="" className={`${setColorMenuMarket(valueHNX?.i03_6)} px-0.5`}><span id="i03_6" className='px-0.5'>{valueHNX?.i03_6}</span>%</span></p>
<p className="text-xs text-center"><span  className="mar_ spQtty">KL:</span><span id="i03_7" className="mar_ txtIndex" >{valueHNX?.i03_7}</span><span  className="mar_ spValue">GT:</span><span id="i03_14" className="mar_ txtIndex" >{valueHNX?.i03_14}</span><span  className="mar_ spUnit">tỷ</span></p>
        <p className="text-xs text-center"><span  className="arrowUp" /><span id="i03_x251" className="maru txtIndex" >{valueHNX?.i03_x251}</span><span  className="marc txtIndex">(<span id="i03_x251c"  >{valueHNX?.i03_x251c}</span>)</span><span  className="square" /><span id="i03_x252" className="marn txtIndex" >{valueHNX?.i03_x252}</span><span  className="arrowDown" /><span id="i03_x253" className="mard txtIndex" >{valueHNX?.i03_x253}</span><span  className="marf txtIndex">(<span id="i03_x253f">{valueHNX?.i03_x253f}</span>)</span><span id="i03_x336x340" className="UP_MarketStat txtIndex">{valueHNX?.i03_x336x340==="UPC_CON_NML_2"?"Nghỉ trưa":"Liên tục"}</span></p>
        </div>
</li>
</div>
</ul>
    </div>
  )
}

export default MenuMarketWatch