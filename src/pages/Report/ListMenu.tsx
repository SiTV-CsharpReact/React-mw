import Menu from "./Menu";

const ListMenuApp = () => {
  const menuItems = [
    {
      label: "Home",
      path: "/",
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

export default ListMenuApp;