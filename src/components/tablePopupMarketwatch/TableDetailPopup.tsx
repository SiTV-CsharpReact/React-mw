import { useAppSelector } from '../../store/configureStore';
import { formatNumberMarket, setColorMarket} from '../../utils/util';

const TableDetailPopup = () => {
  const {dataDetailPopup} = useAppSelector(state=>state.dataPopupDetail)
  
  return (
    <table id="tbLPRT" className="table table-bordered table-priceboard text-[#B9B9B9]">
    <thead className='bg-[#333333]' style={{ fontFamily:"Arial,Sans-Serif"}}>
      <tr>
        <th rowSpan={2} className="hbrb text-[#B9B9B9]">
          Mã
        </th>
      <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          TC
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          Trần
        </th>
        <th rowSpan={2} className="hgrb !text-[#B9B9B9]">
          Sàn
        </th>
        <th colSpan={7} className="hbrb !text-[#B9B9B9]">
          Mua
        </th>
        <th colSpan={3} className="hgrb !text-[#B9B9B9]">
          Khớp lệnh
        </th>
        <th colSpan={7} className="hbrb !text-[#B9B9B9]">
          Bán
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          Tổng KL
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          Mở
          <br />
          cửa
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          Cao
          <br />
          nhất
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          Thấp
          <br />
          nhất
        </th>
        <th rowSpan={2} className="hgrb !text-[#B9B9B9]">
          Trung
          <br />
          bình
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          NN
          <br />
          mua
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          NN
          <br />
          bán
        </th>
        <th rowSpan={2} className="hg_b !text-[#B9B9B9]">
          Room
          <br />
          còn lại
        </th>
      </tr>
      <tr>
        <th className="hb_b !text-[#B9B9B9]">KL4</th>
        <th className="hb_b !text-[#B9B9B9]">G3</th>
        <th className="hb_b !text-[#B9B9B9]">KL3</th>
        <th className="hb_b !text-[#B9B9B9]">G2</th>
        <th className="hb_b !text-[#B9B9B9]">KL2</th>
        <th className="hb_b !text-[#B9B9B9]">G1</th>
        <th className="hbrb !text-[#B9B9B9]">KL1</th>
        <th className="hg_b !text-[#B9B9B9]">Giá</th>
        <th className="hg_b !text-[#B9B9B9]">KL</th>
        <th className="hgrb !text-[#B9B9B9]">+/-</th>
        <th className="hb_b !text-[#B9B9B9]">G1</th>
        <th className="hb_b !text-[#B9B9B9]">KL1</th>
        <th className="hb_b !text-[#B9B9B9]">G2</th>
        <th className="hb_b !text-[#B9B9B9]">KL2</th>
        <th className="hb_b !text-[#B9B9B9]">G3</th>
        <th className="hb_b !text-[#B9B9B9]">KL3</th>
        <th className="hbrb !text-[#B9B9B9]">KL4</th>
      </tr>
    </thead>
    <tbody className='bg-[#333333]' id="firstTbody">
      <tr  id="tr215">
        <td
          className="ccc_ fixedcol"
        >
          <span className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[11][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`} >
              {/* {dataMouse.maF || dataMouseBuy.maB || displayCode} */}
              { dataDetailPopup[0]?.Info[0][1] || dataDetailPopup[0]?.Info[1][0] }

          </span>
        </td>
          <td  className="g_r text-[#F7FF31] !font-medium" >
            {/* {dataMouse.TCT || dataMouseBuy.TCT} */}
            { formatNumberMarket(dataDetailPopup[0]?.Info[1][1]) }
        </td>
        <td  className="g_c  text-[#FF00FF] !font-medium" >
            {/* {dataMouse.TranC || dataMouseBuy.TranC} */}
            { formatNumberMarket(dataDetailPopup[0]?.Info[2][1]) }
        </td>
        <td  className="grf  !text-[#66CCFF] text-[13.3px] !font-medium" >
            {/* {dataMouse.SanT || dataMouseBuy.SanT} */}
            { formatNumberMarket(dataDetailPopup[0]?.Info[3][1]) }
        </td>
        <td >{formatNumberMarket(dataDetailPopup[0]?.Info?.[4][1])}</td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[5][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[5][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[5][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[6][1])} </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[7][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[7][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[7][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[8][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[9][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[9][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[9][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[10][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[11][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[11][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[11][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[12][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[11][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{formatNumberMarket(dataDetailPopup[0]?.Info?.[13][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[15][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[14][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[15][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[15][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[17][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[16][1])} </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[17][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[17][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[19][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[18][1]) } </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[19][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[19][1])} </td>
        <td className="br_ !text-sm !text-[#white]">{ formatNumberMarket(dataDetailPopup[0]?.Info?.[20][1])} </td>
        <td className="g__ !text-sm !text-[#B9B9B9]">{ formatNumberMarket(dataDetailPopup[0]?.Info?.[21][1])} </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[22][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[22][1])} </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[23][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[23][1])} </td>
        <td className={` text-right ${setColorMarket(
                            dataDetailPopup[0]?.Info[1][1],
                            dataDetailPopup[0]?.Info[24][1],
                            dataDetailPopup[0]?.Info[2][1],
                            dataDetailPopup[0]?.Info[3][1]
                          )}`}>{ formatNumberMarket(dataDetailPopup[0]?.Info?.[24][1])} </td>
        <td className="gr_ !text-sm"> </td>
        <td className="g__ !text-sm !text-[#B9B9B9]">{ formatNumberMarket(dataDetailPopup[0]?.Info?.[26][1])} </td>
        <td className="g__ !text-sm !text-[#B9B9B9]">{ formatNumberMarket(dataDetailPopup[0]?.Info?.[27][1])} </td>
        <td className="g__ !text-sm !text-[#B9B9B9]"> 
        {formatNumberMarket(dataDetailPopup[0]?.Info[28][1])}
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default TableDetailPopup