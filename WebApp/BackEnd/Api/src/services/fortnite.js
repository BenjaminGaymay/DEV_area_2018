"use strict";
import request from "request";
import * as fortnite_bdd from "../bdd/fortnite_bdd";

export async function action(subscribe_id) {
    return new Promise((resolve, reject) => {

        fortnite_bdd.getUpdatedUserShop(subscribe_id).then(results => {
            return resolve(results);
        }).catch(error => {
            console.log(error);
            return reject('Error when getting updated user shop fortnite.');
        })
    });
}

export async function reaction(widget, data, resolve, reject) {
    resolve('OK');

}

export async function updateStore() {
    return new Promise((resolve, reject) => {
        let clientServerOptions = {
            uri: "https://api.fortnitetracker.com/v1/store",
            method: "GET",
            headers: {"TRN-Api-Key": "2bf71bbd-2bac-49b8-a1da-b8af2d4a0a50"},
            body: "",
        };

        request(clientServerOptions, function (error, response) {
            if (error || response.statusCode !== 200) return reject('Fortnite request cannot be send.');
            else {
                fortnite_bdd.updateShop(response.body).then(result => {
                    resolve('OK');
                }).catch(error => {
                    console.log(error);
                    resolve('KO');
                });
            }
        });
    });


    /*    reddit.getLastPostWithName('funny').then(results => {
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
        })*/
}

export async function update(widget) {
    updateStore().then();
}

export function getSchema() {
    return {
        action: {},
        reaction: {}
    }
}