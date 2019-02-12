import mysql from 'mysql'; // mysql nodejs lib is better than mariadb lib
import sha1 from 'sha1'; // gnégnégné j'encrypte en sha1, go me hack

// mariadb 10.2 autorise le json: du coup youpi on peut faire un select avec
// comparaison dans un text json ex: action_date = {"nom" : "bob", "id": 2}
//SELECT * FROM `subscribe` WHERE JSON_CONTAINS(action_data, '"bob"', '$.nom')
// et boom ça marche.
// Par contre MDR chez vous ça marchera pas car vous avez mariadb 10.1 ahha lol

const bdd = mysql.createConnection({
    /* prod*/
    // host: "b7qwopagdzu8cljf9dtr-mysql.services.clever-cloud.com",
    // user: "uscw77drcqvxjvyzxe91",
    // password: "0mRr9qPZWeeBrcFU01R0",
    // database: "b7qwopagdzu8cljf9dtr"
    /* dev */
    host: process.env.BDD_HOST,
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME
});

bdd.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

/**
 *
 * @param username
 * @returns {Promise<*>}
 */
export async function getUserByName(username) {
    if (!(typeof username === "string")) {
        return Promise.reject(`getUserByName fail with param.`);
    }

    return query(`SELECT id, username FROM user WHERE username like '${username}'`)
        .catch(error => {
            return Promise.reject(`getUserByName unknown error.`);
        })
        .then(
            data => {
                if (typeof data[0] === "undefined") {
                    return Promise.reject('User not found.');
                }
                return data[0];
            });
}

/**
 *
 * @param userId
 * @returns {Promise<*>}
 */
export async function getUserSuscribe(userId) {
    if (!(typeof userId === "number")) {
        return Promise.reject(`getUserSuscribe fail with param.`);
    }
    return query(`SELECT * FROM subscribe WHERE user_id like '${userId}'`)
        .catch(error => {
            return Promise.reject(`getUserSuscribe unknown error.`);
        })
        .then(result => {
            if (typeof result[0] === "undefined")
                return Promise.reject('getUsersubscribe userId not found.');
            return result;
        });
}


/**
 *
 * @param sql
 * @returns {Promise<any>}
 */
export function query(sql) {
    return new Promise((resolve, reject) => {
        bdd.query(sql, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
export async function getServiceById(id) {
    if (!(typeof id === "number")) {
        return Promise.reject('getServiceById fail with param.');
    }

    return query(`SELECT * FROM service WHERE service.id like '${id}'`);
}

/**
 *
 * @param name
 * @returns {Promise<*>}
 */
export async function getServiceDatasByName(name) {
    if (!(typeof name === "string")) {
        return Promise.reject('getServiceByName fail with param.');
    }

    return query(`SELECT datas FROM service WHERE service.filename like '${name}'`).then(result => {
        return JSON.parse(JSON.stringify(result))[0].datas;
    }).catch(error => {
        console.log(error);
        return Promise.reject("Error");
    });
}

/**
 *
 * @param name
 * @param datas
 * @returns {Promise<*>}
 */
export async function setServiceDatasByName(name, datas) {

    if (!(typeof name == "string")) {
        return Promise.reject('setServiceDatasByName fail with param.');
    }

    return query(`UPDATE service SET datas = '${datas}' WHERE filename like '${name}'`);
}

/**
 *
 * @param name
 * @returns {Promise<*>}
 */
export async function registerService(name) {

    if (!(typeof name == "string")) {
        return Promise.reject('registerService fail with param.');
    }

    return query(`INSERT INTO service (name) value ('${name}')`)
        .catch(error => {
            return Promise.reject(`registerService ${name} already exist.`);
        })
        .then(result => {
            return true;
        });
}

/**
 *
 * @param row
 * @returns {Promise<*>}
 */
export async function getActionReaction(row) {
    let array = {};

    return getServiceById(row.action_service_id)//)action_id)
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service action ${row.action_service_id} not found`);
            } else {
                let tmp = typeof row.config_action === "string" ? JSON.parse(row.config_action) : row.config_action;
                array.action = result[0];
                array.action.config = row.config_action !== null ? tmp : null;
                array.action.data = row.action_data !== null && row.action_data.length !== 0 ? JSON.parse(row.action_data) : null;
            }
            return getServiceById(row.reaction_service_id);
        })
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service reaction ${row.reaction_service_id} not found`);
                array = {};
            } else if (array.action) {
                let tmp = typeof row.config_reaction === "string" ? JSON.parse(row.config_reaction) : row.config_reaction;
                array.reaction = result[0];
                array.reaction.config = row.config_reaction !== null ? tmp : null;
                array.reaction.data = row.reaction_data !== null && row.reaction_data.length !== 0 ? JSON.parse(row.reaction_data) : null;
            }
            return array;
        });
}

/**
 *
 * @param user_id
 * @returns {Promise<void>}
 */
