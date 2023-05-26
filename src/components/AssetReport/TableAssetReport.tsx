import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/configureStore";
import { formatNumber } from "../../utils/util";

const TableAssetReport = () => {
  const { assetReport } = useAppSelector((state) => state.assetReport);
  const [data, setData] = useState([]);
  const [short, setShort] = useState(false);
  const [sort, setSort] = useState("asc");
  const [label, setLabel] = useState("");

  const handleSort = (key: string) => {
    // console.log(t);
    setLabel(key);
    if (sort === "asc") {
      const sorted: any = [...data].sort((a: any, b: any) => {
        if (a[key] === "string" && b[key] === "string") {
          return a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1;
        }
        return a[key] > b[key] ? 1 : -1;
      });
      setData(sorted);
      setSort("desc");
    }
    if (sort === "desc") {
      const sorted: any = [...data].sort((a: any, b: any) => {
        if (a[key] === "string" && b[key] === "string") {
          return a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
      });
      setData(sorted);
      setSort("asc");
    }
  };
  useEffect(() => {
    let arr = assetReport?.Table1?.map((item: any) => item);
    const sorted = arr?.sort((a: any, b: any) =>
      a.ASTOCKCODE > b.ASTOCKCODE ? 1 : -1
    );
    setLabel("ASTOCKCODE");
    setData(sorted);
  }, [assetReport]);
  return (
    <div className="table_detail_BCTS">
      {short ? (
        <table>
          <thead>
            <tr role="row" className="tablesorter-headerRow">
              <td colSpan={6} className="!text-left">
                <div>
                  <span className="font-bold">
                    CHI TIẾT CHỨNG KHOÁN
                    <span
                      className="font-medium cursor-pointer text-normalText underline italic"
                      onClick={() => setShort(!short)}
                    >
                      (Xem đầy đủ)
                    </span>
                  </span>
                </div>
              </td>
              <td colSpan={4} className="!text-center">
                <div>
                  <strong>LÃI/LỖ DỰ KIẾN</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("ASTOCKCODE")}
              >
                <div className="flex items-center justify-between pl-2">
                  <span className="flex-1 text-center">Mã CK</span>
                  <span className="relative">
                    {label !== "ASTOCKCODE" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "ASTOCKCODE" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "6%" }}
                onClick={() => handleSort("ATRADING_READY_TOTAL")}
              >
                <div className="flex items-center justify-between pl-2">
                  <span className="text-center flex-1">CK có sẵn</span>
                  <span className="relative">
                    {label !== "ATRADING_READY_TOTAL" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "ATRADING_READY_TOTAL" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "6%" }}
                onClick={() => handleSort("AWAIT_REC_RIGHT")}
              >
                <div className="flex items-center justify-between pl-1">
                  <span className="flex-1 text-center">CK chở về</span>
                  <span className="relative">
                    <span className="relative">
                      {label !== "AWAIT_REC_RIGHT" ? (
                        <>
                          <span className="absolute -top-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-up"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                          <span className="absolute -bottom-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-down"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                        </>
                      ) : label === "AWAIT_REC_RIGHT" && sort === "asc" ? (
                        <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("ATOTAL_AMOUNT")}
              >
                <div className="flex items-center justify-between pl-2">
                  <span className="text-center flex-1">Tổng KL</span>
                  <span className="relative">
                    {label !== "ATOTAL_AMOUNT" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "ATOTAL_AMOUNT" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "5%" }}
              >
                <div>Giá TT</div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "6%" }}
                onClick={() => handleSort("AMARKET_VALUE")}
              >
                <div className="flex items-center justify-between pl-2">
                  <span className="text-center flex-1">Thành tiền</span>
                  <span className="relative">
                    {label !== "AMARKET_VALUE" ? (
                      <>
                        <span className="absolute -top-[9px]  -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "AMARKET_VALUE" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "5%" }}
              >
                <div>Giá vốn TB</div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "8%" }}
                onClick={() => handleSort("AROOT_VALUE")}
              >
                <div className="flex items-center justify-between pl-2">
                  <span className="text-center flex-1">Tổng giá vốn</span>
                  <span className="relative">
                    {label !== "AROOT_VALUE" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "AROOT_VALUE" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("APROFIT_LOSS_VAL")}
              >
                <div className="flex items-center justify-between pl-2">
                  <span className="text-center flex-1">Lãi/Lỗ</span>
                  <span className="relative">
                    {label !== "APROFIT_LOSS_VAL" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "APROFIT_LOSS_VAL" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                className="!text-center font-bold !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("APROFIT_LOSS_RATE")}
              >
                <div className="flex items-center justify-between pl-1">
                  <span className="text-center flex-1"> % Lãi/Lỗ</span>
                  <span className="relative">
                    <span className="relative">
                      {label !== "APROFIT_LOSS_RATE" ? (
                        <>
                          <span className="absolute -top-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-up"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                          <span className="absolute -bottom-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-down"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                        </>
                      ) : label === "APROFIT_LOSS_RATE" && sort === "asc" ? (
                        <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={item.ASTOCKCODE}>
                <td className="!text-center !text-xs">{item.ASTOCKCODE}</td>
                <td className="!text-xs">{item.ATRADING_READY_TOTAL}</td>
                <td className="!text-xs">{item.ATRANSFER_RESTRICTED}</td>
                <td className="!text-xs">{item.ATOTAL_AMOUNT}</td>
                <td className="!text-xs">{formatNumber(item.AMARKET_PRICE)}</td>
                <td className="!text-xs">{formatNumber(item.AMARKET_VALUE)}</td>
                <td className="!text-xs">{formatNumber(item.AAVG_PRICE)}</td>
                <td className="!text-xs">{formatNumber(item.AROOT_VALUE)}</td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_VAL < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {formatNumber(item.APROFIT_LOSS_VAL)}
                </td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_RATE < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {item.APROFIT_LOSS_RATE}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr role="row">
              <td
                className="!text-left uppercase font-bold !text-xs"
                colSpan={5}
              >
                TỔNG
              </td>
              <td className="font-bold !text-xs">
                {formatNumber(
                  assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.AMARKET_VALUE,
                    0
                  )
                )}
              </td>
              <td className="!text-xs"></td>
              <td className="font-bold !text-xs">
                {formatNumber(
                  assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.AROOT_VALUE,
                    0
                  )
                )}
              </td>
              <td
                className={`!text-xs ${
                  formatNumber(
                    assetReport?.Table1?.reduce(
                      (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                      0
                    )
                  ) < 0
                    ? "!text-[#FF0000]"
                    : "!text-[#00b050]"
                }`}
              >
                {formatNumber(
                  assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                    0
                  )
                )}
              </td>
              <td
                className={`!text-xs ${
                  formatNumber(
                    assetReport?.Table1?.reduce(
                      (a: any, b: any) => a + b.APROFIT_LOSS_RATE,
                      0
                    )
                  ) < 0
                    ? "!text-[#FF0000]"
                    : "!text-[#00b050]"
                }`}
              >
                {(
                  (assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                    0
                  ) /
                    assetReport?.Table1?.reduce(
                      (a: any, b: any) => a + b.AROOT_VALUE,
                      0
                    )) *
                  100
                ).toFixed(2)}
                %
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <table>
          <thead>
            <tr role="row" className="tablesorter-headerRow">
              <td colSpan={11} className="!text-left">
                <div>
                  <span className="font-bold">
                    CHI TIẾT CHỨNG KHOÁN
                    <span
                      className="font-medium cursor-pointer text-normalText underline italic"
                      onClick={() => setShort(!short)}
                    >
                      (Xem rút gọn)
                    </span>
                  </span>
                </div>
              </td>
              <td colSpan={4} className="!text-center">
                <div>
                  <strong>LÃI/LỖ DỰ KIẾN</strong>
                </div>
              </td>
              <td
                rowSpan={3}
                className="!text-center"
                style={{ width: "5%" }}
                onClick={() => handleSort("ACAPITAL_STRUCTURE")}
              >
                <div className="flex items-center justify-between pl-1">
                  <strong>
                    Cơ cấu <br /> Vốn
                  </strong>
                  <span className="relative">
                    <span className="relative">
                      {label !== "ACAPITAL_STRUCTURE" ? (
                        <>
                          <span className="absolute -top-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-up"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                          <span className="absolute -bottom-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-down"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                        </>
                      ) : label === "ACAPITAL_STRUCTURE" && sort === "asc" ? (
                        <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </td>
              <td
                rowSpan={3}
                className="!text-center"
                style={{ width: "5%" }}
                onClick={() => handleSort("APORTFOLIO_RATE")}
              >
                <div className="flex items-center justify-between pl-1">
                  <strong>
                    Tỉ trọng <br /> DM
                  </strong>
                  <span className="relative">
                    {label !== "APORTFOLIO_RATE" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "APORTFOLIO_RATE" && sort === "asc" ? (
                      <span className="absolute -top-[9px] -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-[9px] -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
            </tr>
            <tr role="row" className="font-bold bg-[#ececec]">
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("ASTOCKCODE")}
              >
                <div className="flex items-center justify-between pl-2">
                  Mã CK
                  <span className="relative">
                    {label !== "ASTOCKCODE" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "ASTOCKCODE" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "6.2%" }}
                onClick={() => handleSort("ATRADING_READY_TOTAL")}
              >
                <div className="flex items-center justify-between pl-2">
                  CK có sẵn
                  <span className="relative">
                    {label !== "ATRADING_READY_TOTAL" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "ATRADING_READY_TOTAL" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                colSpan={3}
                className="!text-center !text-xs"
                style={{ width: "12%" }}
              >
                <div>CK mua trở về</div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "7%" }}
              >
                <div>CK quyền trở về</div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "7%" }}
              >
                <div>CK cầm cố NH</div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "6%" }}
              >
                <div>CK hạn chế GD</div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "5.7%" }}
                onClick={() => handleSort("ATOTAL_AMOUNT")}
              >
                <div className="flex items-center justify-between pl-2">
                  Tổng KL
                  <span className="relative">
                    {label !== "ATOTAL_AMOUNT" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "ATOTAL_AMOUNT" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "5%" }}
              >
                <div>Giá TT</div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "7%" }}
                onClick={() => handleSort("AMARKET_VALUE")}
              >
                <div className="flex items-center justify-between pl-2">
                  Thành tiền
                  <span className="relative">
                    {label !== "AMARKET_VALUE" ? (
                      <>
                        <span className="absolute -top-[9px]  -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "AMARKET_VALUE" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "5%" }}
              >
                <div>Giá vốn TB</div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "7.5%" }}
                onClick={() => handleSort("AROOT_VALUE")}
              >
                <div className="flex items-center justify-between pl-2">
                  Tổng giá vốn
                  <span className="relative">
                    {label !== "AROOT_VALUE" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "AROOT_VALUE" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("APROFIT_LOSS_VAL")}
              >
                <div className="flex items-center justify-between pl-2">
                  Lãi/Lỗ
                  <span className="relative">
                    {label !== "APROFIT_LOSS_VAL" ? (
                      <>
                        <span className="absolute -top-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-[9px] -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      </>
                    ) : label === "APROFIT_LOSS_VAL" && sort === "asc" ? (
                      <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-up"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          fill="currentColor"
                          className="bi bi-caret-down"
                          viewBox="0 0 52 52"
                          enableBackground="0 0 52 52"
                          cursor="pointer"
                        >
                          <path
                            d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                            fill="#717171"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
              </td>
              <td
                rowSpan={2}
                className="!text-center !text-xs"
                style={{ width: "5%" }}
                onClick={() => handleSort("APROFIT_LOSS_RATE")}
              >
                <div className="flex items-center justify-between pl-1">
                  % Lãi/Lỗ
                  <span className="relative">
                    <span className="relative">
                      {label !== "APROFIT_LOSS_RATE" ? (
                        <>
                          <span className="absolute -top-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-up"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                          <span className="absolute -bottom-[9px] -left-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              fill="currentColor"
                              className="bi bi-caret-down"
                              viewBox="0 0 52 52"
                              enableBackground="0 0 52 52"
                              cursor="pointer"
                            >
                              <path
                                d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                                fill="#717171"
                              />
                            </svg>
                          </span>
                        </>
                      ) : label === "APROFIT_LOSS_RATE" && sort === "asc" ? (
                        <span className="absolute top-1/2 -translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-up"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="absolute -bottom-1/2 translate-y-1/2 -left-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            fill="currentColor"
                            className="bi bi-caret-down"
                            viewBox="0 0 52 52"
                            enableBackground="0 0 52 52"
                            cursor="pointer"
                          >
                            <path
                              d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"
                              fill="#717171"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr role="row">
              <td className="!text-center font-bold !text-xs">
                <div>T0</div>
              </td>
              <td className="!text-center font-bold !text-xs">
                <div>T1</div>
              </td>
              <td className="!text-center font-bold !text-xs">
                <div>T2</div>
              </td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={item.ASTOCKCODE}>
                <td className="!text-center !text-xs">{item.ASTOCKCODE}</td>
                <td className="!text-xs">{item.ATRADING_READY_TOTAL}</td>
                <td className="!text-xs">{item.ABUY_INTRADY}</td>
                <td className="!text-xs">{item.AT1}</td>
                <td className="!text-xs">{item.AT2}</td>
                <td className="!text-xs">{item.AWAIT_REC_RIGHT}</td>
                <td className="!text-xs">{item.AMORTGATE_BANK}</td>
                <td className="!text-xs">{item.ATRANSFER_RESTRICTED}</td>
                <td className="!text-xs">{item.ATOTAL_AMOUNT}</td>
                <td className="!text-xs">{formatNumber(item.AMARKET_PRICE)}</td>
                <td className="!text-xs">{formatNumber(item.AMARKET_VALUE)}</td>
                <td className="!text-xs">{formatNumber(item.AAVG_PRICE)}</td>
                <td className="!text-xs">{formatNumber(item.AROOT_VALUE)}</td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_VAL < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {formatNumber(item.APROFIT_LOSS_VAL)}
                </td>
                <td
                  className={`!text-xs ${
                    item.APROFIT_LOSS_RATE < 0
                      ? "!text-[#FF0000]"
                      : "!text-[#00b050]"
                  }`}
                >
                  {item.APROFIT_LOSS_RATE}%
                </td>
                <td className="!text-xs">{item.ACAPITAL_STRUCTURE}%</td>
                <td className="!text-xs">{item.APORTFOLIO_RATE}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr role="row">
              <td
                className="!text-left uppercase font-bold !text-xs"
                colSpan={10}
              >
                TỔNG
              </td>
              <td className="font-bold !text-xs">
                {formatNumber(
                  assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.AMARKET_VALUE,
                    0
                  )
                )}
              </td>
              <td className="!text-xs"></td>
              <td className="font-bold !text-xs">
                {formatNumber(
                  assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.AROOT_VALUE,
                    0
                  )
                )}
              </td>
              <td
                className={`!text-xs ${
                  formatNumber(
                    assetReport?.Table1?.reduce(
                      (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                      0
                    )
                  ) < 0
                    ? "!text-[#FF0000]"
                    : "!text-[#00b050]"
                }`}
              >
                {formatNumber(
                  assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                    0
                  )
                )}
              </td>
              <td
                className={`!text-xs ${
                  formatNumber(
                    assetReport?.Table1?.reduce(
                      (a: any, b: any) => a + b.APROFIT_LOSS_RATE,
                      0
                    )
                  ) < 0
                    ? "!text-[#FF0000]"
                    : "!text-[#00b050]"
                }`}
              >
                {(
                  (assetReport?.Table1?.reduce(
                    (a: any, b: any) => a + b.APROFIT_LOSS_VAL,
                    0
                  ) /
                    assetReport?.Table1?.reduce(
                      (a: any, b: any) => a + b.AROOT_VALUE,
                      0
                    )) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td className="!text-xs"></td>
              <td className="!text-xs"></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default TableAssetReport;
