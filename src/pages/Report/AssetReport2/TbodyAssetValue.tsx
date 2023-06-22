import React, { useState } from "react";
import { RootState ,useAppSelector} from "../../../store/configureStore";
import { formatNumber } from "../../../utils/util";

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
  const { mode } = useAppSelector((state:RootState) => state.settingColorMode);

  const [drop, setDrop] = useState<boolean>(false);
  const [drop2, setDrop2] = useState<boolean>(false);
  const [mouse, setMouse] = useState<boolean>(false);
  return (
    <>
      {props.table === "tb1" ? (
        <tbody className="h-[30px]">
          <tr>
            <td>
              <span className={`font-bold ${mode}-text text-black text-xs`}>
                GIÁ TRỊ TÀI SẢN RÒNG (I + II + III)
              </span>
            </td>
            <td>
              <span
                className={`font-bold ${mode}-text text-black float-right text-xs`}
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
                  className={`font-bold text-black float-left text-xs ${mode}-text`}
                >
                  I. CHỨNG KHOÁN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left relative left-2 -top-[2px] text-xs ${mode}-text`}
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
                  className={`font-bold text-black float-right text-xs ${mode}-text`}
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
                <span className={`report__text__profile_name ${mode}-text`}>
                  Chứng khoán có sẵn
                </span>
              </td>
              <td>
                <span className={`float-right text-xs ${mode}-text`}>
                  {formatNumber(props.item.AVAL_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`report__text__profile_name ${mode}-text`}>
                  Chứng khoán mua chờ về
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
                >
                  {formatNumber(props.item.ABUY_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`report__text__profile_name ${mode}-text`}>
                  Chứng khoán quyền chờ về
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
                >
                  {formatNumber(props.item.ARIGHT_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name flex items-center gap-1 ${mode}-text`}
                >
                  Chứng khoán hạn chế
                  <span
                    className="mb-1 relative cursor-pointer"
                    onMouseOver={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                  >
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                    {mouse && (
                      <label
                        id="noteShow"
                        className={`${mode}-text ${mode}-bg text-black`}
                      >
                        Bao gồm CK hạn chế giao <br /> dịch, Cầm cố Ngân hàng
                      </label>
                    )}
                  </span>
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
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
                  className={`font-bold text-black float-left text-xs ${mode}-text`}
                >
                  II. TIỀN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className={`cursor-pointer float-left relative left-2 -top-[2px] text-xs ${mode}-text`}
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
                  className={`font-bold text-black float-right text-xs ${mode}-text`}
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
                <span className={`report__text__profile_name ${mode}-text`}>
                  Tiền trong tài khoản
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
                >
                  {formatNumber(props.item.ACASH_AMOUNT)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name float-left ${mode}-text`}
                >
                  Tiền bán chờ thanh toán
                </span>
                <span
                  onClick={() => setDrop2(!drop2)}
                  className={`cursor-pointer float-left relative -top-[2px] left-2 text-xs ${mode}-text`}
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
                  className={`report__text__profile_name ${mode}-text float-right`}
                >
                  {formatNumber(props.item.ABUY_STOCK)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px] ${mode}-text`}>T0</span>
              </td>
              <td>
                <span className={`float-right ${mode}-text`}>
                  {formatNumber(props.item.AREC_CASH_T0)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px] ${mode}-text`}>T1</span>
              </td>
              <td>
                <span className={`${mode}-text float-right`}>
                  {formatNumber(props.item.AREC_CASH_T1)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className={`pl-[150px] ${mode}-text`}>T2</span>
              </td>
              <td>
                <span className={`float-right ${mode}-text`}>
                  {formatNumber(props.item.AREC_CASH_T2)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`report__text__profile_name ${mode}-text`}>
                  Tiền cổ tức chờ về
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
                >
                  {formatNumber(props.item.ARE_CASH_DEVIDEND)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span
                  className={`report__text__profile_name flex items-center gap-1 ${mode}-text`}
                >
                  Tiền chờ về khác
                  <span
                    className="mb-1 relative cursor-pointer"
                    onMouseOver={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                  >
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                    {mouse && (
                      <label
                        id="noteShow"
                        className={`text-black ${mode}-text ${mode}-bg`}
                      >
                        Tiền thanh toán đáo hạn <br /> chứng quyền trở về
                      </label>
                    )}
                  </span>
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
                >
                  {formatNumber(props.item.ARE_CASH_OTHER)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className={`report__text__profile_name ${mode}-text`}>
                  Tiền gửi, tiền cho vay
                </span>
              </td>
              <td>
                <span
                  className={`report__text__profile_name ${mode}-text float-right`}
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
            <td className={`font-bold text-black text-xs ${mode}-text`}>
              <span>III. DƯ NỢ VAY KÝ QUỸ </span>
            </td>
            <td>
              <span
                className={`${mode}-text font-bold text-black float-right text-xs`}
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
