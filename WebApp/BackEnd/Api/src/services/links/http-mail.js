import fs from "fs";
import ejs from "ejs";
import * as mail from "../mail";
import * as bdd from "../../bdd/bdd";

export const name = 'httpMail';
export const id = 91;

export async function run(subscribe, req, res) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/httpEmailRecap.ejs", "utf8", function (err, content) {
            if (err) return reject('KO');
            if (subscribe.datas === null) subscribe.datas = {};
            subscribe.datas.token = subscribe.config_action.token;
            subscribe.datas.body = req.body;
            subscribe.datas.headers = req.headers;
            subscribe.datas.query = req.query;
            let html = ejs.render(content, {
                datas: subscribe.datas,
            });

            let mailJson = {
                subject: "Une requête a été reçu !",
                html: html,
                to: [subscribe.config_reaction.to],
            };
            return mail.run(mailJson).then(result => {
                console.log(result);
                return resolve('OK');
            }).catch(error => {
                console.log(error);
                return reject('KO');
            });
        });
    });
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("token"));
}

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("to"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction) || !checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"token": bodyParam.configAction.token};
        let reaction = {"to": bodyParam.configReaction.to};
        bdd.subscribeIntoLink(subscribeId, userId, action, reaction).then(result => {
            return resolve('OK');
        }).catch(error => {
            return reject('KO');
        });
    })
}

export function getSchema() {
    return {
        id: id,
        name: "Http vers email",
        description: "Envoyez un email si votre url reçoit une requête",
        url: "http://pngimages.net/sites/default/files/letter-closed-png-image-38869.png",
        action: {
            title: "Http",
            config: {
                method: {
                    type: "checkbox",
                    values: ["GET", "POST"],
                    label: "HTTP verb"
                },
                url: {
                    type: "string",
                    label: "Url"
                },
                headers: {
                    type: "array",
                    label: "Variable d'en-tête"
                }
            }
        },
        reaction: {
            title: "Email",
            config: {
                to: {
                    type: "string",
                    label: "Destinataire"
                },
            }
        },
    }
}