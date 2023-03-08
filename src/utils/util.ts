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
     let Color ="text-white";
    // if(price=== san){
    //     Color="text-blue"
    // }
    if(price===0){
        Color="text-white"
    }
    else if(price=== san){
        Color="text-blue"
    }
    else if(price === tran){
        Color="text-violet"
    }
    else if(price === tc){
        Color="text-yellow"
    }
    else if(price >tc){
        Color="text-green"
    }
    else if(price>san && price<tc )
    {
        Color="text-red"
    }
    return Color;
}
