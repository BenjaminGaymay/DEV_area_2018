import mysql from 'mysql';
import sha1 from 'sha1';

const bdd = mysql.createConnection({
    // host: "b7qwopagdzu8cljf9dtr-mysql.services.clever-cloud.com",
    // user: "uscw77drcqvxjvyzxe91",
    // password: "0mRr9qPZWeeBrcFU01R0",
    // database: "b7qwopagdzu8cljf9dtr"
    host: "localhost",
    user: "root",
    password: "Sm21ChaiseDeMerde",
    database: "area"
});

bdd.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

/**
 *
 * @param username
 * @param password
 * @param callback
 * @returns {Promise<*>}
 */
export async function register(username, password, callback) {

    if (!(typeof username === "string" && typeof password === "string")) {
        return Promise.reject(`Register fail with param.`);
    }

    return query(`INSERT INTO user (username, password) values ('${username}', sha1('${password}'))`)
        .catch(error => {
            return Promise.reject(`User ${username} already exist`); //override exception
        })
        .then(result => {
            return true;
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
            if (typeof result[0] != "undefined" && result[0].password === sha1(password))
                return true;
            else
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
 * requester
 * @param id
 * @returns {boolean}
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
 * @param callback
 * @returns {Promise<*>}
 */
export async function registerService(name, callback) {

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
 * @param action_id
 * @param reaction_id
 * @returns {Promise<void>}
 */
async function getActionReaction(action_id, reaction_id) {
    let array = {};

    return getServiceById(action_id)//)action_id)
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service action ${action_id} not found`);
            } else {
                array.action = result[0];
            }
            return getServiceById(reaction_id);
        })
        .then(result => {
            if (typeof result[0] === "undefined") {
                console.log(`Service reaction ${reaction_id} not found`);
                array = {};
            } else if (array.action) {
                array.reaction = result[0];
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
                promises.push(getActionReaction(result[i].action_service_id, result[i].reaction_service_id));
            }
            return Promise.all(promises);
        })
        .catch(error => {
            return Promise.reject("getUserServices: " + error);
        });
}

/* //GOOD
register('admin', 'azertyqwerty').then(result => {
    console.log(result);
}).catch(error => {
    console.log("error: " + error);
});*/

 //GOOD
login('admin', 'azertyqwerty')
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log("error: " + error);
    });

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
