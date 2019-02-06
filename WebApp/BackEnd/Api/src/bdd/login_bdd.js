import * as bdd from "./bdd";
import sha1 from "sha1";

/**
 *
 * @param email
 * @param username
 * @param password
 * @param token
 * @returns {Promise<*>}
 */
export async function registerIntoTmp(email, username, password, token) {
    if (!(typeof email === "string" && typeof username === "string"
        && typeof password === "string" && typeof token === "string")) {
        return Promise.reject(`RegisterIntoTmp fail with param.`);
    }

    return bdd.getUserByName(username).then(result => {
        return Promise.reject({msg: `User ${username} already exist`}); //override exception
    }).catch(error => {
        if (typeof error === "object") {
            return Promise.reject(error.msg); //override exception
        }
        return bdd.query(`INSERT INTO user_tmp (email, username, password, token) values ('${email}', '${username}', sha1('${password}'), '${token}')`)
            .catch(error => {
                return Promise.reject(`User ${username} already exist`); //override exception
            })
            .then(result => {
                return {token: token, login: username, email: email};
            });
    });
}

/**
 *
 * @param login
 * @param token
 * @returns {Promise<*>}
 */
export async function register(login, token) {

    if (!(typeof login === "string" && typeof token === "string")) {
        return Promise.reject(`Register fail with param.`);
    }

    return bdd.query(`SELECT * FROM user_tmp WHERE user_tmp.username = '${login}' AND user_tmp.token = '${token}'`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Register unknown error.');
        }).then(result => {
            if (typeof result[0] === "undefined") {
                return Promise.reject(`Register ${login} not found`); //override exception
            }
            let user = result[0];
            return bdd.query(`INSERT INTO user (email, username, password) values ('${user.email}', '${user.username}', '${user.password}')`)
                .catch(error => {
                    return Promise.reject(`User ${user.username} already exist`); //override exception
                })
                .then(result => {
                    return bdd.query(`DELETE FROM user_tmp WHERE user_tmp.id = '${user.id}'`).catch(error =>
                        console.log("Register: DELETE: OMFG comment c'est possible !")).then(result => {
                        return "Ok";
                    });
                });
        });
}


/**
 *
 * @param username
 * @param password
 * @param callback
 * @returns {Promise<*>}
 */
export async function login(username, password, callback) {
    if (!(typeof username == "string" && typeof password === "string")) {
        return Promise.reject(`Login fail with param.`);
    }

    return bdd.query(`SELECT * FROM user WHERE username like '${username}'`)
        .catch(error => {
            return Promise.reject(`Login unknown error.`);
        })
        .then(result => {
            if (typeof result[0] != "undefined" && result[0].password === sha1(password)) {
                delete result[0].password;
                return result[0];
            } else
                return Promise.reject(`Username or password not match.`); //override exception
        });
}