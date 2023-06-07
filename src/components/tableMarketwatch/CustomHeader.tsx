import React from 'react';

const CustomHeader = ({onClick} : any) => {

  return (
      <div className="relative pl-[1px] header-wrapper">
          <span    className='text-[15px] p-[1px] hover:bg-gray-600 cursor-pointer'> <i onClick={onClick }  className="fa fa-caret-left text-[17px] hover:bg-gray-600 cursor-pointer" aria-hidden="true" ></i></span>
          <span    className="px-[2px] text-[13.2px] title cursor-pointer" >+/-</span>
           <span   className='text-[15px] p-[1px]  hover:bg-gray-600 cursor-pointer'><i onClick={onClick } className="fa fa-caret-right text-[17px] hover:bg-gray-600 cursor-pointer" aria-hidden="true" ></i></span>
    </div>
  );
};

export default CustomHeader;
