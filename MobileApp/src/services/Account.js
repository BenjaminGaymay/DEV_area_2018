import * as Keychain from "react-native-keychain";

export async function resetAccount() {
  Keychain.resetGenericPassword().then(result => {
    return 'Ok';
  }).catch(error => {
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
        console.log(credentials);
        return credentials !== false ? resolve({login: credentials.login, password: credentials.password}) : reject('KO');
      })
      .catch(function (error) {
        console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
        return reject('KO');
      });
  });
}