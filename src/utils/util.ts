import { g_ARRAY_COLOR_CLASS, g_ID_TD_STAT_CONTROLCODE, g_arrHAMarketStatus, g_arrUPMarketStatus } from "../configs/app.config";

export function formatNumber(number:any) {
    if (!number || number === 0 || number === "0")
        return 0; // hoac ''
    else
        return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export function formatNumberMarket(number:any) {
    if (!number || number === 0 || number === "0")
        return ''; // hoac ''
    else
        return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
export function tinhGiaTC(tc:number,price:number){
      const diff = (price - tc);
    //if(isFinite(diff)) return "";
      if (isNaN(diff)) return "";

      const percent = (diff / tc) * 100;
      let strPercent = percent === 0 ? "" :  checkZeroLast(percent,1) +" %";
      if(tc===0){
        strPercent ="";
      } 
      //console.log(strPercent)
      if (percent ===100) return "";
     if (percent === -100) return "";
     //if(isFinite(percent)) return "";
      return strPercent
}
export function tinhGiaCT(tc:number,price:number){
      
      const diff = (price - tc);
    //if(isFinite(diff)) return "";
      if (isNaN(diff)) return "";
      let strPercent = diff === 0 ? "" :  checkZeroLast(diff,2);
      if(Number(price)===0) strPercent ="";
    //   const percent = (diff / tc) * 100;
    //   const strPercent = percent === 0 ? "" :  checkZeroLast(percent,1) +" %";
    //   //console.log(strPercent)
    //   if (percent ===100) return "";
    //  if (percent === -100) return "";
    //  //if(isFinite(percent)) return "";
      return strPercent
}
const checkZeroLast =  (value:number, numberFixed?:number) => {
    if (!numberFixed) {
        numberFixed = 2;
    }
    const strValue = value.toFixed(numberFixed);
    const arrValue = strValue.split('.');
    const elArrLast = arrValue[1];
    if (elArrLast) {
        if (elArrLast.endsWith("0")) {
            if (numberFixed === 2) {
                if (elArrLast === "00") {
                    return value.toFixed(0);
                }
                else {
                    return value.toFixed(1);
                }
            }
            if (numberFixed === 1) {
                return value.toFixed(0);
            }
        }
    }
    return strValue;

}
export const setColorMarket =(tc:number,price:number,tran:number,san:number) =>{
    // console.log(tc,price,tran,san)
     let Color ="text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if(Number(price)===0){
        Color="text-white"
    }
    else if(Number(price)=== Number(san)){
        Color="text-blue"
    }
    else if(Number(price) === Number(tran)){
        Color="text-violet"
    }
    else if(Number(price) === Number(tc)){
        Color="text-yellow"
    }
    else if(Number(price) >Number(tc)){
        Color="text-green"
    }
    else if(Number(price)<Number(tc) && Number(price)>Number(san)  )
    {
        Color="text-red"
    }
    return Color;
}
export const setColorMenuMarket =(value?:string)=>{
   
    let Color ="text-yellow";
    if(value){
       
       if(value.includes("-")){
        Color= "text-red";
       }
       else if(value === "0"){
        Color= "text-yellow";
       }
       else{
        Color= "text-green";
       }}
   return Color
}
export const iconColorMenuMarket =(value?:string)=> {
    let icon ="arrowUp";
    if(value){
       
       if(value.includes("-")){
        icon ="arrowDown"
       }
       else if(value === "0"){
        icon= "square";
       }
       else{
        icon ="arrowUp"
       }}
   return icon
}
// check stt market
export const checkSTTMarket = (value:string,status?:string,kl?:string)=>{
    //console.log(value, status)
   if(status ==="P" && value ==="" && Number(kl) >0)
   {
    return "ATO"
   }
   else if(status ==="A" && value ==="" && Number(kl) >0)
   {
    return "ATC"
   }
   else if(status ==="K" && value ==="" && Number(kl) >0)
   {
    return "ATC"
   }
   else{
    return value
   }
   
}
export const checkSTTMarketValue = (value:string,status?:string)=>{
    //console.log(value, status)
   if(status ==="P" && value ==="" )
   {
    return "ATO"
   }
   else if(status ==="A" && value ==="")
   {
    return "ATC"
   }
   else if(status ==="K" && value ==="")
   {
    return "ATC"
   }
   else{
    return value
   }
   
}
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
    let valueStatus = ""
    g_arrHAMarketStatus.map((g_HSXStatus)=>{
      //console.log(g_HNXStatus[0])
         
          if(g_HSXStatus[0] === value){
            valueStatus= g_HSXStatus[1]
          }
          else{
            valueStatus =""
          }
    })
    return valueStatus
  }
  //status sàn UPCOM
  export const fStatusMarketUPCOM = (value?:string) =>{
    let valueStatus = ""
    g_arrUPMarketStatus.map((g_UPCStatus)=>{
      //console.log(g_HNXStatus[0])
         
          if(g_UPCStatus[0] === value){
            valueStatus= g_UPCStatus[1]
          }
          
    })
    return valueStatus
  }
  export const HNXStatus =() =>{
    
  }
  var g_HOSEControlCode = '';
  var g_ARRAY_SHOW_TIME = ["P", "O", "I", "F", "A", "C"];
