import React, { useEffect, useState, useMemo } from "react";

import FromAction from "../FromAction/FromAction";
import SelectAction from "../FromAction/SelectAction";
import InputDateAction from "../FromAction/InputDateAction";
import { SanGD, MaCK, TTlenh, TTXX, getDateTime } from "../helper/DateTime";

import LayoutPage from "../Layout/LayoutPage";
import ExcelPdfAction from "../FromAction/ExcelPdfAction";
import { useAppDispatch } from "../../store/configureStore";
import { getdata } from "./ResportSlice";
let { tuNgay, denNgay } = getDateTime();
type TypeValue = {
  LoaiLenh: any;
  MaCK: any;
  tuNgay: any;
  denNgay: any;
};
const HistoryMatching = () => {
  const [data, setData] = useState<TypeValue>({
    LoaiLenh: "",
    MaCK: "",
    tuNgay: "",
    denNgay: "",
  });
  const ChangeLoaiLenh = (e: any) => {
    setData({ ...data, LoaiLenh: e });
  };
  const ChangeMaCK = (e: any) => {
    setData({ ...data, MaCK: e });
  };
  const ChangeTuNgay = (e: any) => {
    setData({ ...data, tuNgay: e });
  };
  const ChangeDenNgay = (e: any) => {
    setData({ ...data, denNgay: e });
  };
  const [result, setResult] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showIconB, setShowIcontB] = useState<any>(false);
  const [showIconM, setShowIcontM] = useState<any>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // const handleData = async () => {
    //   const response = await fetch("http://localhost:2000/data");
    //   const jsonData = await response.json();
    //   setResult(jsonData);
    // };
    // handleData();
    dispatch(getdata()).finally(() => setIsLoading(false));
  }, []);
  const handleSHowAll = () => {
    setShow(!show);
  };
  const handleshowIconB = (e: any) => {
    setShowIcontB(e);
  };
  const handleshowIconM = (e: any) => {
    setShowIcontM(e);
  };

  // const dataConvert = useMemo(() => {
  //   console.log(result)
  //   if(!result.length) return [];

  //   return result.reduce((prev: any,current:any) => {
  //     console.log(current)
  //     return {
  //       ...prev,
  //     }
  //   })
  // },[]);
  // console.log("result", dataConvert);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LayoutPage content="Lịch sử khớp lệnh" PageTitle="Lịch sử khớp lệnh">
        <div className="ParentHeaderPage">
          <div className="HeaderTextShow" onClick={handleSHowAll}>
            {show ? "Xem rút gọn" : "Xem đầy đủ "}
          </div>
          <div className="HeaderPage">
            <div>
              <FromAction data={data}>
                <SelectAction
                  Title="Loại Lệnh"
                  Options={SanGD}
                  ChangeFuncion={ChangeLoaiLenh}
                />
                <SelectAction
                  Title="Mã CK"
                  Options={MaCK}
                  ChangeFuncion={ChangeMaCK}
                />
                <InputDateAction
                  Title="Từ Ngày"
                  date={tuNgay}
                  ChangeFuncion={ChangeTuNgay}
                />
                <InputDateAction
                  Title="Đến Ngày"
                  date={denNgay}
                  ChangeFuncion={ChangeDenNgay}
                />
              </FromAction>
            </div>
            <div className="fileExcelPDF">
              <ExcelPdfAction />
            </div>
          </div>
        </div>
        <div className="contentActionGD">
          <table className="TablePage">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Mua/Bán</th>
                <th>
                  CK
                  <i
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    title="Bấm vào từng dòng để xem chi tiết lệnh khớp – Bấm vào cả dòng mã đều xổ ra chi tiết"
                  ></i>
                </th>
                <th>KL Khớp</th>
                <th>Giá khớp</th>
                <th>Giá trị</th>
                <th>
                  Thuế TN từ Chuyển <br /> nhượng chứng khoán
                </th>
                <th>
                  Thuế TN từ Đầu tư <br /> vốn
                </th>
                <th>Phí </th>
              </tr>
            </thead>
            <tbody>
            
              <tr>
                <td rowSpan={10}>Ngày tháng 29/05/2023 </td> 
              </tr>
              <tr>
                <td rowSpan={3}>Mua</td>
              </tr>
              <tr>
                <td> AAV</td> {/* mã chứng khoán  */}
                <td>CK</td>
                <td>KL Khớp</td>
                <td>Giá khớp</td>
                <td>Giá trị</td>
                <td> Thuế TN từ Chuyển</td>
                <td>Thuế TN từ Đầu tư vốn</td>
                <td> phí</td>
              </tr>
              <tr>
                <td> </td>
                <td>CK</td>
                <td>KL Khớp</td>
                <td>Giá khớp</td>
                <td>Giá trị</td>
                <td> Thuế TN từ Chuyển</td>
                <td>Thuế TN từ Đầu tư vốn</td>
                <td> phí</td>
              </tr>
              <tr>
                <td colSpan={5} align="center"> tổng mua</td>
                <td align="right">4,190,000	</td>
                <td align="right">0</td>
                <td align="right">0</td>
                <td align="right">0</td>
               
              </tr>
              <tr>
                <td rowSpan={3}> Bán </td>
                <td>ABC</td>  {/*  mã chứng khoán  */}
                <td>CK</td>
                <td>KL Khớp</td>
                <td>Giá khớp</td>
                <td>Giá trị</td>
                <td> Thuế TN từ Chuyển</td>
                <td>Thuế TN từ Đầu tư vốn</td>
                <td> phí</td>
              </tr>
              <tr>
                <td> </td>
                <td>CK</td>
                <td>KL Khớp</td>
                <td>Giá khớp</td>
                <td>Giá trị</td>
                <td> Thuế TN từ Chuyển</td>
                <td>Thuế TN từ Đầu tư vốn</td>
                <td> phí</td>
              </tr>
              <tr>
                <td> </td>
                <td>CK</td>
                <td>KL Khớp</td>
                <td>Giá khớp</td>
                <td>Giá trị</td>
                <td> Thuế TN từ Chuyển</td>
                <td>Thuế TN từ Đầu tư vốn</td>
                <td> phí</td>
              </tr>
              <tr>
                <td colSpan={5} align="center"> tổng Bán </td>
                <td align="right" >4,190,000	</td>
                <td align="right">0</td>
                <td align="right">0</td>
                <td align="right">0</td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </LayoutPage>
    </>
  );
};
export default HistoryMatching;
