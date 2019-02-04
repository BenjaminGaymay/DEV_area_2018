import * as bdd from './src/bdd/mysql';

export async function services() {
    let services = [];

    return new Promise(function (resolve, reject) {
        bdd.getAllServices().then(result => {
            for (let service of result) {
                const path = './src/services/' + service.name;
                let file = require(path);
                services[service.id] = {
                    name: service.name,
                    run: file.run,
                    update: file.update
                };
            }
            resolve(services);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}