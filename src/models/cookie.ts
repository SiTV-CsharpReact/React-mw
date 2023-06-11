import Cookie from "js-cookie";
// thêm cookie và cập nhật
type TypeCookie = {
  tab: any;
  codeList: any;
};
export const setCookie = (newCookie: TypeCookie) => {
  let isCookie = Cookie.get("MyPined"); // lây cookie hiện tại
  let stringCookie = newCookie.tab + "_" + newCookie.codeList + "|";

  if (!isCookie) {
    // kiểm tra
    // k có
    Cookie.set("MyPined", stringCookie, { expires: 365 });
    return true
  } else {
    let indexTring = isCookie.indexOf(newCookie.tab); // kiểm tra vị trí của  tab có hay chưa

    if (indexTring === -1) {
      // chưa có thêm mới
      let stringNew = isCookie + stringCookie;
      Cookie.set("MyPined", stringNew, { expires: 365 });
    } else {
      // có rồi
      if (newCookie.codeList.length > 0) {
        let indexStart = isCookie.lastIndexOf(newCookie.tab); // vị trí của tab vd: VNI 
        let arrayCodelist = isCookie.split(""); //   chuỗi thành mảng
        let stringCut = newCookie.tab.length + 1;
        let IndexAddCodeList = indexStart + stringCut; // vị trí thêm codeList vào
        let indexLap = indexStart + newCookie.tab.length + 1; // number
        let indexEnd;  // vị trí kết thúc của lap 
        for (var i = indexLap; i < arrayCodelist.length; i++) {
          /// vị trí kết thúc
          if (arrayCodelist[i] === "|") {
            indexEnd = i;
            break;
          }
        }
        let ArrayTabCodeList = isCookie.slice(indexStart, indexEnd).split("_"); // chuỗi => mảng  []
        
        if(ArrayTabCodeList[1].length > 0) {
            // đã có codeList AAA,
            let indexCodeListStart = ArrayTabCodeList[1].indexOf(newCookie.codeList.trim()) // tìm Code list trong tab 
                // indexCodeListStart === 0 => đã có  =>  xóa khỏi ,  ===-1 k có => thêm mới
               
            if(indexCodeListStart >= 0){
              let removeCodeList = ArrayTabCodeList[1].replace( `${newCookie.codeList.trim()},`,"") // chuỗi còn lại sau khi xóa 
             let newSting = isCookie.slice(0,IndexAddCodeList)+removeCodeList +  isCookie.slice(indexEnd) // thêm vào

             Cookie.set("MyPined", newSting, { expires: 365 });
             return true
              // let 
            }else{
              let newSting = isCookie.slice(0, IndexAddCodeList) +`${newCookie.codeList.trim()},` + isCookie.slice(IndexAddCodeList);
              // thêm vào
              Cookie.set("MyPined", newSting, { expires: 365 });
              return true
            }
        }else {
          // chưa có codeList => thêm mới 
          let newSting = isCookie.slice(0, IndexAddCodeList) +`${newCookie.codeList.trim()},` + isCookie.slice(IndexAddCodeList);
           // thêm vào
              Cookie.set("MyPined", newSting, { expires: 365 });
              return true
        }
      } else {
        // codeList ===  null  ||  rỗng => thêm lại isCookie cũ 
        Cookie.set("MyPined", isCookie, { expires: 365 });
      }
    }
  }
  return true;
};
export const getCookie = (tab: any) => {
  // lấy data table
  let iscookie = Cookie.get("MyPined"); // cookie htai
  if (iscookie) {
    let indexStart = iscookie.lastIndexOf(tab.tab); // vị trí của tab  bắt đầu
    let arrayCodelist = iscookie.split("");

    let indexLap = indexStart + tab.tab.length + 1;
    let indexEnd;
    for (var i = indexLap; i < arrayCodelist.length; i++) {
      /// vị trí kết thúc
      if (arrayCodelist[i] === "|") {
        indexEnd = i;
        break;
      }
    }
    if (indexEnd) {
      // kiểm tra vị trí end
      let ArrayTabCodeList = iscookie.slice(indexStart, indexEnd).split("_"); // chuỗi => mảng
      if (ArrayTabCodeList[1].length > 0) {
        //ktra
        let ArrayCodeList = ArrayTabCodeList[1].split(","); // chuỗi => mảng
        ArrayCodeList = ArrayCodeList.splice(0, ArrayCodeList.length - 1); // cắt bỏ phần từ cuối cùng
        return ArrayCodeList;
      }
    }
  }
};
