'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'fortniteShopToGithubRepo';
export const id = 74;

export async function run(widget) {
	const token = widget.config_reaction.access_token;
	github.createRepo(token, widget.datas.skinName + ' ' + widget.datas.vBucks + 'VBucks');
}

export function getSchema() {
    return {
        name: "Fortnite Shop To Github Repo",
		description: "Créé un repo avec les infos du skin de la boutique",
		action: {
            title: "Skin",
            config: {
                username : {
                    type: "string",
                    label: "SkinName"
				}
			}
		}
	}
}