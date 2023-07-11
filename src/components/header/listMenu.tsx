import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styleHeader.css";
import New from "./../../images/new.png";
import { useTranslation } from "react-i18next";
import { getActiveMenu } from "./helper/activMenu";
const ListMenu = () => {
  const { pathname } = window.location;
  localStorage.setItem("activeMenuHeader", pathname);
  const { t } = useTranslation(["home"]);
  const ChangeGetActiveMenu = (e: any) => {
    localStorage.setItem("activeMenuHeader", e);
    getActiveMenu();
  };
  useEffect(() => {
    getActiveMenu();
  }, []);

  return (
    <div className="header-center">
      <ul>
        <li className="parent ezfu-hover-giaodichchungkhoan">
          <a>{t("home:menu.LichSuGD")} </a>
          <ul>
            <li>
              <Link
                to="/report/ClientActivityRange"
                className="ezfu-hover-itemMenu"
                onClick={() =>
                  ChangeGetActiveMenu("/report/ClientActivityRange")
                }
              >
                {t("home:menu.LichSUDL")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/TradeLog"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/TradeLog")}
              >
                {" "}
                {t("home:menu.LichSUKL")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/PendingSettlement"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/PendingSettlement")}
              >
                {t("home:menu.LishSuTT")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="parent ezfu-hover-chuyentien">
          <a> {t("home:menu.GDTien")}</a>
          <ul>
            <li>
              <Link
                to="/transfer"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/transfer")}
              >
                {t("home:menu.Chuyentien")}
              </Link>
            </li>
            <li>
              <Link
                to="/transfer/template"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/transfer/template")}
              >
                {t("home:menu.Mauchuyentien")}
              </Link>
            </li>
            <li>
              <Link
                to="/transfer/home/transferds"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/transfer/home/transferds")}
              >
                {t("home:menu.ChuyentienPPX")}
              </Link>
            </li>
            <li>
              <Link to="/transfer/history" className="ezfu-hover-itemMenu"  onClick={()=>ChangeGetActiveMenu("/transfer/history")}>
                {t("home:menu.LichsuCT")}
              </Link>
            </li>
            <li>
              <Link to="/transfer/ordersavings" className="Foreign-Hide">
                {t("home:menu.TienchoVay")}  
                <input
                  type="image"
                  src={New}
                  height={16}
                  width={28}
                />
              </Link>
            </li>
            <li>
              <Link
                to="/transfer/finalizesavings"
                className="Foreign-Hide ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/transfer/finalizesavings")}
              >
                {t("home:menu.TatToanTV")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/transfer/savingshistory"
                className="Foreign-Hide ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/transfer/savingshistory")}
              >
                {t("home:menu.DanhsachHDCV")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/report/AdvReport"
                className="MarPro-Hide"
                style={{ display: "none" }}
              >
                {t("home:menu.LSUTTBCK")}
              </Link>
            </li>
            <li>
              <Link
                to="/rightscustody/AdvanceOrderForm"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/rightscustody/AdvanceOrderForm")}
              >
                {t("home:menu.UTTTC")}
              </Link>
            </li>
            <li>
              <Link
                to="/rightscustody/AdvanceHistory"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/rightscustody/AdvanceHistory")}
              >
                {t("home:menu.LSUTTTC")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="parent ezfu-hover-giaodichdacbiet">
          <a>{t("home:menu.GDDacBiet")}</a>
          <ul>
            <li>
              <Link
                to="/oddlot/History"
                onClick={() => ChangeGetActiveMenu("/oddlot/History")}
              >
                {t("home:menu.LishSUCKLL")}
              </Link>
            </li>
            <li>
              <Link
                to="/rightscustody/OverView"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/rightscustody/OverView")}
              >
                {t("home:menu.THQ")}
              </Link>
            </li>
            <li>
              <Link
                to="/stoploss/orderform"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/stoploss/orderform")}
              >
                {t("home:menu.DKDT")}
              </Link>
            </li>
            <li>
              <Link
                to="/stoploss/history"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/stoploss/history")}
              >
                {t("home:menu.SLDK")}
              </Link>
            </li>
            <li>
              <Link
                to="/rightscustody/CustodyOrderForm"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/rightscustody/CustodyOrderForm")}
              >
                {t("home:menu.LYTT")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="parent ezfu-hover-quanlytaikhoan">
          <a> {t("home:menu.QuanLyTK")}</a>
          <ul>
            <li>
              <Link
                to="/report/ReportTransBalance"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/ReportTransBalance")}
              >
                {t("home:menu.QLTK_BCTHSDGD")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/report/AssetReport2"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/AssetReport2")}
              >
                {t("home:menu.QLTK_BCTS")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/report/ReportNAV"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/ReportNAV")}
              >
                {t("home:menu.QLTK_BCBDTSD")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/report/reportprofitloss"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/reportprofitloss")}
              >
                {t("home:menu.QLTK_BCLLTH")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/report/ReportTransSummary"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/ReportTransSummary")}
              >
                {t("home:menu.QLTK_BCTHGDTMCK")}
                <input type="image" src={New} height={16} width={28} />
              </Link>
            </li>
            <li>
              <Link
                to="/report/StockDetails"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/StockDetails")}
              >
                {t("home:menu.QLTK_SDCK")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/CurrMargin"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/CurrMargin")}
              >
                {t("home:menu.QLTK_SDT")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/StockSettlement"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/StockSettlement")}
              >
                {t("home:menu.QLTK_SKCK")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/CashSettlement"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/CashSettlement")}
              >
                {t("home:menu.QLTK_SKT")}
              </Link>
            </li>
            <li>
              <Link
                to="/rightscustody/DepositoryHistory"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/rightscustody/DepositoryHistory")}
              >
                {t("home:menu.QLTK_TCPLK")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/ReportCW"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/ReportCW")}
              >
                {t("home:menu.QLTK_TCTTCQ")}
              </Link>
            </li>
            <li>
              <Link
                to="/report/ListFee"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/report/ListFee")}
              >
                {t("home:menu.QLTK_TCBP")}
              </Link>
            </li>
          </ul>
        </li>
        <li
          className="parent ezfu-hover-quanlytaikhoanMarMor MarMor-Show"
          style={{ display: "none" }}
        >
          <a>{t("home:menu.QuanLyKQ")}</a>
          <ul>
            <li>
              <Link
                to="/margin/Mortgage"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/Mortgage")}
              >
                Cầm cố chứng khoán
              </Link>
            </li>
            <li>
              <Link
                to="/margin/Report"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/Report")}
              >
                Tra cứu tham số - HĐ Ký quỹ
              </Link>
            </li>
            <li>
              <Link
                to="/margin/Payment"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/Payment")}
              >
                Trả tiền HĐ Ký quỹ
              </Link>
            </li>
            <li>
              <Link
                to="/margin/ReportPayment"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/ReportPayment")}
              >
                Tra cứu trả tiền HĐ Ký quỹ
              </Link>
            </li>
            <li>
              <Link
                to="/margin/Extend"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/Extend")}
              >
                Gia hạn hợp đồng Ký quỹ
              </Link>
            </li>
            <li>
              <Link
                to="/margin/Quota"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/Quota")}
              >
                Đề nghị thay đổi hạn mức
              </Link>
            </li>
          </ul>
        </li>
        <li
          className="parent ezfu-hover-quanlytaikhoanMarPro MarPro-Show"
          style={{ display: "list-item" }}
        >
          <a>{t("home:menu.QuanLyTK")}</a>
          <ul>
            <li>
              <Link
                to="/margin/InterestMP"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/InterestMP")}
              >
                {t("home:menu.QLTK_TCLVKQ")}
              </Link>
            </li>
            <li>
              <Link
                to="/margin/DetailReport"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/DetailReport")}
              >
                {t("home:menu.QLTK_TCCTQKKQ")}
              </Link>
            </li>
            <li>
              <Link
                to="/margin/CashSettlementMP"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/CashSettlementMP")}
              >
                {t("home:menu.QLTK_SKTVKQ")}
              </Link>
            </li>
            <li>
              <Link
                to="/margin/ParameterMP"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/ParameterMP")}
              >
                {t("home:menu.QLTK_TCTSKQ")}
              </Link>
            </li>
            <li>
              <Link
                to="/margin/QuotaMP"
                className="ezfu-hover-itemMenu"
                onClick={() => ChangeGetActiveMenu("/margin/QuotaMP")}
              >
                {t("home:menu.QLTK_DNTDMH")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="parent ezfu-hover-tuvandautu">
          <Link target="_blank" to="https://ezadvisorselect.fpts.com.vn/">
            {t("home:menu.TuVanDauTu")}
          </Link>
        </li>
        <li className="parent eezfu-hover-giaodichdacbiet">
          <a>{t("home:menu.HoTro")}</a>
          <ul>
            <li>
              <Link to="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/mo-tai-khoan-giao-dich-chung-khoan/">
                {t("home:menu.HOTRO_SPDVTT")}
              </Link>
            </li>
            <li>
              <Link to="http://www.fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/cau-hoi-thuong-gap/">
                {t("home:menu.HOTRO_HDNDT")}
              </Link>
            </li>
            <li>
              <Link to="http://www.fpts.com.vn/san-pham-dich-vu/tu-van-doanh-nghiep/">
                {t("home:menu.HOTRO_SPDVTC")}
              </Link>
            </li>
            <li>
              <Link to="http://fpts.com.vn/ho-tro-khach-hang/giao-dich-chung-khoan-co-so/huong-dan-su-dung-dich-vu/marketwatch-va-do-thi-tren-eztrade-new/">
                {t("home:menu.HOTRO_HDSDDV")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="parent">
          <Link to="/dynamic-dashboard"  className="ezfu-hover-itemMenu" onClick={() => ChangeGetActiveMenu("/dynamic-dashboard")}>{t("home:menu.GiaoDienCuaToi")}</Link>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ListMenu);
