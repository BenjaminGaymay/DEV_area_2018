'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'fortniteStatsToGithubIssue';
export const id = 83;

export async function run(widget) {
	const config = widget.datas;

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Stats for ' + widget.config_action.pseudo, 'Nouvelles stats : ' + 'Top1: ['+ config.top1 + '] ' + 'Pourcentage de win [' + config.winPourcentage + '] ' + 'ratio [' + config.ratio + '] matches [' + config.matches + '] kills [' + config.kills + ']' + ' !');
}

export function getSchema() {
    return {
		id: id,
        name: "Fortnite Stats To Github Issue",
		description: "Créé une issue avec les infos de la personne",
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