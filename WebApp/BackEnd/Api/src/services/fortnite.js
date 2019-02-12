"use strict";
import request from "request";
import * as fortnite_bdd from "../bdd/fortnite_bdd";

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
}

export async function update(widget) {
    updateStore().then();
}