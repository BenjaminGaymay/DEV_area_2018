import request from "request";

function createGetUrl(data) {
    let url = data.url + '?';
    for (let index in data.urlExtra) {
        if (typeof data.urlExtra[index] !== "string")
            return null;
        url += index + '=' + data.urlExtra[index] + '&';
    }
    return url;
}

export async function run(data) {
    return new Promise(function (resolve, reject) {
        data = {
            method: 'get',
            url: 'http://localhost:8081/test',
            urlExtra: {
                firstnom: 'bob',
                lastname: "mdr",
            },
            headers: {'Content-Type': 'application/json'},
            body: {mdr: 'lol'},
        };

        if (!data.hasOwnProperty('url') || !data.hasOwnProperty('method')) {
            return reject('ServiceHTTP: Some params in bundle are missing.');
            //console.log('ServiceHTTP: Some params in bundle are missing.');
            //return;
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
    });
}