// const checkTime = (controlCode:any)=>{
//     var chartLayout = document.getElementById('chart-layout');
// 		var dateTimeChart = chartLayout ? chartLayout.querySelector('.date-time-chart') : null;
// 		var itvClock, tmr = 1000;
// 		if (g_ARRAY_SHOW_TIME.indexOf(controlCode) === -1) {
// 			clearInterval(itvClock);
// 			itvClock = setInterval(function () {
// 				if ($$(g_CLOCK_ID) != null && $$(g_CLOCK_ID) != {}) {
// 					if (!$$(g_CLOCK_ID).classList.contains(g_CLASS_HIDE)) {
// 						if (m_Interval_ServerTime) {
// 							clearInterval(m_Interval_ServerTime);
// 						}
// 						$$(g_CLOCK_ID).classList.add(g_CLASS_HIDE);
// 						if (dateTimeChart) {
// 							var day = datetimeNow();
// 							dateTimeChart.innerHTML = day;
// 						}
// 					}
// 					clearInterval(itvClock);
// 				}
// 			}, tmr)
// 		} else {
// 			clearInterval(itvClock);
// 			itvClock = setInterval(function () {
// 				if ($$(g_CLOCK_ID) != null) {
// 					if ($$(g_CLOCK_ID).classList) {
// 						if ($$(g_CLOCK_ID).classList.contains(g_CLASS_HIDE)) {
// 							$$(g_CLOCK_ID).classList.remove(g_CLASS_HIDE);
// 						}
// 					}
// 					clearInterval(itvClock);
// 				}
// 			}, tmr)
// 		}
// }

// export const updateIndex =(objRoot:any)=>{
//     console.log(objRoot)
//     var arrData = JSON.parse(objRoot.Change);
//     var vTextClass = '', vImageClass = '', vName = '', vStrs = '', vTextClassCP = '';
//     for (var i = 0; i < arrData.length; i++) {

//         // NamLD luu controlcode va updateServertimeHO
//         vStrs = arrData[i][0].split(g_ARRAY_COLOR_CLASS[6]);
//         //if(vStrs[0]=='i02' && vStrs[1]=='x251c')
//         //	a="xxx"; // huy debug


