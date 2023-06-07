import React from "react";

const TableGDTTPopup = () => {
  return (
    <table id="tbpuPT" className="w-full pu-table-PT">
      <tfoot>
        <tr style={{ height: "20px" }}>
          <td className="text-center pu-w">Tổng cộng</td>
          <td className="pu-w" />
          <td className="pu-w" />
        </tr>
      </tfoot>
      <thead>
        <tr style={{ height: "20px" }}>
          <th colSpan={3}>Giao dịch Thỏa thuận</th>
        </tr>
        <tr style={{ height: "20px" }}>
          <th>Giá</th>
          <th>Khối lượng</th>
          <th>Giá trị</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "20px" }}>
          <td className="pu-w">&nbsp;</td>
          <td className="pu-w">&nbsp;</td>
          <td className="pu-w">&nbsp;</td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td className="pu-w">&nbsp;</td>
          <td className="pu-w">&nbsp;</td>
          <td className="pu-w">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableGDTTPopup;
