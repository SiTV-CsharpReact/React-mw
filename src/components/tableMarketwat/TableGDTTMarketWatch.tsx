import React from 'react'
import { useParams } from 'react-router-dom'
import { stocks } from '../../models/marketwacthTable'

const TableGDTTMarketWatch = () => {
    const params = useParams<{ id: string }>()
    const paramstock  = stocks.find(
      paramstock => paramstock.id === params.id
    )
  return (
    <div>
    <div className='flex'>
      <input ></input>
       <span>Tổng KL GDTT : <label> 0</label></span>
       <span>Tổng KL GDTT : <label> 0</label></span>
    </div>
     <div className="flex">
        <div>
        <table id="tbBuyPT_HA" className="table table-PT table-bordered table-priceboard"><thead style={{}}><tr><th className="hbrc" colSpan={4}>Chào mua</th></tr><tr><th className="hbrb">Mã</th><th className="hb_b">Giá</th><th className="hbrb">KL</th><th className="hbrb">Mã CTCK</th></tr></thead><tbody id="tbdPT_HA" /></table>
        </div>
        <div>
        <table id="tbBuyPT_HA" className="table table-PT table-bordered table-priceboard"><thead style={{}}><tr><th className="hbrc" colSpan={5}>Thực hiện</th></tr><tr><th className="hbrb">Mã</th><th className="hb_b">Giá</th><th className="hbrb">KL</th><th className="hbrb">Tổng KL</th><th className="hbrb">Tổng GT</th></tr></thead><tbody id="tbdPT_HA" /></table>
        </div>
        <div>
        <table id="tbBuyPT_HA" className="table table-PT table-bordered table-priceboard"><thead style={{}}><tr><th className="hbrc" colSpan={4}>Chào bán</th></tr><tr><th className="hbrb">Mã</th><th className="hb_b">Giá</th><th className="hbrb">KL</th><th className="hbrb">Mã CTCK</th></tr></thead><tbody id="tbdPT_HA" /></table>
        </div>
     </div>

    </div>
  )
}

export default TableGDTTMarketWatch