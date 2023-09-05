import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import "./TablePopup.scss";
import {
  showDetailStock,
  setLLTG,
} from "../popupTableMarketwatch/popupTableSlice";

import { fetchChartOptionAsync } from "./chartOptionSlice";
import TableWrapPopup from "./TableWrapPopup";
import {
  fetchDataDetailPopupAsync,
  fetchDataTableKLTTGAsync,
} from "./dataTablePopupDetailSlice";
import { Company } from "../../models/root";
import SearchStockCode from "../SearchStockCode/SearchStockCode";
import TableContextProvider from "./context/TablePopupMarketWatchContext";
interface DraggableProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (event: DraggableEvent, data: DraggableData) => void;
  children: React.ReactNode;
}
type Bounds = {
  top: any;
  left: any;
  bottom: any;
  right: any;
};

const TablePopupMarketwatch = () => {
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [ValueInput, setValueInput] = useState("");
  const [stockCode, setStockCode] = useState<Company>({
    Code: "",
    Exchange: 0,
    ScripName: "",
    Basic_Price: 0,
    Ceiling_Price: 0,
    Floor_Price: 0,
    Stock_Type2: 0,
    ScripNameEN: "",
    ID: "",
  });
  // const { code } = useAppSelector((state) => state.popupTable);
  const { dataCompanyTotal } = useAppSelector((state) => state.company);
  const handleChange = (e: any) => {
    if (e === "") {
      setShowPopup(!showPopup);
      setValueInput(e.toUpperCase());
    } else {
      setShowPopup(true);
      setValueInput(e.toUpperCase());
    }
  };
  const [position, setPosition] = useState({
    x: (window.innerWidth - 1230) / 2, // - đi witdh tablle chia 2
    y: (window.innerHeight - 721 - 40) / 2,
  });

  const handelClick = (e: any) => {
    setShowPopup(!showPopup);
  };
  const AddStockCode = (CodeCk: Company) => {
    detailStockcode(CodeCk.Code);
    let floor = CodeCk.Exchange === 1 ? "HSX" : "HNX";
    let stockCode = CodeCk.Code;
    dispatch(fetchDataDetailPopupAsync({ stockCode, floor }));
    dispatch(fetchDataDetailPopupAsync({ stockCode, floor }));
    dispatch(fetchDataTableKLTTGAsync(stockCode));
    dispatch(showDetailStock({ visible: true, code: CodeCk.Code }));
    dispatch(setLLTG(floor));
  };
  const detailStockcode = (codeCk: string) => {
    let CodenCt = dataCompanyTotal.find((e: Company) => e.Code == codeCk);

    if (CodenCt) setStockCode(CodenCt);
  };
  // useEffect(() => {
  //   dispatch(
  //     fetchChartOptionAsync({ stockCode: code, setActions: "gw-realtime" })
  //   );
  // }, [code, dispatch]);
  // Kiểm tra và đặt lại giá trị cho dataMouse.maF và dataMouseBuy.maB nếu selectedCode tồn tại
  // kéo thả

  const [bounds, setBounds] = useState<Bounds>({
    left: null,
    right: null,
    top: null,
    bottom: null,
  });
  const draggableRef = useRef<HTMLDivElement>(null);
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = position;
    if (draggableRef.current) {
      draggableRef.current.style.transition = "transform 0.06s";
      draggableRef.current.style.transform = `translate(${x + ui.deltaX},  ${
        y + ui.deltaY
      })`;
      // setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
    }
  };
  // bắt đầu chạy
  const handleStart = (e: any, data: any) => {
    if (data) {
      const right = window.innerWidth - 1231 - 9;
      const bottom = window.innerHeight - 680 - 43;
      setBounds({ left: 0, right: right, top: 0, bottom: bottom });
    }
  };
  const handleStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };
  console.log("position", position);
  return (
    <TableContextProvider>
      <Draggable
        handle=".pu-header"
        position={position}
        // onDrag={handleDrag}
        bounds={bounds}
        onStart={handleStart}
        onStop={handleStop}
      >
        <div className="pu-window text-[#B9B9B9]" ref={draggableRef}>
          <div className="pu-header">
            <div className="flex pu-grtitle">
              <div className="m-auto">
                <div className="pu-div-search">
                  <div
                    className="relative ms-ctn form-control"
                    style={{ border: "1px solid #ccc" }}
                    id="ipSearchCode"
                  >
                    <div className="ms-sel-ctn">
                      <input
                        type="text"
                        placeholder="Nhập mã Chứng khoán"
                        autoComplete="nofill"
                        onChange={(e) => handleChange(e.target.value)}
                        onClick={handelClick}
                        className="cursor-pointer"
                        value={ValueInput}
                      />
                    </div>
                    <div className="ms-trigger">
                      <div className="fa fa-search top-[2px] absolute left-[2px]" />
                    </div>
                    <SearchStockCode
                      valueInput={ValueInput}
                      setShowPoup={setShowPopup}
                      showPopup={showPopup}
                      ChangeFunction={setStockCode}
                      SearchStockCode={AddStockCode}
                      setValueInput={setValueInput}
                      border={true}
                    />
                  </div>
                </div>
                <div className="inline-block pu-div-title">
                  <h2 className="pu-title">
                    {stockCode.Code
                      ? `${stockCode.Code} - ${
                          stockCode.Exchange === 1
                            ? "HSX"
                            : stockCode.Exchange === 2
                            ? "HNX"
                            : "UPCOM"
                        } - ${stockCode.ScripName}`
                      : ""}
                  </h2>
                </div>
              </div>
              {/*  */}

              {/* vd */}
            </div>
            <div className="pu-div-button">
              <i
                className="fa fa-refresh fa-lg !text-sm"
                title="Cập nhật lại dữ liệu"
              />
              <span
                className="pu-close"
                title="Đóng cửa sổ"
                onClick={() =>
                  dispatch(showDetailStock({ visible: false, code: "" }))
                }
              >
                <i className="fa fa-times fa-lg !text-sm" />
              </span>
            </div>
          </div>
          <TableWrapPopup />
        </div>
      </Draggable>
    </TableContextProvider>
  );
};
export default React.memo(TablePopupMarketwatch);
