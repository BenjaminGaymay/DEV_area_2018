"use strict";
import request from "request";
import {jsonCompare as compare} from "../jsonSchemaCompare";
import * as bdd from "../bdd/mysql";
import * as tools from "../tools";

function createGetUrl(data) {
    let url = data.url + '?';
    for (let index in data.urlExtra) {
        if (typeof data.urlExtra[index] !== "string")
            return null;
        url += index + '=' + data.urlExtra[index] + '&';
    }
    return url;
}

const schemaMail = {
    url: String,
    method: String,
};

const schema = JSON.stringify(schemaMail);

async function action(widget, data, resolve, reject) {
    const req = data.request;
    const res = data.response;

    if (!req.params.hasOwnProperty('token')) {
        console.log('HTTP missing parameter');
        return reject('HTTP missing parameter');
    }
    bdd.findUrlToken(req.params.token).then(result => {
        bdd.getActionReaction(result).then(subscribe => {
            subscribe.action.data = {...req.params, ...req.query, ...req.body, ...req.headers};
            return resolve(subscribe);
            /*return resolve({bucket: bucket, subscribe: subscribe});*/
        }).catch(error => {
            return reject(error);
        });
    }).catch(error => {
        return reject(error);
    });
}

async function reaction(widget, data, resolve, reject) {
    return sendRequest(data, resolve, reject);
}

export async function run(type, widget, data) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'action':
                return action(widget, data, resolve, reject);
            case 'reaction':
                return reaction(widget, data, resolve, reject);
            default:
                return reject('Type not found.');
        }
    });
}

async function sendRequest(data, resolve, reject) {
//    console.log(data);
    let tmp = JSON.stringify(data);
    let clientServerOptions = {};

    if (!compare(tmp, schema)) {
        return reject('ServiceHTTP: Some params in bundle are missing.');
    }
    if (data.method.toUpperCase() === 'GET') {
        let url = createGetUrl(data);
        if (url === null) {
            return reject('ServiceHTTP: Invalid url parameters.');
            // console.log('ServiceHTTP: Invalid url parameters.');
            // return;
        }
        data.headers = {...data.headers, ...data.data};

        clientServerOptions = {
            uri: url,
            method: data.method,
            headers: data.headers,
        };

    } else if (data.method.toUpperCase() === 'POST') {
        let body = data.body;
        if (typeof data.headers == "undefined" || data.headers == null) {
            data.headers = {};
        }
        data.headers['content-type'] = 'application/json';
        if (typeof body === "string") {
            body = JSON.parse(data.body);
        }
        body = {...body, ...data.data};

        clientServerOptions = {
            uri: data.url,
            method: data.method,
            headers: data.headers,
            body: JSON.stringify(body),
        }
    }

    request(clientServerOptions, function (error, response) {
        if (error || response.statusCode !== 200) {
            console.log(data.headers);
            console.log('Error: ' + (error ? error.errno : response.statusCode));
            return reject('request cannot be send.');
        } else {
            console.log('Success:', response.body);
            return resolve('request send with success');
        }
    });
}

export async function update(services, req, res) {
    return new Promise((resolve, reject) => {
        run('action', 'default', {request: req, response: res}).then(result => {
            let configData = tools.postTraitement(result);
            services.getById(result.reaction.id).run('reaction', 'default', configData).then(result => {
                return resolve(result);
            }).catch(error => {
                console.log(error);
                return reject(error);
            });
        }).catch(error => {
            console.log(error);
            return reject(error);
        });
    });
}

export function getSchema(type, widget) {
    return {
        action: {
            http: {
                description: "Trigger http request for action.",
                schema: {
                    method: typeof "",
                    headers: typeof {},
                    body: typeof {},
                }
            },
        },
        reaction: {
            http: {
                description: "React to an action with a custom http request.",
                schema: {
                    url: typeof "",
                    method: typeof "",
                    headers: typeof {},
                    body: typeof {},
                }
            }
        }
    };
}