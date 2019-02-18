'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'fortniteStatsToGithubRepo';
export const id = 84;

export async function run(widget) {
	const token = widget.config_reaction.access_token;
	github.createRepo(token, widget.config_action.pseudo + ' ' + widget.datas.top1 + 'Top1');
}

export function getSchema() {
    return {
        name: "Fortnite Stats To Github Repo",
		description: "Créé un repo avec les infos de la personne",
		action: {
            title: "Platform",
            config: {
                platform : {
                    type: "string",
                    label: "Platform"
				},
				username: {
                    type: "string",
                    label: "Username"
				}
			},
		}
	}
}