'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'fortniteShopToGithubIssue';
export const id = 73;

export async function run(widget) {
	const config = widget.datas;

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouveau skin dans la boutique Fortnite ', 'Le skin '  + config.skinName + ' est disponible à ' + config.vBucks + 'Vbucks. Dépeche toi et va l\'acheter. Code créateur solary-kinstaar');
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("skinName"));
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

        let action = {"skinName": bodyParam.configAction.skinName};
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
        name: "Fortnite Shop To Github Issue",
		description: "Créé une issue avec les infos du skin de la boutique",
		url: "https://upload.wikimedia.org/wikipedia/fr/0/07/Fortnite_Battle_Royale_Logo.png",
		action: {
            title: "Skin",
            config: {
                username : {
                    type: "string",
                    label: "SkinName"
				}
			}
		},
		reaction: {
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