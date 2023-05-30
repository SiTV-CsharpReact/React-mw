import React, { useState } from 'react'
import bankCheckImage from "../../images/notification/bank-check.png";
import coinsImage from "../../images/notification/coins.png";
import giftboxImage from "../../images/notification/giftbox.png";
import notificationImage from "../../images/notification/other_notification.png";
import tabIconAsset from "../../images/notification/TabIcon_Asset.png";
// import investment from "../../images/notification/icon_investment_report_gray.svg";
import arrowRightImage from "../../images/arrow_right-512.png";
import investmentSVG from '../../images/notification/icon_investment_report_gray.svg'
import { ReactComponent as TinvestmentSVG } from '../../images/notification/icon_investment_report_gray.svg'
import { ReportIconSVG } from "../../icons/Report";
import { relative } from "path";
import { Box, IconButton,Tooltip,Popover } from '@mui/material';
const NotiHeader = () => {
    const [anchorEl, setanchorEl] = useState<null | HTMLElement>(null);
    const [openNoti, setOpenNoti] = useState(false);
    const openPopupNoti = Boolean(anchorEl);
    const handleCloseNoti = () => {
        setanchorEl(null);
      };
      const handleClickNoti = (event: React.MouseEvent<HTMLButtonElement>) => {
        setanchorEl(event.currentTarget);
      };
   
  return (
    <Box className="eztrade__notification">
          <Tooltip title="Thông báo">
        
            <IconButton
              id="basic-button"
              aria-controls={openNoti ? "basic-menu1" : undefined}
              aria-haspopup="true"
              aria-expanded={openNoti ? "true" : undefined}
              onClick={handleClickNoti}
              style={{position: "relative"}}
            >
               {/* <div className="bell__button" id="bellButton">
            <div className="bell__button__click" style={{paddingTop: '7px'}}>
              <i className="fa fa-bell" aria-hidden="true" title="Thông báo" />
              <span className="bell_count hidden__elem" id="bellCount" style={{display: 'flex'}}><span className="noti__value" id="notificationsCountValue">6</span></span>
              <div id="tooltip-exchange__noti" style={{zIndex: 5, position: 'absolute', right: '-59px', top: '31px', display: 'block'}}>
                <div style={{zIndex: 4, position: 'relative'}} id="spnTextTooltip">
                  <span style={{background: '#2371af !important', color: 'white', padding: '8px 5px', borderRadius: '5px', boxShadow: '3px -2px 8px 1px #888'}}>
                    Bật để nhận thông báo
                  </span>
                  <div id="selectSrvdiv" className="gb_srv" style={{top: '-3px', left: '56px', borderBottomColor: '#2371af'}} />
                </div>
              </div>
            </div>
          </div> */}
       
              <Box
                id="selectSrvdiv"
                className="gb_srvNoti "
                style={{ display: anchorEl ? "block" : "none" }}
              ></Box>   
              <i className="fa fa-bell text-large text-iconNoti" aria-hidden="true"></i>
              <span className="bell_count hidden__elem flex absolute top-0.5 right-1" id="bellCount" style={{ display: anchorEl ? "none" :"" }}><span className="noti__value" id="notificationsCountValue">6</span></span>
              <div id="tooltip-exchange" style={{zIndex: 5, position: 'absolute', right: '-52px', top: '31px', display: !anchorEl ? "none" :""}}>
        <div style={{zIndex: 4, position: 'relative'}} id="spnTextTooltip" className='text-spnTitlePanelBottom'>
          <span className='bg-spnTitlePanelBottom text-13px' style={{color: 'white', padding: '8px 5px', borderRadius: '5px', boxShadow: '3px -2px 8px 1px #888'}}>
            Bật để nhận thông báo
          </span>
          <div id="selectSrvdiv" className="gb_srv" style={{top: '-2px', left: '66px', borderBottomColor: '#2371af'}} />
        </div>
      </div>
            </IconButton>
          </Tooltip>
          <Popover
            id="basic-menu1"
            anchorEl={anchorEl}
            open={openPopupNoti}
            onClose={handleCloseNoti}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              style: { width: "410px", top: "40px !important" },
            }}
          >
            <div
              className="notification__togglelyout"
              id="notiLayoutToggle"
              style={{ display: "block" }}
            >
              <div
                id="selectSrvdiv"
                className="gb_srv"
                style={{ top: "-10px", right: "137px", left: "unset" }}
              />
              <div className="clearfix" />
              <div className="notification__togglelyout__header">
                <div className="clearfix noti__header h-10">
                  <div className="rfloat">
                    <div className="header__action__floatR"></div>
                  </div>
                  <div className="flex justify-between ">
                    <h4
                      className="header__title mt-2 mb-2.5 float-left font-semibold"
                      aria-hidden="true"
                    >
                      Thông báo
                    </h4>
                    <div className="btn__switchNoti mt-1.5 mb-2.5 font-semibold float-right">
                      <div className="groupSwitch">
                        <span>Bật/tắt thông báo: </span>
                        <label className="switch switchNoti" id="switchLabel">
                          <input type="checkbox" id="ckNotification" />
                          <span className="slider round" id="spnNoti">
                            <span className="on">Bật</span>
                            <span className="off">Tắt</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="notification__content">
                <div
                  className="content__area scrollable__area"
                  id="scrollpagination"
                >
                  <ul id="contentLoader">
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                          {/* <img src={TinvestmentSVG} alt="oke"/> */}
                          <ReportIconSVG/>
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Báo cáo phân tích kỹ thuật mã TLH
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã TLH
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã TLH
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="https://ezadvisorselect.fpts.com.vn/InvestmentAdvisoryReport/InvestmentAdvisoryReportDetail?idRp=29-MAR-2023%2020:07:32.259394000"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="30/3/2023 7:37">
                            6 giờ
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                            <img src={notificationImage} />
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Bản tin chứng khoán
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới quý khách hàng Bản tin chứng
                                khoán ngày 29/03/2023
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới quý khách hàng Bản tin chứng
                                khoán ngày 29/03/2023
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="http://file.fpts.com.vn/FileStore2/File/2023/03/29/FIA20230329_be974c65.pdf"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="29/3/2023 17:05">
                            21 giờ
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                            <img src={notificationImage} />
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Bản tin chứng khoán
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới quý khách hàng bản tin chứng
                                khoán ngày 28/03/2023
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới quý khách hàng bản tin chứng
                                khoán ngày 28/03/2023
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="http://file.fpts.com.vn/FileStore2/File/2023/03/28/FIA20230328_ca59af02.pdf"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="28/3/2023 17:17">
                            1 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                           <ReportIconSVG/>
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Báo cáo phân tích kỹ thuật mã IDC
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã IDC
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã IDC
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="https://ezadvisorselect.fpts.com.vn/InvestmentAdvisoryReport/InvestmentAdvisoryReportDetail?idRp=27-MAR-2023%2020:45:50.208477000"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="28/3/2023 7:30">
                            2 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                           <ReportIconSVG/>
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Báo cáo phân tích kỹ thuật mã VCG
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã VCG
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã VCG
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="https://ezadvisorselect.fpts.com.vn/InvestmentAdvisoryReport/InvestmentAdvisoryReportDetail?idRp=27-MAR-2023%2021:41:50.031253000"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="28/3/2023 7:30">
                            2 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                            <img src={notificationImage} />
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Bản tin chứng khoán
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới quý khách hàng bản tin chứng
                                khoán ngày 27/03/2023
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới quý khách hàng bản tin chứng
                                khoán ngày 27/03/2023
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="http://file.fpts.com.vn/FileStore2/File/2023/03/27/FIA20230327_c9be9a2b.pdf"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="27/3/2023 17:36">
                            2 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                            <img src={notificationImage} />
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Hội thảo Triển vọng và Chiến lược đầu tư 2023
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới khách hàng link tham dự hội
                                thảo trực tuyến Triển vọng và Chiến lược đầu tư
                                2023
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới khách hàng link tham dự hội
                                thảo trực tuyến Triển vọng và Chiến lược đầu tư
                                2023
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="https://us06web.zoom.us/j/81213947166?pwd=RjZOeGRMcVV4QWN6OUR1THZ1UTBVQT09"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="25/3/2023 8:41">
                            5 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                           <ReportIconSVG/>
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Báo cáo phân tích kỹ thuật mã IJC
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã IJC.
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới khách hàng Báo cáo phân tích kỹ
                                thuật mã IJC.
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="https://ezadvisorselect.fpts.com.vn/InvestmentAdvisoryReport/InvestmentAdvisoryReportDetail?idRp=24-MAR-2023%2017:33:45.846774000"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="24/3/2023 17:57">
                            5 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                            <img src={notificationImage} />
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Bản tin chứng khoán
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS xin gửi tới quý khách hàng bản tin chứng
                                khoán ngày 24/03/2023
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS xin gửi tới quý khách hàng bản tin chứng
                                khoán ngày 24/03/2023
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="http://file.fpts.com.vn/FileStore2/File/2023/03/24/FIA20230324_3ee0601a.pdf"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="24/3/2023 17:30">
                            5 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="anchorContainer">
                        <div className="content__loadmore">
                          <div className="img__content__lfloat">
                            <img src={notificationImage} />
                          </div>
                          <div className="content__detail">
                            <div className="con__detail__title">
                              <span className="content__detail__title">
                                Livestream Hội thảo "Triển vọng đầu tư cổ phiếu
                                Dầu khí" - 26.03.2023
                                <span />
                              </span>
                            </div>
                            <div className="content__detail__content content__detail__content__short">
                              <span className="con__detail__con contentLangS">
                                FPTS kính mời Quý khách tham dự Livestream Hội
                                thảo “Triển vọng đầu tư cổ phiếu Dầu khí: Cơ hội
                                từ đơn giá dịch vụ cao và đón đầu đại dự án lớn
                                chuẩn bị khởi công” trên Youtube vào lúc 8h30 –
                                Chủ Nhật (26.03.2023). Quý khách vui lòng nhấn
                                vào đường dẫn bên cạnh để tham dự buổi thuyết
                                trình.
                              </span>
                              <span
                                className="con__detail__con contentLangM"
                                style={{ display: "none" }}
                              >
                                FPTS kính mời Quý khách tham dự Livestream Hội
                                thảo “Triển vọng đầu tư cổ phiếu Dầu khí: Cơ hội
                                từ đơn giá dịch vụ cao và đón đầu đại dự án lớn
                                chuẩn bị khởi công” trên Youtube vào lúc 8h30 –
                                Chủ Nhật (26.03.2023). Quý khách vui lòng nhấn
                                vào đường dẫn bên cạnh để tham dự buổi thuyết
                                trình.
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="content__timestamp">
                          <div
                            className="content__loaddetails"
                            id="contentLoadMore"
                          >
                            <a
                              href="https://www.youtube.com/watch?v=rB6fGNeDeys"
                              target="_blank"
                            >
                              <img src={arrowRightImage} />
                            </a>
                          </div>
                          <span className="timer" title="24/3/2023 14:04">
                            6 ngày
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div
                    id="loading"
                    style={{ display: "none", textAlign: "center" }}
                  >
                    <img
                      src="/images/Loadinggif.gif"
                      style={{ width: "32px", height: "32px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="notification__seemore h-40 flex justify-center">
                <a href="/notifications" target="_blank" className="flex">
                  <span className="text-textNoti mx-auto my-auto">
                    Xem tất cả
                  </span>
                </a>
              </div>
            </div>
          </Popover>
        </Box>
  )
}

export default React.memo(NotiHeader)