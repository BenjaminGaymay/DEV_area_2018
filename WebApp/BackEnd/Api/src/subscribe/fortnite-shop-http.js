import request from "request";
import * as bdd from "../bdd/bdd";

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

        clientServerOptions[container].skinUrl = subscribe.datas.url;
        clientServerOptions[container].skinName = subscribe.datas.skinName;
        clientServerOptions[container].price = subscribe.datas.vBucks;

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
    return !(!params.hasOwnProperty("skinName"));
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

        let action = {"skinName": bodyParam.configAction.skinName};
        let reaction = {"method": bodyParam.configReaction.method, "url": bodyParam.configReaction.url, "headers": bodyParam.configReaction.headers};
        bdd.subscribeIntoLink(subscribeId, userId, action, reaction).then(result => {
            return resolve('OK');
        }).catch(error => {
            return reject('KO');
        });
    })
}