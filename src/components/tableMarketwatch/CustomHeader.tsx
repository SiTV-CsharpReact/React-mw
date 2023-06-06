import React from 'react';

const CustomHeader = (props: any) => {
  console.log(" custom header " , props.sortable)
   const handleSortClick = () => {
     if (props.sortable) {
      
    }
  };
  return (
      <div className="header-wrapper">
          <span    className='text-[15px] '> <i onClick={props.onClick }  className="fa fa-caret-left text-[5px] hover:bg-gray-600" aria-hidden="true" ></i></span>
          <span    className="px-[2px] text-[13.2px] title"  onClick={handleSortClick}>+/-</span>
           <span   className='text-[15px]'><i onClick={props.onClick } className="fa fa-caret-right hover:bg-gray-600" aria-hidden="true" ></i></span>
    </div>
  );
};

export default CustomHeader;
