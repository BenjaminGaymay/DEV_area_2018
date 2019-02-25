import * as bdd from "./bdd";

export async function isUrlTokenExist(token) {
    return bdd.query(`SELECT * FROM link WHERE subscribe_id = '91'
                    AND JSON_CONTAINS(config_action, '"${token}"', '$.token');`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            return typeof result[0] != "undefined";
        });
}

export async function createToken() {
    let rand = function () {
        return Math.random().toString(36).substr(2); // remove 0.
    };

    let token = function () {
        return rand() + rand(); // to make it longer
    };
    let value = token();
    let myBreak = false;
    while (!myBreak) {
        try {
            let bool = await isUrlTokenExist(value);
            if (!bool) {
                return value;
            }
        } catch (e) {
            return Promise.reject('KO');
        }
    }
    return value;
}

export async function findUrlToken(token) {
    return bdd.query(`SELECT * FROM link WHERE subscribe_id = '91'
                    AND JSON_CONTAINS(config_action, '"${token}"', '$.token') LIMIT 1;`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            if (typeof result[0] == "undefined") {
                return Promise.reject('Token not match.');
            }
            return result[0];
        });
}