"use strict";
import * as reddit_bdd from "../bdd/reddit_bdd";
import RedditOauth2 from "../../auth/reddit";

const reddit = new RedditOauth2(
    process.env.REDDIT_CLIENT_ID,
    process.env.REDDIT_CLIENT_SECRET
);

export async function updateGetLastPost() {
    return new Promise((resolve, reject) => {
        reddit.getLastPostWithName('funny').then(results => {
            console.log(results);
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
}