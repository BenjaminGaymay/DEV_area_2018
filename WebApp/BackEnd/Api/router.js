import * as bdd from './mysql.js'

export function router(app) {
    app.get('/', function (req, res) {
        res.send("coucou");
        bdd.getUserByName('admin').then(user => {
            bdd.getUserServices(user.id).then(result => {
                console.log("Taille du tableau result: " + result.length);
                console.log(result);
            }).catch(error => {
                console.log(error); // aucun abonnement
            });
        }).catch(error => {
            console.log(error); // user not found
        });
    });
}