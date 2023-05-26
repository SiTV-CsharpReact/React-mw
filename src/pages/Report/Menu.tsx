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

  const renderMenuItem = (item: MenuItem,index:number) => {
    const isActive = item.path === activeItem;
    return (
      <li
        key={index}
        className={`group list-sub-menu  ${isActive ? "active" : ""} `}
        onClick={() => handleItemClick(item.path)}
      >
        <Link to={item.path}>{item.label}</Link>
        {item.children && (
          <ul className={`${isActive ? "active" : ""} absolute hidden text-black group-hover:block z-40 sub-menu`}>
            {item.children.map((child,index) => renderMenuItem(child,index))}
          </ul>
        )}
      </li>
    );
  };

  return <ul>{items.map((item,index) => renderMenuItem(item,index))}</ul>;
};

export default Menu;