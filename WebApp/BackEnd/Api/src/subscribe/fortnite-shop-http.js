import request from "request";

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        let clientServerOptions = {
            uri: subscribe.config_reaction.url,
            method: subscribe.config_reaction.method,
            headers: subscribe.config_reaction.headers,
            body: {},
        };

        if (clientServerOptions.headers === null) {
            clientServerOptions.headers = {};
        }

        if (clientServerOptions.method === "GET") {
            clientServerOptions.headers.skinUrl = subscribe.datas.url;
            clientServerOptions.headers.skinName = subscribe.datas.skinName;
            clientServerOptions.headers.price = subscribe.datas.vBucks;
        } else {
            clientServerOptions.headers['content-type'] = 'application/json';
            clientServerOptions.body.skinUrl = subscribe.datas.url;
            clientServerOptions.body.skinName = subscribe.datas.skinName;
            clientServerOptions.body.price = subscribe.datas.vBucks;
        }

        clientServerOptions.body = JSON.stringify(clientServerOptions.body);

        request(clientServerOptions, function (error, response) {
            if (error || response.statusCode !== 200) {
                console.log(data.headers);
                return reject('request cannot be send.');
            } else {
                console.log('Success:', response.body);
                return resolve('OK');
            }
        });
    });
}