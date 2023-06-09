import React from 'react'
import { useAppSelector } from '../../store/configureStore';

const TableDetailPopup :React.FC<any> = ({dataResult}) => {
  const { dataMouse  }: any = useAppSelector(state => state.dataMouse);
  const { dataMouseBuy }: any = useAppSelector(state => state.dataMouseBuy);
  
  const color = dataResult.map((item: any) => item.MP)
         const colorY =  dataMouse.priceF < color ? "red"
              : dataMouse > color
              ? "#00FF00"
              : "yellow";
          const colorBuy =
            dataMouseBuy.priceB < color ? "red"
              : dataMouseBuy > color
              ? "green"
              : "#F7FF31";
  return (
    <table id="tbLPRT" className="table table-bordered table-priceboard text-[#B9B9B9]">
    <thead style={{}}>
      <tr>
        <th rowSpan={2} className="hbrb">
          Mã
        </th>
        <th rowSpan={2} className="hg_b">
          TC
        </th>
        <th rowSpan={2} className="hg_b">
          Trần
        </th>
        <th rowSpan={2} className="hgrb">
          Sàn
        </th>
        <th colSpan={7} className="hbrb">
          Mua
        </th>
        <th colSpan={3} className="hgrb">
          Khớp lệnh
        </th>
        <th colSpan={7} className="hbrb">
          Bán
        </th>
        <th rowSpan={2} className="hg_b">
          Tổng KL
        </th>
        <th rowSpan={2} className="hg_b">
          Mở
          <br />
          cửa
        </th>
        <th rowSpan={2} className="hg_b">
          Cao
          <br />
          nhất
        </th>
        <th rowSpan={2} className="hg_b">
          Thấp
          <br />
          nhất
        </th>
        <th rowSpan={2} className="hgrb">
          Trung
          <br />
          bình
        </th>
        <th rowSpan={2} className="hg_b">
          NN
          <br />
          mua
        </th>
        <th rowSpan={2} className="hg_b">
          NN
          <br />
          bán
        </th>
        <th rowSpan={2} className="hg_b">
          Room
          <br />
          còn lại
        </th>
      </tr>
      <tr>
        <th className="hb_b">KL4</th>
        <th className="hb_b">G3</th>
        <th className="hb_b">KL3</th>
        <th className="hb_b">G2</th>
        <th className="hb_b">KL2</th>
        <th className="hb_b">G1</th>
        <th className="hbrb">KL1</th>
        <th className="hg_b">Giá</th>
        <th className="hg_b">KL</th>
        <th className="hgrb">+/-</th>
        <th className="hb_b">G1</th>
        <th className="hb_b">KL1</th>
        <th className="hb_b">G2</th>
        <th className="hb_b">KL2</th>
        <th className="hb_b">G3</th>
        <th className="hb_b">KL3</th>
        <th className="hbrb">KL4</th>
      </tr>
    </thead>
    <tbody id="firstTbody">
      <tr  id="tr215">
        <td
          className="ccc_ fixedcol"
          
        
        >
          <span style={{color :colorY || colorBuy}} className='!font-medium' >
           {dataMouse.maF || dataMouseBuy.maB}
          </span>
        </td>
          <td  className="g_r text-[#F7FF31] !font-medium" >
           {dataMouse.TCT || dataMouseBuy.TCT}
            
        </td>
        <td  className="g_c  text-[#FF00FF] !font-medium" >
          {dataMouse.TranC || dataMouseBuy.TranC}
        </td>
        <td  className="grf  !text-[#66CCFF] text-[13.3px] !font-medium" >
           {dataMouse.SanT || dataMouseBuy.SanT}
        </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.KL4 ?? dataMouseBuy.dataPopup.KL4}</td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.G3 || dataMouseBuy.dataPopup.G3} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.KL3 || dataMouseBuy.dataPopup.KL3} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.G2 || dataMouseBuy.dataPopup.G2} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.KL2 || dataMouseBuy.dataPopup.KL2} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.G1 || dataMouseBuy.dataPopup.G1} </td>
        <td style={{color :colorY || colorBuy}} className="br_ ">{ dataMouse.dataPopup.KL1 || dataMouseBuy.dataPopup.KL1} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.priceF || dataMouseBuy.priceF} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.KLKhop || dataMouseBuy.dataPopup.KLKhop} </td>
        <td style={{color :colorY || colorBuy}} className="gr_ ">{dataMouse.dataPopup.Chenhlech || dataMouseBuy.dataPopup.Chenhlech} </td>
          
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.G1B || dataMouseBuy.dataPopup.G1B} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.KL1B || dataMouseBuy.dataPopup.KL1B} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.G2B || dataMouseBuy.dataPopup.G2B} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.KL2B || dataMouseBuy.dataPopup.KL2B} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.G3B || dataMouseBuy.dataPopup.G3B} </td>
        <td style={{color :colorY || colorBuy}} className="b__ ">{ dataMouse.dataPopup.KL3B || dataMouseBuy.dataPopup.KL3B} </td>
        <td style={{color :colorY || colorBuy}} className="br_ ">{ dataMouse.dataPopup.KL4B || dataMouseBuy.dataPopup.KL4B} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.TKL || dataMouseBuy.dataPopup.TKL} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.MOC || dataMouseBuy.dataPopup.MOC} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.CaoNhat || dataMouseBuy.dataPopup.CaoNhat} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.ThapNhat || dataMouseBuy.dataPopup.ThapNhat} </td>
        <td style={{color :colorY || colorBuy}} className="gr_ "> </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.NNMua || dataMouseBuy.dataPopup.NNMua} </td>
        <td style={{color :colorY || colorBuy}} className="g__ ">{ dataMouse.dataPopup.NNBan || dataMouseBuy.dataPopup.NNBan} </td>
        <td style={{color :colorY || colorBuy}} className="g__ "> 
          1,626,443
        </td>
      </tr>
    </tbody>
  </table>
  )
}

export default TableDetailPopup