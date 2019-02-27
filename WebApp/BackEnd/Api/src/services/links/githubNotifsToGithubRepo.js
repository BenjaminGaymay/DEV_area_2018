'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'GithubNotifsToGithubRepo';
export const id = 43;

export async function run(widget) {
	const config = widget.datas;

	github.createRepo(widget.config_reaction.access_token, 'Nouvelle notif github: ' + config.title);
}

// function checkConfigAction(params) {
//     return !(!params.hasOwnProperty("skinName"));
// }

// function checkConfigReaction(params) {
//     return true;
// }

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {

        let action = null;
        let reaction = null;
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
        name: "Github Notifs To Github Repo",
		description: "Créé un repo avec la derniere notif github",
		url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
	}
}