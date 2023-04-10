import Menu from "./MenuTest";

const ListMenuTest = () => {
  const menuItems = [
    {
      label: "HNX",
      path: "/",
      children: [
        {
          label: "HNX",
          path: "/HNX",
        },
        {
          label: "HNX",
          path: "/HNX30",
        },
      ],
    },
    {
      label: "About",
      path: "/about",
      children: [
        {
          label: "Team",
          path: "/about/team",
        },
        {
          label: "Mission",
          path: "/about/mission",
        },
      ],
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div>
      <Menu items={menuItems} />
    </div>
  );
};

export default ListMenuTest;