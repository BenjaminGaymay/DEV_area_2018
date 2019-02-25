'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'GithubIssueToGithubRepo';
export const id = 53;

export async function run(widget) {
	const config = widget.datas;

	github.createRepo(widget.config_reaction.access_token, config.title);
}

export function getSchema() {
    return {
		id: id,
        name: "Github Issue To Github Repo",
		description: "Créé un repo avec la derniere issue github",
	}
}