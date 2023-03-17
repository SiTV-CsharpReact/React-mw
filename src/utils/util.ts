import { g_arrHAMarketStatus, g_arrUPMarketStatus } from "../configs/app.config";

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
      const strPercent = percent === 0 ? "" :  checkZeroLast(percent,1) +" %";
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