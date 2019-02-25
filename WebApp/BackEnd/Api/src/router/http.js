import * as http_bdd from "../bdd/http_bdd"

async function Http(req, res, services) {
    return new Promise((resolve, reject) => {
        http_bdd.findUrlToken(req.params.token).then(result => {
            result.config_action = JSON.parse(result.config_action);
            result.config_reaction = JSON.parse(result.config_reaction);
            result.datas = JSON.parse(result.datas);
            services.getLinksByID(result.subscribe_id).run(result, req, res).then(result => { // on call la fonction run de l'abonnement en question
                return resolve('OK');
            }).catch(error => {
                console.log(error);
                return reject('KO');
            });
        }).catch(error => {
            console.log(error);
            return reject('KO');
        });
    });
}

export default function router(app, services) {
    app.get("/generateHttp/", (req, res) => {
        http_bdd.createToken().then(result => {
            res.status(200).send(result);
        }).catch(error => {
            console.log(error);
        });
    });

    app.get("/http/:token", (req, res) => {
        Http(req, res, services).then(result => {
            res.send('OK')
        }).catch(error => {
            console.log(error);
            res.status(500).send('KO')
        });
    });
    app.post("/http/:token", (req, res) => {
        Http(req, res, services).then(result => {
            res.send('OK')
        }).catch(error => {
            console.log(error);
            res.status(500).send('KO')
        });
    });
}