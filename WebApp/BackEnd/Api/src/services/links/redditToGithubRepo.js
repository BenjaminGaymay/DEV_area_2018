'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'redditToGithubIssue';
export const id = 13;

export async function run(widget) {
	const config = widget.datas;

	console.log(widget)
	// github.createRepo(widget.config_reaction.access_token, config.name + ' ' + config.rank + ' Win-Lose' + config.win + '-' + config.lose);
}

export function getSchema() {
    return {
        name: "Last reddit post infos To Github Repo",
		description: "Créé un repo avec les infos du dernier post",
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