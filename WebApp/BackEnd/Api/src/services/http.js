"use strict";
import request from "request";
import {jsonCompare as compare} from "../jsonSchemaCompare";

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
    return sendRequest(data, resolve, reject);
}

async function reaction(widget, data, resolve, reject) {
    return sendRequest(data, resolve, reject);
}

export async function run(type, widget, data) {
    return new Promise(function (resolve, reject) {
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
    data = {
        method: 'post',
        url: 'https://hookb.in/zrQdZOBlkks1Z1GRmXz2',
        urlExtra: {
            firstnom: 'bob',
            lastname: "mdr",
        },
        headers: {'Content-Type': 'application/json'},
        body: {mdr: 'lol'},
    };

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
            console.log('Error: ' + (error ? error.errno : response.statusCode));
            return reject('et merde');
        } else {
            console.log('Success:', response.body);
            return resolve('Et yes');
        }
    });
}