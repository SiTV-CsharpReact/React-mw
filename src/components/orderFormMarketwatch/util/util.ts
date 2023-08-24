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
  function isValidEmail(email:string) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const hideEmail = (email:string) =>{
        // Kiểm tra xem email có đúng định dạng không
        if (isValidEmail(email)) {
            // Tách phần đầu của email và phần đuôi (phần sau dấu @)
            var [username, domain] = email.split("@");
    
            // Lấy 2 số đầu của email + ****
            var displayUsername = username.slice(0, 2) + "****";
           // Lấy 2 số cuối cùng của email
            var endEmail = username.slice(-2);
            // Kết hợp username đã được ẩn và phần đuôi của email
            return displayUsername+endEmail + "@" + domain;
        } else {
            // Trả về email ban đầu nếu không đúng định dạng
            return email;
        }
}