import fs from "fs";
import ejs from "ejs";
import * as mail from "../services/mail";

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/fortniteStats.ejs", "utf8", function (err, content) {
            if (err) return err;
            let html = ejs.render(content, {
                datas: subscribe.datas,
                platform: subscribe.config_action.platform,
                pseudo: subscribe.config_action.pseudo
            });
            let mailJson = {
                subject: "Vos statistique sont disponibles !",
                html: html,
                to: [subscribe.config_reaction.to],
            };
            return mail.run(mailJson).then(result => {
                console.log(result);
                return resolve('OK');
            }).catch(error => {
                console.log(error);
                return reject('KO');
            });
        });
    });
}