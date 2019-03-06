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
    // /* dev */
    host: process.env.BDD_HOST,
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME
});

bdd.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
handleDisconnect(bdd);

function handleDisconnect(client) {
    client.on('error', function (error) {
        if (!error.fatal) return;
        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw error;
        console.error('Re-connection to mysql');
        let mysqlClient = mysql.createConnection(client.config);
        handleDisconnect(mysqlClient);
        mysqlClient.connect();
    });
}

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

export async function isTokenExist(token) {
    return query(`SELECT * FROM user_tmp WHERE token = ${token};`)
        .catch(error => {
            return Promise.reject('Token not exist.');
        })
        .then(result => {
            return true;
        });
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

    var filtered = list.filter(function (el) {
        return el != null;
    });

    if (filtered.length === 0 || filtered[0] === undefined)
        return undefined;
    return filtered;
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

/**
 *
 * @param subscribeId
 * @param userId
 * @returns {Promise<boolean | never>}
 */
export async function unsubscribeFromLink(subscribeId, userId) {
    return query(`DELETE FROM link WHERE id = ${subscribeId} AND user_id = ${userId};`)
        .catch(error => {
            console.log("unsubscribe fail: id not found or user not match with this subscribe_id");
            return Promise.reject('KO');
        })
        .then(result => {
            return 'OK';
        });
}

export async function getAllUserLinks(userId) {
    return query(`SELECT id, subscribe_id, config_action, config_reaction FROM link where user_id = '${userId}'`).catch(error => {
        console.log(error);
        return Promise.reject('KO');
    }).then(result => {
        if (result === null || typeof result[0] === "undefined")
            return null;
        for (let item of result) {
            if (item.config_action != null) {
                item.config_action = JSON.parse(item.config_action);
            }
            if (item.config_reaction != null) {
                item.config_reaction = JSON.parse(item.config_reaction);
            }
        }
        return result;
    })
}

export async function updateUserToken(userId, token) {
    return query(`SELECT * FROM tokens where user_id = '${userId}'`).catch(error => {
        console.log(error);
        return Promise.reject('KO');
    }).then(result => {
        if (result.length == 0) {
            return query(`INSERT INTO tokens (user_id, service_id, token)
            VALUES ('${userId}', '8', '${token}')`)
            .catch(error => {
                console.log(error);
                return Promise.reject('KO');
            }).then(result => {
                return 'OK';
            });

        }
        else {
            return query(`UPDATE tokens SET token='${token}' WHERE user_id='${userId}';`)
            .catch(error => {
                console.log(error);
                return Promise.reject('Service or token not found.');
            })
            .then(result => {
                return true;
            });
        }
        return result;
    })
}

export async function getUserToken(userId) {
    return await query(`SELECT token FROM tokens where user_id = '${userId}'`).catch(error => {
        console.log(error);
        return Promise.reject('KO');
    }).then(result => {
        let datas = JSON.parse(JSON.stringify(result))[0];
        return datas.token;
    })
}