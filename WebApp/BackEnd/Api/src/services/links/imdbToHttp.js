'use strict';

import request from "request";
import {getServiceDatasByName} from "../../bdd/bdd";

export const name = 'imdbToHttp';
export const id = 2;

export async function run(widget) {
	return new Promise(async (resolve, reject) => {
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

		clientServerOptions[container].name = await getServiceDatasByName('imdb');

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
