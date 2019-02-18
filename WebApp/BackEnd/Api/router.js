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
            res.send(result);
        } else {
            let result;
            let links = services.getLinksByID(req.params.id);
            if (typeof links.schema != "undefined") {
                result = links.schema();
            }
            res.status(200).send(result);
        }
    });

    app.post("/subscribe", (req, res) => {
        login_bdd.login(req.headers.login, req.headers.password).then(result => {
            if (typeof req.body === "undefined" || !req.body.hasOwnProperty("subscribeId")
                || !req.body.hasOwnProperty("configAction") || !req.body.hasOwnProperty("configReaction")) {
                console.log("Subscribe body missing parameters");
                res.status(500).send("KO");
            }

            req.body.configAction = JSON.parse(req.body.configAction);
            req.body.configReaction = JSON.parse(req.body.configReaction);
            services.getLinksByID(req.body.subscribeId).subscribe(req.body.subscribeId, result.id, req.body).then(result => {
                res.status(200).send("OK");
            }).catch(error => {
                console.log(error);
                res.status(500).send("KO");
            });
        }).catch(error => {
            console.log(error);
            res.status(500).send("KO");
        });
    });

    app.post("/unsubscribe", (req, res) => {
        login_bdd.login(req.headers.login, req.headers.password).then(result => {
            if (typeof req.body === "undefined" || !req.body.hasOwnProperty("subscribeId")) {
                console.log("Unsubscribe body missing parameters");
                res.status(500).send("KO");
            }

            bdd.unsubscribeFromLink(req.body.subscribeId, result.id).then(result => {
                res.status(200).send("OK");
            }).catch(error => {
                console.log(error);
                res.status(500).send("KO");
            });
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    });

    app.get("/about.json", (req, res) => {
        const about = JSON.parse(fs.readFileSync("about.json", "utf8"));

        about.client.host = req.ip.split(':').pop();
        about.server.current_time = getUnixTime();
        res.send(about);
    });
}