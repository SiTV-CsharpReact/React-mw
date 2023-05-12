import axios, { AxiosResponse } from "axios"
const responseBody = (response: AxiosResponse) => response.data;
const BASE_URL = "http://marketstream.fpts.com.vn/";
const URL_EZTRADE = "http://eztrade0.fpts.com"
const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}
const TableHNX = {
    list: (params: URLSearchParams) => requests.get(BASE_URL, params),
    get: () => requests.get(BASE_URL+'/hnx/data.ashx?s=quote&l=HNXIndex'),
}
const TableHSX = {
    list: (params: URLSearchParams) => requests.get(BASE_URL, params),
    get: () => requests.get(BASE_URL+'/hsx/ApiData/get_cache_stockinfo'),
}
const Company ={
    get: () => requests.get('http://localhost:8430/api/stock/v1/cache/stock_info_cn/eztrade?code=ALL'),
}
const Category ={
    get: () => requests.get('http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C222210'),
}
const Ministry ={
    get: () => requests.get('http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/s5g/default/ministry'),
}
const agent = {
    TableHNX,
    TableHSX,
    Company,
    Category,
    Ministry
}
export default agent;
// import axios, { AxiosInstance, AxiosResponse } from "axios";

// const BASE_URL = "http://marketstream.fpts.com.vn/";

// class Api {
//   http: AxiosInstance;
//   constructor() {
//     this.http = axios.create({
//       baseURL: BASE_URL,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   async get<T>(url: string, params?: any): Promise<T> {
//     try {
//       const response = await this.http.get(url, { params });
//       return response.data;
//     } catch (error:any) {
//       throw error.response.data;
//     }
//   }

//   async post<T>(url: string, data?: any): Promise<T> {
//     try {
//       const response = await this.http.post(url, data);
//       return response.data;
//     } catch (error:any) {
//       throw error.response.data;
//     }
//   }

//   async put<T>(url: string, data?: any): Promise<T> {
//     try {
//       const response = await this.http.put(url, data);
//       return response.data;
//     } catch (error:any) {
//       throw error.response.data;
//     }
//   }

//   async delete<T>(url: string): Promise<T> {
//     try {
//       const response = await this.http.delete(url);
//       return response.data;
//     } catch (error:any) {
//       throw error.response.data;
//     }
//   }
// }

// class TableApi {
//   api: Api;
//   constructor(api: Api) {
//     this.api = api;
//   }

//   list(params?: any) {
//     return this.api.get("/", params);
//   }

//   get(id: string) {
//     return this.api.get(`/${id}`);
//   }
// }

// const api = new Api();
// const tableApi = new TableApi(api);

// export { tableApi };
