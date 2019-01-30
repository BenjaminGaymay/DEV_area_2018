import jwt from "jsonwebtoken";

function isLogged() {
    let token = localStorage.getItem("jwt-token");
    if (token) {
        return true;
    }
    return false;
}

function getLogin() {
    let token = localStorage.getItem("jwt-token");
    if (token) {
        let decodedToken = jwt.decode(token, "secretKey");
        return decodedToken.userInfo.login;
    }
    return "";
}

function auth (token) {
    localStorage.setItem("jwt-token", token);
}

function deAuth() {
    localStorage.removeItem("jwt-token");
}

export {
    deAuth,
    getLogin,
    isLogged,
    auth,
};
