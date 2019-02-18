'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'lolToGithubIssue';
export const id = 64;

export async function run(widget) {
	// console.log(widget)
	const config = widget.datas;
	// const title = await getServiceDatasByName('imdb');

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouvelle game de League Of Legends', 'Vos stats en 5v5 ranked solo: rang [ ' + config.rank + ' ] league points [ ' + config.lp + ' ] win/lose [ ' + config.win + ' / ' + config.lose + ' ] dernier champion joué [ ' + config.lastChampion + ' ] niveau [ ' + config.level + ' ].');
}

export function getSchema() {
    return {
        name: "Lol To Github Issue",
		description: "Créé une issue avec les stats du joueur",
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