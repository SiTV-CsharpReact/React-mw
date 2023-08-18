import Cookie from "js-cookie";
//  get cookie token
// export const getCoookieStorage = () => {
//   // lấy cookie
//   const token = Cookie.get("aspfpt_sessiontoken");
//   // const cookie = document.cookie
//   return token;
// };
// // adđ cookie
// export const setCookieToken = (token?: string) => {
//   if (token) {
//     Cookie.set("aspfpt_sessiontoken", token, { expires: 365 });
//     return true;
//   } else {
//     return false;
//   }
// };
//  xóa cookie 
export const RemoveCookie = () => {
  Cookie.remove("aspfpt_sessiontoken");
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
   
  }
  const nametest = "aspfpt_sessiontoken";
  document.cookie = nametest + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return true;
};
