import axios, { AxiosResponse } from "axios";
import { RPChart } from "../models/modelChart";
const responseBody = (response: AxiosResponse) => response.data;
const BASE_URL1 = "http://priceboard3.fpts.com.vn/";
const BASE_URL = "https://eztrade.fpts.com.vn/";

const URL_EZTRADE = "http://eztrade0.fpts.com";
// mặc định gửi authenticated token lên
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + "auth_token";
// axios.interceptors.request.use(
//     config => {
//       config.headers.Authorization = 'Bearer ' + "auth_token";
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  postFormData: (url: string, body: {}) =>
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const responseBody = response;
        return responseBody;
      })
      .catch((error) => {
        console.log("Lỗi trong quá trình gửi yêu cầu: " + error);
        throw error;
      }),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
const TableHNX = {
  list: (params: URLSearchParams) =>
    requests.get(BASE_URL + "hnx/data.ashx", params),
  get: () => requests.get(BASE_URL + "/hnx/data.ashx?s=quote&l=HNXIndex"),
  getOneStock: (params:string) => requests.get(BASE_URL + `/hnx/data.ashx?s=quote&l=${params}`),
};
const TableHSX = {
  list: (params: URLSearchParams) =>
    requests.get(BASE_URL + "hsx/data.ashx", params),
  get: () => requests.get(BASE_URL + "/hsx/data.ashx?s=quote&l=All"),
  getOneStock: (params:string) => requests.get(BASE_URL + `/hsx/data.ashx?s=quote&l=${params}`),
};
const Index = {
  get: (params:string) =>
    requests.get(
      BASE_URL+`${params}/data.ashx?s=index`
    ),
};
const Company = {
  get: () =>
    requests.get(
      "http://priceboard3.fpts.com.vn/api/ApiData/get_cache_stockinfo"
    ),
};

const Category = {
  get: () =>
    requests.get(
      "http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C000700"
    ),
  // fetch  đata
  fetchData: () => requests.get("http://localhost:30/categori"),
};
const Ministry = {
  get: () =>
    requests.get(
      "hhttp://priceboard3.fpts.com/api/stock/v1/mw/s5g/default/ministry"
    ),
};
const ListDataTable = {
  list: (floor: string, valueParam: string) =>
    requests.get(
      BASE_URL+`${floor}/data.ashx?${valueParam}`
    ),
};
const dataGDTTtable = {
  listPt: (floor: string) =>
    requests.get(BASE_URL+`${floor}/data.ashx?s=pt`),
    listBi: (floor: string) =>
    requests.get(BASE_URL+`${floor}/data.ashx?s=bi`),
    
};
const chartIndex = {
  get: () =>
    requests.get("https://marketstream.fpts.com.vn/chart/data.ashx?s=full"),
  //get: () => requests.get('http://localhost:8000/dataChartIndex'),
};
var formData = new FormData();
formData.append('key1', 'value1')
formData.append('key2', 'value2')
const dataTableBasic ={ 
    post: (dataValueBasic:RPChart) => requests.post(BASE_URL+"/Root/Data.ashx", dataValueBasic),
    postFormData: (dataValueBasic:RPChart) =>requests.postFormData(BASE_URL+"/Root/Data.ashx", dataValueBasic)   
}
// table Lịch sử khớp lệnh
const report = {
    get : () => requests.get("http://localhost:2000/data"),
    getHisOrder : () =>  requests.get("http://localhost:2000/orderHis")
}
const transfer = {
    getdataTempalte : ()=> requests.get("  http://localhost:2000/dataTranfer"),
    hometransferds : ()=> requests.get("http://localhost:2000/dataTransferds")
}
const tableThongke = {
    getdataThongke :(params :any) => requests.get(`${BASE_URL}/hnx/data.ashx?${params}`),
    sortThongkeIndex : (query : any) =>requests.post(BASE_URL+"/Root/Data.ashx", query),
    dataHNX :  ()=>  requests.get("http://localhost:1420/DataHNX"),
    dataHSX :  ()=>  requests.get("http://localhost:1420/DataHSX"),
}
const agent = {
    TableHNX,
    TableHSX,
    Index,
    Company,
    Category,
    Ministry,
    ListDataTable,
    dataGDTTtable,
    chartIndex,
    dataTableBasic,
    report,
    transfer,
    tableThongke
}
export default agent;

