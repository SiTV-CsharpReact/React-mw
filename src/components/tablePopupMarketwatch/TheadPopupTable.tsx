import React from "react";

interface TableReportingPopupHeadProps {
    dataHeader: string[][];
  }
  
  const TheadPopupTable: React.FC<TableReportingPopupHeadProps> = ({ dataHeader }) => {
  return (
    <thead className="border border-solid border-[#505050]">
      <tr>
        <th style={{ width: "150px" }}>{dataHeader[0]}</th>
        <th className="text-right pr-[5px]"><span>
        {dataHeader[1]}
          </span></th>
      </tr>
    </thead>
  );
};

export default TheadPopupTable;