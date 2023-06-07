import React from 'react';

const CustomHeader = ({onClick} : any) => {

  return (
      <div className="header-wrapper">
          <span    className='text-[15px] '> <i onClick={onClick }  className="fa fa-caret-left text-[5px] hover:bg-gray-600" aria-hidden="true" ></i></span>
          <span    className="px-[2px] text-[13.2px] title" >+/-</span>
           <span   className='text-[15px]'><i onClick={onClick } className="fa fa-caret-right hover:bg-gray-600" aria-hidden="true" ></i></span>
    </div>
  );
};

export default CustomHeader;
