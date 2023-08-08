import axios from 'axios';

const BASE_URL = process.env.BACKEND_URL;

const axiosApi = (url: string, option?: any) => {
    const instance = axios.create({ baseURL: url, ...option });
    return instance;
};

export const defaultAxios = axiosApi(BASE_URL as string);
