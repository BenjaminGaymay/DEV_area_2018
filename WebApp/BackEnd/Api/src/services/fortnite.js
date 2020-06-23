"use strict";
import request from "request";
import * as fortnite_bdd from "../bdd/fortnite_bdd";

let headers = {"TRN-Api-Key": ""};

function getValueWithKey(json, key) {
    for (let i of json) {
        if (i.key === key) {
            return i.value;
        }
    }
}

export async function getStatsOfPlayer(plateform, playerName) {
    return new Promise((resolve, reject) => {
        let clientServerOptions = {
            uri: `https://api.fortnitetracker.com/v1/profile/${plateform}/${playerName}`,
            method: "GET",
            headers: headers,
            body: "",
        };

        request(clientServerOptions, function (error, response) {
            if (error || response.statusCode !== 200) return reject('Fortnite request cannot be send.');
            else {
                let json = JSON.parse(response.body);
                let result = {
                    accountId: json.accountId,
                    ratio: getValueWithKey(json.lifeTimeStats, "K/d"),
                    matches: getValueWithKey(json.lifeTimeStats, "Matches Played"),
                    kills: getValueWithKey(json.lifeTimeStats, "Kills"),
                    top1: getValueWithKey(json.lifeTimeStats, "Wins"),
                    winPourcentage: getValueWithKey(json.lifeTimeStats, "Win%"),
                };
                return resolve(result);
            }
        });
    });
}

export async function updateStore(ids) {
    return new Promise((resolve, reject) => {
        let clientServerOptions = {
            uri: "https://api.fortnitetracker.com/v1/store",
            method: "GET",
            headers: headers,
            body: "",
        };
        fortnite_bdd.canShopBeUpdated().then(result => {
            request(clientServerOptions, function (error, response) {
                if (error || response.statusCode !== 200) return reject('Fortnite request cannot be send.');
                else {
                    fortnite_bdd.updateShop(response.body, ids).then(result => {
                        resolve('OK');
                    }).catch(error => {
                        console.log(error);
                        resolve('KO');
                    });
                }
            });
        }).catch(error => {
            console.log('Fortnite Shop alreay Updated for today');
        });
    });
}

export async function updateStats(ids) {
    fortnite_bdd.getStatsSubscribe(ids).then(async result => {
        for (let item of result) {
            item.datas = JSON.parse(item.datas);
            item.platform = JSON.parse(item.platform);
            item.pseudo = JSON.parse(item.pseudo);
            let stat = await getStatsOfPlayer(item.platform, item.pseudo);
            if (item.datas === null || stat !== item.datas) {
                await fortnite_bdd.updateThisPlayerStat(item.id, stat);
            } else {
                console.log('Not updated Stat: ' + item.id);
            }
        }
    })
}

export async function update() {
    updateStore([71, 72, 73, 74]).catch();
    updateStats([81, 82, 83, 84]).catch();
    return 'OK';
}
