import * as bdd from "./bdd";


export async function findUrlToken(token) {
    return bdd.query(`SELECT * FROM link WHERE subscribe_id = '5'
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