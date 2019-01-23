'use strict';

const fs = require('fs');

function getUnixTime() {
	return Date.now() / 1000 | 0;
};

export function router(app) {
    app.get('/', function (req, res) {
        res.send("coucou");
    });

    app.get('/about.json', (req, res) => {
        const about = JSON.parse(fs.readFileSync('about.json', 'utf8'));

        about.client.host = req.ip.split(':').pop();
        about.server.current_time = getUnixTime();
        res.send(about);
    });
}