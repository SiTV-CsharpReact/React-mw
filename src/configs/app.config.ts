// export const  g_arrHAMarketStatus = [
//     // HNX
//     ['LIS_AUC_C_NML_1', 'ATC', MARKETSTATUS_A],// ATC
//     ['LIS_AUC_C_NML_LOC_1', 'ATC (chặn hủy sửa)', MARKETSTATUS_A],// ATC
//     ['LIS_AUC_C_NEW_1', 'ATC', MARKETSTATUS_A],// ATC
//     ['LIS_AUC_C_NEW_LOC_1', 'ATC (chặn hủy sửa)', MARKETSTATUS_A],// ATC
//     ['LIS_CON_NML_90', 'Đóng cửa (chờ nhận lệnh)', MARKETSTATUS_G],
//     ['LIS_CON_NML_2', 'Nghỉ trưa', MARKETSTATUS_I],
//     ['LIS_CON_NML_1', 'Liên tục', MARKETSTATUS_O],
//     ['LIS_PTH_P_NML_13', 'Đóng cửa (kết thúc nhận lệnh)', MARKETSTATUS_G],
//     ['LIS_PTH_P_NML_1', 'Thỏa thuận', MARKETSTATUS_C],
//     ['LIS_PTH_P_NML_97', 'Đóng cửa', MARKETSTATUS_G],
//     ['LIS_CON_NEW_90', 'Đóng cửa (chờ nhận lệnh)', MARKETSTATUS_G],
//     ['LIS_CON_NEW_2', 'Nghỉ trưa', MARKETSTATUS_I],
//    ['LIS_CON_NEW_1', 'Liên tục', MARKETSTATUS_O],
//    //thêm 2020-02-19 9h28 longht
//    ['BON_CON_NML_1', 'Liên tục', MARKETSTATUS_O], //đã thêm 2020-02-19
//    ['BON_CON_NML_2', 'Nghỉ trưa', MARKETSTATUS_I],//đã thêm 2020-02-19
//    ['BON_PTH_P_NML_13', 'Đóng cửa (kết thúc nhận lệnh)', MARKETSTATUS_G],//đã thêm 2020-02-19
//    ['BON_PTH_P_NML_1', 'Thỏa thuận', MARKETSTATUS_C],//2020-02-19
//    ['BON_PTH_P_NML_97', 'Đóng cửa', MARKETSTATUS_G],//đã thêm 2020-02-19
//    ['BON_AUC_C_NML_1', 'ATC', MARKETSTATUS_A],// ATC
// ];
export const g_arrHOMarketStatus = [
    ['P', 'Bắt đầu đợt KL định kỳ mở cửa', ], // ATO
    ['O', 'Bắt đầu đợt KL lien tục', ],    // continous
    ['A', 'Bắt đầu đợt KL định kỳ đóng cửa', ], // ATC
    ['C', 'Đóng cửa MainBoard', ],
    ['F', 'Kết thúc nghỉ giữa đợt', ],
    ['H', 'Ngưng giao dịch tất cả CK', ],
    ['I', 'Bắt đầu nghỉ giữa đợt', ],
    ['K', 'Kết thúc đợt Runn-off', ],
    ['N', 'Giao dịch trở lại của CK cụ thể', ],
    ['R', 'Giao dịch trở lại tất cả CK', ],
    ['G', 'Đóng cửa', ],
    ['J', 'Đóng cửa', ]
];

 export const g_arrHAMarketStatus = [
  // HNX
  ['LIS_AUC_C_NML_1', 'ATC', ],// ATC
  ['LIS_AUC_C_NML_LOC_1', 'ATC (chặn hủy sửa)', ],// ATC
  ['LIS_AUC_C_NEW_1', 'ATC', ],// ATC
  ['LIS_AUC_C_NEW_LOC_1', 'ATC (chặn hủy sửa)', ],// ATC
  ['LIS_CON_NML_90', 'Đóng cửa (chờ nhận lệnh)', ],
  ['LIS_CON_NML_2', 'Nghỉ trưa', ],
  ['LIS_CON_NML_1', 'Liên tục', ],
  ['LIS_PTH_P_NML_13', 'Đóng cửa (kết thúc nhận lệnh)', ],
  ['LIS_PTH_P_NML_1', 'Thỏa thuận', ],
  ['LIS_PTH_P_NML_97', 'Đóng cửa', ],
  ['LIS_CON_NEW_90', 'Đóng cửa (chờ nhận lệnh)', ],
  ['LIS_CON_NEW_2', 'Nghỉ trưa', ],
 ['LIS_CON_NEW_1', 'Liên tục', ],
 //thêm 2020-02-19 9h28 longht
 ['BON_CON_NML_1', 'Liên tục', ], //đã thêm 2020-02-19
 ['BON_CON_NML_2', 'Nghỉ trưa', ],//đã thêm 2020-02-19
 ['BON_PTH_P_NML_13', 'Đóng cửa (kết thúc nhận lệnh)', ],//đã thêm 2020-02-19
 ['BON_PTH_P_NML_1', 'Thỏa thuận', ],//2020-02-19
 ['BON_PTH_P_NML_97', 'Đóng cửa', ],//đã thêm 2020-02-19
 ['BON_AUC_C_NML_1', 'ATC', ],// ATC
];

export const g_arrUPMarketStatus = [
     // UPCOM
     ['UPC_CON_NML_97', 'Đóng cửa', ],
     ['UPC_CON_NML_13', 'Đóng cửa (kết thúc nhận lệnh)', ],
     ['UPC_CON_NML_1', 'Liên tục', ],
     ['UPC_CON_NML_2', 'Nghỉ trưa', ],
     ['UPC_CON_NML_90', 'Đóng cửa (chờ nhận lệnh)', ],
     ['UPC_CON_NEW_97', 'Đóng cửa', ],
     ['UPC_CON_NEW_13', 'Đóng cửa (kết thúc nhận lệnh)', ],
     ['UPC_CON_NEW_1', 'Liên tục', ],
     ['UPC_CON_NEW_2', 'Nghỉ trưa', ],
     ['UPC_CON_NEW_90', 'Đóng cửa (chờ nhận lệnh)', ]
]; // HuyNQ 25-11-15 HNX_MARKETSTATUS
