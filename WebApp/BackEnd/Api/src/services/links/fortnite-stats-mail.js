import fs from "fs";
import ejs from "ejs";
import * as mail from "../mail";
import * as bdd from "../../bdd/bdd";

export const name = 'fortniteStatsMail';
export const id = 82;

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/fortniteStats.ejs", "utf8", function (err, content) {
            if (err) return err;
            let html = ejs.render(content, {
                datas: subscribe.datas,
                platform: subscribe.config_action.platform,
                pseudo: subscribe.config_action.pseudo
            });
            let mailJson = {
                subject: "Vos statistique sont disponibles !",
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
    return !(!params.hasOwnProperty("platform") || !params.hasOwnProperty("pseudo"));
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

        let action = {"pseudo": bodyParam.configAction.pseudo, "platform": bodyParam.configAction.platform};
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
        name: "Fornite statistique vers Email",
        description: "Recevez un email avec vos statistiques Fortnite quotidienne",
        action: {
            title: "Fortnite Email",
            config: {
                pseudo: {
                    type: "string",
                    label: "Pseudo"
                },
                platform: {
                    type: "string",
                    label: "Plateforme"
                }
            }
        },
        reaction: {
            title: "Http",
            config: {
                to: {
                    type: "string",
                    label: "Destinataire"
                },
            }
        },
    }
}