"use strict";

import * as bdd from "./src/bdd/mysql";
import * as login_bdd from "./src/bdd/login_bdd";
import * as tools from "./src/tools";
import fs from "fs";
import login_router from "./src/router/login"
import http_router from "./src/router/http"

function getUnixTime() {
    return Date.now() / 1000 | 0;
}

// function fusion(dic1, dic2) {
//     let result = dic1;
//     for (let i in dic2) {
//         if (!result.hasOwnProperty(i)) {
//             result[i] = dic2[i];
//         } else if (result.hasOwnProperty(i) && typeof dic2[i] == "object") {
//             result[i] = {...result[i], ...dic2[i]};
//         }
//     }
//     return result;
// }

export function router(app, services) {
    login_router(app, services);
    http_router(app, services);

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
        // services.getByName("mail").update()
        // bdd.getSubscribeById(6).then(results => {
        //     //console.log(results);
        //
        //     bdd.getActionReaction(results[0]).then(result => {
        //         let configData = tools.postTraitement(result);
        //         console.log(configData);
        //         services.getById(result.reaction.id).run('reaction', 'default', configData).then(result_1 => {
        //             res.status(200).send(result_1);
        //         }).catch(error => {
        //             console.log(error);
        //             res.status(500).send(error);
        //         });
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // });
        /*services.getByName("reddit").update().then(result => {
            services.getByName("reddit").run("action", "default", services).then(results => {
                console.log(results);
            });
            res.status(200);
            res.send("OK");
        });*/
    });

    app.post("/subscribe", (req, res) => {
        login_bdd(req.headers.login, req.headers.password).then(result => {
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
        login_bdd(req.headers.login, req.headers.password).then(result => {
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