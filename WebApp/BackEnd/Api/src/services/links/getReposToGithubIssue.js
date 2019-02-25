'use strict';

import { github } from '../../../auth/github';

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

export function getSchema() {
    return {
		id: id,
        name: "get Github Repos To Github Issue",
		description: "Créé une issue avec le dernier repo créé",
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