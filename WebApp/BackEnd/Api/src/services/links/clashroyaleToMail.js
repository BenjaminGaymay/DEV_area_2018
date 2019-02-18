'use strict';

import { run as sendMail } from '../mail';
// import { getServiceDatasByName } from '../../bdd/bdd';

// config_action: {"tag": "22RQY209Q", "trigger": ""} -> Trigger: "", "victory", "defeat", "equality"
// config_reaction: {"to": "benjamingaymay@gmail.com"}
// datas: {"date":"20190212T114210.000Z","type":"friendly","team":["TorresSwagg"],"opponent":["Shay"],"state":"victory"}

export const id = 11;
export const name = 'clashroyaleToMail';

export async function run(widget) {
	sendMail({
		to: widget.config_reaction.to,
		subject: 'Du nouveau sur Clash Royale !',
		html
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