'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'redditToGithubIssue';
export const id = 23;

export async function run(widget) {
	const config = widget.datas;
    const token = await bdd.getUserToken(widget.user_id)

	github.createRepo(token, 'Nouveau post reddit \'' + widget.config_action.name + ' \': '  + config.title);
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("name"));
}

// function checkConfigReaction(params) {
//     return true;
// }

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"name": bodyParam.configAction.name, "created": "0"};
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
        name: "Last reddit post infos To Github Repo",
		description: "Créé un repo avec les infos du dernier post",
		url: "https://www.redditstatic.com/new-icon.png",
		action: {
            title: "Reddit Github Repo",
            config: {
                name: {
                    type: "string",
                    label: "Nom du topic"
                },
                created: {
                    type: "string",
                    label: "creationTime"
                },
            }
        },
        reaction: {
            authorizationUrl: "/auth/github",
            callbackUrl: "/auth/github/callback",
		}
	}
}