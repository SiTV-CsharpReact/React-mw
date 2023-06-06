const TableDL = () => {
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
        <tbody>{/*Content*/}</tbody>
      </table>
     </>;
};
export default TableDL;
