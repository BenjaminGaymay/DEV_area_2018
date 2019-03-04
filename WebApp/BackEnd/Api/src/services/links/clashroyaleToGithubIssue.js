'use strict';

import { github } from '../../../auth/github';
import * as bdd from '../../bdd/bdd';

// config_action: {"tag": "22RQY209Q", "trigger": ""} -> Trigger: "", "victory", "defeat", "equality"
// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}
// datas: {"date":"20190212T114210.000Z","type":"friendly","team":["TorresSwagg"],"opponent":["Shay"],"state":"victory"}

export const id = 14;
export const name = 'clashroyaleToMail';

export async function run(widget) {
    const token = widget.config_reaction.access_token;
    let issue;

    switch (widget.datas.state) {
        case 'defeat': issue = 'Arf, you' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' lose against ' + widget.datas.opponent.join(' and '); break;
        case 'victory': issue = 'Waouh, you' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' win against ' + widget.datas.opponent.join(' and '); break;
        case 'equility': issue = 'Pfiouf, you' + (widget.datas.opponent.length > 1 ? ' ' + widget.datas.opponent[1] : '') + ' draw against ' + widget.datas.opponent.join(' and '); break;
    }
	github.createIssue(token, widget.config_reaction.username, widget.config_reaction.repoName, 'Clash Royale', issue);
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("tag") || !params.hasOwnProperty("trigger"));
}

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("username") || !params.hasOwnProperty("repoName"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigAction(bodyParam.configAction) || !checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = {"tag": bodyParam.configAction.tag, "trigger": bodyParam.configAction.trigger};
        let reaction = {"username": bodyParam.configReaction.username, "repoName": bodyParam.configReaction.repoName};
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
        name: "Clash Royale vers GitHub issue",
        description: "Créer une issue github après une partie de clash royale",
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
			title: "GithubIssue",
			config: {
				username : {
					type: "string",
					label: "Username"
				},
				repoName: {
					type: "string",
					label: "Nom du repo"
				}
			}
		}
    }
}