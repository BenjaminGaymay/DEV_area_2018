import * as env from "../../env";

async function request(url, method, headers, body) {
  try {
    let response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      console.log("Request failed: " + response.status);
      return Promise.reject('KO');
    }
    return 'Ok';
  } catch (e) {
    console.log(e);
    return Promise.reject('KO');
  }
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

export async function register(login, email, password) {
  return post(env.API + "/register", {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, {
    login: login,
    email: email,
    password: password
  });
}