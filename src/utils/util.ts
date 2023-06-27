import { g_ARRAY_COLOR_CLASS, g_ID_TD_STAT_CONTROLCODE, g_arrHAMarketStatus, g_arrHOMarketStatus, g_arrUPMarketStatus } from "../configs/app.config";

export function formatNumber(number: any) {
  if (!number || number === 0 || number === "0") return 0; // hoac ''
  else return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export function formatNumberMarket(number: any) {
  if (!number || number === 0 || number === "0") return ""; // hoac ''
  else return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
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
function getCookie(cname: any) {
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
console.log("first company info", g_arrCompanyInfo)
const cachedValue = localStorage.getItem("CacheSI");
const g_arrStockInfo = cachedValue ? JSON.parse(cachedValue) : [];
const g_CurrentLanguage = getCookie("aspfpt_language");
// HO => HOSE; HA => HNX.NY; UP => HNX.UPCOM
const mapCompanyName = () => {
  // console.log(g_arrStockInfo)
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
const listDataCompany = mapCompanyName();
//console.log(listDataCompany)
const getExchangeName = (vEx: string) => {
  for (var i = 0; i < ARRAY_EXCHANGE.length; i++)
    if (vEx === ARRAY_EXCHANGE[i][0]) return ARRAY_EXCHANGE[i][1];
};
export const getCompanyNameByCode = (vStockCode: string) => {
  // console.log("vo day ne",vStockCode)
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
// export { g_arrStockInfo };