export async function getUserServices(user_id) {
    return getUserSuscribe(user_id)
        .then(result => {
            let promises = [];

            for (let i in result) {
                let item = getActionReaction(result[i]);
                promises.push(item);
            }
            return Promise.all(promises);
        })
        .catch(error => {
            console.log(error);
            return Promise.reject("Aucun abonnement valide");
        });
}

/**
 * @returns {Promise<void>}
 */
export async function getAllServices() {
    return query(`SELECT * FROM service`).catch(error => {
        return Promise.reject('subscribe unknown error.');
    }).then(result => {
        if (typeof result[0] == "undefined") {
            return Promise.reject('Any service available.');
        }
        return result;
    });
}

/**
 * @returns {Promise<void>}
 */
export async function getAllSubscribes() {
    return query(`SELECT * FROM subscribe`).catch(error => {
        return Promise.reject('subscribe unknown error.');
    }).then(result => {
        if (typeof result[0] == "undefined") {
            return Promise.reject('Any service available.');
        }
        return result;
    });
}

/**
 *
 * @param user
 * @param data Subscribe
 * @returns {Promise<void>}
 */
export async function subscribe(user, data) {
    if (typeof data === "undefined" || !data.hasOwnProperty("actionServiceId") || !data.hasOwnProperty("reactionServiceId")
        || !data.hasOwnProperty("actionServiceData") || !data.hasOwnProperty("reactionServiceData")) {
        return Promise.reject('Missing parameters');
    }
    getServiceById(data.actionServiceId).then(result => {
        getServiceById(data.reactionServiceId).then(result => {

            return query(`INSERT INTO subscribe (user_id, action_service_id, reaction_service_id, config_action, config_reaction) value ('${user.id}', '${data.actionServiceId}', '${data.reactionServiceId}', '${data.actionServiceData}', '${data.reactionServiceData}')`)
                .catch(error => {
                    return Promise.reject('subscribe unknown error.');
                })
                .then(result => {
                    return true;
                });
        }).catch(error => {
            return Promise.reject("Service not found.");
        });
    }).catch(error => {
        return Promise.reject("Service not found.");
    });
}

/**
 *
 * @param user
 * @param data Subscribe
 * @returns {Promise<void>}
 */
export async function unsubscribe(user, data) {
    if (!data.hasOwnProperty("subscribeId") || typeof data.subscribeId != "number") {
        return Promise.reject('Missing parameters');
    }

    return query(`DELETE FROM subscribe WHERE user_id = ${user.id} AND id = ${data.subscribeId};`)
        .catch(error => {
            return Promise.reject('subscribe unknown error.');
        })
        .then(result => {
            return true;
        });
}

export async function isTokenExist(token) {
    return query(`SELECT * FROM user_tmp WHERE token = ${token};`)
        .catch(error => {
            return Promise.reject('Token not exist.');
        })
        .then(result => {
            return true;
        });
}

export async function getSubscribeById(id) {
    return query(`SELECT * FROM subscribe WHERE id = '${id}';`).catch(error => {
        console.log(error);
    }).then(result => {
        if (typeof result[0] == "undefined") {
            return Promise.reject('GetSubscribeById: Empty result.');
        }
        result[0].config_action = (result[0].config_action == null ? null : JSON.parse(result[0].config_action));
        result[0].config_reaction = (result[0].config_reaction == null ? null : JSON.parse(result[0].config_reaction));
        return result;
    })
}

export async function getLinkByActionLinkIdList(idList) {
    let list = [];

    for (const id of idList) {
        list.push(await query(`SELECT * FROM link WHERE subscribe_id = '${id}';`).catch(error => {
                console.log(error);
            }).then(result => {
                if (typeof result[0] != "undefined") {
                    let datas = JSON.parse(JSON.stringify(result))[0];
                    datas.config_action = datas.config_action == null ? null : JSON.parse(datas.config_action);
                    datas.config_reaction = datas.config_reaction == null ? null : JSON.parse(datas.config_reaction);
                    datas.datas = datas.datas == null ? null : JSON.parse(datas.datas);
                    return datas;
                }
            }));
    }

    if (list.length === 0 || list[0] == undefined)
        return undefined;
    return list;
}

export async function findUrlToken(token) {
    console.log(token);
    //SELECT * FROM `subscribe` WHERE JSON_CONTAINS(action_data, '"bob"', '$.nom')
    return query(`SELECT * FROM subscribe WHERE action_service_id = '9'
                    AND JSON_CONTAINS(config_action, '"${token}"', '$.token');`)
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

export async function updateLinkData(id, datas) {
    if (typeof datas !== "string") {
        datas = JSON.stringify(datas);
    }

    return query(`UPDATE link SET updated=TRUE, datas='${datas}'
                      WHERE id='${id}';`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            return true;
        });
}

export async function setLinksUpdatedFalse(id) {
    //SELECT * FROM `subscribe` WHERE JSON_CONTAINS(action_data, '"bob"', '$.nom')
    return query(`UPDATE link SET updated=FALSE WHERE id='${id}';`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            return true;
        });
}

export async function getAllLinkUpdated() {
    return query(`SELECT * FROM link WHERE updated = TRUE`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            return result;
        });
}