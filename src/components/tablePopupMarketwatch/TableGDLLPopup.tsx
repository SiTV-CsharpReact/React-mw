import React from "react";

const TableGDLLPopup = () => {
  return (
    <table id="tbOddLot">
      <thead>
        <tr style={{ height: "20px" }}>
          <th className="pu-w" colSpan={4}>Giao dịch lô lẻ</th>
        </tr>
        <tr style={{ height: "20px" }}>
          <th colSpan={2}>Dư mua</th>
          <th colSpan={2}>Dư bán</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: "20px" }}>
          <td className="pu-d !text-center">28</td>
          <td className="pu-d">16</td>
          <td className="pu-r !text-center">28.45</td>
          <td className="pu-r">13</td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td className="pu-d !text-center">27.6</td>
          <td className="pu-d">1</td>
          <td className="pu-u !text-center">28.5</td>
          <td className="pu-u">20</td>
        </tr>
        <tr style={{ height: "20px" }}>
          <td className="pu-d !text-center">27.5</td>
          <td className="pu-d">1</td>
          <td className="pu-u !text-center">29.4</td>
          <td className="pu-u">22</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableGDLLPopup;
