import { g_ARRAY_COLOR_CLASS, g_ID_TD_STAT_CONTROLCODE, g_arrHAMarketStatus, g_arrHOMarketStatus, g_arrUPMarketStatus } from "../configs/app.config";
export function formatNumbertoDecimal(number:any) {
  const decimalPart = number % 1;
  if (decimalPart !== 0) {
    return number.toFixed(2);
  } else {
    return number.toString();
  }
}
export function formatNumber(number: any) {
  if (!number || number === 0 || number === "0") return 0; // hoac ''
  else return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export function formatNumberMarket(number: any) {
  if (!number || number === 0 || number === "0") return ""; // hoac ''
  else return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export const formatNumberPhanTram = (number: any)=>{
  var roundedNumber = Math.round(number * 100) / 100;
  return roundedNumber
}
export function tinhGiaTC(tc: number, price: number) {
  const diff = price - tc;
  //if(isFinite(diff)) return "";
  if (isNaN(diff)) return "";

  const percent = (diff / tc) * 100;
  let strPercent = percent === 0 ? "" : checkZeroLast(percent, 1) + " %";
  if (tc === 0) {
    strPercent = "";
  }
  //console.log(strPercent)
  if (percent === 100) return "";
  if (percent === -100) return "";
  //if(isFinite(percent)) return "";
  return strPercent;
}
export function tinhGiaCT(tc: number, price: number) {
  const diff = price - tc;
  //if(isFinite(diff)) return "";
  if (isNaN(diff)) return "";
  let strPercent = diff === 0 ? "" : checkZeroLast(diff, 2);
  if (Number(price) === 0) strPercent = "";
  //   const percent = (diff / tc) * 100;
  //   const strPercent = percent === 0 ? "" :  checkZeroLast(percent,1) +" %";
  //   //console.log(strPercent)
  //   if (percent ===100) return "";
  //  if (percent === -100) return "";
  //  //if(isFinite(percent)) return "";
  return strPercent;
}
const checkZeroLast = (value: number, numberFixed?: number) => {
  if (!numberFixed) {
    numberFixed = 2;
  }
  const strValue = value.toFixed(numberFixed);
  const arrValue = strValue.split(".");
  const elArrLast = arrValue[1];
  if (elArrLast) {
    if (elArrLast.endsWith("0")) {
      if (numberFixed === 2) {
        if (elArrLast === "00") {
          return value.toFixed(0);
        } else {
          return value.toFixed(1);
        }
      }
      if (numberFixed === 1) {
        return value.toFixed(0);
      }
    }
  }
  return strValue;
};
export const setColorMarket = (
  tc: number,
  price: number,
  tran: number,
  san: number
) => {
  let Color = "text-black";
  // if(price=== san){
  //     Color="text-blue"
  // }
  if (Number(price) === 0) {
    Color = "text-white";
  } else if (Number(price) === Number(san)) {
    Color = "text-blue";
  } else if (Number(price) === Number(tran)) {
    Color = "text-violet";
  } else if (Number(price) === Number(tc)) {
    Color = "text-yellow";
  } else if (Number(price) > Number(tc)) {
    Color = "text-green";
  } else if (Number(price) < Number(tc) && Number(price) > Number(san)) {
    Color = "text-red";
  }
  return Color;
};
export const setColorMarkettest = (field: string, params: any) => {
  var { value, data } = params;
  const { TC, Tran, San } = data;

  const check = [
    "GiaKhop",
    "G1",
    "G2",
    "G3",
    "GiaKhop",
    "GiaKhop",
    "GiaKhop",
    "G1B",
    "G2B",
    "G3B",
  ];
  const unCheck = [
    "MCK",
    "KL1",
    "KL2",
    "KL3",
    "KLKhop",
    "Chenhlech",
    "Chenhlech1",
    "KL1B",
    "KL2B",
    "KL3B",
  ];

  if (field) {
    if (check.indexOf(field) !== -1) {
    } else {
      value = data[check[unCheck.indexOf(field)]];
    }
  }

  if (Number(value) === 0) {
    return "#ffffff";
  } else if (Number(value) === Number(San)) {
    return "#66ccff";
  } else if (Number(value) === Number(Tran)) {
    return "#ff00ff";
  } else if (Number(value) === Number(TC)) {
    return "#f7ff31";
  } else if (Number(value) > Number(TC)) {
    return "#00ff00";
  } else if (Number(value) < Number(TC) && Number(value) > Number(San)) {
    return "#ff0000";
  }

  return ""; // Trả về chuỗi trống nếu không khớp với bất kỳ điều kiện nào
};

export const setColorMenuMarket = (value?: string) => {
  let Color = "text-yellow";
  if (value) {
    if (value.includes("-")) {
      Color = "text-red";
    } else if (value === "0") {
      Color = "text-yellow";
    } else {
      Color = "text-green";
    }
  }
  return Color;
};
export const iconColorMenuMarket = (value?: string) => {
  let icon = "arrowUp";
  if (value) {
    if (value.includes("-")) {
      icon = "arrowDown";
    } else if (value === "0") {
      icon = "square";
    } else {
      icon = "arrowUp";
    }
  }
  return icon;
};
// check stt market
export const checkSTTMarket = (value: string, status?: string, kl?: string) => {
  //console.log(value, status)
  if (status === "P" && value === "" && Number(kl) > 0) {
    return "ATO";
  } else if (status === "A" && value === "" && Number(kl) > 0) {
    return "ATC";
  } else if (status === "K" && value === "" && Number(kl) > 0) {
    return "ATC";
  } else {
    return value;
  }
};
export const checkSTTMarketValue = (value: string, status?: string) => {
  //console.log(value, status)
  if (status === "P" && value === "") {
    return "ATO";
  } else if (status === "A" && value === "") {
    return "ATC";
  } else if (status === "K" && value === "") {
    return "ATC";
  } else {
    return value;
  }
};
// status sàn HNX
export const fStatusMarketHNX = (value?:string) =>{
    let valueStatus = ""
    g_arrHAMarketStatus.map((g_HNXStatus)=>{
      //console.log(g_HNXStatus[0])
         
          if(g_HNXStatus[0] === value){
            valueStatus= g_HNXStatus[1]
          }
          
    })
    return valueStatus
  }
  // status HSX
  export const fStatusMarketHSX = (value?:string) =>{
    // console.log(value)
    let valueStatus = ""
    g_arrHOMarketStatus.map((g_HSXStatus)=>{
      //console.log(g_HNXStatus[0])
         
          if(g_HSXStatus[0] === value){
            valueStatus= g_HSXStatus[1]
            // console.log(valueStatus)
          }
    })
   
    return valueStatus
  }
  //status sàn UPCOM
  export const fStatusMarketUPCOM = (value?:string) =>{
    // console.log(value)
    let valueStatus = ""
    g_arrUPMarketStatus.map((g_UPCStatus)=>{
      //console.log(g_HNXStatus[0])
         
          if(g_UPCStatus[0] === value){
            valueStatus= g_UPCStatus[1]
          }
          
    })
    // console.log(valueStatus)
    return valueStatus;

  }
  export const HNXStatus =() =>{
    
  }
var ARRAY_EXCHANGE = [
  ["HO", "HOSE"],
  ["HA", "HNX.NY"],
  ["UP", "HNX.UPCOM"],
];
export function getCookie(cname: any) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export const g_arrCompanyInfo = localStorage.getItem("CacheSI");
// console.log("first company info", g_arrCompanyInfo)
const cachedValue = localStorage.getItem("CacheSI");
const g_arrStockInfo = cachedValue ? JSON.parse(cachedValue) : [];
const g_CurrentLanguage = getCookie("aspfpt_language");
// HO => HOSE; HA => HNX.NY; UP => HNX.UPCOM
const mapCompanyName = () => {
  // console.log(g_arrStockInfo)
  if(g_arrStockInfo){
    const arr = [...g_arrStockInfo];
    if (arr) {
      return arr.map(function (v) {
        return {
          cpnyID: parseInt(v.ID),
          stock_code: v.Code,
          CodeID: 0,
          Ex: exChangeConvert(v.Exchange),
          name: g_CurrentLanguage === "VN" ? v.ScripName : v.ScripNameEN,
        };
      });
    }
    console.log(arr);
  }
 
};

// mapCompanyName();
const exChangeConvert = (number: number) => {
  switch (number) {
    case 2:
      return "HA";
    case 3:
      return "UP";
    default:
      return "HO";
  }
};
export const listDataCompany = mapCompanyName();
// console.log(listDataCompany)
const getExchangeName = (vEx: string) => {
  for (var i = 0; i < ARRAY_EXCHANGE.length; i++)
    if (vEx === ARRAY_EXCHANGE[i][0]) return ARRAY_EXCHANGE[i][1];
};
export const getCompanyNameByCode = (vStockCode: string) => {
  console.log("vo day ne",vStockCode)
  // if(g_arrCompanyInfo) {
  //     let name = g_arrCompanyInfo.find((element:any)=>element.Code === vStockCode);
  // }
  var name = "",
    element = "",
    cpnyID = 0;
  if (listDataCompany) {
    // const dataCom = JSON.parse(g_arrCompanyInfo)
    // const dataCompany = dataCom.Data;
    for (var i = 0; i < listDataCompany.length; i++) {
      // element = dataCompany[i];
      // console.log(element)
      //console.log(listDataCompany[i])

      if (vStockCode === listDataCompany[i].stock_code) {
        // NamLD
        // Sua lai tra gia tri companyName theo dang mang [fullname cong ty, cpnyID]
        name =
          getExchangeName(listDataCompany[i].Ex) +
          " - " +
          listDataCompany[i].name;
        //return [name, element.cpnyID];
        cpnyID = listDataCompany[i].cpnyID;
        break;
      }
    }
  }
  console.log(name)
  return [name];
};
export const arrayColor = [
  "text-red",
  "text-green",
  "text-blue",
  "text-white",
  "text-yellow",
  "text-violet",
];
export const colorTextMenu = (price: number) => {
  const value = 0;
  let Color = "text-white";
  // if(price=== san){
  //     Color="text-blue"
  // }
  if (price) {
    if (Number(price) === 0) {
      Color = "text-yellow";
    } else if (price === Number(value)) {
      Color = "text-yellow";
    } else if (price > Number(value)) {
      Color = "text-green";
    } else if (price < Number(value)) {
      Color = "text-red";
    }
  }

  return Color;
};
var STR_BASIC = 'basic';
var STR_REPORT = 'report';
var ARRAY_BASIC = [
  "Giá trị vốn hóa thị trường",
  "KLNY hiện tại",
  "KLĐLH hiện tại",
  "KLGD bq 30 ngày",
  "Giá cao nhất 52 tuần",
  "Giá thấp nhất 52 tuần",
  "Tỷ lệ sở hữu nước ngoài",
  "EPS*",
  "P/E*",
  "EPS điều chỉnh*",
  "EPS(FPTS)**",
  "P/E(FPTS)**"
];
var ARRAY_REPORT_0 = [
  "Doanh thu bán hàng và cung cấp dịch vụ",
  "Lợi nhuận gộp về bán hàng và cung cấp dịch vụ",
  "Lợi nhuận (lỗ) thuần từ hoạt động kinh doanh",
  "Tổng lợi nhuận (lỗ) kế toán trước thuế",
  "Lợi nhuận (lỗ) sau thuế TNDN",
  "TÀI SẢN NGẮN HẠN",
  "TỔNG CỘNG TÀI SẢN",
  "Nợ ngắn hạn",
  "Nợ dài hạn",
  "VỐN CHỦ SỞ HỮU",
  "Vốn đầu tư của chủ sở hữu",
  "Cập nhật đến quý"
]
var ARRAY_REPORT_1 = [
  "Thu nhập lãi và các khoản thu nhập tương tự",
  "Lãi/lỗ thuần từ hoạt động dịch vụ",
  "Lợi nhuận thuần từ hoạt động kinh doanh trước chi phí dự phòng rủi ro tín dụng",
  "Lợi nhuận sau thuế",
  "TỔNG TÀI SẢN CÓ",
  "Cho vay khách hàng",
  "Tiền gửi khách hàng",
  "TỔNG VỐN CHỦ SỞ HỮU",
  "Cập nhật đến quý"
]
var ARRAY_REPORT_2 = [
  "Doanh thu thuần",
  "Chi phí hoạt động",
  "Lợi nhuận/(lỗ) từ hoạt động kinh doanh",
  "Lợi nhuận trước thuế",
  "Lợi nhuận sau thuế",
  "TỔNG CỘNG TÀI SẢN",
  "TÀI SẢN NGẮN HẠN",
  "Nợ phải trả",
  "Nợ ngắn hạn",
  "Nợ dài hạn",
  "VỐN CHỦ SỞ HỮU",
  "Vốn đầu tư của chủ sở hữu",
  "Cập nhật đến quý"
]
var ARRAY_REPORT_3 = [
  "Doanh thu thuần hoạt động kinh doanh bảo hiểm",
  "Lợi nhuận sau thuế thu nhập doanh nghiệp",
  "TỔNG CỘNG TÀI SẢN",
  "VỐN CHỦ SỞ HỮU",
  "Cập nhật đến quý"
]
export const subStringData = (str:string, table?:string) => {
  var arr:any = [], subStr1, type = '', arrName:any = [];
  if (str.length === 0) {
      return arr;
  }
  if (str.indexOf('@|@') > -1) {
      str = str.replace('@|@', '@');
  }
  subStr1 = str.split('@');
  if (table === STR_BASIC) {
      arrName.push.apply(arrName, ARRAY_BASIC);
  }
  
  else if (table === STR_REPORT) {
     const type:number = parseInt(subStr1[subStr1.length - 1]);
      switch (type) {
          case 0:
              arrName.push.apply(arrName, ARRAY_REPORT_0);
              break;
          case 1:
              arrName.push.apply(arrName, ARRAY_REPORT_1);
              break;
          case 2:
              arrName.push.apply(arrName, ARRAY_REPORT_2);
              break;
          case 3:
              arrName.push.apply(arrName, ARRAY_REPORT_3);
              break;
          default:
              break;
      }
  }


  for (var i = 0; i < subStr1.length; i++) {
      var subStr2:any = [];
      if (subStr1[i].indexOf('|') > -1) {
          subStr2.push.apply(subStr2, subStr1[i].split('|'));

          //2021-03-29 15:57:49 tiepbx
          // fix bo 2 row EPS* || no dai han || P/E* || EPS điều chỉnh*
          if (subStr2[0].toLocaleLowerCase() === "EPS*".toLocaleLowerCase() || subStr2[0].toLocaleLowerCase() === "Nợ dài hạn".toLocaleLowerCase() || subStr2[0].toLocaleLowerCase() === "P/E*".toLocaleLowerCase() || subStr2[0].toLocaleLowerCase() === "EPS điều chỉnh*".toLocaleLowerCase()) {
              continue;
          }

          // lam tron den hang don vi
          if (subStr2[0].toLocaleLowerCase() === "EPS(FPTS)**".toLocaleLowerCase()) {
              subStr2[1] = parseFloat(subStr2[1]).toFixed();
          }

          subStr2[0] = arrName[i];
      }
      else {
          // co 2 TH: 
          // +1) cap nhat den quy
          // +2) loai hinh doanh nghiep: 0, 1, 2,...
          if (isNaN(Number(subStr1[i]))) {
              var result = subStr1[i].split(' ');
              subStr2.push.apply(subStr2, [arrName[i] + ' ' + result[result.length - 1]]);
          } else {
              subStr2.push.apply(subStr2, [subStr1[i]]);
          }
      }
      arr.push(subStr2);
  }
  return arr;
}
// export { g_arrStockInfo };
