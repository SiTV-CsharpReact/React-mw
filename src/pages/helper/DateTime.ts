
export const getDateTime =()=>{
    var ngayHienTai = new Date();
    var ngay = ngayHienTai.getDate().toString().padStart(2, "0"); // 16
    var thangHtai = (ngayHienTai.getMonth() + 1).toString().padStart(2, "0");  //06 
    var nam = ngayHienTai.getFullYear(); // 2023
    let thangTR= ( Number(thangHtai)-1).toString().padStart(2, "0"); 
    let tuNgay = `${nam}-${thangTR}-${ngay}`;
    let denNgay = `${nam}-${thangHtai}-${ngay}`;
    let data = {
        tuNgay,denNgay
    }
    return data;
}
export const DateTimeCover = (date?: any)=>{
    if(date){
        var split_date = date.split("-");
        var converted_date = split_date[2] + "/" + split_date[1] + "/" + split_date[0];
        let data = {
            StartDay :converted_date,
            EndDay:converted_date
        }
        return data
    }else{
          var ngayHienTai = new Date();
            var ngay = ngayHienTai.getDate(); // 16
            var thangHtai = (ngayHienTai.getMonth() + 1).toString().padStart(2, "0");  //06 
            var nam = ngayHienTai.getFullYear(); // 2023
            let thangTR= ( Number(thangHtai)-1).toString().padStart(2, "0"); 
            let StartDay = `${ngay}/${thangTR}/${nam}`;
            let EndDay = `${ngay}/${thangHtai}/${nam}`;
            let data = {
                StartDay,EndDay
            }
            return data;
    }
  
}
export const converDate = (date :any) =>{
    if(date){
        const [year, month, day] = date.slice(0, 10).split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
    }
    
}
export const DefaultSelect = [{value: "" , label : "Tất cả "}]
export const SanGD = [
    { value: "", label: "Tất cả " },
    { value: "0", label: "HSX " },
    { value: "1", label: "HNX " },
   
]
export const MaCK = [
    { value: "", label: "Tất cả " },
    { value: "0", label: "AAA " },
    { value: "1", label: "BAC" },
]
export const TTlenh = [
    { value: "All", label: "tất cả " },
    { value: "1", label: "Khớp một phần  " },
    { value: "2", label: "Đã khớp " },
    { value: "3", label: "Đã sửa " },
    { value: "4", label: "Đã hủy " },
    { value: "5", label: "Hết hiệu lực " },
    { value: "6", label: "Bị từ chối " },
]
export const TTXX = [
    { value: "1", label: " Tăng dần " },
    { value: "1", label: " Giảm dần " }
]
export const TinhTranglenh = [
    { value: "All", label: "tất cả " },
    { value: "1", label: "Chờ kích hoạt  " },
    { value: "2", label: "Thành công " },
    { value: "3", label: "Bị từ chối " },
    { value: "4", label: "Đã hủy " },
    { value: "5", label: "Hết hạn" },
]
export const TTlenhHistorySell = [
    { value: "All", label: "tất cả " },
    { value: "INPROCESS", label: "Chờ xử lý  " },
    { value: "SENT", label: "Đã gửi lên TTLK " },
    { value: "FPTSACCEPTED", label: "Đã khớp " },
    { value: "REJECTED", label: "Bị từ chối " },
    { value: "CANCELLED", label: "Đã huỷ" },
    { value: "TRADED", label: "Đã khớp" },
    { value: "ACCEPTED", label: "Đã gửi" },
]
export const DauKy = [
    { value: "", label: "Quý 2/2023" },
    { value: "", label: "Quý 1/2023" },
]
export const CuoiKy = [
    { value: "", label: "21/06/2023" },
    { value: "", label: "Quý 2/2023" },
]
export const LoaiGD = [
    { value: "All", label: "tất cả " },
    { value: "1", label: "Nộp/Rút/Chuyển tiền  " },
    { value: "2", label: "Mua/Bán chứng khoán" },
    { value: "3", label: "Ký quỹ & Ứng trước " },
    { value: "4", label: "Tư vấn đầu tư" ,selected: true},
    { value: "5", label: "Các GD khác" },
]
export const TTrang = [
    { value: "-1", label: "tất cả " },
    { value: "0", label: "Chưa thanh toán" },
    { value: "1", label: "Đã thanh toán" },
]