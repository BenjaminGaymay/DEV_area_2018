import fs from "fs";
import ejs from "ejs";
import * as mail from "../services/mail";

export async function run(subscribe, req, res) {
    return new Promise((resolve, reject) => {
        fs.readFile("./template/httpEmailRecap.ejs", "utf8", function (err, content) {
            if (err) return err;
            if (subscribe.datas === null) subscribe.datas = {};
            subscribe.datas.token = subscribe.config_action.token;
            subscribe.datas.body = req.body;
            subscribe.datas.headers = req.headers;
            subscribe.datas.query = req.query;
            let html = ejs.render(content, {
                datas: subscribe.datas,
            });

            let mailJson = {
                subject: "Une requête a été reçu !",
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