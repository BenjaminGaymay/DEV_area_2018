import fs from "fs";
import ejs from "ejs";
import * as mail from "../services/mail";

export async function run(subscribe) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/redditPost.ejs", "utf8", function (err, content) {
            if (err) return err;
            subscribe.datas.topic = subscribe.config_action.name;
            let html = ejs.render(content, {
                datas: subscribe.datas,
            });
            let mailJson = {
                subject: "Un nouveau post est disponible !",
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