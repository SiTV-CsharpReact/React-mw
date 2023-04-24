import MenuBar from "./MenuBar";

const ListMenuBar = () => {
  const menuItems = [
    {
      name: "HNX",
      path: "/",
      children: [
        {
          name: "HNX",
          path: "/chung-khoan/HNX",
        },
        {
          name: "HNX30",
          path: "/chung-khoan/HNX30",
        },
        {
            name: "BOND",
            path: "/chung-khoan/BOND",
          },
          {
            name: "Giao dịch thỏa thuận",
            path: "/chung-khoan/thoa-thuan-hnx",
          },
      ],
    },
    {
      name: "HOSE",
      path: "/HSX",
      children: [
        {
          name: "VNI",
          path: "/chung-khoan/VNI",
        },
        {
          name: "VN30",
          path: "/chung-khoan/VN30",
        },
          {
            name: "Giao dịch thỏa thuận",
            path: "/chung-khoan/thoa-thuan-hsx",
          },
          {
            name: "VNXALL",
            path: "/chung-khoan/VNXALL",
          },
          {
            name: "VN100",
            path: "/chung-khoan/VN100",
          },
          {
            name: "VNALL",
            path: "/chung-khoan/VNALL",
          },
          {
            name: "VNMID",
            path: "/chung-khoan/VNMID",
          },
          {
            name: "VNSML",
            path: "/chung-khoan/VNSML",
          },
      ],
    },
    {
        name: "UPCOM",
        path: "/UPCOM",
        children: [
          {
            name: "UPCOM",
            path: "/chung-khoan/UPCOM",
          },
          {
            name: "Giao dịch thỏa thuận",
            path: "/chung-khoan/thoa-thuan-upcom",
          },
        
        ],
      },
      {
        name: "Ngành",
        path: "/nganh",
        children: [
          {
            name: "Bán lẻ",
            path: "/chung-khoan/Ban-le",
          },
          {
            name: "Bảo hiểm",
            path: "/chung-khoan/HNX3",
          },
          {
              name: "Cơ sở hạ tầng giao thông vận tải",
              path: "/BON",
            },
            {
              name: "Công nghệ thông tin tích hợp",
              path: "/table",
            },
            {
              name: "Công ty chứng khoán",
              path: "/HN",
            },
            {
              name: "Dịch vụ & thiết bị y tế",
              path: "/HNX3",
            },
            {
                name: "Dịch vụ công cộng",
                path: "/BON",
              },
              {
                name: "Dịch vụ thương mại chuyên biệt",
                path: "/table",
              },
              {
                name: "Dịch vụ viễn thông",
                path: "/HN",
              },
              {
                name: "Dược phẩm, Công nghệ sinh học",
                path: "/HNX3",
              },
              {
                  name: "Giấy và các sản phẩm từ gỗ",
                  path: "/BON",
                },
                {
                  name: "Hàng tiêu dùng lâu bền",
                  path: "/table",
                },
                {
                  name: "Kim loại & Khai khoáng",
                  path: "/HN",
                },
                {
                  name: "Năng lượng",
                  path: "/HNX3",
                },
                {
                    name: "Ngân hàng",
                    path: "/BON",
                  },
                  {
                    name: "Nguyên vật liệu",
                    path: "/table",
                  },
                  {
                  name: "Giấy và các sản phẩm từ gỗ",
                  path: "/BON",
                },
                {
                  name: "Hàng tiêu dùng lâu bền",
                  path: "/table",
                },
                {
                  name: "Kim loại & Khai khoáng",
                  path: "/HN",
                },
                {
                  name: "Năng lượng",
                  path: "/HNX3",
                },
                {
                    name: "Ngân hàng",
                    path: "/BON",
                  },
                  {
                    name: "Nguyên vật liệu",
                    path: "/table",
                  },

                  {
                    name: "Ngân hàng",
                    path: "/BON",
                  },
                  {
                    name: "Nguyên vật liệu",
                    path: "/table",
                  },
                  {
                  name: "Ô tô & Phụ tùng",
                  path: "/BON",
                },
                {
                  name: "Phần cứng",
                  path: "/table",
                },
                {
                  name: "Phần mềm",
                  path: "/HN",
                },
                {
                  name: "Quản lý, phát triển bất động sản",
                  path: "/HNX3",
                },
                {
                    name: "Quỹ",
                    path: "/BON",
                  },
                  {
                    name: "Sản phẩm cá nhân & hộ gia đình",
                    path: "/table",
                  },
                  {
                    name: "Tài chính chuyên biệt khác",
                    path: "/BON",
                  },
                  {
                    name: "Thực phẩm & Đồ uống",
                    path: "/table",
                  },
                  {
                    name: "Truyền thống và xuất bản",
                    path: "/HN",
                  },
                  {
                    name: "Tư liệu sản xuất",
                    path: "/HNX3",
                  },
                  {
                      name: "Vận tải",
                      path: "/BON",
                    },
                    {
                      name: "Vật liệu xây dựng",
                      path: "/table",
                    },
                  

        ],
      },
      {
        name: "Thống kê",
        path: "/hehe",
        children: [
          {
            name: "Thống kê Index",
            path: "/chung-khoan/thong-ke-index",
          },
          {
            name: "Thống kê Giá",
            path: "/chung-khoan/thong-ke-gia",
          },
          {
              name: "Thống kê Đặt lệnh",
              path: "/chung-khoan/thong-ke-dat-lenh",
            },
            {
              name: "Giao dịch khớp lệnh NDTNN",
              path: "/chung-khoan/giao-dich-khop-lenh-ndtnn",
            },
            {
              name: "Giao dịch thỏa thuận NDTNN",
              path: "/chung-khoan/giao-dich-thoa-thuan-ndtnn",
            },
        ],
      },
      {
        name: "Chứng quyền",
        path: "/keo",
        children: [
          {
            name: "CW",
            path: "/chung-khoan/CW",
          },
         
        ],
      },
      
  ];

  return (
    <div>
      <MenuBar items={menuItems} />
      {/* <Menu items={menuItems} /> */}
    </div>
  );
};

export default ListMenuBar;