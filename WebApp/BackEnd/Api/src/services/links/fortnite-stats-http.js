import request from "request";
import * as bdd from "../../bdd/bdd";

export const name = 'fortniteStatsHttp';
export const id = 81;

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        let clientServerOptions = {
            uri: subscribe.config_reaction.url,
            method: subscribe.config_reaction.method,
            headers: subscribe.config_reaction.headers,
            body: {},
        };

        let container = "headers";
        if (clientServerOptions.headers === null) clientServerOptions.headers = {};
        if (clientServerOptions.method !== "GET") {
            container = "body";
            clientServerOptions.headers['content-type'] = 'application/json';
        }

        clientServerOptions[container].platform = subscribe.config_action.platform;
        clientServerOptions[container].pseudo = subscribe.config_action.pseudo;
        clientServerOptions[container].accountId = subscribe.datas.accountId;
        clientServerOptions[container].ratio = subscribe.datas.ratio;
        clientServerOptions[container].matches = subscribe.datas.matches;
        clientServerOptions[container].kills = subscribe.datas.kills;
        clientServerOptions[container].top1 = subscribe.datas.top1;
        clientServerOptions[container].winPourcentage = subscribe.datas.winPourcentage;

        clientServerOptions.body = JSON.stringify(clientServerOptions.body);

        request(clientServerOptions, function (error, response) {
            if (error || response.statusCode !== 200) {
                console.log(error);
                return reject('request cannot be send.');
            } else {
                console.log('Success:', response.body);
                return resolve('OK');
            }
        });
    });
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("platform") || !params.hasOwnProperty("pseudo"));
}

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("url") || !params.hasOwnProperty("method") || !params.hasOwnProperty("headers"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction) || !checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"pseudo": bodyParam.configAction.pseudo, "platform": bodyParam.configAction.platform};
        let reaction = {"url": bodyParam.configReaction.url, "method": bodyParam.configReaction.method, "headers": bodyParam.configReaction.headers};
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
        name: "Fortnite statistique vers Http",
        description: "Envoyez une requête Http avec vos statistiques Fortnite quotidiennes",
        action: {
            title: "Fortnite Stats",
            config: {
                pseudo: {
                    type: "string",
                    label: "Pseudo"
                },
                platform: {
                    type: "checkbox",
                    values: ['pc', 'xbox', 'ps4'],
                    label: "Plateforme"
                }
            }
        },
        reaction: {
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
    }
}