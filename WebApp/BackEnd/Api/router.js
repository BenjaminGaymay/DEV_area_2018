"use strict";

import * as bdd from "./src/bdd/bdd";
import * as login_bdd from "./src/bdd/login_bdd";
import fs from "fs";
import login_router from "./src/router/login"
import http_router from "./src/router/http"

function getUnixTime() {
    return Date.now() / 1000 | 0;
}

export function router(app, services) {
    login_router(app, services);
    http_router(app, services);

    app.get("/test", (req, res) => {
        bdd.getUserToken(2).then(result => {
            console.log(result);
            res.send(result);
        }).catch(error => {
            console.log(error);
            res.status(500).send(JSON.stringify('NTM'));
        })
    })

    app.get("/template", (req, res) => {
        res.render(__dirname + "/template/httpEmailRecap.ejs", {
            datas: {
                method: 'dffdf',
                body: {
                    name: "bob",
                    lastname: "mamadou sacko bounana"
                },
                headers: {
                    host: "ssssssssssssssssssssssssss",
                    dnt: "ssd"
                }
            }
        });
    });

    app.get("/getLinks/:id?/:type?/", (req, res) => {
        if (typeof req.params.id === "undefined") {
            let result = [];
            for (let item of services.getLinks()) {
                if (typeof item.schema != "undefined") {
                    result.push(item.schema());
                }
            }
            return res.status(200).send(result);
        } else {
            let result;
            let links = services.getLinksByID(req.params.id);
            if (typeof links.schema != "undefined") {
                result = links.schema();
            }
            return res.status(200).send(result);
        }
    });

    app.get("/subscribe", (req, res) => {
        login_bdd.login(req.headers.login, req.headers.password).then(result => {
            bdd.getAllUserLinks(result.id).then(result => {
                return res.status(200).send(result);
            }).catch(error => {
                console.log(error);
                return res.status(500).send(JSON.stringify({status: "KO"}));
            });
        }).catch(error => {
            console.log(error);
            return res.status(500).send(JSON.stringify({status: "KO"}));
        });
    });

    app.post("/subscribe", (req, res) => {
        login_bdd.login(req.headers.login, req.headers.password).then(result => {
            if (typeof req.body === "undefined" || !req.body.hasOwnProperty("subscribeId")
                || !req.body.hasOwnProperty("configAction") || !req.body.hasOwnProperty("configReaction")) {
                console.log(req.body);
                console.log("Subscribe body missing parameters");
                return res.status(500).send(JSON.stringify({status: "KO"}));
            }

            try {
                req.body.configAction = JSON.parse(req.body.configAction);
                req.body.configReaction = JSON.parse(req.body.configReaction);
            } catch (e) {
            }
            services.getLinksByID(req.body.subscribeId).subscribe(req.body.subscribeId, result.id, req.body).then(result => {
                res.status(200).send(JSON.stringify({status: "OK"}));
            }).catch(error => {
                console.log(error);
                res.status(500).send(JSON.stringify({status: "KO"}));
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send(JSON.stringify({status: "KO"}));
        });
    });

    app.put("/subscribe", (req, res) => {
        login_bdd.login(req.headers.login, req.headers.password).then(result => {
            if (typeof req.body === "undefined" || !req.body.hasOwnProperty("subscribeId")
                || !req.body.hasOwnProperty("linkId")
                || !req.body.hasOwnProperty("configAction") || !req.body.hasOwnProperty("configReaction")) {
                console.log(req.body);
                console.log("Subscribe body missing parameters");
                return res.status(500).send(JSON.stringify({status: "KO"}));
            }

            try {
                req.body.configAction = JSON.parse(req.body.configAction);
                req.body.configReaction = JSON.parse(req.body.configReaction);
            } catch (e) {
            }
            console.log(req.body);
            bdd.unsubscribeFromLink(req.body.linkId, result.id).then(() => {
                services.getLinksByID(req.body.subscribeId).subscribe(req.body.subscribeId, result.id, req.body).then(result => {
                    res.status(200).send(JSON.stringify({status: "OK"}));
                }).catch(error => {
                    console.log(error);
                    res.status(500).send(JSON.stringify({status: "KO"}));
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send(JSON.stringify({status: "KO"}));
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send(JSON.stringify({status: "KO"}));
        });
    });


    app.post("/unsubscribe", (req, res) => {
        login_bdd.login(req.headers.login, req.headers.password).then(result => {
            if (typeof req.body === "undefined" || !req.body.hasOwnProperty("subscribeId")) {
                console.log("Unsubscribe body missing parameters");
                res.status(500).send(JSON.stringify({status: "KO"}));
            }

            bdd.unsubscribeFromLink(req.body.subscribeId, result.id).then(result => {
                return res.status(200).send(JSON.stringify({status: "OK"}));
            }).catch(error => {
                console.log(error);
                return res.status(500).send(JSON.stringify({status: "KO"}));
            });
        }).catch(error => {
            console.log(error);
            return res.status(500).send(JSON.stringify({status: "KO"}));
        });
    });

    app.get("/about.json", (req, res) => {
        const about = JSON.parse(fs.readFileSync("about.json", "utf8"));

        about.client.host = req.ip.split(':').pop();
        about.server.current_time = getUnixTime();
        res.send(about);
    });

    app.get("/ping", (req, res) => {
        console.log("Ping request");
        res.status(200).send(JSON.stringify("Ok"));
    })
}