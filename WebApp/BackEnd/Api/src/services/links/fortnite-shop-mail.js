import fs from "fs";
import ejs from "ejs";
import * as mail from "../mail";
import * as bdd from "../../bdd/bdd";

export const name = 'fortniteShopMail';
export const id = 72;

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/fortniteShop.ejs", "utf8", function (err, content) {
            if (err) return err;
            let html = ejs.render(content, {
                datas: subscribe.datas,
            });
            let mailJson = {
                subject: "Votre skin est disponible !",
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
    return !(!params.hasOwnProperty("skinName"));
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

        let action = {"skinName": bodyParam.configAction.skinName};
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
        name: "Fortnite shop vers email",
        description: "Recevez un email si votre skin est en boutique",
        action: {
            title: "Fortnite Shop",
            config: {
                skinName: {
                    type: "string",
                    label: "Nom du skin"
                },
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