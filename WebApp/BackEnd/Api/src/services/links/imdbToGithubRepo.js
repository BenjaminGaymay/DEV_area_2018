'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}

export const name = 'imdbToGithubRepo';
export const id = 3;

export async function run(widget) {
	const token = widget.config_reaction.access_token;
	github.createRepo(token, await getServiceDatasByName('imdb'));
}

export function getSchema() {
    return {
        id: id,
        name: "Imdb To Github Repo",
        description: "Créé un dossier du nom du dernier film sorti",
        url: "https://m.media-amazon.com/images/G/01/IMDb/BG_icon_iOS._CB511761981_SY230_SX307_AL_.png",
    }
}