import fs from "fs";
import ejs from "ejs";
import * as mail from "../mail";
import * as bdd from "../../bdd/bdd";

export const name = 'redditMail';
export const id = 22;

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/redditPost.ejs", "utf8", function (err, content) {
            if (err) return err;
            subscribe.datas.topic = subscribe.config_action.name;
            let html = ejs.render(content, {
                datas: subscribe.datas,
            });
            let mailJson = {
                subject: "Un nouveau post est disponible !",
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
    return !(!params.hasOwnProperty("name"));
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

        let action = {"name": bodyParam.configAction.name, "created": "0"};
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
        name: "Reddit vers email",
        description: "Recevez un email à chaque nouveau post",
        url: "https://www.redditstatic.com/new-icon.png",
        action: {
            title: "Reddit Email",
            config: {
                name: {
                    type: "string",
                    label: "Nom du topic"
                },
            }
        },
        reaction: {
            title: "Email",
            config: {
                to: {
                    type: "string",
                    label: "Destinataire"
                }
            }
        },
    }
}
