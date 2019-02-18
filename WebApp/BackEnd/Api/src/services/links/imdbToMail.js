'use strict';

import { run as sendMail } from '../mail';
import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"to": ["benjamingaymay@gmail.com"]}

export const id = 1;
export const name = 'imdbToMail';

export async function run(widget) {
	sendMail({
		to: widget.config_reaction.to,
		subject: 'Du nouveau sur IMDB !',
		html: 'Un nouveau film est sorti aujourd\'hui : "' + await getServiceDatasByName('imdb') + '" waouh !'
	});
}
