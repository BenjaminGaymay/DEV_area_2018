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
                let tmp = typeof row.config_action_data === "string" ? JSON.parse(row.config_action_data) : row.config_action_data;
                array.action = result[0];
                array.action.config = row.config_action_data !== null ? tmp : null;
                array.action.data = row.action_data !== null && row.action_data.length !== 0 ? JSON.parse(row.action_data) : null;
            }
            return getServiceById(row.reaction_service_id);
        })
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service reaction ${row.reaction_service_id} not found`);
                array = {};
            } else if (array.action) {
                let tmp = typeof row.config_reaction_data === "string" ? JSON.parse(row.config_reaction_data) : row.config_reaction_data;
                array.reaction = result[0];
                array.reaction.config = row.config_reaction_data !== null ? tmp : null;
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
    return query(`SELECT *
                  FROM service`).catch(error => {
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
    return query(`SELECT *
                  FROM subscribe`).catch(error => {
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

            return query(`INSERT INTO subscribe (user_id, action_service_id, reaction_service_id, config_action_data, config_reaction_data) value ('${user.id}', '${data.actionServiceId}', '${data.reactionServiceId}', '${data.actionServiceData}', '${data.reactionServiceData}')`)
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
 * @param subscribeId
 * @param userId
 * @returns {Promise<boolean | never>}
 */
export async function unsubscribe(subscribeId, userId) {
    return query(`DELETE FROM link WHERE id = ${subscribeId} AND user_id = ${userId};`)
        .catch(error => {
            console.log("unsubscribe fail: id not found or user not match with this subscribe_id");
            return Promise.reject('KO');
        })
        .then(result => {
            return 'OK';
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
        result[0].config_action_data = (result[0].config_action_data == null ? null : JSON.parse(result[0].config_action_data));
        result[0].config_reaction_data = (result[0].config_reaction_data == null ? null : JSON.parse(result[0].config_reaction_data));
        return result;
    })
}

export async function updateSubscribeData(id, action_data, reaction_data) {
    if (typeof action_data !== "string") {
        action_data = JSON.stringify(action_data);
    }
    if (typeof reaction_data !== "string") {
        reaction_data = JSON.stringify(reaction_data);
    }
    //SELECT * FROM `subscribe` WHERE JSON_CONTAINS(action_data, '"bob"', '$.nom')
    return query(`UPDATE subscribe SET updated=TRUE, action_data='${action_data}', reaction_data='${reaction_data}' 
                      WHERE id='${id}';`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            return true;
        });
}

export async function getAllLinkUpdated() {
    return query(`SELECT *
                  FROM link
                  WHERE updated = TRUE`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Service or token not found.');
        })
        .then(result => {
            return result;
        });
}

export async function subscribeIntoLink(subscribeId, userId, action, reaction) {
    action = JSON.stringify(action);
    reaction = JSON.stringify(reaction);

    return query(`INSERT INTO link (user_id, subscribe_id, config_action, config_reaction) 
                            VALUES ('${userId}', '${subscribeId}', '${action}', '${reaction}')`)
        .catch(error => {
            console.log(error);
            return Promise.reject('KO');
        }).then(result => {
            return 'OK';
        });
}