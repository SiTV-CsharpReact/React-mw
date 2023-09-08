import React, { useCallback, useEffect, useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { GetStockBalance, GetStockBalanceMarpro } from "./ClientBalance";
import { Avatar, Box, Skeleton, TextField, Typography } from "@mui/material";
import { fetchCompanyAsync } from "../companyMarketwatch/companyMarketwatchSlice";
import { setDataOrder } from "../tableMarketwatch/orderComanSlice";
const StockBalance = (status: any) => {
  const { t } = useTranslation(["home"]);
  const dispatch = useAppDispatch();
  const [dataMax, setDataMax] = useState<number>(10);
  const StockBalances = useAppSelector(
    (state) => state.clientBalance.StockBalane
  );
  console.log(StockBalances)
  const isLoadingStockBalance = useAppSelector(
    (state) => state.clientBalance.isLoadingStockBalance
  );
  const StockBalancesMarpro = useAppSelector(
    (state) => state.clientBalance.StockBalaneMarpro
  );
  const sttAccount = useAppSelector(
    (state) => state.ProfileAccount.statusAccount
  );
  const { dataCompanyTotal } = useAppSelector(
    (state) => state.company
  );
  
  useEffect(() => {
    if (sttAccount === 1) {
      dispatch(GetStockBalance());
    }
    // tk marpro thì call api marpro
    else if (sttAccount === 2) {
      dispatch(GetStockBalance());
    } else if (sttAccount === 3) {
      dispatch(GetStockBalanceMarpro());
      dispatch(GetStockBalance());
    }
  }, [dispatch]);
  const SellStock = (vCodeSell:string,vQuantityMax:number)=>{
    // console.log(dataCompanyTotal)
   dispatch(fetchCompanyAsync())
    let vExchange = "";
    let vGiaTran=0;
    let vGiaTC=0;
    let vGiaSan=0;
    for (var i = 0; i < dataCompanyTotal.length; i++) {
      if (dataCompanyTotal[i].Code === vCodeSell) {
        vGiaTran= dataCompanyTotal[i].Ceiling_Price;
       vGiaTC= dataCompanyTotal[i].Basic_Price;
       vGiaSan= dataCompanyTotal[i].Floor_Price;
          if (dataCompanyTotal[i].Exchange === 1) {   // HO
              vExchange = "HOSE";   
          }

          if (dataCompanyTotal[i].Exchange === 2) { // HA
              vExchange = "HNX.NY";
          }

          if (dataCompanyTotal[i].Exchange === 3) { // UPCOM
              vExchange = "HNX.UPCOM";
          }
          break;
      }
      console.log(vExchange)
  }
    const Floor_Price = vGiaSan;
    const Basic_Price = vGiaTC;
    const Ceiling_Price = vGiaTran;
    const Code = vCodeSell;
    const Exchange = vExchange;
    const quantityMax = vQuantityMax;
    let data = {
      key: "B",
      dataOrder: {Floor_Price ,Basic_Price,Ceiling_Price,Code,Exchange,quantityMax},
    };
    console.log(data)
      dispatch(setDataOrder(data));
    console.log(StockBalances)
  }
  return (
    <Box
      className={`bottom__sdCKhoan bottom__sdTien mr-[3%] float-left ${
        status.status ? "ml-[13%]" : "absolute top-[110px] ml-[25px]"
      }  `}
      id="bottomSdCKhoan"
    >
      <Box className="bottom__sdCKhoan__title SDTM">
        <Box sx={{display:"flex"}}>
          <Typography sx={{
            height:25,
            fontSize:15,
            color:"#0055ba",
            padding:"3px 10px",
            textTransform:"uppercase"
            }}>
            {t("home:menu.QLTK_SDCK")}
          </Typography>
          <CachedIcon
            style={{
              color: "#1d60bc",
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 2,
            }}
          />
        </Box>
        <Box
          className="groupSwitch groupSwitchTachKL hidden"
          title="- Chế độ “Tự động tách khối lượng”: KH chỉ cần nhập khối lượng, hệ thống sẽ tự động chọn hợp đồng để bán theo thứ tự ưu tiên: (1) Chứng khoán kỹ quỹ, (2) Chứng khoán thường
- Lưu ý: Hệ thống chỉ tự động chọn lô chẵn. KH bán lô lẻ cần chọn từng hợp đồng"
        >
          <Typography>
            Tự động tách khối lượng
            <sup>
              <Avatar sx={{width:10,height:10}} src="/images/info4.png"  />
            </sup>
            :
          </Typography>
          <Typography className="switch switchTachKL hidden" id="switchLabel">
            <TextField  type="checkbox" id="ckTachKL" />
            <Typography className="slider round sliderKL roundKL">
              <Typography className="on onKL">Bật</Typography>
              <Typography className="off offKL">Tắt</Typography>
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box
        className="bottom__sdCKhoan__content"
        style={{ display: "block", overflow: "auto", maxHeight: "250px" }}
      >
        <table>
          <thead>
            <tr>
              <th className="bottom__sdCKhoan__content__thead__mack font-normal">
                {/* Mã CK */}
                {t("home:Order.ORDER_MCK")}
              </th>
              <th className="bottom__sdCKhoan__content__thead__sl hidden">
                {/* Số lượng */}
                {t("home:Order.OPTIONS_SL")}
              </th>
              <th className="bottom__sdCKhoan__content__thead__kl font-normal">
                {/* K.lượng */}
                {t("home:Order.OPTIONS_KL")}
              </th>
              <th
                className="bottom__sdCKhoan__content__thead__klban hidden"
                title="Khối lượng bán tương ứng với từng hợp đồng"
              >
                K.lượng bán
                {t("home:Order.KLB")}
              </th>
              <th
                className="bottom__sdCKhoan__content__thead__tlv"
                title="Tỷ lệ vay hiện tại của hợp đồng"
                style={{ display: "none" }}
              >
                TLV
              </th>
              <th
                className="bottom__sdCKhoan__content__thead__ngdh"
                title="Ngày đáo hạn"
                style={{ display: "none" }}
              >
                Ngày ĐH
              </th>
              <th
                className="bottom__sdCKhoan__content__thead__mahd"
                style={{ display: "none" }}
              >
                Mã HĐ
              </th>
              <th className="bottom__sdCKhoan__content__thead__chonTM font-normal">
                {t("home:Order.CHON")}
              </th>
              <th
                className="bottom__sdCKhoan__content__thead__chonKQ"
                style={{ display: "none" }}
              >
                Chọn
              </th>
            </tr>
          </thead>
          <tbody id="tbdStockBalance" data-symbol-filter>

            {isLoadingStockBalance ? (
           StockBalances &&   StockBalances.Table?.slice(0, dataMax).map((StockBalance) => (
                <tr className="sell" key={StockBalance.ASTOCKCODE}>
                  <td className="L bottom__sdCKhoan__content__tbody__mack">
                    {StockBalance.ASTOCKCODE}
                  </td>
                  <td className="bottom__sdCKhoan__content__tbody__kl R">
                    {StockBalance.AQUANTITY}
                  </td>
                  <td className="bottom__sdCKhoan__content__tbody__chonTM">
                    <input
                      type="button"
                      className="btn btnSellStockBalance"
                      defaultValue="BÁN"
                      onClick={()=>SellStock(StockBalance.ASTOCKCODE,StockBalance.AQUANTITY)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              // Hiển thị phần Skeleton ở đây
              <Box >
               <Skeleton variant="text"  />
               <Skeleton variant="text"  />
               <Skeleton variant="text"  />
               <Skeleton variant="text"  />
               <Skeleton variant="text"  />
              </Box>
            )}
          </tbody>
        </table>
      </Box>
      <Box
        className="bottom__sdCKhoan__footer"
        style={{ paddingBottom: "15px" }}
      >
        <Typography
            component="span"
          sx={{
            color: "#0055ba",
            fontSize:12,
            cursor: "pointer",
            display: dataMax === 10 ? "block" : "none",
          }}
          onClick={() => setDataMax(9999)}
        >
          {t("home:Order.HTC")}
        </Typography>
        <Typography
        component="span"
          sx={{
            color: "#0055ba",
            fontSize:12,
            cursor: "pointer",
            display: dataMax === 10 ? "none" : "block",
          }}
          onClick={() => setDataMax(10)}
        >
          Thu gọn
        </Typography>
        <Box className="bottom-mobile mobileS" style={{ display: "none" }}>
          <Avatar src="/images/icon-next.png" />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(StockBalance);
