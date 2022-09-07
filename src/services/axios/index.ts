import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = sessionStorage.getItem('token');

  if (request.headers === null) {
    request.headers = {};

    if (token !== null) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
});

axios.interceptors.response.use((response: AxiosResponse) => {
  console.log(response);
  return response;
});

export default axios;
