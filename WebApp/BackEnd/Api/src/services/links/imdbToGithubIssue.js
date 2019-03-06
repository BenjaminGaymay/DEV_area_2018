'use strict';

import { github } from '../../../auth/github';
import { getServiceDatasByName } from '../../bdd/bdd';
import * as bdd from '../../bdd/bdd';

// config_reaction: {"access_token": "39aaa244d29216043d564f3b1563be995f7dac04", "username": "Robin-P", "repoName": "zappy"}

export const name = 'imdbToGithubIssue';
export const id = 4;

export async function run(widget) {
	const config = widget.config_reaction;
    const title = await getServiceDatasByName('imdb');
    const token = await bdd.getUserToken(widget.user_id)


	github.createIssue(token, config.username, config.repoName, title, 'Va voir ce super film : ' + title + ' !');
}

// function checkConfigAction(params) {
//     return !(!params.hasOwnProperty("skinName"));
// }

function checkConfigReaction(params) {
    return !(!params.hasOwnProperty("username") || !params.hasOwnProperty("repoName"));
}

export async function subscribe(subscribeId, userId, bodyParam) {
    return new Promise((resolve, reject) => {
        if (!checkConfigReaction(bodyParam.configReaction)) {
            console.log(bodyParam);
            console.log("Missing subscribe parameters !");
            return reject('KO');
        }

        let action = null;
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
        name: "Imdb To Github Issue",
        description: "Créé une issue avec le dernier film sorti",
        url: "https://m.media-amazon.com/images/G/01/IMDb/BG_icon_iOS._CB511761981_SY230_SX307_AL_.png",
        reaction: {
            authorizationUrl: "/auth/github",
            callbackUrl: "/auth/github/callback",
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
        },
    }
}