//         if (g_ARRAY_CONTTROL_CODE.indexOf(arrData[i][0]) > -1) {
//             // neu update ControlCode thi luu vao bien toan cuc
//             if (arrData[i][0] == g_ID_TD_STAT_CONTROLCODE) {
//                 // luu HOSE ControlCode, tu do tinh toan ra ATO hay ATC
//                 // ATO (neu BP1=0 AND BQ1>0 and ControlCode=P)......
//                 g_HOSEControlCode = arrData[i][1];
//                 this?.checkTime(g_HOSEControlCode);
//                 //if (g_HOSEControlCode == g_arrHOMarketStatus[7][0])// code=K,(close-150000) thi hide clock
//                 //$$(g_CLOCK_ID).classList.add(g_CLASS_HIDE);
//                 //console.info('=======g_HOSEControlCode=', g_HOSEControlCode);
//                 for (var j = 0; j < g_arrHOMarketStatus.length; j++) {
//                     if (g_arrHOMarketStatus[j][0] == g_HOSEControlCode) {
//                         var groupClass = $class(g_CLASS_MARKET_STAT);
//                         for (var k = 0; k < groupClass.length; k++) {
//                             groupClass[k].innerHTML = g_arrHOMarketStatus[j][2];
//                         }
//                         break;
//                     }
//                 }
//             }
//         } else if (arrData[i][0] == g_VN30_TIME) {
//             g_HOSEVNITime = arrData[i][1];
//             //this.getDate();
//             // tiepbx 17-09-2021 k lấy giờ HO nữa vì bị chậm
//             //this.updateServerTimeHO(g_CLOCK_ID, arrData[i][1]);
//             //} else if (arrData[i][0].substring(arrData[i][0].length - 13) == 'ChangePercent') {// 2015-06-06 16:18:39 ngocta2 tim ra class UP, DOWN, NO CHANGE
//         } else {
//             // 2:27 PM 10/12/2021 trungnt4 fix loi nhan sub bi thieu field changepercent ==>> if field CHANGE
//             if (vStrs[1] == CHANGE_PERCENT || vStrs[1] == CHANGE || vStrs[1] == "5" || vStrs[1] == "6") {// 2015-06-06 16:18:39 ngocta2 tim ra class UP, DOWN, NO CHANGE
//                 // add check with "5" HNX change HuyNQ 13-11-15
//                 //var v = vStrs[1] == CHANGE_PERCENT ? parseFloat(arrData[i + 1][1]) : parseFloat(arrData[i][1]);
//                 vName = vStrs[0];
//                 if (vStrs[1] == CHANGE_PERCENT) {
//                     var v = parseFloat(arrData[i + 1][1]);
//                     if (v == 0) // = tham chieu, vang
//                     {
//                         vTextClass = g_CLASS_INDEX[0][0];
//                         vImageClass = g_CLASS_INDEX[0][1];
//                     }
//                     if (v > 0) // tang, xanh
//                     {
//                         vTextClass = g_CLASS_INDEX[1][0];
//                         vImageClass = g_CLASS_INDEX[1][1];
//                     }
//                     if (v < 0) // giam, do
//                     {
//                         vTextClass = g_CLASS_INDEX[2][0];
//                         vImageClass = g_CLASS_INDEX[2][1];
//                     }
//                 }
//                 else if (vStrs[1] == "5" || vStrs[1] == "6") {
//                     var v = parseFloat(arrData[i][1]);
//                     vStrs[1] == "6" ? v = parseFloat(arrData[i - 1][1]) : v = parseFloat(arrData[i][1]);
//                     if (v == 0) // = tham chieu, vang
//                     {
//                         vTextClass = g_CLASS_INDEX[0][0];
//                         vImageClass = g_CLASS_INDEX[0][1];
//                     }
//                     if (v > 0) // tang, xanh
//                     {
//                         vTextClass = g_CLASS_INDEX[1][0];
//                         vImageClass = g_CLASS_INDEX[1][1];
//                     }
//                     if (v < 0) // giam, do
//                     {
//                         vTextClass = g_CLASS_INDEX[2][0];
//                         vImageClass = g_CLASS_INDEX[2][1];
//                     }
//                 }
//                 else {
//                     var v = parseFloat(arrData[i][1]);
//                     var vCP = parseFloat(((Number(arrData[i][1]) / Number(arrData[i + 1][1].replace(/[, ]+/g, "").trim())) * 100).toFixed(2));
//                     if (v == 0 && vCP == 0) // = tham chieu, vang
//                     {
//                         vTextClass = g_CLASS_INDEX[0][0];
//                         vImageClass = g_CLASS_INDEX[0][1];
//                         vTextClassCP = g_CLASS_INDEX[0][0];
//                     }
//                     if (v > 0 && vCP > 0) // tang, xanh
//                     {
//                         vTextClass = g_CLASS_INDEX[1][0];
//                         vImageClass = g_CLASS_INDEX[1][1];
//                         vTextClassCP = g_CLASS_INDEX[1][0];
//                     }
//                     if (v < 0 && vCP < 0) // giam, do
//                     {
//                         vTextClass = g_CLASS_INDEX[2][0];
//                         vImageClass = g_CLASS_INDEX[2][1];
//                         vTextClassCP = g_CLASS_INDEX[2][0];
//                     }
//                 }
//                 var vIDImage = arrData[i][0].substring(0, arrData[i][0].indexOf('_'));
//                 if ($$(vIDImage + '_Image'))
//                     $$(vIDImage + '_Image').className = vImageClass;
//                 if ($$(arrData[i][0]) && $$(arrData[i][0]).parentElement != void 0)
//                     $$(arrData[i][0]).parentElement.className = vTextClass;

