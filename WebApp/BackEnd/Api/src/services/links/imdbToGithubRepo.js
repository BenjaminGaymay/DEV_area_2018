'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'imdbToGithubRepo';
export const id = 3;

export async function run(widget) {
	const token = JSON.parse(widget.config_reaction).access_token;
	github.createRepo(token, await getServiceDatasByName('imdb'));
}
