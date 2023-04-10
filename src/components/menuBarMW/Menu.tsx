import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

interface Props {
  items: MenuItem[];
}

const Menu: React.FC<Props> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<string>('');

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, [location]);

  const handleClick = (name: string, value: number) => {
    localStorage.setItem(name, JSON.stringify(value));
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isActive = item.path === activeItem;

    let value = 0;
    if (item.children) {
      value = item.children.reduce((sum, child) => {
        return sum + (parseInt(localStorage.getItem(child.name) || '0') || 0);
      }, 0);
    }

    if (isActive) {
      localStorage.setItem(item.name, JSON.stringify(value));
    }

    return (
      <li key={index}>
        <Link
          to={item.path}
          className={`group list-sub-menu ${isActive ? "active" : ""} `}
          onClick={() => handleClick(item.name, value)}
        >
          {item.name} ({value})
        </Link>
        {item.children && (
          <ul className='absolute hidden text-black group-hover:block z-40 sub-menu'>{item.children.map((child, i) => renderMenuItem(child, i))}</ul>
        )}
      </li>
    );
  };

  return <ul className='flex'>{items.map((item, index) => renderMenuItem(item, index))}</ul>;
};

export default Menu;