//                 //break;
//             }
//             if ($$(arrData[i][0])) {
//                 // so sanh xem co cung mot loai VNI, VN30,... khong
//                 //if (vStrs[0] != vName) continue;
//                 var vCellIndex = -1;
//                 var vCell = $$(arrData[i][0]);
//                 var vValue = arrData[i][1];
//                 var vClass = vCell.className; // error js
//                 if (vClass != void 0) {
//                     // neu td la cac td can doi mau thi set className
//                     for (var k = 0; k < g_ID_TD_INDEX_NEED_CHANGE_COLOR.length; k++) {
//                         if (arrData[i][0].substring(arrData[i][0].length - g_ID_TD_INDEX_NEED_CHANGE_COLOR[k].length) == g_ID_TD_INDEX_NEED_CHANGE_COLOR[k]) {
//                             if (vTextClass != '') {
//                                 var classList = vCell.classList;
//                                 vClass = classList != void 0 && classList.length == 1 ? vTextClass : vClass.replace(classList[0], vTextClass);
//                             }

//                         }
//                     }
//                 }
//                 // if (vStrs[0] == 'i02' && vStrs[1] == 'x251c')
//                 //     console.info('======HuyNQi02x251c', vValue);
//                 if (arrData[i][1].match(g_PARTERN_HNX_MARKETSTATUS)) {// added HuyNQ 25-11-15 HNX MARKETSTATUS
//                     this.m_HAControlCode = arrData[i][1]; // HuyNQ 04-12-2015
//                     for (var j = 0; j < g_arrHAMarketStatus.length; j++) {
//                         if (g_arrHAMarketStatus[j][0] == arrData[i][1]) {
//                             var groupClass = $class(g_CLASS_HNX_MARKET_STAT);
//                             var date = new Date();
//                             var startMin = new Date(date.toLocaleDateString() + " 12:30:00");
//                             var endMin = new Date(date.toLocaleDateString() + " 14:30:00");
//                             if (date > startMin && date < endMin) {
//                                 console.log(g_arrHAMarketStatus[j], g_arrHAMarketStatus[j][2]);
//                             }
//                             for (var k = 0; k < groupClass.length; k++) {
//                                 groupClass[k].innerHTML = g_arrHAMarketStatus[j][2];

//                             }
//                         }
//                     }
//                     // break; // 2018-10-31 16:18:52 ngocta2
//                     continue;
//                 }
//                 if (arrData[i][1].match(g_PARTERN_UP_MARKETSTATUS)) {// added HuyNQ 25-11-15 HNX MARKETSTATUS
//                     for (var j = 0; j < g_arrUPMarketStatus.length; j++) {
//                         if (g_arrUPMarketStatus[j][0] == arrData[i][1]) {
//                             var groupClass1 = $class(g_CLASS_UP_MARKET_STAT);
//                             for (var k = 0; k < groupClass1.length; k++) {
//                                 groupClass1[k].innerHTML = g_arrUPMarketStatus[j][2];

//                             }
//                         }
//                     }
//                     // break; // 2018-10-31 16:18:52 ngocta2
//                     continue;
//                 }
//                 // update tooltip
//                 //this.updateHistAttr(vCell, objRoot.Time);
//                 // update gia tri trong TD
//                 var ChartLayout = document.getElementById("chart-layout");
//                 if (ChartLayout) {
//                     if (ChartLayout.style.display != "none") {
//                         if (g_SideBar) {
//                             g_SideBar.updateIndex(vCellIndex, vCell, vValue, vClass);
//                         }
//                     }
//                 }
//                 this.UpdateCell(vCellIndex, vCell, vValue, vClass, indexFlag);

//             }

//         }

//     }
// }
export const updateQuoteData =(objRoot:any[])=>{
    console.log(objRoot)
}
//   export const updateIndex =(objRoot:any) =>{
//     var arrData = JSON.parse(objRoot.Change);
//     var vTextClass = '', vImageClass = '', vName = '', vStrs = '', vTextClassCP = '';
//     for (var i = 0; i < arrData.length; i++) {

//         // NamLD luu controlcode va updateServertimeHO
//         vStrs = arrData[i][0].split(g_ARRAY_COLOR_CLASS[6]);
//         //if(vStrs[0]=='i02' && vStrs[1]=='x251c')
//         //	a="xxx"; // huy debug


