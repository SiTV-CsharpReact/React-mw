var LANGUAGE_VN_FULL = 'vi-VN';
var LANGUAGE_EN_FULL = 'en-US';
// ngon ngu
var LANGUAGE_VN = 'VN';
var LANGUAGE_EN = 'EN';

var ARRAY_INDEX_LANGUAGE = [0,1];
var COOKIE_LANGUAGE_NAME = 'aspfpt_language';
var g_CurrentLanguage = ""
var g_ARRAY_CHART_NAME = ["VNXALL", "VNI", "VN30", "VN100", "VNALL", "VNMID", "VNSML", "HNX", "HNX30", "UPCOM", "HNXLCAP", "HNXSMCAP", "HNXFIN", "HNXMAN", "HNXCON"];
var g_ARRAY_CHART_HIDE_DEFAULT = ["HNXCON", "VNXALL", "VNI", "VN100", "VNALL", "VNMID", "VNSML", "HNX", "HNXLCAP", "HNXSMCAP", "HNXFIN", "HNXMAN", "UPCOM"]; // 2017-04-14 16:13:51 DucKT remove UPCOM.PRE
var g_ARRAY_CHART_NAME_DS = ["VN30F1M", "VN30F2M", "VN30F1Q", "VN30F2Q"];
var g_ARRAY_CLASSIFY_NAME = [
    { 'key': 'HOSE', 'value': ["VNXALL", "VNI", "VN30", "VN100", "VNALL", "VNMID", "VNSML"] }, // "VNDIAMOND", "VNFINLEAD", "VNFINSELECT"
    //{ 'key': 'HOSE', 'value': ["VNI", "VN30", "VN100", "VNALL", "VNMID", "VNSML"] },
    { 'key': 'HNX.NY', 'value': ["HNX", "HNX30", "HNXLCAP", "HNXSMCAP", "HNXFIN", "HNXMAN", "HNXCON"] },
    { 'key': 'HNX.UPCOM', 'value': ["UPCOM"] }  // 2017-04-14 16:13:51 DucKT remove UPCOM.PRE
];
// export const getCookieLanguage =()=>{
//     var name = COOKIE_LANGUAGE_NAME, language = 0;
//     var loadCookies = document.cookie.split(';');
//     var checkCookie = false;
//     for (var i = 0; i < loadCookies.length; i++) {
//         if (loadCookies[i].indexOf('=') == -1) { // kiem tra neu k chua dau = thi next for
//             continue;
//         }
//         var strs = loadCookies[i].split('=');
//         if (strs[0].indexOf(name) > -1 && strs[1] != '') { // neu chua cookie va co du lieu
//             if (strs[1] == LANGUAGE_VN ) {
//                 language = this?.ARRAY_INDEX_LANGUAGE[0];
//                 g_CurrentLanguage = LANGUAGE_VN_FULL;
//             } else {
//                 language = this?.ARRAY_INDEX_LANGUAGE[1];
//                 g_CurrentLanguage = LANGUAGE_EN_FULL;

//             }
//             checkCookie = true;
//             break;
//         }
//     }
//     if (!checkCookie) {
//         language = this.ARRAY_INDEX_LANGUAGE[0];
//         g_CurrentLanguage = LANGUAGE_VN_FULL;
//     }
//     return language;
// }

export const g_arrHOMarketStatus = [
    ['P', 'ATC', ], // ATO
    ['O', 'Liên tục', ],    // continous
    ['A', 'ATC', ], // ATC
    ['C', 'Đóng cửa', ],
    ['F', 'Kết thúc nghỉ giữa đợt', ],
    ['H', 'Ngưng giao dịch tất cả CK', ],
    ['I', 'Bắt đầu nghỉ giữa đợt', ],
    ['K', 'Đóng cửa', ],
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
  ['LIS_PTH_P_NML_13', 'Đóng cửa', ],
  ['LIS_PTH_P_NML_1', 'Thỏa thuận', ],
  ['LIS_PTH_P_NML_97', 'Đóng cửa', ],
  ['LIS_CON_NEW_90', 'Đóng cửa (chờ nhận lệnh)', ],
  ['LIS_CON_NEW_2', 'Nghỉ trưa', ],
 ['LIS_CON_NEW_1', 'Liên tục', ],
 //thêm 2020-02-19 9h28 longht
 ['BON_CON_NML_1', 'Liên tục', ], //đã thêm 2020-02-19
 ['BON_CON_NML_2', 'Nghỉ trưa', ],//đã thêm 2020-02-19
 ['BON_PTH_P_NML_13', 'Đóng cửa', ],//đã thêm 2020-02-19
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
export const g_arrMenuMarket = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
        // Use a two-stage aggregator here to first
        // count the total rows being aggregated,
        // then sum any of those counts if they are
        // aggregated further
        aggregate: 'count',
        //Aggregated: ({ value }) => `${value} Names`,
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        // Use another two-stage aggregator here to
        // first count the UNIQUE values from the rows
        // being aggregated, then sum those counts if
        // they are aggregated further
        aggregate: 'uniqueCount',
        //Aggregated: ({ value }) => `${value} Unique Names`,
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age',
        // Aggregate the average age of visitors
        aggregate: 'average',
        //Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        // Aggregate the sum of all visits
        aggregate: 'sum',
        //Aggregated: ({ value }) => `${value} (total)`,
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        // Use our custom roundedMedian aggregator
        aggregate: 'sum',
        //Aggregated: ({ value }) => `${value} (med)`,
      },
    ],
  },
];
export const g_CLASS_INDEX = [['marn', 'square'], ['maru', 'arrowUp'], ['mard', 'arrowDown']];
export const ARRAY_COL_ATO_ATC_QTTY = [10, 15];  // cell index co hien ATO / ATC
export const g_ID_TD_STAT_CONTROLCODE = 'STAT_ControlCode';
export const g_PARTERN_HNX_MARKETSTATUS = /^(LIS_AUC_C_NML_1|LIS_AUC_C_NML_LOC_1|LIS_CON_NML_90|LIS_CON_NML_2|LIS_CON_NML_1|LIS_PTH_P_NML_13|LIS_PTH_P_NML_1|LIS_PTH_P_NML_97|LIS_CON_NEW_90|LIS_CON_NEW_2|LIS_CON_NEW_1|LIS_AUC_C_NEW_1|LIS_AUC_C_NEW_LOC_1|BON_CON_NML_1|BON_CON_NML_2|BON_PTH_P_NML_13|BON_PTH_P_NML_1|BON_PTH_P_NML_97|BON_AUC_C_NML_1)$/; // HuyNQ 25-11-15 HNX_MARKETSTATUS
export const g_PARTERN_UP_MARKETSTATUS = /^(UPC_CON_NML_97|UPC_CON_NML_13|UPC_CON_NML_1|UPC_CON_NML_2|UPC_CON_NML_90|UPC_CON_NEW_1|UPC_CON_NEW_97|UPC_CON_NEW_13|UPC_CON_NEW_2|UPC_CON_NEW_90)$/; // HuyNQ 25-11-15 HNX_MARKETSTATUS
export const g_ARRAY_COLOR_CLASS = ['*', 'c', 'u', 'r', 'd', 'f', '_'];
export const g_ARRAY_CONTTROL_CODE = ['STAT_ControlCode', 'STAT_Time', 'STAT_Date'];