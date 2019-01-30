import * as bdd from './src/bdd/mysql';

export async function services() {
    let services = [];

    return new Promise(function (resolve, reject) {
        bdd.getAllServices().then(result => {
            for (let service of result) {
                const path = './src/services/' + service.name;
                let run = require(path).run;
                services[service.name] = {
                    id: service.id,
                    run: run,
                };
            }
            resolve(services);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}