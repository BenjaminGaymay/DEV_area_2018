import {query} from "./bdd";

export async function updateAllSubscribedUsers(name, created, data, ids) {
    return new Promise((resolve, reject) => {
        data = data.replace(/'/g, '\\\'');
        data = data.replace(/"/g, '\\\"');
        return query(`UPDATE link set config_action=JSON_SET(config_action, '$.created', '${created}'), updated=TRUE,
                      datas='${data}'
                      WHERE subscribe_id in (${ids.toString()})
                      AND datas != '${data}'
                      AND updated=FALSE
                      AND JSON_CONTAINS(config_action, '"${name}"', '$.name')
                      AND (JSON_EXTRACT(config_action, '$.created') is NULL or JSON_EXTRACT(config_action, '$.created') < '${created}');`)
            .catch(error => {
                // console.log(error);
                console.log(data);
                console.log("reddit_bdd update fail. Reason can be the character encoding");
                return reject('KO');
            })
            .then(result => {
                return resolve('Ok');
            });
    });
}