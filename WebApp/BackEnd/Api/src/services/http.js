"use strict";
import request from "request";
import {jsonCompare as compare} from "../jsonSchemaCompare";
import * as bdd from "../bdd/mysql";

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
    url: "",
    method: "",
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
            // epur header
            delete req.headers['content-type'];
            delete req.headers['cache-control'];
            delete req.headers['postman-token'];
            delete req.headers['user-agent'];
            delete req.headers['accept'];
            delete req.headers['host'];
            delete req.headers['accept-encoding'];
            delete req.headers['content-length'];
            delete req.headers['connection'];
            let bucket = {...req.params, body: req.body, headers: req.headers};
            return resolve({bucket: bucket, subscribe: subscribe});
        }).catch(error => {
            return reject(error);
        });
    }).catch(error => {
        return reject(error);
    });
}

async function reaction(widget, data, resolve, reject) {
    //console.log(data);
    resolve('OK');
    return sendRequest(data.bucket, resolve, reject);
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
    /*data = {
        method: 'post',
        url: 'https://hookb.in/zrQdZOBlkks1Z1GRmXz2',
        urlExtra: {
            firstnom: 'bob',
            lastname: "mdr",
        },
        headers: {'Content-Type': 'application/json'},
        body: {mdr: 'lol'},
    };*/

    //console.log(data);
    let tmp = JSON.stringify(data);

    if (!compare(tmp, schema)) {
        return reject('ServiceHTTP: Some params in bundle are missing.');
    }

    let clientServerOptions = {};

    if (data.method.toUpperCase() === 'GET') {
        let url = createGetUrl(data);
        if (url === null) {
            return reject('ServiceHTTP: Invalid url parameters.');
            // console.log('ServiceHTTP: Invalid url parameters.');
            // return;
        }

        clientServerOptions = {
            uri: url,
            method: data.method,
            headers: data.headers,
        };

    } else if (data.method.toUpperCase() === 'POST') {
        let body = data.body;
        if (typeof data.headers == "undefined") {
            data.headers = {};
        }
        data.headers['content-type'] = 'application/json';
        if (typeof body !== "string") {
            body = JSON.stringify(data.body);
        }

        clientServerOptions = {
            uri: data.url,
            method: data.method,
            headers: data.headers,
            body: body,
        }
    }

    request(clientServerOptions, function (error, response) {
        if (error || response.statusCode !== 200) {
            console.log(data.headers);
            console.log('Error: ' + (error ? error.errno : response.statusCode));
            return reject('et merde');
        } else {
            console.log('Success:', response.body);
            return resolve('Et yes');
        }
    });
}