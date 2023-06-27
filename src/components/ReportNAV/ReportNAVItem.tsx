import React from "react";

type TProps = {
  data: number;
  bold: boolean;
  background?: string;
  colSpan?: number;
  toolTip?: boolean;
};
const ReportNAVItem: React.FC<TProps> = ({
  data,
  bold,
  background,
  colSpan,
}: TProps) => {
  return (
    <React.Fragment>
      <td
        className={`!text-right bg-white ${bold ? "italic" : "!font-normal"}`}
        style={{ background: `${background}` }}
      >
        {data}
      </td>
    </React.Fragment>
  );
};

export default ReportNAVItem;
