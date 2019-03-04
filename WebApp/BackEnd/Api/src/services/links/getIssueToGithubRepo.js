'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'GithubIssueToGithubRepo';
export const id = 53;

export async function run(widget) {
	const config = widget.datas;

	github.createRepo(widget.config_reaction.access_token, config.title);
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        let action = null;
        let reaction = null;
        bdd.subscribeIntoLink(subscribeId, userId, action, reaction).then(result => {
            return resolve('OK');
        }).catch(error => {
            return reject('KO');
        });
    })
}

export function getSchema() {
    return {
		id: id,
        name: "Github Issue To Github Repo",
		description: "Créé un repo avec la derniere issue github",
		url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
	}
}