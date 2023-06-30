import { useAppSelector ,RootState} from "../../../store/configureStore";
import { formatNumberMarket, formatNumberPhanTram } from "../../../utils/util";

const TableGDTH = ()=>{
  const { dataTableThongkeTH } = useAppSelector((state:RootState )=> state.tableTest);
    return  ( 
        <> 
         <table
        id="tbHIST_INDEX"
        className="table table-PT table-bordered table-priceboard"
      >
        <thead style={{}}>
          <tr>
            <th className="hbrb" rowSpan={2}>
             Ngày 
            </th>
            <th className="hbrb" rowSpan={2}>
              Mã
            </th>
            <th className="hbrb" rowSpan={2}>
            KL được phép sở hữu
            </th>
            <th className="hbrb" rowSpan={2}>
            % sở hữu nước ngoài
            </th>
            <th className="hbrb" rowSpan={2}>
                KL được phép mua
            </th>
            <th className="hbrb" colSpan={4}>
               Khối lượng giao dịch 
            </th>
            <th className="hbrb" colSpan={4}>
                Giá trị giao dịch (Triệu VNĐ)
            </th>
            
          </tr>
          <tr>
            <th className="hb_b">Mua</th>
            <th className="hbrb">% GD toàn TT </th>
            <th className="hb_b">Bán  </th>
            <th className="hbrb">% GD toàn TT</th>
            
            <th className="hb_b">Mua</th>
            <th className="hbrb">% GD toàn TT </th>
            <th className="hb_b">Bán  </th>
            <th className="hbrb">% GD toàn TT</th>
          </tr>
        </thead>
        <tbody>
          {dataTableThongkeTH ? dataTableThongkeTH.map((item:any,index:number)=>{
                return <tr key={index}> 
                      <td className="hover:bg-[#444444] !text-center"> {item[0][1] == 0 ? " ":item[0][1]}</td>
                      <td className="hover:bg-[#444444] "> {item[1][1] == 0 ? " ":formatNumberMarket(item[1][1])}</td>
                      <td className="hover:bg-[#444444] "> {item[2][1] == 0 ? " ":formatNumberMarket(item[2][1])}</td>
                      <td className="hover:bg-[#444444] "> {item[3][1]== 0 ? " ":formatNumberPhanTram(item[3][1])}</td>
                      <td className="hover:bg-[#444444] "> {item[4][1]== 0 ? " ":formatNumberMarket(item[4][1])}</td>
                      <td className="hover:bg-[#444444] "> {item[5][1]== 0 ? " ":formatNumberMarket(item[5][1])}</td>
                      <td className="hover:bg-[#444444] "> {(item[6][1])  == 0 ? " ":formatNumberPhanTram(item[6][1])  }</td>
                      <td className="hover:bg-[#444444] "> {(item[7][1])  == 0 ? " ":formatNumberMarket(item[7][1])  }</td>
                      <td className="hover:bg-[#444444] "> {(item[8][1])  == 0 ? " ":formatNumberPhanTram(item[8][1])  }</td>
                      <td className="hover:bg-[#444444] "> {(item[9][1])  == 0 ? " ":formatNumberMarket(item[9][1])  }</td>
                      <td className="hover:bg-[#444444] "> {(item[10][1])  == 0 ? " ":formatNumberPhanTram(item[10][1])  }</td>
                      <td className="hover:bg-[#444444] "> {(item[11][1])  == 0 ? " ":formatNumberMarket(item[11][1])  }</td>
                      <td className="hover:bg-[#444444] "> {(item[12][1])  == 0 ? " ":formatNumberPhanTram(item[12][1])  }</td>    
                </tr>
          }) : ""}
        </tbody>
      </table></>
    )
}
export default TableGDTH