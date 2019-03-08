'use strict';

import { github } from '../../../auth/github';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'GithubNotifsToGithubIssue';
export const id = 44;

export async function run(widget) {
	const config = widget.datas;
    const token = await bdd.getUserToken(widget.user_id)


	github.createIssue(token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouvelle notification github', 'Raison: ' + config.reason + ' Titre: ' + config.title + ' Type: ' + config.type);
}

// function checkConfigAction(params) {
//     return !(!params.hasOwnProperty("skinName"));
// }

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("username") || !params.hasOwnProperty("repoName"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = null;
        let reaction = {"username": bodyParam.configReaction.username, "repoName": bodyParam.configReaction.repoName};
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
        name: "Github Notifs To Github Issue",
		description: "Créé une issue avec la dernière notif github",
		url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
		action: {
            authorizationUrl: "/auth/github",
            callbackUrl: "/auth/github/callback",
		},
		reaction: {
			authorizationUrl: "/auth/github",
			callbackUrl: "/auth/github/callback",
			title: "GithubIssue",
			config: {
				username : {
					type: "string",
					label: "Username"
				},
				repoName: {
					type: "string",
					label: "Nom du repo"
				}
			}
		}
	}
}