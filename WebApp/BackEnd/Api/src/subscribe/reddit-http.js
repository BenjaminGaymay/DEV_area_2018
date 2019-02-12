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
            clientServerOptions.headers.postTopic = subscribe.config_action.name;
            clientServerOptions.headers.postAuthor = subscribe.datas.author;
            clientServerOptions.headers.postUrl = subscribe.datas.url;
            clientServerOptions.headers.postTitle = subscribe.datas.title;
        } else {
            clientServerOptions.headers['content-type'] = 'application/json';
            clientServerOptions.body.postTopic = subscribe.config_action.name;
            clientServerOptions.body.postAuthor = subscribe.datas.author;
            clientServerOptions.body.postUrl = subscribe.datas.url;
            clientServerOptions.body.postTitle = subscribe.datas.title;
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