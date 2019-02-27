'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'fortniteShopToGithubRepo';
export const id = 74;

export async function run(widget) {
	const token = widget.config_reaction.access_token;
	github.createRepo(token, widget.datas.skinName + ' ' + widget.datas.vBucks + 'VBucks');
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("skinName"));
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

        let action = {"skinName": bodyParam.configAction.skinName};
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
        name: "Fortnite Shop To Github Repo",
		description: "Créé un repo avec les infos du skin de la boutique",
		url: "https://upload.wikimedia.org/wikipedia/fr/0/07/Fortnite_Battle_Royale_Logo.png",
		action: {
            title: "Skin",
            config: {
                username : {
                    type: "string",
                    label: "SkinName"
				}
			}
		}
	}
}