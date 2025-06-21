import axios, {AxiosResponse} from 'axios';
import {HISTORY_URL} from '../constants';

axios.defaults.baseURL = HISTORY_URL;

const responseBody = (response: AxiosResponse) => response.data;

class HttpClient {
  baseUrl?: string;
  headers?: any;

  constructor(settings: {baseUrl?: string; headers?: any}) {
    this.baseUrl = settings.baseUrl;
    this.headers = settings.headers;
  }

  addHeader = (key: string, value: string) => {
    this.headers = {
      ...this.headers,
      [key]: value,
    };
  };

  get = <T>(url: string, headers?: any): Promise<T> => {
    return axios
      .get(url, {
        headers: {
          ...this.headers,
          ...headers,
        },
      })
      .then(responseBody);
  };
}

export default new HttpClient({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});
