import React from 'react'

const FooterMarket = () => {
  return (
    <div className='footer-content flex justify-center bg-bgFooterTable'>
     <span className='pr-4'>ĐƠN VỊ GIÁ: 1,000 ĐỒNG</span> 
      <span> ĐƠN VỊ KHỐI LƯỢNG: 1 CỔ PHIẾU.</span>
     </div>
  )
}

export default React.memo(FooterMarket)