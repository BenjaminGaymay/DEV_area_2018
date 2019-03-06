'use strict';

import { github } from '../../../auth/github';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'GithubReposToGithubIssue';
export const id = 34;

export async function run(widget) {
	const config = widget.datas;
	// console.log(widget)
	let str = "";

	for (const a in config) {
		str += config[a].name + ' ';
	}

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouveau repo créé', 'Liste des repos:' + str);
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
        name: "get Github Repos To Github Issue",
		description: "Créé une issue avec le dernier repo créé",
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