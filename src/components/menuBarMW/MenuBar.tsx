import React, { useEffect, useState } from 'react'
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
  
  // useEffect(() => {
  //   // Load active item from localStorage
  //   const activeItem = localStorage.getItem("activeItem");
  //   if (activeItem) {
  //     setActive(activeItem);
  //   }
  // }, []);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
    const [activeMenuItemChild, setActiveMenuItemChild] = useState<string | null>(null);
  const handleItemClick = (path: string) => {
    setActiveMenuItem(path);
    localStorage.setItem("activePriceboardTab", path);
    //console.log(path)
  };
  const handleItemChildClick = (path: string) => {
    setActiveMenuItemChild(path);
    localStorage.setItem("activePriceboardTabMenu", path);
    //console.log(path)
  };
  const renderMenuItemChild =(item:MenuItem) =>{
    //console.log(item)
    //console.log(Object.keys(item))
    return(
      <li  key={item.path}
      
      onClick={() => handleItemChildClick(item.path)}
      >
        <Link  to={item.path} 
        className={`${ activeMenuItemChild === item.path ? 'active' : ''} `}
         >
        {item.name}
        </Link>
      </li>
    )
  }
  const renderMenuItemChildS =(item:MenuItem,index:number) =>{
    return(
      <li  key={index}
      className={`${ index % 2 === 0 ? "float-left" : "float-right" }`}
      onClick={() => handleItemChildClick(item.path)}
      >
        <Link  to={item.path} 
        className={`${ activeMenuItemChild === item.path ? 'active' : ''} `}
         >
        {item.name}
        </Link>
      </li>
    )
  }
  const renderMenuItem = (item: MenuItem) => {
 
    // const isActive = item.path === activeItem;
    return (
      <div
        key={item.path}
        // className='group list-sub-menu'
       
        className={`group list-sub-menu ${ activeMenuItem === item.path ? 'active' : ''} `}

        onClick={() => handleItemClick(item.path)}
      >
        <span  className='text-13px' >{item.name}{ activeMenuItemChild === item.path ? 'active' : ''}</span>
      {item.children && item.children.length <=9 ? (
          // <ul className={`${isActive ? "active" : ""} sub-menu`}>
            <ul className='absolute hidden text-black group-hover:block z-40 sub-menu'>
            {item.children?.map((child) => renderMenuItemChild(child))}
            
          </ul>
        ):(
        <div>
           <ul className='absolute hidden text-black group-hover:block z-40 sub-menu dropdown-menu-price'>
            {item.children?.map((child,index) => renderMenuItemChildS(child,index))}
            
          </ul>
        </div>
        )}
      </div>
    );
  };
    return <div className='flex menu-table'>{items.map((item) => renderMenuItem(item))}</div>;
}

export default MenuBar