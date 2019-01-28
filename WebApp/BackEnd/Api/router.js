'use strict';

import * as bdd from './src/mysql';
import * as mail from './src/mail';
import * as http from './src/ServiceHTTP';
import fs from 'fs';

function getUnixTime() {
    return Date.now() / 1000 | 0;
}

let mailJson = {
    subject: "Epitech c'est nul",
    html: '<div style="margin-left:auto;margin-right:auto;width:50%;"><img class="logo" alt="mdr" src="http://www.fourfrontgroup.co.uk/assets/uploads/images/Area_Primary_Logo_rgb_1.png"/><div><p style="text-align:center;"><a style="color:#282c34;font-size:20px;" href="#">Confirm your account</a></p></div></div>',
    to: ["poubelleapipoubelle@gmail.com", "poubelleapipoubelle@gmail.com"],
};

export function router(app) {
    // fs.readFile('./template/mail.html', 'utf8', function (err, content) {
    //     mailJson.html = content;
    //     mail.run(JSON.stringify(mailJson)).then(result => {
    //         console.log(result);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // });

    // http.run("").then(result => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error);
    // });

    app.post('/login', (req, res) => {
        bdd.login(req.body.login, req.body.password).then(result => {
            console.log(result);
            res.status(200);
            res.send("OK");
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send("KO");
        });
    });

    app.post('/register', (req, res) => {
        bdd.register(req.body.email, req.body.login, req.body.password).then(result => {
            console.log(result);
            res.status(200);
            res.send("OK");
        }).catch(error => {
            console.log(error);
            res.status(500);
            res.send(error);
        });
    });


    app.get('/', function (req, res) {
        bdd.getUserByName('admin').then(user => {
            bdd.getUserServices(user.id).then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error); // aucun abonnement
            });
        }).catch(error => {
            console.log(error); // user not found
        });
    });

    app.get('/about.json', (req, res) => {
        const about = JSON.parse(fs.readFileSync('about.json', 'utf8'));

        about.client.host = req.ip.split(':').pop();
        about.server.current_time = getUnixTime();
        res.send(about);
    });
}