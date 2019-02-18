'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'fortniteShopToGithubIssue';
export const id = 73;

export function getSchema() {
    return {
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