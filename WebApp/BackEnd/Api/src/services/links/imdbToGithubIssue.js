'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'imdbToGithubIssue';
export const id = 4;

export async function run(widget) {
	const config = JSON.parse(widget.config_reaction);
	const title = await getServiceDatasByName('imdb');

	github.createIssue(config.access_token, config.username, config.repoName, title, 'Va voir ce super film : "' + await getServiceDatasByName('imdb') + '" !');
}
