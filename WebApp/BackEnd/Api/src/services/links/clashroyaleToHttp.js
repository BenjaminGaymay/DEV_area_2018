'use strict';

import request from "request";
import * as bdd from '../../bdd/bdd';

export const id = 12;
export const name = 'clashroyaleToHttp';

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

        // Je sais pas quoi mettre
        clientServerOptions[container].date = subscribe.datas.date;
        clientServerOptions[container].matchType = subscribe.datas.type;
        clientServerOptions[container].team = subscribe.datas.team;
        clientServerOptions[container].opponent = subscribe.datas.opponent;
        clientServerOptions[container].matchState = subscribe.datas.state;

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
    return !(!params.hasOwnProperty("tag") || !params.hasOwnProperty("trigger"));
}

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("method") || !params.hasOwnProperty("url") || !params.hasOwnProperty("headers"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction) || !checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"tag": bodyParam.configAction.tag, "trigger": bodyParam.configAction.trigger};
        let reaction = {"method": bodyParam.configReaction.method, "url": bodyParam.configReaction.url, "headers": bodyParam.configReaction.headers};
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
        name: "Clash Royale vers Http",
        description: "Envoyez une requête http après une partie de clash royale",
        url: "https://www.clashroyalefr.fr/android-chrome-384x384.png",
        action: {
            title: "Clash Royale",
            config: {
                tag: {
                    type: "string",
                    label: "Tag joueur"
                },
                trigger: {
                    type: "checkbox",
                    values: ['', 'victory', 'defeat', 'equality'],
                    label: "Sélectionner certaines parties",
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
        }
    }
}