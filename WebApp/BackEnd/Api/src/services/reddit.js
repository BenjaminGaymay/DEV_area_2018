"use strict";
import * as reddit_bdd from "../bdd/reddit_bdd";
import * as bdd from "../bdd/bdd";
import RedditOauth2 from "../../auth/reddit";
import * as tools from "../tools";

const reddit = new RedditOauth2(
    process.env.REDDIT_CLIENT_ID,
    process.env.REDDIT_CLIENT_SECRET
);

async function action(widget, services, resolve, reject) {

    reddit_bdd.getAllUpdated().then(results => {
        for (let item of results) {
            bdd.getActionReaction(item).then(result => {
                let configData = tools.postTraitement(result);
                services.getById(item.reaction_service_id).run('reaction', 'default', configData).then(result_1 => {
                    resolve('OK');
                }).catch(error => {
                    reject(error);
                });
            });
        }
    });
}

async function reaction(widget, services, resolve, reject) {
    resolve('OK');

}

export async function run(type, widget, services) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'action':
                return action(widget, services, resolve, reject);
            case 'reaction':
                return reaction(widget, services, resolve, reject);
            default:
                return reject('Type not found.');
        }
    });
}

export async function update(widget) {
    return new Promise((resolve, reject) => {
        reddit.getLastPostWithName('funny').then(results => {
            //console.log(results);
            reddit_bdd.updateAllSubscribedUsers('funny', results.created, JSON.stringify(results)).then(result => {
                resolve('OK');
            }).catch(error => {
                console.log(error);
                reject('Error when updating Reddit service.');
            });
        }).catch(error => {
            console.log(error);
            reject('Error when getting last post on Reddit service.');
        })
    });
}

export async function subscribe(widget, request) {
    // on ajoute des data par defaut tel que created="0"
}

export function getSchema() {
    return {
        action: {
            getLastPost: {
                description: "Get the last post of a reddit thread.",
                schema: {
                    title: typeof "",
                    author: typeof "",
                    url: typeof "",
                    created: typeof 0
                }
            },
        },
        reaction: {}
    };
}