import React from 'react'

const HeaderMarketW = () => {
  return (
    <div>
        <table className="w-full tableMW " >
        {/* <colgroup><col className="col-symbol" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-price" /><col className="col-vol" /><col className="col-total-vol" /><col className="col-over-buy" /><col className="col-over-sell" /><col className="col-ave-price" /><col className="col-high-price" /><col className="col-low-price" /><col className="col-foreign-buy" /><col className="col-foreign-sell" /></colgroup>   */}
        <colgroup>
        <col className="col-symbol" />
        <col className="show-on-mobile col-price" />
        <col className="show-on-mobile col-price" />
        <col className="show-on-mobile col-price" />
       
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol col-vol-sm" />
        <col className="col-diff" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-price" />
        <col className="col-vol" />
        <col className="col-vol-total" />
        <col className="col-price-open" />
        <col className="col-price-high" />
        <col className="col-price-short" />
        <col className="col-vol-foreign-buy" />
        <col className="col-vol-foreign-sell" />
        <col className="col-vol-still" />
        </colgroup>
        <thead>
          <tr>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket"
              rowSpan={2}
            >
              Mã
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              TC
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Trần
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Sàn
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket"
              colSpan={6}
            >
              Mua
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              colSpan={3}
            >
              Khớp lệnh
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket"
              colSpan={6}
            >
              Bán
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Tổng KL
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Mở cửa
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Cao nhất
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Thấp nhất
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN mua
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              NN bán
            </th>
            <th
              className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket"
              rowSpan={2}
            >
              Room còn lại
            </th>
          </tr>
          <tr>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              G3
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              KL3
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              G2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              G1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket">
              Giá
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket">
              KL
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket bg-BGTableHoverMarket">
              +-
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              G1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              KL1
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              G2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              KL2
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              G3
            </th>
            <th className="border border-borderHeadTableMarket px-2 py-1 text-textHeadTableMarket">
              KL3
            </th>
          </tr>
        </thead>
        </table>
    </div>
  )
}

export default HeaderMarketW