import request from "request";
import * as bdd from "../../bdd/bdd";

export const name = 'redditHttp';
export const id = 21;

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

        clientServerOptions[container].postTopic = subscribe.config_action.name;
        clientServerOptions[container].postAuthor = subscribe.datas.author;
        clientServerOptions[container].postUrl = subscribe.datas.url;
        clientServerOptions[container].postTitle = subscribe.datas.title;

        clientServerOptions.body = JSON.stringify(clientServerOptions.body);

        request(clientServerOptions, function (error, response) {
            if (error || response.statusCode !== 200) {
                return reject('request cannot be send.');
            } else {
                console.log('Success:', response.body);
                return resolve('OK');
            }
        });
    });
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("name"));
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

        let action = {"name": bodyParam.configAction.name, "created": "0"};
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
        name: "Reddit vers http",
        description: "Envoyez une requête http à chaque nouveau post",
        url: "https://www.redditstatic.com/new-icon.png",
        action: {
            title: "Reddit Http",
            config: {
                name: {
                    type: "string",
                    label: "Nom du topic"
                },
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