import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import menuItems from './helper/ListMenu';
import { useAppDispatch } from '../../store/configureStore';
import { getDataTable } from '../tableMarketwatch/tableSlice';

interface MenuItem{
  name: string;
  path: string;
  query: string;
  floor: string
  children?: MenuItem[];
}


const MenuBar = () => {
const dispatch  = useAppDispatch()
  const activeItem = localStorage.setItem("activePriceboarFloor", "HSX");
  const activeItemChild = localStorage.setItem("activePriceboardTabMenu", "");
  const [IsActiveMenu , setIsActiveMenu]= useState<number>(0); 
  const [activeNamePath, setactiveNameFloor] = useState<string | null>(null); // ten san 
    const [activeMenuItemName, setActiveMenuItemChild] = useState<string | null>(null);// teen menu item 
    useEffect(() => {
      const activeItem = localStorage.getItem("activePriceboarFloor"); // ten san 
      const activeItemChild = localStorage.getItem("activePriceboardTabMenu"); // ten menu item 
      if (activeItem) {
        setactiveNameFloor(activeItem);
      }
      if (activeItemChild) {
        setActiveMenuItemChild(activeItemChild);
      }
    }, []);
  const handleItemClick = (path: string, key:number) => {
    setIsActiveMenu(key)
    setactiveNameFloor(path);
    localStorage.setItem("activePriceboarFloor", path);
  };
  // call api 
  const handleItemChildClick =  async (name:string , query:string , floor : string , ) => {
    setActiveMenuItemChild(name);
    localStorage.setItem("activePriceboardTabMenu", name);
    let data = {
      Floor :floor,
      Query:query
    }
   await dispatch(getDataTable(data)) 
  };
  const renderMenuItem = (item:any, key : number) => {
    return (
      <div
        key={item.path}
        className={`group list-sub-menu ${ IsActiveMenu === key? 'active' : ''} `}
        onClick={() => handleItemClick(item.path , key)}
      >
        <span  className='text-13px' >{item.name}{ activeNamePath === item.path ? activeMenuItemName?.replace("",": ") : ''}</span>
         {item.children && item.children.length <=9 ? (
            <ul className='absolute hidden text-black group-hover:block z-40 sub-menu' key={item.path}>
            {item.children?.map((child:any, index:number) => {
               return(
                <li  key={item.path}
                
                onClick={() => handleItemChildClick(child.name,child.query , item.floor   )}
                >
                  <Link to=""
                  className={`${ activeMenuItemName === child.name ? 'active' : ''} `}
                   >
                  {child.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        ):(
        <div key={item.path}>
           <ul className='absolute hidden text-black group-hover:block z-40 sub-menu dropdown-menu-price' key={item.path}>
            {item.children?.map((child:any,index:number) =>{
              return(
                <li  key={index}
                className={`${ index % 2 === 0 ? "float-left" : "float-right" }`}
                onClick={() => handleItemChildClick(child.name ,child.query,item.floor )}
                >
                  <Link  to="" 
                  className={`${ activeMenuItemName === child.name ? 'active' : ''} `}
                   >
                  {child.name}
                  </Link>
                </li>
              )
            })}
            
          </ul>
        </div>
        )}
      </div>
    );
  };
    return <div className='flex menu-table'>
      {menuItems.map((item,key) => renderMenuItem(item,key))}
      </div>;
}

export default React.memo(MenuBar)