import React from "react";
import { formatNumber } from "../../utils/util";
import Tooltip from "@mui/material/Tooltip";

interface TableReportingPopupBodyProps {
  dataBody: string[][];
}

const TbodyPopupTable: React.FC<TableReportingPopupBodyProps> = ({ dataBody }) => {
  // Kiểm tra nếu dataBody có ít hơn 12 phần tử thì thêm các tr và td để đạt đủ 12
while (dataBody.length < 11) {
  dataBody.push(["", ""]);
  }
  return (
    <tbody>
      {dataBody.map((item, index) => (
        <tr key={index} style={{ height: "20px" }}>
          <td title={item[0]} style={{ width: "150px" }}>
            {item[0]}
          </td>
          <td>
            <Tooltip title={formatNumber(Number(item[1]))} placement="top">
              <span>{!item[1]?"": formatNumber(Number(item[1]))}</span>
            </Tooltip>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TbodyPopupTable;