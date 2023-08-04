import React, { useState, useRef } from "react";
import LayoutPage from "../Layout/LayoutPage";
import SearchStockCode from "../../components/SearchStockCode/SearchStockCode";
import { Company } from "../../models/root";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/configureStore";
import { setDataOrder } from "./stoplossSlice";

import ConditionalOrderTable from "../helper/CondiTionalOrderTable";
type DataValue = {
  value: string | number;
  key: number;
};
type code = {
  nearestPrice: number; // giá Gần  nhất
  excusPrice: number; // Giá hiện tại
};
const ConditionalOrder = () => {
  const dispatch = useAppDispatch();

  const { dataCompanyTotal } = useAppSelector(
    (state: RootState) => state.company
  );
  const [inputValue, setValueInput] = useState("");
  const [bgColor, setBgColor] = useState<string>("default"); // set màu mặc định
  const [showPopup, setShowPopup] = useState(false); // đóng mở tìm kiếm
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
  const [maCode, setmaCode] = useState<code>({
    nearestPrice: 0,
    excusPrice: 0,
  });
  const [dataValue, setDataValue] = useState(["", "", 0, "", 0, "DAY", 0]);
  const AddStockCode = (CodeCk: Company) => {
    setDataValue((prevDataValue) => {
      const newDataValue = [...prevDataValue];
      newDataValue[1] = CodeCk.Code;
      return newDataValue;
    });
    setStockCode(CodeCk);
    setmaCode({
      ...maCode,
      excusPrice: CodeCk.Ceiling_Price,
      nearestPrice: CodeCk.Ceiling_Price,
    });
  };
  const handleChangeValue = ({ value, key }: DataValue) => {
    if (key == 1) {
      const valueInput = value.toString().toUpperCase();
      if (value === "") {
        setShowPopup(false);
        setStockCode({ ...stockCode, Code: "" });
        setDataValue((prevDataValue) => {
          const newDataValue = [...prevDataValue];
          newDataValue[key] = valueInput;
          return newDataValue;
        });
      } else {
        setShowPopup(true);
        setDataValue((prevDataValue) => {
          const newDataValue = [...prevDataValue];
          newDataValue[key] = valueInput;
          return newDataValue;
        });
        setStockCode({ ...stockCode, Code: valueInput });
      }
    } else if (key == 2 || key == 4 || key == 6) {
      if (value) {
        const valueNumber = parseFloat(value.toString());
        if (!valueNumber) {
          // lỗi k phải số
          // sử lý sau
        } else if (valueNumber < 0) {
          setDataValue((prevDataValue) => {
            const newDataValue = [...prevDataValue];
            newDataValue[key] = 0;
            return newDataValue;
          });
        } else {
          setDataValue((prevDataValue) => {
            const newDataValue = [...prevDataValue];
            newDataValue[key] = valueNumber;
            return newDataValue;
          });
        }
      } else {
        setDataValue((prevDataValue) => {
          const newDataValue = [...prevDataValue];
          newDataValue[key] = 0;
          return newDataValue;
        });
      }

      // }
    } else if (key === 5) {
      if (value !== "DAY") {
        setmaCode({ ...maCode, excusPrice: 0 });
      }
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[key] = value;
        newDataValue[6] = 0;
        return newDataValue;
      });
    } else {
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[key] = value;
        return newDataValue;
      });
    }
  };

  const incrementCounter = (key: number) => {
    if (key == 2) {
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[2] = Number(newDataValue[2]) + 100;
        return newDataValue;
      });
    } else if (key == 4) {
      // nearestPrice  gần nhất
      setmaCode({ ...maCode, nearestPrice: maCode.nearestPrice + 100 });
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[4] =
          Number(newDataValue[4]) > 0
            ? Number(newDataValue[4]) + 100
            : maCode.nearestPrice + 100;
        return newDataValue;
      });
    } else if (key == 6) {
      // hiện tại excusPrice
      console.log("key == 6");
      setmaCode({ ...maCode, excusPrice: maCode.excusPrice + 100 });
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[6] =
          Number(newDataValue[6]) > 0
            ? Number(newDataValue[6]) + 100
            : maCode.excusPrice + 100;
        return newDataValue;
      });
    }
  };
  const diCrementCouter = (key: number) => {
    const priceHt = Number(dataValue[key]) - 100;
    if (Number(dataValue[key]) <= 0) {
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[key] = 0;
        return newDataValue;
      });
    } else {
      setDataValue((prevDataValue) => {
        const newDataValue = [...prevDataValue];
        newDataValue[key] =
          priceHt <= 0
            ? 0
            : Number(dataValue[key]) >= 0
            ? Number(dataValue[key]) - 100
            : stockCode.Ceiling_Price - 100;
        return newDataValue;
      });
    }
  };
  // reset dataa  = làm lại
  const handleReset = () => {
    setStockCode({
      ...stockCode,
      Code: "",
      Basic_Price: 0,
      Floor_Price: 0,
      Ceiling_Price: 0,
      Exchange: 0,
    });
    const array = ["", "", 0, "", 0, "DAY", 0];
    setDataValue((prevDataValue) => {
      let newDataValue = [...prevDataValue];
      let newData = newDataValue.map((index: any, key: number) => {
        return (newDataValue[key] = array[key]);
      });
      return newData;
    });
    setShowPopup(false);
  };
  let selectRef = useRef<any[]>([]);
  const validateStockCode = () => {
    const result = dataCompanyTotal.find(
      (e: Company) => e.Code === dataValue[1]
    );
    return result;
  };
  const VaidateData = () => {
    let status = null;
    for (var i: number = 0; i < dataValue.length; i++) {
      if (
        (i == 0 && dataValue[0] == "") ||
        (i == 3 && dataValue[3] == "") ||
        (i == 1 && dataValue[1] == "")
      ) {
        selectRef.current[i]?.focus();
        status = false;
        break;
      } else if (i == 1 && dataValue[1]) {
        let result = validateStockCode();
        if (result == undefined) {
          selectRef.current[i]?.focus();
          status = false;
          break;
        }
      } else if (
        i == 5 &&
        dataValue[5] === "DAY" &&
        Number(dataValue[6]) <= 0
      ) {
        selectRef.current[6]?.focus();
        status = false;
        break;
      } else if (
        (i == 2 && Number(dataValue[2]) <= 0) ||
        (i == 4 && Number(dataValue[4]) <= 0) ||
        (i == 6 && Number(dataValue[6]) < 0)
      ) {
        selectRef.current[i]?.focus();
        status = false;
        break;
      } else {
        status = true;
      }
    }
    return status;
  };
  // submit
  const handleSubmitData = () => {
    let status = VaidateData();
    if (status) {
      let data = {
        id: (Math.random() * 1000) / 1000,
        Loai: dataValue[0],
        stockCode: dataValue[1],
        quanytity: dataValue[2],
        dkgn: dataValue[3],
        priceGN: dataValue[4],
        LenhTh: dataValue[5],
        priceLenhTh: dataValue[6],
      };
      dispatch(setDataOrder(data));
    } else {
      console.log("Vui lòng  nhập đầy đủ các trường ", status);
    }
    // test
    // let data = {
    //   id: Math.random() * 1000/1000,
    //   Loai: "BUY",
    //   stockCode: "AAA",
    //   quanytity: 5000,
    //   dkgn: "<=",
    //   priceGN: 5000,
    //   LenhTh: "LO",
    //   priceLenhTh:  56292,
    // };
    // dispatch(setDataOrder(data));
  };
  return (
    <>
      <LayoutPage
        PageTitle="Đặt lệnh điều kiện"
        content="Đặt lệnh điều kiện"
        Icon={true}
        TitleHover="Hướng dẫn sử dụng EzStoploss"
        LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/"
      >
        <div>
          <div className="ConditionalOrder_main">
            <div className="ConditionalOrder_Title">
              <h3>
                <strong>
                  Cập nhật
                  <a href="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/huong-dan-su-dung-dich-vu-dat-lenh-dieu-kien-ezstoploss/">
                    tính năng mới
                  </a>
                  : kích hoạt lệnh điều kiện
                  <a href="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/huong-dan-su-dung-dich-vu-dat-lenh-dieu-kien-ezstoploss/">
                    ngay trong phiên
                  </a>
                </strong>
              </h3>
            </div>
            <div>
              <div className="boxdivCondi" id="Boxtablelenh">
                <table id="tableLenh">
                  <thead>
                    <tr
                      style={{
                        background:
                          dataValue[0] === "BUY"
                            ? "rgb(19, 76, 125)"
                            : dataValue[0] === "SELL"
                            ? "rgb(156, 10, 10)"
                            : "",
                      }}
                    >
                      <th></th>
                      <th
                        style={{
                          color:
                            dataValue[0] === "BUY" || dataValue[0] === "SELL"
                              ? "#ffff"
                              : "",
                        }}
                      >
                        {stockCode.Exchange === 1
                          ? "HSX"
                          : stockCode.Exchange === 2
                          ? "HNX"
                          : ""}
                      </th>
                      <th></th>
                      <th> </th>
                      <th className="gop BGCLightGreen" colSpan={2}>
                        ĐK kích hoạt: Khi giá khớp gần nhất
                      </th>
                      <th className="gop BGCOrange" colSpan={2}>
                        Lệnh thực hiện
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        background:
                          dataValue[0] === "BUY"
                            ? "rgb(19, 76, 125)"
                            : dataValue[0] === "SELL"
                            ? "rgb(156, 10, 10)"
                            : "",
                      }}
                    >
                      <td className="TdWidth">
                        <select
                          name=""
                          id=""
                          onChange={(e) =>
                            handleChangeValue({ value: e.target.value, key: 0 })
                          }
                          ref={(el) => (selectRef.current[0] = el)}
                        >
                          <option
                            value=""
                            selected={dataValue[0] == "" ? true : false}
                          >
                            Lệnh Đặt
                          </option>
                          <option value="BUY">Mua</option>
                          <option value="SELL">Bán</option>
                        </select>
                      </td>
                      <td className="TdWidth searchCk">
                        <input
                          type="text"
                          placeholder="Chứng Khoán"
                          value={stockCode.Code ? stockCode.Code : ""}
                          onChange={(e) =>
                            handleChangeValue({ value: e.target.value, key: 1 })
                          }
                          ref={(el) => (selectRef.current[1] = el)}
                        />

                        <SearchStockCode
                          valueInput={dataValue[1].toString()}
                          setShowPoup={setShowPopup}
                          showPopup={showPopup}
                          ChangeFunction={setStockCode}
                          SearchStockCode={AddStockCode}
                          border={false}
                          setValueInput={setValueInput}
                        />
                      </td>
                      <td className="TdWidth">
                        <select
                          name=""
                          disabled
                          id=""
                          className="SelectDisable"
                        >
                          <option value="">Không</option>
                          <option value="">Mua</option>
                          <option value="">Bán</option>
                        </select>
                      </td>
                      <td className="TdWidth">
                        <div className="couter">
                          <input
                            type="text"
                            placeholder="Số lượng "
                            min={0}
                            value={dataValue[2] ? dataValue[2] : ""}
                            required
                            onChange={(e) =>
                              handleChangeValue({
                                value: e.target.value,
                                key: 2,
                              })
                            }
                            ref={(el) => (selectRef.current[2] = el)}
                          />
                          <button
                            type="button"
                            id="btnUpQ"
                            className="up button-spinner"
                            onClick={() => incrementCounter(2)}
                            disabled={!stockCode.Code ? true : false}
                          >
                            ›
                          </button>
                          <button
                            type="button"
                            id="btnDownQ"
                            className={`down button-spinner ${
                              !stockCode.Code || Number(dataValue[2]) > 0
                                ? "downHover"
                                : ""
                            }`}
                            onClick={() => diCrementCouter(2)}
                            disabled={Number(dataValue[2]) <= 0 ? true : false}
                          >
                            ‹
                          </button>
                        </div>
                      </td>
                      <td className="BGCLightGreen TdWidth">
                        <select
                          name=""
                          id=""
                          onChange={(e) =>
                            handleChangeValue({ value: e.target.value, key: 3 })
                          }
                          ref={(el) => (selectRef.current[3] = el)}
                        >
                          <option
                            value=""
                            selected={dataValue[3] == "" ? true : false}
                          >
                            Chọn ĐK
                          </option>
                          <option value=">=">&gt;=</option>
                          <option value="<=">&lt;=</option>
                        </select>
                      </td>
                      {/* gộp */}
                      <td className="BGCLightGreen tdWidthGop">
                        <div className="abc">
                          <div className="couter">
                            <input
                              type="text"
                              placeholder="Giá DK"
                              role="presentation"
                              onChange={(e) =>
                                handleChangeValue({
                                  value: Number(e.target.value) * 1000,
                                  key: 4,
                                })
                              }
                              value={
                                dataValue[4] ? Number(dataValue[4]) / 1000 : ""
                              }
                              ref={(el) => (selectRef.current[4] = el)}
                            />
                            <button
                              type="button"
                              id="btnUpQ"
                              className="up button-spinner"
                              onClick={() => incrementCounter(4)}
                              disabled={!stockCode.Code ? true : false}
                            >
                              ›
                            </button>
                            <button
                              type="button"
                              id="btnDownQ"
                              className={`down button-spinner ${
                                Number(dataValue[4]) > 0 ? "downHover" : ""
                              }`}
                              onClick={() => diCrementCouter(4)}
                              disabled={
                                !stockCode.Code || Number(dataValue[4]) <= 0
                                  ? true
                                  : false
                              }
                            >
                              ‹
                            </button>
                          </div>

                          <div className="textDvi">
                            <span> x1000 </span>
                          </div>
                        </div>
                      </td>
                      {/* gộp */}
                      <td className="BGCOrange">
                        <select
                          name=""
                          id=""
                          onChange={(e) =>
                            handleChangeValue({ value: e.target.value, key: 5 })
                          }
                          ref={(el) => (selectRef.current[5] = el)}
                        >
                          <option
                            value="DAY"
                            selected={dataValue[5] == "DAY" ? true : false}
                          >
                            LO
                          </option>
                          <option value="CEILING">Giá trần</option>
                          <option value="FLOOR">Giá sàn</option>
                          <option value="MARKET">Giá TT</option>
                          <option value="MTL">MTL</option>
                          <option value="MOK">MOK</option>
                          <option value="MAK">MAK</option>
                          <option value="ATC">ATC</option>
                          <option value="PLO">PLO</option>
                        </select>
                      </td>
                      <td className="BGCOrange tdWidthGop">
                        <div className="abc">
                          <div className="couter">
                            <input
                              className={
                                dataValue[5] !== "DAY" ? "inputDisable" : ""
                              }
                              disabled={dataValue[5] !== "DAY" ? true : false}
                              type="text"
                              placeholder="Giá T.hiên"
                              role="presentation"
                              onChange={(e) =>
                                handleChangeValue({
                                  value: Number(e.target.value) * 1000,
                                  key: 6,
                                })
                              }
                              value={
                                dataValue[6] ? Number(dataValue[6]) / 1000 : ""
                              }
                              ref={(el) => (selectRef.current[6] = el)}
                            />
                            <button
                              type="button"
                              id="btnUpQ"
                              className={`up button-spinner ${
                                dataValue[5] !== "DAY" ? "btn-hover" : ""
                              }`}
                              onClick={() => incrementCounter(6)}
                              disabled={
                                !stockCode.Code || dataValue[5] !== "DAY"
                                  ? true
                                  : false
                              }
                            >
                              ›
                            </button>
                            <button
                              type="button"
                              id="btnDownQ"
                              className={`down button-spinner ${
                                dataValue[5] !== "DAY" ||
                                Number(dataValue[6]) > 0
                                  ? "downHover "
                                  : "btn-hover"
                              }`}
                              onClick={() => diCrementCouter(6)}
                              disabled={
                                dataValue[5] !== "DAY" ||
                                !stockCode.Code ||
                                Number(dataValue[6]) <= 0
                                  ? true
                                  : false
                              }
                            >
                              ‹
                            </button>
                          </div>

                          <div className="textDvi BGCOrange">
                            <span
                              style={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                              }}
                            >
                              x1000
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="tdWidthBtn ">
                        <button
                          className="btn "
                          id="btn-cn"
                          onClick={handleSubmitData}
                        >
                          Ghi
                        </button>
                      </td>
                      <td className="tdWidthBtn">
                        <button id="btn-cn" onClick={handleReset}>
                          làm lại
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="contenTable">
                  <p style={{ paddingLeft: "5px" }}>
                    {" "}
                    {dataValue[0] === "BUY"
                      ? "Số dư có thể giao dịch"
                      : dataValue[0] === "SELL"
                      ? "Số dư chứng khoán"
                      : ""}
                  </p>
                  <p> {dataValue[0] === "BUY" ? "KL có thể mua" : ""} </p>
                  <p className="textCenter"> Giá khớp gần nhất: </p>
                  <p className="PriceCk">
                    {" "}
                    <span>Giá sàn</span>
                    <span>Giá TC</span>
                    <span>Giá trần</span>
                  </p>
                  <p></p>
                </div>
                <div className="contenTable">
                  <p className="C" style={{ paddingLeft: "5px" }}>
                    {dataValue[0] === "BUY" || dataValue[0] === "SELL" ? 0 : ""}
                  </p>
                  <p className="C"> {dataValue[0] === "BUY" ? 0 : ""}</p>
                  <p className="textCenter " id="priceGn">
                    15 &nbsp;
                    <span className="arrowDown"></span>
                    <span className="textA"> -11</span>{" "}
                  </p>
                  <p className="PriceCk">
                    <span className="C Flo">
                      {" "}
                      {stockCode.Basic_Price
                        ? stockCode.Basic_Price / 1000
                        : ""}
                    </span>
                    <span className="C TC">
                      {stockCode.Ceiling_Price
                        ? stockCode.Ceiling_Price / 1000
                        : ""}
                    </span>
                    <span className="C Cei">
                      {stockCode.Floor_Price
                        ? stockCode.Floor_Price / 1000
                        : ""}
                    </span>
                  </p>
                  <p></p>
                </div>
              </div>
              <ConditionalOrderTable />
              <div className="boxdivCondi solenhDieuKien">
                <a href="">
                  {" "}
                  Sổ lệnh điều kiện
                  <i className="fa fa-thin fa-arrow-up-right-from-square"></i>
                </a>
              </div>
              <div className="boxdivCondi borderDiv divCongBo">
                <h4>
                  {" "}
                  <strong>CÔNG BỐ RỦI RO VỀ LỆNH ĐIỀU KIỆN</strong>
                </h4>
                <p>
                  Sử dụng lệnh điều kiện luôn tiềm ẩn các rủi ro của phương thức
                  giao dịch điện tử, bao gồm nhưng không giới hạn ở việc dữ liệu
                  giá không đầy đủ hoặc chậm trễ, không theo kịp biến động thực
                  tế của thị trường. Khi đặt lệnh điều kiện, Khách hàng đã hiểu
                  rõ những rủi ro này và đồng ý miễn trừ mọi trách nhiệm của
                  FPTS về những thiệt hại (nếu có).
                </p>
              </div>
              <div className="boxdivCondi borderDiv divCongBo">
                <h4>
                  <strong>
                    GHI CHÚ
                    <span style={{ paddingTop: "10px" }}>
                      <i className="fa fa-caret-up text-iconghichu mt-[-5px]"></i>
                    </span>
                  </strong>
                </h4>
                <div>
                  - Ứng dụng của lệnh:
                  <ul style={{ paddingLeft: "25px", listStyleType: "circle" }}>
                    <li>
                      <span style={{ color: "red" }}>Bán</span> chốt lãi
                    </li>
                    <li>
                      <span style={{ color: "red" }}>Bán</span> cắt lỗ
                    </li>
                    <li>
                      <span style={{ color: "blue" }}>Mua</span> ở mức giá kỳ
                      vọng
                    </li>
                  </ul>
                </div>
                <div>
                  <p>
                    - Lệnh được kích hoạt khi giá khớp gần nhất thỏa mãn điều
                    kiện của lệnh. Khi lệnh được kích hoạt, nếu số dư của khách
                    hàng không đủ thì lệnh sẽ bị từ chối và không còn hiệu lực
                    kích hoạt.
                  </p>
                  <p>
                    - Loại <strong> "Giá TT" - Giá thị trường</strong>: Khi lệnh
                    được kích hoạt, tùy theo Sàn và đợt giao dịch ở thời điểm
                    đó, hệ thống sẽ tự động gửi lệnh với giá ATO/MP/MTL/ATC.
                  </p>
                  <p>
                    - Lệnh chỉ có thể kích hoạt 01 (một) lần và chỉ trong thời
                    gian 3 tháng kể từ ngày đặt lệnh.
                  </p>
                  <p>
                    - Điều kiện kích hoạt và giá lệnh đặt sẽ không được tự động
                    điều chỉnh nếu chứng khoán có thực hiện quyền. Vì thế Quý
                    khách cần theo dõi sát lịch thực hiện quyền trước và sau khi
                    đặt lệnh.
                  </p>
                  <p>
                    <span>- FPTS</span> sẽ thông báo bằng E-Mail mỗi khi Lệnh
                    được kích hoạt hoặc khi Mã chứng khoán của Lệnh điều kiện
                    phát sinh Quyền.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutPage>
    </>
  );
};

export default ConditionalOrder;
