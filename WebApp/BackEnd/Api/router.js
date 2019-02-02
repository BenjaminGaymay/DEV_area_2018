'use strict';

import * as bdd from './src/bdd/mysql';
import * as mail from './src/services/mail';
import * as http from './src/services/http';
import ejs from 'ejs';
import fs from 'fs';

function getUnixTime() {
    return Date.now() / 1000 | 0;
}

let mailJson = {
    subject: "Epitech c'est nul",
    html: "",
    to: ["poubelleapipoubelle@gmail.com", "poubelleapipoubelle@gmail.com"],
};

async function createToken() {
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
            await bdd.isTokenExist(value);
            value = token();
        } catch (e) {
            myBreak = true;
        }
    }
    return value;
}

function fusion(dic1, dic2) {
    let result = dic1;
    for (let i in dic2) {
        if (!result.hasOwnProperty(i)) {
            result[i] = dic2[i];
        } else if (result.hasOwnProperty(i) && typeof dic2[i] == "object") {
            result[i] = {...result[i], ...dic2[i]};
        }
    }
    return result;
}

/**
 * @return {boolean}
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function convertData(data) {
    for (let i in data) {
        if (IsJsonString(data[i])) {
            data[i] = JSON.parse(data[i]);
        }
    }
    return data;
}

function manageHttp(services, req, res) {
    services['http'].run('action', 'default', {request: req, response: res}).then(result => {
        result.subscribe.reaction.data = convertData(result.subscribe.reaction.data);

        /* On garde certaines data de la précédante requetes, config en BDD */
        if (result.subscribe.reaction.data.hasOwnProperty('bucket') && result.subscribe.reaction.data.bucket != null) {
            for (let i in result.bucket) {
                if (!result.subscribe.reaction.data.bucket.includes(i))
                    delete result.bucket[i];
            }
        } else { /* Sinon on garde rien */
            result.bucket = {};
        }
        let configData = result.subscribe.reaction.data;
        configData.data = result.bucket;
        services['http'].run('reaction', 'default', configData).then(result => {
            console.log(result);
            res.status(200);
            res.send("OK");
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    }).catch(error => {
        console.log(error);
        res.status(500);
        res.send("KO");
    });
}


export function router(app, services) {
    app.get('/http/:token', (req, res) => {
        manageHttp(services, req, res);
    });
    app.post('/http/:token', (req, res) => {
        manageHttp(services, req, res);
    });

    app.post('/subscribe', (req, res) => {
        bdd.login(req.headers.login, req.headers.password).then(result => {
            bdd.subscribe(result, req.body).then(result => {
                console.log(result);
                res.status(200);
                res.send("OK");
            }).catch(error => {
                console.log(error);
                res.status(500);
                res.send("KO");
            });
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    });

    app.post('/unsubscribe', (req, res) => {
        bdd.login(req.headers.login, req.headers.password).then(result => {
            bdd.unsubscribe(result, req.body).then(result => {
                console.log(result);
                res.status(200);
                res.send("OK");
            }).catch(error => {
                console.log(error);
                res.status(500);
                res.send("KO");
            });
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    });


    app.post('/login', (req, res) => {
        bdd.login(req.body.login, req.body.password).then(result => {
            console.log(result);
            res.status(200);
            res.send("OK");
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    });

    app.get('/validationAccount/:login/:token', (req, res) => {
        if (typeof req.params.login !== "string" && typeof req.params.token !== "string") {
            res.status(500);
            res.send("KO");
        }
        bdd.register(req.params.login, req.params.token).then(result => {
            console.log(result);
            res.status(200);
            res.send("OK");
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    });

    app.post('/register', (req, res) => {
        createToken().then(token => {
            bdd.registerIntoTmp(req.body.email, req.body.login, req.body.password, token)
                .then(result => {
                    console.log('MDR');
                    console.log(result);

                    fs.readFile('./template/mail.ejs', 'utf8', function (err, content) {
                        if (err) return err;
                        let html = ejs.render(content, {
                            token: result.token,
                            login: result.login,
                        });
                        let mailJson = {
                            subject: "Validation inscription",
                            html: html,
                            to: [result.email],
                        };
                        mail.run(JSON.stringify(mailJson)).then(result => {
                            console.log(result);
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    res.status(200);
                    res.send("OK");
                })
                .catch(error => {
                    console.log(error);
                    res.status(500);
                    res.send("KO");
                });
        });
    });


    app.get('/', function (req, res) {
        bdd.getUserByName('admin').then(user => {
            bdd.getUserServices(user.id).then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error); // aucun abonnement
            });
        }).catch(error => {
            console.log(error); // user not found
        });
    });

    app.get('/about.json', (req, res) => {
        const about = JSON.parse(fs.readFileSync('about.json', 'utf8'));

        about.client.host = req.ip.split(':').pop();
        about.server.current_time = getUnixTime();
        res.send(about);
    });
}