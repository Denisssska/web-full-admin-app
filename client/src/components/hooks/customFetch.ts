import { getCookie } from './getCookie';

export const PORT = import.meta.env.VITE_REACT_APP_API_URL;

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
  const tokenData = null; // объявляем локальную переменную tokenData
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(getCookie('session'));
    if (!getCookie('session')) {
      localStorage.removeItem('persist:root');

      // если в sessionStorage присутствует tokenData, то берем её
      return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
    }
    const response = await fetch(`${PORT}${url}`, opts);
    if (response.ok) {
      return Promise.resolve(response);
    }
  } catch (error) {
    throw error;
  }
}

export default customFetch;
