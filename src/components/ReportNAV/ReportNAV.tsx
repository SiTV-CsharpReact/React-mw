import React, { useEffect, useState } from "react";
import TitlePage from "../../pages/Layout/TitlePage";
import axios from "axios";
import "./style.ReportNAV.scss";
import execlImg from "../../images/excel.png";
import pdfImg from "../../images/pdf.png";
import { formatNumber } from "../../utils/util";
import ReportNAVItem from "./ReportNAVItem";
import LayoutPage from "../../pages/Layout/LayoutPage";

const ReportNAV = () => {
  const [data, setData] = useState<any>({});
  const [mouse,setMouse] = useState({ind: 0,status: false})

  const hanldeMouseOver = (ind:number)=> {
    if(ind === 1){
        setMouse({ind:1,status:true});
    }
    if(ind === 2){
        setMouse({ind:2,status:true});
    }
  };
  const handleMouseLeave = (ind:number)=>{
    if(ind === 1){
        setMouse({ind:1,status:false});
    }
    if(ind === 2){
        setMouse({ind:2,status:false});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5678/data");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <LayoutPage
      content="Báo cáo biến động tài sản ròng"
      PageTitle="Báo cáo biến động tài sản ròng"          
    >
      <div className="body__content">
        <div className="body__content_reportNAV">
          <div className="view_BCBDTSR">
            <div className="body__content__trade__log">
              <div className="report__tabcondition my-5 mx-0 flex w-full justify-between float-right">
                <div className="body__content__BTCS__header mt-[10px]">
                  {data?.Data?.Table1?.map((item: any) => (
                    <span
                      className="title_content_BTCSZ_update_time text font-[Arial] italic"
                      key={item?.ASTATUS}
                      style={{ color: "red" }}
                    >
                      Dữ liệu cập nhật gần nhất:{" "}
                      <span id="spnTimeUpdate">{item?.TIME}</span>
                    </span>
                  ))}
                </div>
                <div id="divCondition">
                  <table className="bg-transparent">
                    <tbody>
                      <tr>
                        <td className="!border-0 relative">
                          <span className="lblTuNgay">Đầu kỳ</span>
                          <select
                            name="cboSymbol"
                            id="cboBeginning"
                            className="form-control"
                          >
                            <option value="31/03/2023">Quý 2/2023</option>
                            <option value="31/12/2022">Quý 1/2023</option>
                          </select>
                          <span className="absolute top-[5px] text-[#555555] text-[7.8pt] right-[10px]"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </td>
                        <td className="!border-0 relative">
                          <span className="lblDenNgay">Cuối kỳ</span>
                          <select
                            name="cboSymbol"
                            id="cboEndOfTern"
                            className="form-control"
                          >
                            <option value="23/06/2023" id="dateEnd">
                              23/06/2023
                            </option>
                            <option value="31/03/2023">Quý 2/2023</option>
                          </select>
                          <span className="absolute top-[5px] text-[#555555] text-[7.8pt] right-[10px]"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                        </td>
                        <td className="L P5 !border-0">
                          <input
                            type="submit"
                            name="btnUpdate"
                            value={"Cập nhật"}
                            id="btnUpdate"
                            className="btn mt-[1px]"
                          />
                          &nbsp;{" "}
                        </td>
                        <td className="L P5 !border-0" style={{verticalAlign: 'middle'}}>
                          <div className="lineBtn lineBtnTop" id="Panel1">
                            <input
                              type="image"
                              src={execlImg}
                              alt=""
                              className="!h-[25px] w-[25px]"
                            />
                            &nbsp;{" "}
                            <input
                              type="image"
                              src={pdfImg}
                              alt=""
                              className="!h-[25px] w-[25px]"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="divGrid">
                <p className="hidden text-[25px] text-normalText">
                  Báo cáo biến động tài sản ròng
                </p>
                <div
                  className="asset__report__BCLL__tbl report__title pt-3"
                  id="BCBDTSR__tbl"
                >
                  <div className="text_title_NAV float-left font-bold text-base text-hoverKL">
                    A. Tài sản ròng - NAV (I + II + III)
                  </div>
                  <div className="float-right italic">Đơn vị: VNĐ</div>
                  <table className="w-full my-0 mx-auto text-center border-collapse tableAR">
                    <thead>
                      <tr>
                        <td style={{ width: "14.7%" }}></td>
                        <td style={{ width: "5.8%" }}>
                          Đầu kỳ{" "}
                          <span className="inline-block ml-[1px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right text-hoverKL" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                            </svg>
                          </span>
                        </td>
                        <td style={{ width: "7.5%" }}>
                          Cuối kỳ {" "}
                          <span className="inline-block ml-[1px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right text-hoverKL" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                            </svg>
                          </span>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="italic font-bold !bg-white">
                        <td className="!text-left !text-sm text-hoverKL bg-white italic">I. Tiền</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.ATOTAL_CASH)} bold={true} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Tiền trong tài khoản </td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.ACASH_AMOUNT)} bold={false}/>
                        ))}
                      </tr>
                      <tr>
                        <td className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Tiền bán chở về</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.AREC_CASH_SELL)} bold={false} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Cổ tức bằng tiền chở về</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.ARE_CASH_DEVIDEND)} bold={false} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Tiền chở về khác</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.ARE_CASH_OTHER)} bold={false} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Tiền gửi, tiền cho vay</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.ASAVINGTOTAL)} bold={false} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!text-left !text-sm text-hoverKL bg-white italic relative">II. Chứng khoán {" "}
                            <i className="fa fa-info-circle !text-sm" aria-hidden="true" onMouseOver={()=>hanldeMouseOver(1)} onMouseLeave={() => handleMouseLeave(1)}></i>
                            {mouse.ind === 1 && mouse.status && <label id='noteShow2' className={mouse ? 'block':'hidden'}>Giá thị trường của <br/> tổng KL chứng khoán</label> }
                        </td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.AMARKET_VALUE)} bold={true} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!text-left !text-sm text-hoverKL bg-white italic">III. Dư nợ vay ký quỹ</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.AREMAIN_DEBT)} bold={true} />
                        ))}
                      </tr>
                      <tr>
                        <td className="!text-left text-xs !text-black">TỔNG</td>
                        {data?.Data?.Table?.map((item: any) => (
                          <ReportNAVItem key={item?.STAGE} data={formatNumber(item.ANAV)} bold={true} background="#ececec" />
                        ))}
                      </tr>
                    </tbody>
                    <tbody className="block h-[10px]"></tbody>
                    <tbody>
                        <tr className="font-bold">
                            <td colSpan={2} className="!text-left !text-base text-hoverKL !bg-white !border-0 !p-0">B. Phát sinh ròng làm thay đổi vốn ban đầu (I + II)</td>
                        </tr>
                    </tbody>
                    <tbody className="mt-[50px]">
                        <tr>
                            <td colSpan={2}></td>
                            <td className="!text-right">Giá trị</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="cursor-pointer !bg-white !text-left text-hoverKL !text-sm italic">I. Phát sinh tiền{" "}
                              <span className="inline-block ml-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right text-hoverKL" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>
                              </span>
                            </td>
                            <td className="!text-right !bg-white italic">0</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Phát sinh tăng</td>
                            <td className="!text-right !bg-white">0</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Phát sinh giảm</td>
                            <td className="!text-right !bg-white">0</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="cursor-pointer !bg-white !text-left text-hoverKL !text-sm italic">II. Phát sinh chứng khoán{" "}
                              <span className="inline-block ml-[1px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right text-hoverKL" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>
                              </span>
                            </td>
                            <td className="!text-right !bg-white italic">0</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Phát sinh tăng</td>
                            <td className="!text-right !bg-white">0</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="!pl-5 !text-left text-xs text-black !font-normal bg-white">Phát sinh giảm</td>
                            <td className="!text-right !bg-white">0</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="!text-left text-xs !text-black">TỔNG</td>
                            <td className="!text-right !text-black">0</td>
                        </tr>
                    </tbody>
                    <tbody className="block h-[15px]"></tbody>
                    <tbody>
                        <tr>
                            <td colSpan={2} className="!text-left !text-base text-hoverKL !bg-white !border-0 !p-0 relative">C. Biến động NAV {" "}
                                <i className="fa fa-info-circle !text-base" aria-hidden="true" onMouseOver={() => hanldeMouseOver(2)} onMouseLeave={() => handleMouseLeave(2)}></i>
                                {mouse.ind === 2 && mouse.status && <label id='noteShow3' className={mouse ? 'block':'hidden'}>= NAV cuối kỳ - NAV đầu kỳ <br/> - Phát sinh ròng</label> }
                            </td>
                            <td className="!text-right !border-0 !pr-0 !bg-white !text-[#00b050]">{formatNumber(595107)}</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="divTextNote">
                    <b className="not-italic text-hoverKL"> Ghi chú:</b>
                    <ul className="mb-[10px]">
                        <li>
                            1. Báo cáo chỉ mang tính chất tham khảo, không có ý nghĩa quyết định đầu tư và được tính toán theo phương pháp của FPTS. Quý khách tham khảo cách tính của FPTS.
                            <a
                            href="/report/upload/CongThucTinhToanBCTS.pdf"
                            target="_blank"
                            className="underline text-normalText"
                            >
                            tại đây
                            </a>
                        </li>
                        <li>
                            2. Số liệu của quý hiện hành sẽ được cập nhật vào cuối mỗi ngày, sau khi FPTS hạch toán xong các giao dịch phát sinh.
                        </li>
                        <li>
                            3. Phát sinh ròng làm thay đổi vốn ban đầu:
                            <ul className="pl-10">
                                <li>- Phát sinh tiền: bao gồm các loại sau (tương ứng với loại phát sinh tăng/giảm)
                                    <ul className="pl-10">
                                        <li>+ Nộp/rút, chuyền tiền</li>
                                    </ul>
                                </li>
                                <li>- Phát sinh tiền: bao gồm các loại sau (tương ứng với loại phát sinh tăng/giảm)
                                    <ul className="pl-10">
                                        <li>+ Lưu ký/Rút lưu ký chứng khoán</li>
                                        <li>+ Nhận chuyển khoản/Chuyển khoản chứng khoán</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default ReportNAV;
