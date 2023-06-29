import axios, { AxiosError } from "axios";
import { API_TIMEOUT, API_URL } from "constant";
import { HttpStatusCode } from "constant/enum";

export const setToken = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearToken = async () => {
  axios.defaults.headers.common["Authorization"] = "";
};

const requestAbortCode = "ECONNABORTED";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = API_TIMEOUT;

const RequestClient = class {
  constructor() {
    //
  }

  async get(endpoint: string, configs = {}) {
    try {
      const response = await axios.get(endpoint, configs);

      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.post(endpoint, body, configs);

      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.put(endpoint, body, configs);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.patch(endpoint, body, configs);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint: string, data?: {}) {
    try {
      const response = await axios.delete(endpoint, { data });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError = async (error) => {
    if (
      error.response &&
      error.response.status === HttpStatusCode.UNAUTHORIZED
    ) {
      // Handle logout/refresh token here...
    }
    if (
      (error.code === requestAbortCode &&
        (error as AxiosError)?.response?.status ===
          HttpStatusCode.TOO_MANY_REQUEST) ||
      ("response" in error && error.response === undefined)
    ) {
      // delay(1000);
      error.recall = true;
    }
    throw error;
  };
};

const client = new RequestClient();

export { client };
