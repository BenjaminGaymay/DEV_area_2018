import * as Keychain from "react-native-keychain";
import {AsyncStorage} from "react-native";

export async function setApiUrl(url) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('ApiUrl', url, () => {
      return resolve('OK');
    });
  })
}

export async function getApiUrl() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('ApiUrl', (err, result) => {
      console.log(result);
      if (err || result === null) return resolve("http://localhost:8081");
      return resolve(result);
    });
  });
}

export async function resetAccount() {
  Keychain.resetGenericPassword().then(result => {
    return 'Ok';
  }).catch(error => {
    console.log(error);
    return 'KO';
  });
}

export async function setAccountInfo(login, password) {
  return Keychain.setGenericPassword(login, password).then(result => {
    return 'OK';
  }).catch(error => {
    console.log(error);
    return 'KO';
  });
}

export async function getAccountInfo() {
  return new Promise((resolve, reject) => {
    Keychain.getGenericPassword()
      .then(function (credentials) {
        //console.log(credentials);
        return credentials !== false ? resolve({login: credentials.username, password: credentials.password}) : reject('KO');
      })
      .catch(function (error) {
        console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
        return reject('KO');
      });
  });
}