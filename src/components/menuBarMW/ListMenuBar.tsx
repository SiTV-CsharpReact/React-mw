import Menu from "./Menu";
import MenuBar from "./MenuBar";

const ListMenuBar = () => {
  const menuItems = [
    {
      name: "HNX",
      path: "/",
      children: [
        {
          name: "HNX",
          path: "/HNX",
        },
        {
          name: "HNX30",
          path: "/HNX30",
        },
        {
            name: "BOND",
            path: "/BOND",
          },
          {
            name: "Giao dịch thỏa thuận",
            path: "/thoa-thuan-hnx",
          },
      ],
    },
    {
      name: "HOSE",
      path: "/HSX",
      children: [
        {
          name: "VNI",
          path: "/VNI",
        },
        {
          name: "VN30",
          path: "/VN30",
        },
        {
            name: "BOND",
            path: "/BOND",
          },
          {
            name: "Giao dịch thỏa thuận",
            path: "/thoa-thuan-hsx",
          },
          {
            name: "VNXALL",
            path: "/VNXALL",
          },
          {
            name: "VN100",
            path: "/VN100",
          },
          {
            name: "VNALL",
            path: "/VNALL",
          },
          {
            name: "VNMID",
            path: "/VNMID",
          },
          {
            name: "VNSML",
            path: "/VNSML",
          },
      ],
    },
    {
        name: "UPCOM",
        path: "/UPCOM",
        children: [
          {
            name: "UPCOM",
            path: "/UPCOM",
          },
          {
            name: "Giao dịch thỏa thuận",
            path: "/HNX30",
          },
        
        ],
      },
      {
        name: "Ngành",
        path: "/",
        children: [
          {
            name: "HNX",
            path: "/HNX",
          },
          {
            name: "HNX30",
            path: "/HNX30",
          },
          {
              name: "BOND",
              path: "/BOND",
            },
            {
              name: "Giao dịch thỏa thuận",
              path: "/thoa-thuan-hnx",
            },
        ],
      },
      {
        name: "Thống kê",
        path: "/",
        children: [
          {
            name: "HNX",
            path: "/HNX",
          },
          {
            name: "HNX30",
            path: "/HNX30",
          },
          {
              name: "BOND",
              path: "/BOND",
            },
            {
              name: "Giao dịch thỏa thuận",
              path: "/thoa-thuan-hnx",
            },
        ],
      },
      {
        name: "Chứng quyền",
        path: "/",
        children: [
          {
            name: "HNX",
            path: "/HNX",
          },
          {
            name: "HNX30",
            path: "/HNX30",
          },
          {
              name: "BOND",
              path: "/BOND",
            },
            {
              name: "Giao dịch thỏa thuận",
              path: "/thoa-thuan-hnx",
            },
        ],
      },
      {
        name: "Danh mục",
        path: "/",
        children: [
          {
            name: "HNX",
            path: "/HNX",
          },
          {
            name: "HNX30",
            path: "/HNX30",
          },
          {
              name: "BOND",
              path: "/BOND",
            },
            {
              name: "Giao dịch thỏa thuận",
              path: "/thoa-thuan-hnx",
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