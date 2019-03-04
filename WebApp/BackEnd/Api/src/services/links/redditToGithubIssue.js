'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'redditToGithubIssue';
export const id = 24;

export async function run(widget) {
	const config = widget.datas;

	github.createIssue(widget.config_reaction.access_token, widget.config_reaction.username, widget.config_reaction.repoName, 'Nouveau post de ' + widget.config_action.name + ' sur Reddit', 'Titre : ' + config.title + ' Auteur : ' + config.author + ' url: ' + config.url);
}

function checkConfigAction(params) {
    return !(!params.hasOwnProperty("name"));
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

        let action = {"name": bodyParam.configAction.name, "created": "0"};
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
        name: "Last Reddit Post Infos To Github Issue",
		description: "Créé une issue avec les infos du dernier post",
        url: "https://www.redditstatic.com/new-icon.png",
		action: {
            title: "Reddit Github Issue",
            config: {
                name: {
                    type: "string",
                    label: "Nom du topic"
                },
                created: {
                    type: "string",
                    label: "creationTime"
                },
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