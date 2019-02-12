"use strict";
import request from 'request';
import * as reddit_bdd from "../bdd/reddit_bdd";
import RedditOauth2 from "../../auth/reddit";
import { getLinkByActionLinkIdList, updateLinkData } from '../bdd/bdd';

const reddit = new RedditOauth2(
    process.env.REDDIT_CLIENT_ID,
    process.env.REDDIT_CLIENT_SECRET
);

export async function updateGetLastPost() {
    return new Promise((resolve, reject) => {
        reddit.getLastPostWithName('funny').then(results => {
            reddit_bdd.updateAllSubscribedUsers('funny', results.created, JSON.stringify(results)).then(result => {
                return resolve('OK');
            }).catch(error => {
                console.log(error);
                return reject('Error when updating Reddit service.');
            });
        }).catch(error => {
            console.log(error);
            return reject('Error when getting last post on Reddit service.');
        })
    });
}

export async function update() {
    updateGetLastPost().then();
    updateGetTrophies();
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

export async function updateGetTrophies() {
    const widgets = await getLinkByActionLinkIdList(['20']);

    console.log('RedditGetTrophiesService: starting update..');

	if (!widgets)
		return;

    for (const widget of widgets) {
        let headers = {
            'Authorization': 'bearer ' + widget.config_action.access_token,
            'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        let options = {
            url: 'https://oauth.reddit.com/api/v1/me/trophies',
            headers: headers
        };

        request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                try {
                    body = JSON.parse(body).data.trophies;
                    const trophies = [];
                    for (const i in body) {
                        trophies.push({name: body[i].data.name, image: body[i].data.icon_40});
                    }
                    if (!arraysEqual(trophies, widget.datas.trophies))
                        updateLinkData(widget.id, { trophies });
                } catch { }
            }
        });
    }

    console.log('RedditGetTrophiesService: ending update..');
}
