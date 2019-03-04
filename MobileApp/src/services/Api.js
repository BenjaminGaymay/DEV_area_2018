import * as env from "../../env";

async function request(url, method, headers, body) {
  let param = {
    method: method,
    headers: headers,
  };
  if (method !== "GET") param['body'] = JSON.stringify(body);
  try {
    let response = await fetch(url, param);
    if (response.status !== 200) {
      console.log("Request failed: " + response.status);
      return Promise.reject('KO');
    }
    return response.json();
  } catch (e) {
    console.log(e);
    return Promise.reject('KO');
  }
}

export async function put(url, headers, body) {
  return request(url, 'PUT', headers, body);
}

export async function post(url, headers, body) {
  return request(url, 'POST', headers, body);
}

export async function get(url, headers) {
  return request(url, 'GET', headers);
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

export async function subscribe(login, password, subscribeId, configAction, configReaction) {
  return post(env.API + "/subscribe",
    {
      login: login,
      password: password,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, {
      subscribeId: subscribeId,
      configAction: configAction,
      configReaction: configReaction
    });
}

export async function unsubscribe(login, password, subscribeId) {
  return post(env.API + "/unsubscribe",
    {
      login: login,
      password: password,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, {
      subscribeId: subscribeId,
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

export async function getLinks(login, password) {
  return get(env.API + "/getLinks", {
    Accept: 'application/json',
    login: login,
    password: password,
  });
}

export async function getMyLinks(login, password) {
  return get(env.API + "/subscribe", {
    Accept: 'application/json',
    login: login,
    password: password,
  });
}

export async function editThisLink(login, password, linkId, subscribeId, configAction, configReaction) {
  return put(env.API + "/subscribe",
    {
      login: login,
      password: password,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, {
      linkId: linkId,
      subscribeId: subscribeId,
      configAction: configAction,
      configReaction: configReaction
    });
}