export const  hidePhoneNumber =(phoneNumber: string) =>{
    // Kiểm tra xem số điện thoại có đúng định dạng không (10 số)
    if (typeof phoneNumber === "string" && phoneNumber.length >= 9) {
      // Lấy 3 số bắt đầu của số điện thoại
      const visiblePart = phoneNumber.substring(0, 3);
      // Tạo chuỗi "****"
      const hiddenPart = "****";
      // lấy 3 số cuối
      const lastDigits = phoneNumber.substring(phoneNumber.length - 3);
      // trả về số mới
      return `${visiblePart}${hiddenPart}${lastDigits}`;
    } else {
      return phoneNumber; // Trả về số điện thoại không đủ độ dài để cắt
    }
  }