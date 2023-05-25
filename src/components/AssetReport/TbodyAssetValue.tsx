import React, { useState } from "react";
import { formatNumber } from "../../utils/util";

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
  const [drop, setDrop] = useState<boolean>(false);
  const [drop2, setDrop2] = useState<boolean>(false);
  const [mouse, setMouse] = useState<boolean>(false);
  return (
    <>
      {props.table === "tb1" ? (
        <tbody className="h-[30px]">
          <tr>
            <td>
              <span className="font-bold text-black text-xs">
                GIÁ TRỊ TÀI SẢN RÒNG (I + II + III)
              </span>
            </td>
            <td>
              <span className="font-bold text-black float-right text-xs">
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
                <span className="font-bold text-black float-left text-xs">
                  I. CHỨNG KHOÁN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className="cursor-pointer float-left relative top-1 left-1 text-xs"
                >
                  {drop ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                  )}
                </span>
              </td>
              <td>
                <span className="font-bold text-black float-right text-xs">
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
                <span className="report__text__profile_name">
                  Chứng khoán có sẵn
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.AVAL_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name">
                  Chứng khoán mua chờ về
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.ABUY_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name">
                  Chứng khoán quyền chờ về
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.ARIGHT_STOCK)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name  flex items-center gap-1">
                  Chứng khoán hạn chế
                  <span
                    className="mb-1 relative cursor-pointer"
                    onMouseOver={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-info-circle-fill"
                      viewBox="0 0 16 16"
                      enableBackground="0 0 16 16"
                      color="#717171"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    {mouse && (
                      <label id="noteShow">
                        Bao gồm CK hạn chế giao <br /> dịch, Cầm cố Ngân hàng
                      </label>
                    )}
                  </span>
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
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
                <span className="font-bold text-black float-left text-xs">
                  II. TIỀN
                </span>
                <span
                  onClick={() => setDrop(!drop)}
                  className="cursor-pointer float-left relative top-1 left-1 text-xs"
                >
                  {drop ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                  )}
                </span>
              </td>
              <td>
                <span className="font-bold text-black float-right text-xs">
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
                <span className="report__text__profile_name">
                  Tiền trong tài khoản
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.ACASH_AMOUNT)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name float-left">
                  Tiền bán chờ thanh toán
                </span>
                <span
                  onClick={() => setDrop2(!drop2)}
                  className="cursor-pointer float-left relative top-1 left-1 text-xs"
                >
                  {drop2 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
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
                  )}
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.ABUY_STOCK)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className="pl-[150px]">T0</span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(props.item.AREC_CASH_T0)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className="pl-[150px]">T1</span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(props.item.AREC_CASH_T1)}
                </span>
              </td>
            </tr>
            <tr style={{ display: drop2 ? "none" : "" }}>
              <td>
                <span className="pl-[150px]">T2</span>
              </td>
              <td>
                <span className="float-right">
                  {formatNumber(props.item.AREC_CASH_T2)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name">
                  Tiền cổ tức chờ về
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.ARE_CASH_DEVIDEND)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name flex items-center gap-1">
                  Tiền chờ về khác
                  <span
                    className="mb-1 relative cursor-pointer"
                    onMouseOver={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="currentColor"
                      className="bi bi-info-circle-fill"
                      viewBox="0 0 16 16"
                      enableBackground="0 0 16 16"
                      color="#717171"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    {mouse && (
                      <label id="noteShow">
                        Tiền thanh toán đáo hạn <br /> chứng quyền trở về
                      </label>
                    )}
                  </span>
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.ARE_CASH_OTHER)}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="report__text__profile_name">
                  Tiền gửi, tiền cho vay
                </span>
              </td>
              <td>
                <span className="float-right text-xs">
                  {formatNumber(props.item.AREC_CASH_SELL)}
                </span>
              </td>
            </tr>
          </tbody>
        </>
      ) : (
        <tbody className="h-[35px]">
          <tr>
            <td className="font-bold text-black text-xs">
              <span>III. DƯ NỢ VAY KÝ QUỸ </span>
            </td>
            <td>
              <span className="font-bold text-black float-right text-xs">
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
