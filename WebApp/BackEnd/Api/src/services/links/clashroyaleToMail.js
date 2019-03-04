'use strict';

import { run as sendMail } from '../mail';
import * as bdd from '../../bdd/bdd';
// import { getServiceDatasByName } from '../../bdd/bdd';

// config_action: {"tag": "22RQY209Q", "trigger": ""} -> Trigger: "", "victory", "defeat", "equality"
// config_reaction: {"to": "benjamingaymay@gmail.com"}
// datas: {"date":"20190212T114210.000Z","type":"friendly","team":["TorresSwagg"],"opponent":["Shay"],"state":"victory"}

export const id = 11;
export const name = 'clashroyaleToMail';

export async function run(widget) {
    let html;

    switch (widget.datas.state) {
        case 'defeat': html = 'Arf, you' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' lose against ' + widget.datas.opponent.join(' and '); break;
        case 'victory': html = 'Waouh, you' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' win against ' + widget.datas.opponent.join(' and '); break;
        case 'equility': html = 'Pfiouf, you' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' draw against ' + widget.datas.opponent.join(' and '); break;
    }

	sendMail({
		to: widget.config_reaction.to,
		subject: 'Some news for Clash Royale !',
		html
	}).then();
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("tag") || !params.hasOwnProperty("trigger"));
}

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("to"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction) || !checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"tag": bodyParam.configAction.tag, "trigger": bodyParam.configAction.trigger};
        let reaction = {"to": bodyParam.configReaction.to};
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
        name: "Clash Royale vers Mail",
        description: "Envoyez un mail à après une partie de clash royale",
        url: "https://www.clashroyalefr.fr/android-chrome-384x384.png",
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