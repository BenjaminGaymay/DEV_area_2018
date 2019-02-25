'use strict';

import { github } from '../../../auth/github';

// config_action: {"tag": "22RQY209Q", "trigger": ""} -> Trigger: "", "victory", "defeat", "equality"
// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04"}
// datas: {"date":"20190212T114210.000Z","type":"friendly","team":["TorresSwagg"],"opponent":["Shay"],"state":"victory"}

export const id = 13;
export const name = 'clashroyaleToMail';

export async function run(widget) {
    const token = widget.config_reaction.access_token;
    let repoName = 'ClashRoyale_';

    switch (widget.datas.state) {
        case 'defeat': repoName += 'You' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' lose against ' + widget.datas.opponent.join(' and '); break;
        case 'victory': repoName += 'You' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' win against ' + widget.datas.opponent.join(' and '); break;
        case 'equility': repoName += 'You' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' draw against ' + widget.datas.opponent.join(' and '); break;
    }
	github.createRepo(token, repoName);
}

export function getSchema() {
    return {
        id: id,
        name: "Clash Royale vers Mail",
        description: "Envoyez un mail à après une partie de clash royale",
        action: {
            title: "Clash Royale",
            config: {
                tag: {
                    type: "string",
                    label: "Tag joueur"
                },
                trigger: {
                    type: "checkbox",
                    values: ['', 'victory', 'defeat', 'equality'],
                    label: "Sélectionner certaines parties",
                }
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