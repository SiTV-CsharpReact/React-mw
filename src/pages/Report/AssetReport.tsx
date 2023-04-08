import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss'
interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
  value?: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Services',
    path: '/services',
    children: [
      {
        label: 'Service 1',
        path: '/report/AssetReport2/1',
        value: 'service1',
      },
      {
        label: 'Service 2',
        path: '/services/2',
        value: 'service2',
      },
    ],
  },
];

const AssetReport = () => {
  const [activeValues, setActiveValues] = useState<string[]>([]);
  const handleMenuItemClick = (value: string | undefined) => {
    setActiveValues((prevValues) =>
      [...prevValues, value].filter((val) => val !== undefined) as string[]
    );
    console.log('Selected values:', [...activeValues, value]);
  };

  // const handleMenuItemClick = (value: string | undefined) => {
  //   setActiveValues([...activeValues, value].filter(Boolean));
  //   console.log('Selected values:', [...activeValues, value]);
  // };
// const handleClick = (value: string | undefined) => {
//   const stringValue = value ?? ''; // Nếu `value` là `undefined`, thì gán `stringValue` bằng chuỗi rỗng
//   // Tiếp tục sử dụng `stringValue` trong các xử lý khác
// };
  const renderMenuItem = (item: MenuItem, parentValue?: string) => {
    const value = parentValue ? `${parentValue} > ${item.value}` : item.value;
     const isActive = activeValues.includes(value!);

    return (
      <li
        key={item.path}
        onClick={() => handleMenuItemClick(item.value)}
        className={`list-sub-menu ${isActive ? 'active' : '' }`}
      >
        <NavLink to={item.path}>{item.label}</NavLink>
        {item.children && (
          <ul className="sub-menu">
            {item.children.map((childItem) =>
              renderMenuItem(childItem, item.value)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav>
      <ul>
        {menuItems.map((item) => renderMenuItem(item))}
      </ul>
    </nav>
  );
};



// className={`list-sub-menu ${isActive ? 'active' : '' }`}

export default AssetReport