import React from 'react'
import LayoutPage from '../Layout/LayoutPage'

const ConditionalOderText = () => {
    return (
        <>
            <LayoutPage
                PageTitle="Đặt lệnh điều kiện"
                content="Đặt lệnh điều kiện"
                Icon={true}
                TitleHover="Hướng dẫn sử dụng EzStoploss"
                LinkPage="http://www.fpts.com.vn/san-pham-dich-vu/giao-dich-chung-khoan/le-nh-die-u-kie-n/"
            >
                <div>
                    <h2 className="text-[24px] text-center pt-[29px] font-bold">
                        <span className='text-[#134C7D]'>CẬP NHẬT</span> <span className='text-[#F47A34]'>TÍNH NĂNG MỚI</span> <span className='text-[#134C7D]'>: KÍCH HOẠT LỆNH ĐIỀU KIỆN</span> <span className='text-[#F47A34]'>NGAY TRONG PHIÊN</span>
                    </h2>

                    <div >
                        <table style={{border:" 1px solid rgba(0,0,0,.2)"}} className='w-[1000px] mx-auto border h-[122px]' >
                            {/* <thead>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                </tr>
                           </thead> */}
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td colSpan={2} className='text-[12px]'>ĐK kích hoạt: Khi giá khớp gần nhất	</td>
                                    <td colSpan={2} className='text-[12px]'>ĐK kích hoạt: Khi giá khớp gần nhất	</td>
                                    <td></td>
                                </tr>
                                <tr className='mr-[7px]'>
                                    <td>
                                          <select style={{ border: " 1px solid #ccc" }} className='!w-[90px] text-[12px] !pl-[5px] h-[28px] !p-0 rounded-[4px]'  >
                                            <option value="">Lệnh đặt</option>
                                            <option value="BUY">Mua</option>
                                            <option value="SELL">Bán</option>
                                        </select>
                                    </td>

                                    <td>
                                   <input style={{ border: " 1px solid #ccc" }} placeholder='Chứng khoán' className='!p-0 !pl-[5px] text-[#555] w-[90px] h-[28px] text-[12px] rounded-[4px]' type="text" maxLength={12} />
                                    </td>
        
                                    <td>
                                          <select disabled style={{ border: " 1px solid #ccc" }} className='!w-[90px] !pl-[5px] rounded-[4px] text-[12px] h-[28px] !p-0 bg-[#EEEEEE]'  >
                                            <option value="">Lệnh đặt</option>
                                            <option value="BUY">Mua</option>
                                            <option value="SELL">Bán</option>
                                        </select>
                                    </td>
                                      <td>
                                      <input style={{ border: " 1px solid #ccc" }} placeholder='Số lượng' className='!p-0 w-[90px] h-[28px] text-[12px] rounded-[4px]' type="text" maxLength={12} />

                                    </td>
                                      <td>
                                          <select style={{ border: " 1px solid #ccc" }} className='!w-[90px] text-[12px] h-[28px] !p-0 '  >
                                            <option value="">Lệnh đặt</option>
                                            <option value="BUY">Mua</option>
                                            <option value="SELL">Bán</option>
                                        </select>
                                    </td>
                                      <td>
                                          <select style={{ border: " 1px solid #ccc" }} className='!w-[90px] text-[12px] h-[28px] !p-0 '  >
                                            <option value="">Lệnh đặt</option>
                                            <option value="BUY">Mua</option>
                                            <option value="SELL">Bán</option>
                                        </select>
                                    </td>
                                      <td>
                                          <select style={{ border: " 1px solid #ccc" }} className='!w-[90px] text-[12px] h-[28px] !p-0 '  >
                                            <option value="">Lệnh đặt</option>
                                            <option value="BUY">Mua</option>
                                            <option value="SELL">Bán</option>
                                        </select>
                                    </td>
                                      <td>
                                          <select style={{ border: " 1px solid #ccc" }} className='!w-[90px] text-[12px] h-[28px] !p-0 '  >
                                            <option value="">Lệnh đặt</option>
                                            <option value="BUY">Mua</option>
                                            <option value="SELL">Bán</option>
                                        </select>
                                    </td>
                                      <td>
                                        <input style={{ border: "1px solid #2371af"}} type="button" value="Ghi" className='rounded-[5px] w-[58px] p-[5px]  bg-white hover:text-white hover:bg-[#2371af]'/>
                                        <input style={{ border: "1px solid #2371af"}} type="button" value="Làm lại" className='rounded-[5px] w-[58px] p-[5px] bg-white hover:text-white hover:bg-[#2371af] ml-[3px]'/>
                                        
                                    </td>

                                    
                                </tr>
                            </tbody>
                        </table>
                </div>
                </div>
            </LayoutPage>
        </>
    )
}

export default ConditionalOderText