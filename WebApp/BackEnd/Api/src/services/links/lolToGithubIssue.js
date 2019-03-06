'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'lolToGithubIssue';
export const id = 64;

export async function run(widget) {
	// console.log(widget)
	const config = widget.datas;
    const token = await bdd.getUserToken(widget.user_id)
	// const title = await getServiceDatasByName('imdb');

	github.createIssue(token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouvelle game de League Of Legends', 'Vos stats en 5v5 ranked solo: rang [ ' + config.rank + ' ] league points [ ' + config.lp + ' ] win/lose [ ' + config.win + ' / ' + config.lose + ' ] dernier champion joué [ ' + config.lastChampion + ' ] niveau [ ' + config.level + ' ].');
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("name"));
}

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("username") || !params.hasOwnProperty("repoName"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction) || !checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"name": bodyParam.configAction.name};
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
        name: "Lol To Github Issue",
		description: "Créé une issue avec les stats du joueur",
        url: "https://ih0.redbubble.net/image.413056780.7429/sticker,375x360-bg,ffffff.u1.png",
		action: {
            title: "Name",
            config: {
                name : {
                    type: "string",
                    label: "Name"
				}
			}
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