'use strict';

import * as bdd from './src/mysql';
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

function HttpService(req, res) {
    if (!req.params.hasOwnProperty('token')) {
        console.log('HTTP missing parameter');
        res.status(500);
        res.send("KO");
    }
    bdd.findUrlToken(req.params.token).then(result => {
        bdd.getActionReaction(result).then(subscribe => {
            console.log(subscribe);
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
        res.send("URl do not exist");
    });
}


export function router(app) {
    app.post('/http/:token', HttpService);
    app.get('/http/:token', HttpService);

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