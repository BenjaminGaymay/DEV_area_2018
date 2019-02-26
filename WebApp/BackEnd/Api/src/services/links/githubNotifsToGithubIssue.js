'use strict';

import { github } from '../../../auth/github';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'GithubNotifsToGithubIssue';
export const id = 44;

export async function run(widget) {
	const config = widget.datas;
	console.log(widget)

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouvelle notification github', 'Raison: ' + config.reason + ' Titre: ' + config.title + ' Type: ' + config.type);
}

export function getSchema() {
    return {
		id: id,
        name: "Github Notifs To Github Issue",
		description: "Créé une issue avec la dernière notif github",
		url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
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