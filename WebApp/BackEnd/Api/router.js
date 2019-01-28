'use strict';

import * as bdd from './mysql.js';
import fs from 'fs';

function getUnixTime() {
    return Date.now() / 1000 | 0;
}


export function router(app) {
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