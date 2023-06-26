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
              <span
                className={`font-bold  text-[#000] font-[Arial] text-xs`}
              >
                GIÁ TRỊ TÀI SẢN RÒNG (I + II + III)
              </span>
            </td>
            <td>
              <span
                className={`font-bold  text-[#000] float-right text-xs`}
              >
                {formatNumber(props.item.SUM_STOCK + props.item.SUM_CASH)}
              </span>
            </td>
          </tr>
        </tbody>
      ) : props.table === "tb2" ? (
        <>
          <tbody className="h-[35px]">
            <tr>
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-left text-xs`}
                >
                  I. CHỨNG KHOÁN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left relative left-2 !text-hoverKL -top-[2px] text-sm`}
                >
                  {drop ? (
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-right text-xs `}
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
                <span
                  className={`float-right text-xs  font-[Arial]`}
                >
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
                      <label
                        id="noteShow"
                        className={` ${mode}-bg text-black`}
                      >
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
                  className={`font-bold text-[#000] italic font-[Arial] float-left text-xs `}
                >
                  II. TIỀN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left relative left-2 -top-[2px] text-sm !text-hoverKL`}
                >
                  {drop ? (
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-caret-up" aria-hidden="true"></i>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`font-bold text-[#000] italic font-[Arial] float-right text-xs `}
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
                  onClick={() => setDrop2(!drop2)}
                  className={`cursor-pointer float-left relative -top-[2px] left-2 text-sm !text-hoverKL`}
                >
                  {drop2 ? (
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-caret-up" aria-hidden="true"></i>
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
                <span className={`pl-[150px]  font-[Arial]`}>T0</span>
              </td>
              <td>
                <span className={`float-right  font-[Arial]`}>
                  {formatNumber(props.item.AREC_CASH_T0)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px]  font-[Arial]`}>T1</span>
              </td>
              <td>
                <span className={` float-right font-[Arial]`}>
                  {formatNumber(props.item.AREC_CASH_T1)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px]  font-[Arial]`}>T2</span>
              </td>
              <td>
                <span className={`float-right  font-[Arial]`}>
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
                  className={`report__text__profile_name font-[Arial] `}
                >
                  Tiền chờ về khác {" "}
                  <span
                    className="mb-1 relative cursor-pointer"
                    onMouseOver={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                  >
                    <i className="fa fa-info-circle !text-sm text-hoverKL" aria-hidden="true"></i>
                    {mouse && (
                      <label
                        id="noteShow"
                        className={`text-black  ${mode}-bg`}
                      >
                        Tiền thanh toán đáo hạn <br /> chứng quyền trở về
                      </label>
                    )}
                  </span>
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
            <td className={`font-bold text-[#000] italic font-[Arial] text-xs `}>
              <span>III. DƯ NỢ VAY KÝ QUỸ </span>
            </td>
            <td>
              <span
                className={` font-bold text-[#000] italic font-[Arial] float-right text-xs`}
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
