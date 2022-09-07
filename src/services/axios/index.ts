import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  if (request.headers != null) {
    request.headers.Authorization = `Bearer ${
      sessionStorage.getItem('token') ?? ''
    }`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data
);

export default axiosInstance;
