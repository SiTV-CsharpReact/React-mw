import React, { useState } from 'react'
import { Link } from 'react-router-dom';

interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

interface Props {
  items: MenuItem[];
}

const MenuBar: React.FC<Props>  = ({items}) => {
  const [isActive, setIsActive] = useState("");
  const handleItemClick = (path: string) => {
    setIsActive(path);
    console.log(path)
  };
  const renderMenuItemChild =(item:MenuItem) =>{
    return(
      <li  key={item.path}>
        <Link  to={item.path} 
         >
        {item.name}
        </Link>
      </li>
    )
  }
  const renderMenuItem = (item: MenuItem) => {
 
    // const isActive = item.path === activeItem;
    return (
      <li
        key={item.path}
        // className='group list-sub-menu'
        className={`group list-sub-menu ${isActive ? "active" : ""} `}

        onClick={() => handleItemClick(item.path)}
      >
        <Link to="/" className='text-13px' >{item.name}</Link>
        {item.children && (
          // <ul className={`${isActive ? "active" : ""} sub-menu`}>
            <ul className='absolute hidden text-black group-hover:block z-40 sub-menu'>
            {item.children.map((child) => renderMenuItemChild(child))}
          </ul>
        )}
      </li>
    );
  };
    return <div className='flex'>{items.map((item) => renderMenuItem(item))}</div>;
}

export default MenuBar