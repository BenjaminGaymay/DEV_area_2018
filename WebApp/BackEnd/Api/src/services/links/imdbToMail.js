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

export function getSchema() {
    return {
        id: id,
        name: "IMDb vers Mails",
        description: "Recevez un email lorsqu'un nouveau film sort",
        url: "https://m.media-amazon.com/images/G/01/IMDb/BG_icon_iOS._CB511761981_SY230_SX307_AL_.png",
        reaction: {
            title: "Email",
            config: {
                to: {
                    type: "string",
                    label: "Destinataire"
                },
            }
        },
    }
}