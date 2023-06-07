import React from 'react';

const CustomHeader = ({onClick} : any) => {

  return (
 <>
          <div onClick={onClick }   className='w-[15px] h-[30px] text-[15px] left-0 absolute hover:bg-[#717171] cursor-pointer'> 
          {/* <i onClick={onClick }  className="fa fa-caret-left text-[17px] hover:bg-gray-600 cursor-pointer" aria-hidden="true" ></i> */}
          <div  className="arrow arrow-left"></div>
          </div>
          <div    className="ag-header-cell-text text-[12px] absolute title cursor-pointer" >+/-</div>
           <div onClick={onClick }  className='w-[15px] h-[30px]  text-[15px] right-0 absolute hover:bg-[#717171] cursor-pointer'>
            {/* <i onClick={onClick } className="fa fa-caret-right text-[17px] hover:bg-gray-600 cursor-pointer" aria-hidden="true" ></i> */}
            <div className="arrow arrow-right"></div>
            </div>
           </>
  );
};

export default CustomHeader;
