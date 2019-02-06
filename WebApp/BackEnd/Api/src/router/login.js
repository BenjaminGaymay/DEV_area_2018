"use strict";

import * as login_bdd from "../bdd/login_bdd";
import fs from "fs";
import ejs from "ejs";
import * as mail from "../services/mail";
import * as bdd from "../bdd/mysql";

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

export default function router(app, services) {
    app.post("/login", (req, res) => {
        login_bdd(req.body.login, req.body.password).then(result => {
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
        login_bdd.register(req.params.login, req.params.token).then(result => {
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
            login_bdd.registerIntoTmp(req.body.email, req.body.login, req.body.password, token)
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
}