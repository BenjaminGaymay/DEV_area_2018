'use strict';

import { run as sendMail } from '../mail';
// import { getServiceDatasByName } from '../../bdd/bdd';

// config_reaction: {"to": ["benjamingaymay@gmail.com"]}

export const id = 11;
export const name = 'clashroyaleToMail';

export async function run(widget) {
	sendMail({
		// to: widget.config_reaction,
		// subject: 'Un nouveau sur IMDB !',
		// html: 'Un nouveau film est sorti aujourd\'hui : "' + await getServiceDatasByName('imdb') + '" waouh !'
	});
}

export function getSchema() {
    return {
        name: "Clash Royale vers Mail",
        description: "Envoyez un mail à après une partie de clash royale",
        action: {
            title: "Clash Royale",
            config: {
				tag: "Tag joueur",
				trigger: "Sélectionner certaines parties : '', 'victory', 'defeat' ou 'equality'"
            }
        },
		reaction: {
            title: "Email",
            config: {
                to: {
                    type: "string",
                    label: "Destinataire"
                },
            }
        }
    }
}