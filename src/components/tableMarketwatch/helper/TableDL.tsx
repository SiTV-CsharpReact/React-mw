import { useAppSelector,RootState } from "../../../store/configureStore";
import { formatNumberMarket } from "../../../utils/util";

const TableDL = () => {
  const { dataTableThongkeOrderLenh } = useAppSelector((state:RootState )=> state.tableTest);
  return <> 
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
            <th className="hbrb" colSpan={2}>
              Mua
            </th>
            <th className="hbrb" colSpan={2}>
              Bán
            </th>
            <th className="hbrb" rowSpan={2}>
              Mua - bán
            </th>
            <th className="hbrb" rowSpan={2}>
                TC
            </th>
            <th className="hbrb" rowSpan={2}>
                Trần
            </th>
            <th className="hbrb" rowSpan={2}>
              Sàn
            </th>
            <th className="hbrb" colSpan={2}>
              Giá mua tốt nhất
            </th>
            <th className="hbrb" colSpan={2}>
              Giá bán tốt nhất 
            </th>
          </tr>
          <tr>
            <th className="hb_b">Lệnh mua</th>
            <th className="hbrb">KL mua</th>

            <th className="hb_b">Lệnh bán </th>
            <th className="hbrb">KL bán </th>

            <th className="hb_b">Giá </th>
            <th className="hbrb">Khối lượng</th>
          
            <th className="hb_b">Giá </th>
            <th className="hbrb">Khối lượng</th>
          </tr>
        </thead>
        <tbody>
        {dataTableThongkeOrderLenh.map((item: any, index: any) => {
            return <tr key={index}>
              <td className="hover:bg-[#444444] !text-center"> {(item[0][1])  == 0 ? " ":item[0][1] }</td>
              <td className="hover:bg-[#444444] "> {item[1][1] == 0 ? " ":formatNumberMarket(item[1][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[2][1] == 0 ? " ":formatNumberMarket(item[2][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[3][1] == 0 ? " ":formatNumberMarket(item[3][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[4][1] == 0 ? " ":formatNumberMarket(item[4][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[5][1] == 0 ? " ":formatNumberMarket(item[5][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[6][1] == 0 ? " ":formatNumberMarket(item[6][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[7][1] == 0 ? " ":formatNumberMarket(item[7][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[8][1] == 0 ? " ":formatNumberMarket(item[8][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[9][1] == 0 ? " ":formatNumberMarket(item[9][1] )}</td>
              <td className="hover:bg-[#444444] "> {item[10][1] == 0 ? " ":formatNumberMarket(item[10][1]) }</td>
              <td className="hover:bg-[#444444] "> {item[11][1] == 0 ? " ":formatNumberMarket(item[11][1]) }</td>
              <td className="hover:bg-[#444444] "> {item[12][1] == 0 ? " ":formatNumberMarket(item[12][1]) }</td>
              <td className="hover:bg-[#444444] "> {item[13][1] == 0 ? " ":formatNumberMarket(item[13][1]) }</td>
            
            </tr>
          })}

        </tbody>
      </table>
     </>;
};
export default TableDL;
