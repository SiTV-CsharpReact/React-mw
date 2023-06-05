const menuItems = [
  {
    name: "HOSE",
    path: "/HSX",
    floor: "HSX",
    children: [
      {
        name: "VNI",
        path: "/chung-khoan/VNI",
        query: "s=quote&l=All",
      },
      {
        name: "VN30",
        path: "/chung-khoan/VN30",
        query: "s=quote&l=VN30",
      },
      {
        name: "Giao dịch thỏa thuận",
        path: "/chung-khoan/thoa-thuan-hsx",
        query: "thoa-thuan-hsx",
      },
      {
        name: "VNXALL",
        path: "/chung-khoan/VNXALL",
        query: "s=quote&l=VNXALL",
      },
      {
        name: "VN100",
        path: "/chung-khoan/VN100",
        query: "s=quote&l=VN100",
      },
      {
        name: "VNALL",
        path: "/chung-khoan/VNALL",
        query: "s=quote&l=VNALL",
      },
      {
        name: "VNMID",
        path: "/chung-khoan/VNMID",
        query: "s=quote&l=VNMID",
      },
      {
        name: "VNSML",
        path: "/chung-khoan/VNSML",
        query: "s=quote&l=VNSML",
      },
    ],
  },
  {
    name: "HNX",
    path: "/",
    floor: "HNX",
    children: [
      {
        name: "HNX",
        path: "/chung-khoan/HNX",
        query: "s=quote&l=HNXIndex",
      },
      {
        name: "HNX30",
        path: "/chung-khoan/HNX30",
        query:"s=quote&l=HNX30",
      },
      {
        name: "BOND",
        path: "/chung-khoan/BOND",
        query: "s=quote&l=BOND",
      },
      {
        name: "Giao dịch thỏa thuận",
        path: "/chung-khoan/thoa-thuan-hnx",
        query: "thoa-thuan-hsx",
      },
    ],
  },

  {
    name: "UPCOM",
    path: "/UPCOM",
    floor: "HNX",
    children: [
      {
        name: "UPCOM",
        path: "/chung-khoan/UPCOM",
        query: "s=quote&l=HNXUpcomIndex",
      },
      {
        name: "Giao dịch thỏa thuận",
        path: "/chung-khoan/thoa-thuan-upcom",
        query: "thoa-thuan-hsx",
      },
    ],
  },
  {
    name: "Ngành",
    path: "/co-phieu-nganh",
    floor: "",
    children: [
      {
        name: "Bán lẻ",
        path: "/chung-khoan/Ban-le",
        query: "",
      },
      {
        name: "Bảo hiểm",
        path: "/chung-khoan/HNX3",
        query: "",
      },
      {
        name: "Cơ sở hạ tầng giao thông vận tải",
        path: "/BON",
        query: "",
      },
      {
        name: "Công nghệ thông tin tích hợp",
        path: "/table",
        query: "",
      },
      {
        name: "Công ty chứng khoán",
        path: "/HN",
        query: "",
      },
      {
        name: "Dịch vụ & thiết bị y tế",
        path: "/HNX3",
        query: "",
      },
      {
        name: "Dịch vụ công cộng",
        path: "/BON",
        query: "",
      },
      {
        name: "Dịch vụ thương mại chuyên biệt",
        path: "/table",
        query: "",
      },
      {
        name: "Dịch vụ viễn thông",
        path: "/HN",
        query: "",
      },
      {
        name: "Dược phẩm, Công nghệ sinh học",
        path: "/HNX3",
        query: "",
      },
      {
        name: "Giấy và các sản phẩm từ gỗ",
        path: "/BON",
        query: "",
      },
      {
        name: "Hàng tiêu dùng lâu bền",
        path: "/table",
        query: "",
      },
      {
        name: "Kim loại & Khai khoáng",
        path: "/HN",
        query: "",
      },
      {
        name: "Năng lượng",
        path: "/HNX3",
        query: "",
      },
      {
        name: "Ngân hàng",
        path: "/BON",
        query: "",
      },
      {
        name: "Nguyên vật liệu",
        path: "/table",
        query: "",
      },
      {
        name: "Giấy và các sản phẩm từ gỗ",
        path: "/BON",
        query: "",
      },
      {
        name: "Hàng tiêu dùng lâu bền",
        path: "/table",
        query : ""
      },
      {
        name: "Kim loại & Khai khoáng",
        path: "/HN",
        query : ""
      },
      {
        name: "Năng lượng",
        path: "/HNX3",
        query : ""
      },
      {
        name: "Ngân hàng",
        path: "/BON",
        query : ""
      },
      {
        name: "Nguyên vật liệu",
        path: "/table",
        query : ""
      },

      {
        name: "Ngân hàng",
        path: "/BON",
        query : ""
      },
      {
        name: "Nguyên vật liệu",
        path: "/table",
        query : ""
      },
      {
        name: "Ô tô & Phụ tùng",
        path: "/BON",
        query : ""
      },
      {
        name: "Phần cứng",
        path: "/table",
        query : ""
      },
      {
        name: "Phần mềm",
        path: "/HN",
        query : ""
      },
      {
        name: "Quản lý, phát triển bất động sản",
        path: "/HNX3",
        query : ""
      },
      {
        name: "Quỹ",
        path: "/BON",
        query : ""
      },
      {
        name: "Sản phẩm cá nhân & hộ gia đình",
        path: "/table",
        query : ""
      },
      {
        name: "Tài chính chuyên biệt khác",
        path: "/BON",
        query : ""
      },
      {
        name: "Thực phẩm & Đồ uống",
        path: "/table",
        query : ""
      },
      {
        name: "Truyền thống và xuất bản",
        path: "/HN",
        query : ""
      },
      {
        name: "Tư liệu sản xuất",
        path: "/HNX3",
        query : ""
      },
      {
        name: "Vận tải",
        path: "/BON",
        query : ""
      },
      {
        name: "Vật liệu xây dựng",
        path: "/table",
        query : ""
      },
    ],
  },
  {
    name: "Thống kê",
    path: "/thong-ke-index",
    floor: "TableTK",
    // floor: "HNX",
    children: [
      {
        name: "Thống kê Index",
        path: "/chung-khoan/thong-ke-index",
        query : "HIST_INDEX"
      },
      {
        name: "Thống kê Giá",
        path: "/chung-khoan/thong-ke-gia",
        query : "HIST_PRICE"
      },
      {
        name: "Thống kê Đặt lệnh",
        path: "/chung-khoan/thong-ke-dat-lenh",
        query : "HIST_ORDER"
      },
      {
        name: "Giao dịch khớp lệnh NDTNN",
        path: "/chung-khoan/giao-dich-khop-lenh-ndtnn",
        query : "HIST_FOREIGN_NM"
      },
      {
        name: "Giao dịch thỏa thuận NDTNN",
        path: "/chung-khoan/giao-dich-thoa-thuan-ndtnn",
        query : "HIST_FOREIGN_PT"
      },
    ],
  },
  {
    name: "Chứng quyền",
    path: "/keo",
    floor: "",
    children: [
      {
        name: "CW",
        path: "/chung-khoan/CW",
        query : ""
      },
    ],
  },
];

export default menuItems;
