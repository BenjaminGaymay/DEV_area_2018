import mysql from 'mysql'; // mysql nodejs lib is better than mariadb lib
import sha1 from 'sha1'; // gnégnégné j'encrypte en sha1, go me hack
import {bddHost, bddName, bddUser, bddPassword} from "../constant";

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
    host: bddHost,
    user: bddUser,
    password: bddPassword,
    database: bddName
});

bdd.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

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

    console.log(username);
    return getUserByName(username).then(result => {
        console.log('HERE');
        return Promise.reject({msg: `User ${username} already exist`}); //override exception
    }).catch(error => {
        if (typeof error === "object") {
            return Promise.reject(error.msg); //override exception
        }
        console.log('THERE');
        return query(`INSERT INTO user_tmp (email, username, password, token) values ('${email}', '${username}', sha1('${password}'), '${token}')`)
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

    return query(`SELECT * FROM user_tmp WHERE user_tmp.username = '${login}' AND user_tmp.token = '${token}'`)
        .catch(error => {
            console.log(error);
            return Promise.reject('Register unknown error.');
        }).then(result => {
            if (typeof result[0] === "undefined") {
                return Promise.reject(`Register ${login} not found`); //override exception
            }
            let user = result[0];
            return query(`INSERT INTO user (email, username, password) values ('${user.email}', '${user.username}', '${user.password}')`)
                .catch(error => {
                    return Promise.reject(`User ${user.username} already exist`); //override exception
                })
                .then(result => {
                    return query(`DELETE FROM user_tmp WHERE user_tmp.id = '${user.id}'`).catch(error =>
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

    return query(`SELECT * FROM user WHERE username like '${username}'`)
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
function query(sql) {
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
 * @param action_id
 * @param reaction_id
 * @returns {Promise<*>}
 */
async function getActionReaction(row, action_id, reaction_id) {
    let array = {};

    return getServiceById(action_id)//)action_id)
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service action ${action_id} not found`);
            } else {
                array.action = result[0];
                array.action.data = row.action_data.length !== 0 ? JSON.parse(row.action_data) : null;
            }
            return getServiceById(reaction_id);
        })
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service reaction ${reaction_id} not found`);
                array = {};
            } else if (array.action) {
                array.reaction = result[0];
                array.reaction.data = row.reaction_data.length !== 0 ? JSON.parse(row.reaction_data) : null;
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
                let item = getActionReaction(result[i], result[i].action_service_id, result[i].reaction_service_id);
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
 *
 * @param user
 * @param data Subscribe
 * @returns {Promise<void>}
 */
export async function subscribe(user, data) {
    if (!data.hasOwnProperty("actionServiceId") || !data.hasOwnProperty("reactionServiceId")
        || !data.hasOwnProperty("actionServiceData") || !data.hasOwnProperty("reactionServiceData")) {
        return Promise.reject('Missing parameters');
    }
    getServiceById(data.actionServiceId).then(result => {
        getServiceById(data.reactionServiceId).then(result => {

            return query(`INSERT INTO subscribe (user_id, action_service_id, reaction_service_id, action_data, reaction_data) value ('${user.id}', '${data.actionServiceId}', '${data.reactionServiceId}', '${data.actionServiceData}', '${data.reactionServiceData}')`)
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

    return query(`DELETE FROM 'subscribe' WHERE user_id = ${user.id} AND id = ${data.subscribeId};`)
        .catch(error => {
            return Promise.reject('subscribe unknown error.');
        })
        .then(result => {
            return true;
        });
}

export async function isTokenExist(token) {
    return query(`SELECT * FROM 'user_tmp' WHERE token = ${token};`)
        .catch(error => {
            return Promise.reject('Token not exist.');
        })
        .then(result => {
            return true;
        });

}

/* //GOOD
register('admin', 'azertyqwerty').then(result => {
    console.log(result);
}).catch(error => {
    console.log("error: " + error);
});*/

//GOOD
// login('admin', 'azertyqwerty')
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log("error: " + error);
//     });

/* //GOOD
registerService('radio').then(result => {
    console.log(result);
}).catch(error => {
    console.log("error: " + error);
});*/

/* //GOOD
getUserByName('admin')
    .then(user => {
        getUserServices(user.id)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log("error 2: " + error);
            });
    })
    .catch(error => {
        console.log("error 1: " + error);
    });*/


/*bdd.query("SELECT * FROM user", function (err, result) {
    if (err) throw err;
    console.log("Result:");
    console.log(result);
});*/
