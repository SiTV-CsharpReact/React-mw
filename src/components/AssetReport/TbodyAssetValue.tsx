import React, { useState } from "react";
import { formatNumber } from "../../utils/util";
import { useAppSelector } from "../../store/configureStore";

interface Data {
  ABUY_STOCK: number;
  ACASH_AMOUNT: number;
  ALIMIT_STOCK: number;
  AREC_CASH_SELL: number;
  AREC_CASH_T0: number;
  AREC_CASH_T1: number;
  AREC_CASH_T2: number;
  AREMAIN_DEBT: number;
  ARE_CASH_DEVIDEND: number;
  ARE_CASH_OTHER: number;
  ARIGHT_STOCK: number;
  ASAVINGTOTAL: number;
  AVAL_STOCK: number;
  SUM_CASH: number;
  SUM_STOCK: number;
}
interface Props {
  table: string;
  item: Data;
}
const TbodyAssetValue: any = (props: Props) => {
  const { mode } = useAppSelector((state) => state.settingColorMode);

  const [drop, setDrop] = useState<boolean>(false);
  const [drop2, setDrop2] = useState<boolean>(false);
  const [mouse, setMouse] = useState<boolean>(false);
  return (
    <>
      {props.table === "tb1" ? (
        <tbody className="h-[30px]">
          <tr>
            <td>
              <span className={`font-bold  text-[#000] font-[Arial] text-xs`}>
                GIÁ TRỊ TÀI SẢN RÒNG (I + II + III)
              </span>
            </td>
            <td>
              <span className={`font-bold  text-[#000] float-right text-xs`}>
                {formatNumber(props.item.SUM_STOCK + props.item.SUM_CASH)}
              </span>
            </td>
          </tr>
        </tbody>
      ) : props.table === "tb2" ? (
        <>
          <tbody className="h-[35px]">
            <tr className="pt-[10px]">
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-left text-xs relative top-[1px]`}
                >
                  I. CHỨNG KHOÁN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left !text-hoverKL text-base relative top-1 left-1`}
                >
                  {drop ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-right text-xs relative top-[1px]`}
                >
                  {formatNumber(props.item.SUM_STOCK)}
                </span>
              </td>
            </tr>
          </tbody>
          <tbody
            className="drop-container"
            style={{ display: drop ? "none" : "" }}
          >
            <tr>
              <td>
                <span
                  className={`report__text__profile_name  font-[Arial] text-xs`}
                >
                  Chứng khoán có sẵn
                </span>
              </td>
              <td>
                <span className={`float-right text-xs  font-[Arial]`}>
                  {formatNumber(props.item.AVAL_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name  font-[Arial] text-xs`}
                >
                  Chứng khoán mua chờ về
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial] text-xs`}
                >
                  {formatNumber(props.item.ABUY_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name  font-[Arial] text-xs`}
                >
                  Chứng khoán quyền chờ về
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial] text-xs`}
                >
                  {formatNumber(props.item.ARIGHT_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name  font-[Arial] text-xs`}
                >
                  Chứng khoán hạn chế{" "}
                  <span
                    className="mb-1 relative cursor-pointer text-hoverKL"
                    onMouseOver={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                  >
                    <i
                      className="fa fa-info-circle !text-sm"
                      aria-hidden="true"
                    ></i>
                    {mouse && (
                      <label id="noteShow" className={` ${mode}-bg text-black`}>
                        Bao gồm CK hạn chế giao <br /> dịch, Cầm cố Ngân hàng
                      </label>
                    )}
                  </span>
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial] text-xs`}
                >
                  {formatNumber(props.item.ALIMIT_STOCK)}
                </span>
              </td>
            </tr>
          </tbody>
        </>
      ) : props.table === "tb3" ? (
        <>
          <tbody className="h-[35px]">
            <tr>
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-left text-xs relative top-[1px] `}
                >
                  II. TIỀN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left relative left-[3px] top-1 text-sm !text-hoverKL`}
                >
                  {drop ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-right text-xs relative top-[1px]`}
                >
                  {formatNumber(props.item.SUM_CASH)}
                </span>
              </td>
            </tr>
          </tbody>
          <tbody
            className="drop-container"
            style={{ display: drop ? "none" : "" }}
          >
            <tr>
              <td>
                <span className={`report__text__profile_name  font-[Arial]`}>
                  Tiền trong tài khoản
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial]`}
                >
                  {formatNumber(props.item.ACASH_AMOUNT)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name float-left  font-[Arial]`}
                >
                  Tiền bán chờ thanh toán
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left relative left-1 top-[3px] text-sm !text-hoverKL`}
                >
                  {drop ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial]`}
                >
                  {formatNumber(props.item.ABUY_STOCK)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px] text-xs text-black font-[Arial]`}>
                  T0
                </span>
              </td>
              <td>
                <span className={`float-right text-xs font-[Arial]`}>
                  {formatNumber(props.item.AREC_CASH_T0)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px] text-xs text-black font-[Arial]`}>
                  T1
                </span>
              </td>
              <td>
                <span className={`float-right text-xs font-[Arial]`}>
                  {formatNumber(props.item.AREC_CASH_T1)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px] text-xs text-black font-[Arial]`}>
                  T2
                </span>
              </td>
              <td>
                <span className={`float-right text-xs font-[Arial]`}>
                  {formatNumber(props.item.AREC_CASH_T2)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`report__text__profile_name font-[Arial] `}>
                  Tiền cổ tức chờ về
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial]`}
                >
                  {formatNumber(props.item.ARE_CASH_DEVIDEND)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name font-[Arial] relative`}
                  onMouseOver={() => setMouse(true)}
                  onMouseLeave={() => setMouse(false)}
                >
                  Tiền chờ về khác{" "}
                  <span className="mb-1 cursor-pointer !text-sm text-hoverKL absolute -right-[15.2px] -top-[5px]">
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </span>
                  {mouse && (
                    <label id="noteShow" className={`text-black  ${mode}-bg`}>
                      Tiền thanh toán đáo hạn <br /> chứng quyền trở về
                    </label>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial]`}
                >
                  {formatNumber(props.item.ARE_CASH_OTHER)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`report__text__profile_name  font-[Arial]`}>
                  Tiền gửi, tiền cho vay
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name  float-right font-[Arial]`}
                >
                  {formatNumber(props.item.AREC_CASH_SELL)}
                </span>
              </td>
            </tr>
          </tbody>
        </>
      ) : (
        <tbody className="h-[35px]">
          <tr>
            <td
              className={`font-bold text-[#000] italic font-[Arial] text-xs relative top-[1px]`}
            >
              <span>III. DƯ NỢ VAY KÝ QUỸ </span>
            </td>
            <td>
              <span
                className={`font-bold text-[#000] italic font-[Arial] float-right text-xs relative top-[1px]`}
              >
                {formatNumber(props.item.ASAVINGTOTAL)}
              </span>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default TbodyAssetValue;
