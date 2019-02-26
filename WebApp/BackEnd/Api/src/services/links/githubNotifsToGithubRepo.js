'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'GithubNotifsToGithubRepo';
export const id = 43;

export async function run(widget) {
	const config = widget.datas;

	github.createRepo(widget.config_reaction.access_token, 'Nouvelle notif github: ' + config.title);
}

export function getSchema() {
    return {
		id: id,
        name: "Github Notifs To Github Repo",
		description: "Créé un repo avec la derniere notif github",
		url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
	}
}