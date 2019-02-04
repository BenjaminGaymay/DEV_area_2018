import {query} from "./mysql";

export async function updateAllSubscribedUsers(name, created, data) {
    data = data.replace(/'/g, "\\'");
    return query(`UPDATE subscribe set config_action_data=JSON_SET(config_action_data, '$.created', '${created}'), updated=TRUE,
                      action_data='${data}'
                      WHERE action_service_id = '10' 
                      AND updated=FALSE
                      AND JSON_CONTAINS(config_action_data, '"${name}"', '$.name')
                      AND JSON_EXTRACT(config_action_data, '$.created') < '${created}';`)
        .catch(error => {
            console.log(error);
            return Promise.reject('reddit_bdd update fail.');
        })
        .then(result => {
            return 'Ok';
        });
}


export async function getAllUpdated() {
    return query(`SELECT * FROM subscribe WHERE action_service_id = '10'
                      AND updated = TRUE`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Reddit bdd error in selection.');
        }).then(result => {
            return result;
        });
}