'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'redditToGithubIssue';
export const id = 24;

export async function run(widget) {
	const config = widget.datas;

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouveau post de ' + widget.config_action.name + ' sur Reddit', 'Titre : ' + config.title + ' Auteur : ' + config.author + ' url: ' + config.url);
}

export function getSchema() {
    return {
        id: id,
        name: "Last Reddit Post Infos To Github Issue",
		description: "Créé une issue avec les infos du dernier post",
        url: "https://www.redditstatic.com/new-icon.png",
		action: {
            title: "Name",
            config: {
                username : {
                    type: "string",
                    label: "Name"
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