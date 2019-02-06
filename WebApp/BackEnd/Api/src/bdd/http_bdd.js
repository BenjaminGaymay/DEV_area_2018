import * as bdd from "mysql";


export async function findUrlToken(token) {
    return bdd.query(`SELECT * FROM subscribe WHERE action_service_id = '9'
                    AND JSON_CONTAINS(config_action_data, '"${token}"', '$.token');`)
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