//         if (ARRAY_CONTTROL_CODE.indexOf(arrData[i][0]) > -1) {
//             // neu update ControlCode thi luu vao bien toan cuc
//             if (arrData[i][0] == g_ID_TD_STAT_CONTROLCODE) {
//                 // luu HOSE ControlCode, tu do tinh toan ra ATO hay ATC
//                 // ATO (neu BP1=0 AND BQ1>0 and ControlCode=P)......
//                 g_HOSEControlCode = arrData[i][1];
//                 this.checkTime(g_HOSEControlCode);
//                 //if (g_HOSEControlCode == g_arrHOMarketStatus[7][0])// code=K,(close-150000) thi hide clock
//                 //$$(g_CLOCK_ID).classList.add(g_CLASS_HIDE);
//                 //console.info('=======g_HOSEControlCode=', g_HOSEControlCode);
//                 for (var j = 0; j < g_arrHOMarketStatus.length; j++) {
//                     if (g_arrHOMarketStatus[j][0] == g_HOSEControlCode) {
//                         var groupClass = $class(g_CLASS_MARKET_STAT);
//                         for (var k = 0; k < groupClass.length; k++) {
//                             groupClass[k].innerHTML = g_arrHOMarketStatus[j][2];
//                         }
//                         break;
//                     }
//                 }
//             }
//         } else if (arrData[i][0] == g_VN30_TIME) {
//             g_HOSEVNITime = arrData[i][1];
//             //this.getDate();
//             // tiepbx 17-09-2021 k lấy giờ HO nữa vì bị chậm
//             //this.updateServerTimeHO(g_CLOCK_ID, arrData[i][1]);
//             //} else if (arrData[i][0].substring(arrData[i][0].length - 13) == 'ChangePercent') {// 2015-06-06 16:18:39 ngocta2 tim ra class UP, DOWN, NO CHANGE
//         } else {
//             // 2:27 PM 10/12/2021 trungnt4 fix loi nhan sub bi thieu field changepercent ==>> if field CHANGE
//             if (vStrs[1] == CHANGE_PERCENT || vStrs[1] == CHANGE || vStrs[1] == "5" || vStrs[1] == "6") {// 2015-06-06 16:18:39 ngocta2 tim ra class UP, DOWN, NO CHANGE
//                 // add check with "5" HNX change HuyNQ 13-11-15
//                 //var v = vStrs[1] == CHANGE_PERCENT ? parseFloat(arrData[i + 1][1]) : parseFloat(arrData[i][1]);
//                 vName = vStrs[0];
//                 if (vStrs[1] == CHANGE_PERCENT) {
//                     var v = parseFloat(arrData[i + 1][1]);
//                     if (v == 0) // = tham chieu, vang
//                     {
//                         vTextClass = g_CLASS_INDEX[0][0];
//                         vImageClass = g_CLASS_INDEX[0][1];
//                     }
//                     if (v > 0) // tang, xanh
//                     {
//                         vTextClass = g_CLASS_INDEX[1][0];
//                         vImageClass = g_CLASS_INDEX[1][1];
//                     }
//                     if (v < 0) // giam, do
//                     {
//                         vTextClass = g_CLASS_INDEX[2][0];
//                         vImageClass = g_CLASS_INDEX[2][1];
//                     }
//                 }
//                 else if (vStrs[1] == "5" || vStrs[1] == "6") {
//                     var v = parseFloat(arrData[i][1]);
//                     vStrs[1] == "6" ? v = parseFloat(arrData[i - 1][1]) : v = parseFloat(arrData[i][1]);
//                     if (v == 0) // = tham chieu, vang
//                     {
//                         vTextClass = g_CLASS_INDEX[0][0];
//                         vImageClass = g_CLASS_INDEX[0][1];
//                     }
//                     if (v > 0) // tang, xanh
//                     {
//                         vTextClass = g_CLASS_INDEX[1][0];
//                         vImageClass = g_CLASS_INDEX[1][1];
//                     }
//                     if (v < 0) // giam, do
//                     {
//                         vTextClass = g_CLASS_INDEX[2][0];
//                         vImageClass = g_CLASS_INDEX[2][1];
//                     }
//                 }
//                 else {
//                     var v = parseFloat(arrData[i][1]);
//                     var vCP = parseFloat(((Number(arrData[i][1]) / Number(arrData[i + 1][1].replace(/[, ]+/g, "").trim())) * 100).toFixed(2));
//                     if (v == 0 && vCP == 0) // = tham chieu, vang
//                     {
//                         vTextClass = g_CLASS_INDEX[0][0];
//                         vImageClass = g_CLASS_INDEX[0][1];
//                         vTextClassCP = g_CLASS_INDEX[0][0];
//                     }
//                     if (v > 0 && vCP > 0) // tang, xanh
//                     {
//                         vTextClass = g_CLASS_INDEX[1][0];
//                         vImageClass = g_CLASS_INDEX[1][1];
//                         vTextClassCP = g_CLASS_INDEX[1][0];
//                     }
//                     if (v < 0 && vCP < 0) // giam, do
//                     {
//                         vTextClass = g_CLASS_INDEX[2][0];
//                         vImageClass = g_CLASS_INDEX[2][1];
//                         vTextClassCP = g_CLASS_INDEX[2][0];
//                     }
//                 }
//                 var vIDImage = arrData[i][0].substring(0, arrData[i][0].indexOf('_'));
//                 if ($$(vIDImage + '_Image'))
//                     $$(vIDImage + '_Image').className = vImageClass;
//                 if ($$(arrData[i][0]) && $$(arrData[i][0]).parentElement != void 0)
//                     $$(arrData[i][0]).parentElement.className = vTextClass;

