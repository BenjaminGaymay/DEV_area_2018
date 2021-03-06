import {query} from "./bdd";

function findInShop(shop, skinName) {
    for (let item of shop) {
        if (item.name === skinName) {
            return item;
        }
    }
    return null;
}

export async function canShopBeUpdated() {
    return new Promise((resolve, reject) => {
        return query(`SELECT IF(datas IS NULL, 'yes', 'no') as vide, IF(DATE_FORMAT(NOW(), '%y-%m-%d') > JSON_EXTRACT(datas, '$.lastUpdate'), 'yes', 'no') as value
               FROM service
               WHERE id = 1`)
            .catch(error => {
                console.log(error);
            }).then(result => {
            if (typeof result[0] == "undefined")
                return reject('KO');
            return (result[0].vide === 'yes' || (result[0].vide === 'no' && result[0].value === 'yes')) ? resolve('OK') : reject('KO');
        })
    })
}

export async function updateShop(json, ids) {
    json = JSON.parse(json);
    return query(`UPDATE service
                  set datas = '{"lastUpdate": "0"}',
                      datas = JSON_SET(datas, '$.lastUpdate', DATE_FORMAT(NOW(), '%y-%m-%d'))
                  WHERE id = 1`)
        .catch(error => {
            console.log(error);
            return Promise.reject('KO');
        }).then(async result => {
            let array = await query(`SELECT id, json_extract(config_action, '$.skinName') as skinName
                                     From link
                                     where subscribe_id in (${ids.toString()})`);
            for (let index in array) {
                let item = findInShop(json, JSON.parse(array[index].skinName));
                if (item != null) {
                    await query(`UPDATE link
                        set datas = '{"skinName": "${item.name}", "vBucks": "${item.vBucks}" , "url": "${item.imageUrl}"}',
                            updated = TRUE
                        WHERE id = '${array[index].id}' and updated=FALSE`);
                }
            }
            return 'OK';
        })
}

export async function getUpdatedUserShop(subscribe_id) {
    return query(`SELECT * FROM link WHERE id = ${subscribe_id}
                      AND updated = TRUE`)
        .catch(error => {
            console.log(error);
            return Promise.reject('KO');
        })
        .then(result => {
            return result;
        });
}

export async function getStatsSubscribe(ids) {
    return query(`SELECT id,
                         user_id,
                         subscribe_id,
                         datas,
                         JSON_EXTRACT(config_action, '$.platform') as platform,
                         JSON_EXTRACT(config_action, '$.pseudo')   as pseudo
                  FROM link
                  WHERE subscribe_id in (${ids.toString()})
                    AND updated = FALSE`)
        .catch(error => {
            console.log(error);
            return Promise.reject('KO');
        }).then(result => {
            return result;
        });
}

export async function updateThisPlayerStat(id, stat) {
    stat = JSON.stringify(stat);
    return query(`UPDATE link set datas = '${stat}', updated = TRUE where id = '${id}'`).catch(error => {
        console.log(error);
        return Promise.reject('KO');
    }).catch(result => {
        return 'Ok';
    })
}