import {query} from "./bdd";

function findInShop(shop, skinName) {
    for (let item of shop) {
        if (item.name === skinName) {
            return item;
        }
    }
    return null;
}

export async function updateShop(json) {
    json = JSON.parse(json);
    return query(`UPDATE service
                  set datas = '{"lastUpdate": "0"}',
                      datas = JSON_SET(datas, '$.lastUpdate', NOW())
                  WHERE id = 1`)
        .catch(error => {
            console.log(error);
            return Promise.reject('KO');
        }).then(async result => {
            let array = await query(`SELECT id, json_extract(config_action, '$.skinName') as skinName
                                     From link
                                     where subscribe_id = 2
                                        or subscribe_id = 1`);
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

export async function getStatsSubscribe() {
    return query(`SELECT id,
                         user_id,
                         subscribe_id,
                         datas,
                         JSON_VALUE(config_action, '$.platform') as platform,
                         JSON_VALUE(config_action, '$.pseudo')   as pseudo
                  FROM link
                  WHERE subscribe_id = '6'
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