'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'lolToGithubIssue';
export const id = 63;

export async function run(widget) {
	const config = widget.datas;

	github.createRepo(widget.config_reaction.access_token, config.name + ' ' + config.rank + ' Win-Lose' + config.win + '-' + config.lose);
}

export function getSchema() {
    return {
        id: id,
        name: "Lol Stats To Github Repo",
		description: "Créé un repo avec les stats de la personne",
		url: "https://ih0.redbubble.net/image.413056780.7429/sticker,375x360-bg,ffffff.u1.png",
		action: {
            title: "Name",
            config: {
				name: {
                    type: "string",
                    label: "Name"
				}
			},
		}
	}
}