const TableGD = ()=>{
    return  ( 
        <>  <table
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
        <tbody>{/*Content*/}</tbody>
      </table></>
    )
}
export default TableGD