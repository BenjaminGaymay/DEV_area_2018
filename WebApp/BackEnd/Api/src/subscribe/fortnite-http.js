import * as fortnite from "../services/fortnite";

export async function run(subscribe) {
    console.log(subscribe);
    /*fortnite.updateStore().then(result => {
        console.log("OUAI");
    }).catch(error => {
        console.log(error);
    });*/
    fortnite.action(2, subscribe.config_action.skinName).then(result => {
        console.log(result);
    });
}