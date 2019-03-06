import axios from "axios";

export const get = (url, headers) =>
  fetch(url, {
    method: "GET",
    headers: headers
  }).then(res => (res.status === 200 ? res.json() : null));


// export const get = (url, headers) => axios.get(url, { headers });

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
    const res = await post(url, body);
    return res.status === 200;
  } catch (e) {
    return false;
  }
};

export const login = async (url, body) => {
  try {
    const res = await post(url, body);
    return res.status === 200;
  } catch (e) {
    return false;
  }
};

export const allLinks = async headers => {
  try {
    return await get(`${process.env.REACT_APP_API}/getLinks`, headers);
  } catch (e) {
    return e;
  }
};

export const myLinks = async headers => {
  try {
    return await get(`${process.env.REACT_APP_API}/subscribe`, headers);
  } catch (e) {
    return e;
  }
};
