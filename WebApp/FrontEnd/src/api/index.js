import axios from "axios";

export const get = (url, headers) => axios.get(url, { headers });

export const post = (url, body = {}, headers = {}) =>
  axios.post(url, body, {
    headers
  });

export const put = (url, body = {}, headers = {}) =>
  axios.put(url, body, {
    headers
  });

export const del = (url, headers = {}) => axios.delete(url, { headers });

export const register = async (url, body) => {
  try {
    await post(url, body);
    return true;
  } catch (e) {
    return false;
  }
};

export const login = (url, body) => post(url, body);
