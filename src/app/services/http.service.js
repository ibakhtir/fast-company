import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../config.json";

import authService from "./auth.service";
import {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate
} from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  async (config) => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = `${
        containSlash ? config.url.slice(0, -1) : config.url
      }.json`;
      const expiresDate = getTokenExpiresDate();
      const refreshToken = getRefreshToken();
      if (refreshToken && expiresDate < Date.now()) {
        const data = await authService.refresh();
        setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_id,
          localId: data.user_id
        });
      }
      const accessToken = getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function transformData(data) {
  if (data && !data._id) {
    return Object.keys(data).map((key) => ({
      ...data[key]
    }));
  }
  return data;
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      toast.error("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
};

export default httpService;
