import { getCookie } from './getCookie';

export const LOCAL_PORT = import.meta.env.VITE_REACT_APP_API_URL;
export const PROD_PORT = import.meta.env.VITE_PROD_APP_API_URL;
console.log(import.meta.env.MODE);
const dev_mode = import.meta.env.MODE === 'development';
export async function customFetch(
  url: string,
  options: {
    method?: string;
    body?: any;
    headers?: { [key: string]: string };
    credentials?: RequestCredentials;
  }
) {
  const defaultHeaders = {
    // Authorization: getCookie('session'),
  };

  const opts = {
    ...options,
    headers: {
      ...options.headers,
      ...defaultHeaders,
    },
  };

  const loginUrl = '/login'; // url страницы для авторизации
const response = await fetch(`${dev_mode ? LOCAL_PORT : PROD_PORT}${url}`, opts);
if (!response.ok) {
  console.log(response);

  throw new Error(`HTTP error! Status: ${response.status}`);
}

return await response.json();
  // // eslint-disable-next-line no-useless-catch
  // try {
  //   // console.log(getCookie('session'));
  //   if (!getCookie('session')) {
  //     localStorage.removeItem('persist:root');

  //     // если в sessionStorage присутствует tokenData, то берем её
  //     return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
  //   }
  //   const response = await fetch(`${dev_mode ? LOCAL_PORT : PROD_PORT}${url}`, opts);
  //   if (response.ok) {
  //     return Promise.resolve(response);
  //   }
  // } catch (error) {
  //   throw error;
  // }
}

export default customFetch;
