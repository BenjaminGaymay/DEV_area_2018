"use strict";

import * as bdd from "./src/bdd/mysql";
import * as tools from "./src/tools";
import * as mail from "./src/services/mail";
import ejs from "ejs";
import fs from "fs";

function getUnixTime() {
    return Date.now() / 1000 | 0;
}


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

function Http(req, res, services) {
    services.getByName("http").update(services, req, res).then(result => {
        console.log(result);
        res.status(200);
        res.send("OK");
    }).catch(error => {
        console.log(error);
        res.status(500);
        res.send("KO");
    });
}

export function router(app, services) {
    app.get("/getService/:name?/:type?/:widget?", (req, res) => {
        if (typeof req.params.name === "undefined") {
            let result = [];
            for (let item in services.getServices()) {
                console.log(services.getServices()[item]);
                result.push({name: item, id: services.getServices()[item].id, schema: services.getServices()[item].getSchema()});
            }
            res.send(result);
        } else {
            let service = services.getByName(req.params.name);
            if (typeof service === "undefined") res.status(500).send('KO');
            let result = tools.getSchema(service.getSchema(), req.params.type, req.params.widget);
            if (result === null) return res.status(500).send("Invalid parameters.");
            res.status(200).send(result);
        }
    });

    app.get("/test", (req, res) => {
        bdd.getSubscribeById(6).then(results => {
            //console.log(results);

            bdd.getActionReaction(results[0]).then(result => {
                let configData = tools.postTraitement(result);
                console.log(configData);
                services.getById(result.reaction.id).run('reaction', 'default', configData).then(result_1 => {
                    res.status(200).send(result_1);
                }).catch(error => {
                    console.log(error);
                    res.status(500).send(error);
                });
                /*let configData = tools.postTraitement(result);
                services.getById(results.reaction_service_id).run('reaction', 'default', configData).then(result_1 => {
                    resolve('OK');
                }).catch(error => {
                    reject(error);
                });*/
            }).catch(error => {
                console.log(error);
            });
        });
        /*services.getByName("reddit").update().then(result => {
            services.getByName("reddit").run("action", "default", services).then(results => {
                console.log(results);
            });
            res.status(200);
            res.send("OK");
        });*/
    });

    app.get("/http/:token", (req, res) => {
        return Http(req, res, services);
    });
    app.post("/http/:token", (req, res) => {
        return Http(req, res, services);
    });

    app.post("/subscribe", (req, res) => {
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

    app.post("/unsubscribe", (req, res) => {
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


    app.post("/login", (req, res) => {
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

    app.get("/validationAccount/:login/:token", (req, res) => {
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

    app.post("/register", (req, res) => {
        createToken().then(token => {
            bdd.registerIntoTmp(req.body.email, req.body.login, req.body.password, token)
                .then(result => {
                    console.log("MDR");
                    console.log(result);

                    fs.readFile("./template/mail.ejs", "utf8", function (err, content) {
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
                        mail.run('reaction', 'default', mailJson).then(result => {
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


    app.get("/", function (req, res) {
        bdd.getUserByName("admin").then(user => {
            bdd.getUserServices(user.id).then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error); // aucun abonnement
            });
        }).catch(error => {
            console.log(error); // user not found
        });
    });

    app.get("/about.json", (req, res) => {
        const about = JSON.parse(fs.readFileSync("about.json", "utf8"));

        about.client.host = req.ip.split(':').pop();
        about.server.current_time = getUnixTime();
        res.send(about);
    });
}