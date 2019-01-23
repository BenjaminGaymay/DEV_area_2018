import request from "request";

export function run(data) {
    data = {
        method: 'get',
        url: 'http://localhost:8081/test',
        urlExtra: {
            mdr: 'lol',
            coucou: "lol",
        },
        headers: {},
        body: {},
    };

    let clientServerOptions = {};

    if (data.method.toUpperCase() === 'GET') {
        let url = data.url + '?';
        for (let index in data.urlExtra) {
            url += index + '=' + data.urlExtra[index] + '&';
        }

        clientServerOptions = {
            uri: data.url,
            body: null,
            method: 'GET',
            headers: {mdr: 'lol'},
        };

    } else if (data.method.toUpperCase() === 'POST') {
        clientServerOptions = {
            uri: data.url,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mdr: 'lol'}),
        }
    }

    request(clientServerOptions, function (error, response) {
        console.log(error, response.body);
    });
}