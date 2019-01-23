import * as bdd from './mysql.js'

export function router(app) {
    app.get('/', function (req, res) {
        res.send("coucou");
    });
}