import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss'
import { Link } from "react-router-dom";

interface MenuItem {
  title: string;
  url: string;
  children?: MenuItem[];
}

interface MenuProps {
  menuItems: MenuItem[];
}

const Menu = ({ menuItems }: MenuProps) => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (url: string) => {
    setActiveItem(url);
  };

  return (
    <ul className="menu">
      {menuItems.map((item) => (
        <li key={item.url} className={item.url === activeItem ? "active" : ""}>
          <Link to={item.url} onClick={() => handleItemClick(item.url)}>
            {item.title}
          </Link>
          {item.children && (
            <ul className="sub-menu">
              {item.children.map((child) => (
                <li key={child.url}>
                  <Link
                    to={child.url}
                    className={child.url === activeItem ? "active" : ""}
                    onClick={() => handleItemClick(child.url)}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

// className={`list-sub-menu ${isActive ? 'active' : '' }`}

export default Menu