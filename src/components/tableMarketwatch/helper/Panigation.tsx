import { Pagination } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useState } from "react";
type Props = {
  panigation: number;
  ChangeFucion?: any;
};
const PanigationTableThongKe = ({ panigation, ChangeFucion }: Props) => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    ChangeFucion(value);
  };
  const maxPage = () => {
    if (panigation >= 2) {
      setPage(Number(panigation));
      ChangeFucion(panigation);
    }
  };
  const minPage = () => {
    setPage(1);
    ChangeFucion(1);
  };
  return (
    <div
      id={`${
        panigation <= 1
          ? "hiddenIConAll"
          : ""
      }`}
      className="customPagination" 
    >
      <button
        disabled={page <= 1 ? true : false}
        id={`${page <= 1 ? "hildrenIonItem" : ""}`}
        className="iconArrow"
        onClick={minPage}
      >
        <KeyboardDoubleArrowLeftIcon />
      </button>
      <div>
        <Pagination
          count={panigation ? panigation : 1}
          defaultPage={1}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
      <button
        disabled={page >= panigation ? true : false}
        className="iconArrow IconArrowRigth"
        id={`${
          page >= panigation
            ? "hildrenIonItem"
            : ""
        }`}
        onClick={maxPage}
      >
        <KeyboardDoubleArrowRightIcon />
      </button>
    </div>
  );
};
export default PanigationTableThongKe;
