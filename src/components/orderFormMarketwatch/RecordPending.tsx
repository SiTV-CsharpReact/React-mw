const RecordPending = () => {
  return (
    
    <div className="bottom-right" style={{display: 'block', marginRight: '25px', width: '45%',float: "right"}}>
    <div className="top">
      <span className="text-title text-[#0055ba] text-15px leading-[25px]">DANH SÁCH LỆNH CHỜ GỬI</span>
      <i title="Refresh Ordesr to Send" className="glyphicon glyphicon-refresh" id="spnRefreshDataCookiePendingOrders" />
      <input type="button" className="btn btn-submit-all " id="btnSendAllCookie" defaultValue="Gửi tất cả" />
      <table className="table-pending">
        <thead>
        <tr>
         <th className="thead__del">Xóa</th>
                        <th className="thead__buysell">M/B</th>
                        <th className="thead__stockcode">Mã CK</th>
                        <th className="thead__KL">KL</th>
                        <th className="thead__price">Giá <span >(x1000)</span></th>
                        <th className="thead__TLV" >TLV</th>
                        <th className="thead__noti">Thông báo</th>
                        <th className="thead__contrcode">Mã HĐ</th>
                        <th className="thead__send">Gửi lệnh</th>
                    </tr>
        </thead>
        <tbody id="tbdLCG" />
      </table>
    </div>
  </div>
  )
}

export default RecordPending