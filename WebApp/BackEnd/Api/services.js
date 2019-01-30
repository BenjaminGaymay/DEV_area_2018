import * as bdd from './src/mysql';

export async function services() {
    let services = [];

    return new Promise(function (resolve, reject) {
        bdd.getAllServices().then(result => {
            for (let service of result) {
                const path = './src/services/' + service.name;
                let run = require(path).run;
                let item = {
                    id: service.id,
                    name: service.name,
                    run: run,
                };
                services.push(item);
            }
            resolve(services);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}