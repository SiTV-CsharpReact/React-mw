
export const resizeWindow = () => {
    const heightHeader2 = document.getElementById("header-fpts")?.offsetHeight
    const heightMWOder =  document.getElementById("root")?.offsetHeight
    const pannelTop = document.getElementById("pannel-top")
    const tablePriceList = document.getElementById("tablePriceList")
    if(heightMWOder && heightHeader2 && pannelTop && tablePriceList ) {
    const reSize = heightMWOder - heightHeader2
    console.log("reSize",reSize)
    pannelTop.style.height= setHeight(reSize).toString()
    tablePriceList.style.height =setHeightTable(reSize).toString() 
    }

    if(tablePriceList) console.log("tablePriceList",tablePriceList.offsetHeight)
    if(heightHeader2) console.log("heightHeader2",heightHeader2)
    if(heightMWOder) console.log("heightMWOder",heightMWOder)
    if(pannelTop) console.log("pannelTop",pannelTop.offsetHeight)
}
const setHeight = (value:number) =>{
  return value /10 *5.7
}
const setHeightTable = (value:number) =>{
    return (value /10) * 4.3 - 46
}