//                 //break;
//             }
//             if ($$(arrData[i][0])) {
//                 // so sanh xem co cung mot loai VNI, VN30,... khong
//                 //if (vStrs[0] != vName) continue;
//                 var vCellIndex = -1;
//                 var vCell = $$(arrData[i][0]);
//                 var vValue = arrData[i][1];
//                 var vClass = vCell.className; // error js
//                 if (vClass != void 0) {
//                     // neu td la cac td can doi mau thi set className
//                     for (var k = 0; k < g_ID_TD_INDEX_NEED_CHANGE_COLOR.length; k++) {
//                         if (arrData[i][0].substring(arrData[i][0].length - g_ID_TD_INDEX_NEED_CHANGE_COLOR[k].length) == g_ID_TD_INDEX_NEED_CHANGE_COLOR[k]) {
//                             if (vTextClass != '') {
//                                 var classList = vCell.classList;
//                                 vClass = classList != void 0 && classList.length == 1 ? vTextClass : vClass.replace(classList[0], vTextClass);
//                             }

//                         }
//                     }
//                 }
//                 // if (vStrs[0] == 'i02' && vStrs[1] == 'x251c')
//                 //     console.info('======HuyNQi02x251c', vValue);
//                 if (arrData[i][1].match(g_PARTERN_HNX_MARKETSTATUS)) {// added HuyNQ 25-11-15 HNX MARKETSTATUS
//                     this.m_HAControlCode = arrData[i][1]; // HuyNQ 04-12-2015
//                     for (var j = 0; j < g_arrHAMarketStatus.length; j++) {
//                         if (g_arrHAMarketStatus[j][0] == arrData[i][1]) {
//                             var groupClass = $class(g_CLASS_HNX_MARKET_STAT);
//                             var date = new Date();
//                             var startMin = new Date(date.toLocaleDateString() + " 12:30:00");
//                             var endMin = new Date(date.toLocaleDateString() + " 14:30:00");
//                             if (date > startMin && date < endMin) {
//                                 console.log(g_arrHAMarketStatus[j], g_arrHAMarketStatus[j][2]);
//                             }
//                             for (var k = 0; k < groupClass.length; k++) {
//                                 groupClass[k].innerHTML = g_arrHAMarketStatus[j][2];

//                             }
//                         }
//                     }
//                     // break; // 2018-10-31 16:18:52 ngocta2
//                     continue;
//                 }
//                 if (arrData[i][1].match(g_PARTERN_UP_MARKETSTATUS)) {// added HuyNQ 25-11-15 HNX MARKETSTATUS
//                     for (var j = 0; j < g_arrUPMarketStatus.length; j++) {
//                         if (g_arrUPMarketStatus[j][0] == arrData[i][1]) {
//                             var groupClass1 = $class(g_CLASS_UP_MARKET_STAT);
//                             for (var k = 0; k < groupClass1.length; k++) {
//                                 groupClass1[k].innerHTML = g_arrUPMarketStatus[j][2];

//                             }
//                         }
//                     }
//                     // break; // 2018-10-31 16:18:52 ngocta2
//                     continue;
//                 }
//                 // update tooltip
//                 //this.updateHistAttr(vCell, objRoot.Time);
//                 // update gia tri trong TD
//                 var ChartLayout = document.getElementById("chart-layout");
//                 if (ChartLayout) {
//                     if (ChartLayout.style.display != "none") {
//                         if (g_SideBar) {
//                             g_SideBar.updateIndex(vCellIndex, vCell, vValue, vClass);
//                         }
//                     }
//                 }
//                 this.UpdateCell(vCellIndex, vCell, vValue, vClass, indexFlag);

//             }

//         }
//     }
//   }