import * as Account from "./Account"


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
    return response.json().then(result => {
      return result;
    }).catch(error => {
      return null;
    });
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
  let url = await Account.getApiUrl();
  return post(url + "/login", {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, {
    login: login,
    password: password
  });
}

export async function subscribe(login, password, subscribeId, configAction, configReaction) {
  let url = await Account.getApiUrl();
  return post(url + "/subscribe",
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
  let url = await Account.getApiUrl();
  return post(url + "/unsubscribe",
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
  let url = await Account.getApiUrl();
  return post(url + "/register", {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, {
    login: login,
    email: email,
    password: password
  });
}

export async function getLinks(login, password) {
  let url = await Account.getApiUrl();
  return get(url + "/getLinks", {
    Accept: 'application/json',
    login: login,
    password: password,
  });
}

export async function getMyLinks(login, password) {
  let url = await Account.getApiUrl();
  return get(url + "/subscribe", {
    Accept: 'application/json',
    login: login,
    password: password,
  });
}

export async function ping(url) {
  return get(url + "/ping", {
    Accept: 'application/json',
  });
}

export async function editThisLink(login, password, linkId, subscribeId, configAction, configReaction) {
  let url = await Account.getApiUrl();
  return put(url + "/subscribe",
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