import * as env from "../../env";

async function request(url, method, headers, body) {
  return fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  });
}

export async function post(url, headers, body) {
  return request(url, 'POST', headers, body);
}

export async function get(url, headers) {
  return request(url, 'GET', headers, "");
}

export async function login(login, password) {
  return post(env.API + "/login", {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, {
    login: login,
    password: password
  });
}