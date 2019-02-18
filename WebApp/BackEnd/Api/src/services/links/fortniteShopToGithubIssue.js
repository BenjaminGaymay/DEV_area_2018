'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'fortniteShopToGithubIssue';
export const id = 73;

export async function run(widget) {
	const config = widget.datas;

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouveau skin dans la boutique Fortnite ', 'Le skin '  + config.skinName + ' est disponible à ' + config.vBucks + 'Vbucks. Dépeche toi et va l\'acheter. Code créateur solary-kinstaar');
}

export function getSchema() {
    return {
		id: id,
        name: "Fortnite Shop To Github Issue",
		description: "Créé une issue avec les infos du skin de la boutique",
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