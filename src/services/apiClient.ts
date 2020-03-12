import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';

const baseURL = '';

let apiClient: AxiosInstance;

const handleRequestSent = (config: AxiosRequestConfig) => {
  return config;
};
const handleRequestError = (err: AxiosError) => {
  return Promise.reject(err);
};
const handleResponseSuccess = (response: AxiosResponse) => {
  return response;
}
const handleResponseError = (err: AxiosError) => {
  return Promise.reject(err);
}

export const createApiClient = (config: AxiosRequestConfig = {}) => {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL,
      ...config
    });
  }
  apiClient.interceptors.request.use(handleRequestSent, handleRequestError);
  apiClient.interceptors.response.use(handleResponseSuccess, handleResponseError);
  return apiClient;
}
