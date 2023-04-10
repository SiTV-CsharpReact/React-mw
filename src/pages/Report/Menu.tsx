import { useState } from "react";
import { Link } from "react-router-dom";
import './style.scss'
interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

interface Props {
  items: MenuItem[];
}

const Menu: React.FC<Props> = ({ items }) => {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (path: string) => {
    setActiveItem(path);
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.path === activeItem;
    return (
      <li
        key={item.path}
        className={`has-children ${isActive ? "active" : ""} `}
        onClick={() => handleItemClick(item.path)}
      >
        <Link to={item.path}>{item.label}</Link>
        {item.children && (
          <ul className={`${isActive ? "active" : ""} sub-menu`}>
            {item.children.map((child) => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return <ul>{items.map((item) => renderMenuItem(item))}</ul>;
};

export default Menu;