
export const getDateTime =()=>{
    var ngayHienTai = new Date();
    var ngay = ngayHienTai.getDate(); // 16
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