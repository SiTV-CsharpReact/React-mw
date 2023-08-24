import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
interface Props {
  maCode?: string;
  valueInputKl?: string;
  valueInputPrice?: string;
  gdSuccess?: string;
  color?: string;
  success?: string;
  setSuccess: any;
}

const ConfirmOrder: React.FC<Props> = ({
  maCode,
  valueInputKl,
  valueInputPrice,
  gdSuccess,
  color,
  success,
  setSuccess,
}: Props) => {
  const { t } = useTranslation(["home"]);
  return (
    <Box className="bg-white-500 w-[660px] bottom-[60px] z-50 shadow-2xl  left-[27%] absolute  h-[205px] bg-white rounded-md">
      <Box
        style={{ background: color ? "#034E94" : "red" }}
        className=" text-white pt-2 relative text-xl h-[40px] text-center items-center"
      >
        <h1 className="text-[18px]">XÁC THỰC OTP</h1>
      </Box>
      <Box className="mx-auto w-[620px] mt-5 bg-white">
        <table className="border border-[#dedede]">
          <thead>
            <tr className=" bg-[#EEEEEE] border border-[#dedede]">
              <th className="text-center  font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                Lệnh đặt
                {/* {t("home:Order.ORDER_BAN")} */}
              </th>
              <th className="text-center font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                {t("home:Order.ORDER_MCK")}
              </th>
              <th className="text-center font-extralight !text-[#000000] w-[170px] text-sm border-r border border-[#dedede]">
                {t("home:Order.OPTIONS_KL")}
              </th>
              <th className="text-center font-extralight !text-[#000000] w-[110px] text-sm border-r border border-[#dedede]">
                {t("home:base.Gia")}
              </th>
              <th className="text-center font-extralight !text-[#000000] w-[240px] text-sm border-r border border-[#dedede]">
                {t("home:base.ThongBao")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-[#dedede]">
              <td className="text-center border-r border border-[#dedede]">
                {t("home:Order.ORDER_MUA")}
              </td>
              <td className="text-center border-r border border-[#dedede]">
                {maCode}
              </td>
              <td className="text-center border-r border border-[#dedede]">
                {valueInputKl}
              </td>
              <td className="text-center border-r border border-[#dedede]">
                {valueInputPrice}
              </td>
              <td>
                {gdSuccess && (
                  <span className="text-[13px] text-[#0FB44B] pl-2">
                    {t("home:Order.ORDER_TC")}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
      <form className="flex items-center mt-5 gap-6 w-[570px] relative mx-auto">
        <p className="!text-[13px] text-[#3773AA]">Xác nhận lệnh </p>
        {/* <AiOutlineKey className='absolute my-1 border-gray-400 rounded-sm text-2xl left-[96.5px] h-[27px] border' /> */}
        <Box className="border border-[#d6d6d6] w-[195px] rounded-sm h-fit flex items-center">
          <i
            style={{
              borderRight: "1px solid #d6d6d6",
              paddingRight: "2px",
            }}
            className="fa fa-key !pr-5  my-1 px-3 rounded-sm text-2xl p-1  w-[20px] shadow-2xl border-r pl-1 h-fit"
          ></i>
          <input
            value={success}
            onChange={(e) => setSuccess(e.target.value)}
            placeholder="mật khẩu giao dịch "
            type="password"
            className=" !text-sm !pl-[-7px] rounded-sm border-none w-[145px] focus_none"
          />
        </Box>

        <button
          style={{
            border: color ? "1px solid #034E94" : "1px solid #red",
            background: color ? " #034E94" : "red",
          }}
          // onClick={handelSuccess}
          className="p-1 pl-6 pr-6 text-white w-[115px] rounded-2xl"
        >
          {color ? "MUA" : "BÁN"}
        </button>
        <button className="!text-[13px]   text-[#3773AA] ">
          {" "}
          <span className="pr-3 text-xl text-red-500 ">X</span>{" "}
          <span className="relative top-[-3px]"> Đóng lại </span>
        </button>
      </form>
      <hr className="mt-2 border w-[620px] block mx-auto " />
      <p className="!text-[13px] pt-2 !font-extralight  !text-[#7B7B7C]  tracking-[.5px]  pl-7">
        Để sử dụng mật khẩu giao dịch một lần cho cả phiên đăng nhập, Quý khách
        cài đặt <span className="text-[#337AB7] underline"> tại đây </span>
      </p>
    </Box>
  );
};

export default ConfirmOrder;
