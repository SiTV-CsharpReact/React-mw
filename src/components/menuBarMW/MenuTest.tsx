import React from 'react'
import { Link } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

interface Props {
  items: MenuItem[];
}

const MenuTest: React.FC<Props>  = ({items}) => {
  const renderMenuItemChild =(item:MenuItem) =>{
    return(
      <li>
        <Link  to={item.path}>
        {item.label}
        </Link>
      </li>
    )
  }
  const renderMenuItem = (item: MenuItem) => {
    // const isActive = item.path === activeItem;
    return (
      <div
        key={item.path}
        className='group list-sub-menu'
        // className={`has-children ${isActive ? "active" : ""} `}

        // onClick={() => handleItemClick(item.path)}
      >
        <span  >{item.label}</span>
        {item.children && (
          // <ul className={`${isActive ? "active" : ""} sub-menu`}>
            <ul className='absolute hidden text-black group-hover:block z-40 sub-menu'>
            {item.children.map((child) => renderMenuItemChild(child))}
          </ul>
        )}
      </div>
    );
  };
    return <div className='flex'>{items.map((item) => renderMenuItem(item))}</div>;
}

export default MenuTest