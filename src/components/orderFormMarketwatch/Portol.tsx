import React, { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { dispatchData } from './data';


export default function Protal({ popup = false, handelClosed = () => { } }) {
     const data = [
        ["058C222210", "BCC", "30", "HNX.LISTED", "1000000000"],
        ["058C222210", "BVS", "30", "HNX.LISTED", "1000000000"],
        ["058C222210", "DHT", "30", "HNX.LISTED", "1000000000"], [
            "058C222210",
            "AAA",
            "40",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "ACB",
            "50",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "ANV",
            "30",
            "HSX",
            "60000"
        ],
        [
            "058C222210",
            "BCM",
            "30",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BFC",
            "50",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BIC",
            "40",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BID",
            "50",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BMI",
            "50",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BMP",
            "50",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BSI",
            "30",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "BTP",
            "30",
            "HSX",
            "1000000000"
        ],

        [
            "058C222210",
            "TYA",
            "20",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "UIC",
            "30",
            "HSX",
            "1000000000"
        ],
        [
            "058C222210",
            "VCB",
            "50",
            "HSX",
            "1000000000"
        ],
    ];
    const [dataCheck, setDataCheck] = useState("");
    const [dataCheckSan, setDataCheckSan] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [dataKiquy, setDataKiquy] = useState([])
   

    const mappedData: any = data.map((item) => {
        return {
            kiquy: item[0],
            values: item.slice(1)
        };
    });
    useEffect(() => {
        setDataKiquy(mappedData);
    }, []);
    const dispatch = useAppDispatch();
    const handleShow = (dataShow: any) => {
        dispatch(dispatchData(dataShow));
        handelClosed()
    };

    if (typeof document === "undefined") return <div className='model'></div>
    const bodyElement = document.querySelector('body');
    if (!bodyElement) {
        return null;
    }
    const handleChange = (e: any) => {
        setDataCheck(e.target.value.toUpperCase());
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const results  = mappedData.filter((item: any) =>
            item.values[0].toUpperCase().includes(dataCheck)
        );
        setFilteredData(results);
    }, [dataCheck]);
      const handleChangeSan = (e: any) => {
        setDataCheckSan(e.target.value.toUpperCase());
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const results  = mappedData.filter((item: any) =>
            item.values[2].toUpperCase().includes(dataCheckSan)
        );
        setFilteredData(results);
    }, [dataCheckSan])
    return ReactDOM.createPortal(
        <div className={`model fixed inset-0 z-50 flex items-center justify-center p-5 ${popup ? "" : "invisible opacity-0"}`} >
            <div onClick={handelClosed} className="absolute inset-0 bg-black overlay bg-opacity-40"  >
            </div>

            {/*  */}
            <div className="model-content bg-white relative z-10 top-[20px]  left-[0px]">
                <div style={{ border: "1px solid #888" }} className=" top-[0px]  !bg-white w-[420px]">
                    <div className="!bg-[#034e94]">
                        <p className="text-white font-medium py-2.5 text-center uppercase font-Helvetica">Danh mục chứng khoán ký quỹ</p>
                        <span onClick={handelClosed} style={{ lineHeight: "39px" }} className='text-[#fff] right-[10px] cursor-pointer top-0 text-[35px] rounded-[20px] h-[39px]  absolute font-bold'>×</span>
                    </div>
                    {/*  */}
                    <div className="h-[500px] !bg-white">
                        {/*  */}


                        <div className='flex justify-around mx-5 mt-2'>
                            <input onChange={handleChange} name="keyword" value={dataCheck.toUpperCase()} autoFocus style={{ border: "1px solid #ccc" }} type="text" placeholder="Mã chứng khoán" className='w-[145px] text-[13px] h-[26px] text-left rounded-[4px] bg-[#ECECEC]' />
                            <input onChange={handleChangeSan} name="san" value={dataCheckSan} autoFocus style={{ border: "1px solid #ccc" }} type="text" placeholder="Sàn niêm yết" className='w-[145px] h-[26px] text-[13px] text-left rounded-[4px] bg-[#ECECEC]' />
                        </div>
                        {/* style={{overflowY: "scroll",overflowX: "scroll"}} */}
                        <div className='mx-auto '>
                            <div className='w-[400px]'>
                                <table className='mx-2 mt-3'>
                                    <thead className='bg-[#ECECEC]'>
                                        <tr style={{ border: "1px solid #ccc" }}>
                                            <th style={{ border: "1px solid #ccc" }} className='text-[12px]'>Mã CK</th>
                                            <th style={{ border: "1px solid #ccc" }} className='text-[12px]'>Sàn GD</th>
                                            <th style={{ border: "1px solid #ccc" }} className='text-[12px]'>Tỉ lệ(%)</th>
                                            <th style={{ border: "1px solid #ccc" }} className='text-[12px]'>Chọn</th>
                                            <th style={{ border: "1px solid #ccc" }} className='text-[12px]'>Giá trần tính SM(*)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.length > 0 && filteredData.map((items: any, index: any) => {
                                            return (
                                                <tr key={index} className='hover:bg-[#EEFEED]' style={{ border: "1px solid #ccc" }}>
                                                    <td style={{ border: "1px solid #ccc" }} className='text-center !font-bold'>{items.values[0]}</td>
                                                    <td style={{ border: "1px solid #ccc" }} className='text-center'>{items.values[2]}</td>
                                                    <td style={{ border: "1px solid #ccc" }} className='pr-2 text-right'>{items.values[1]}</td>
                                                    <td onClick={() => handleShow({ ma: items.values[0], San: items.values[2], TLV: items.values[1] })} style={{ border: "1px solid #ccc" }} className='text-center text-[#337ab7] cursor-pointer hover:underline'>chọn</td>
                                                    <td style={{ border: "1px solid #ccc", backgroundColor: items.values && items.values.length > 0 ? "" : "#ECECEC" }} className='text-center'>{items.values[3]}</td>
                                                </tr>
                                            );
                                        })}



                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <p className='mx-auto mt-3 font-bold text-center w-fit'>(*) Giá trần tính sức mua: Mức giá tối đa FPTS chấp <br /> nhận để tính sức mua với mã đó</p>

                    </div>

                </div>

            </div>

        </div>,

        bodyElement

    );

}