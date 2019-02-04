import * as bdd from './src/mysql';

export async function services() {
    let services = [];

    return new Promise(function (resolve, reject) {
        bdd.getAllServices().then(result => {
            for (let service of result) {
                const path = './src/services/' + service.name;
                let run = require(path).run;
                let update = require(path).update;
                services[service.name] = {
                    id: service.id,
                    run: run,
                    update: update
                };
            }
            resolve(services);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

export async function updateServices(services) {
    setInterval(() => {
        console.log('Starting services update..');
        for (const name in services) {
            if (services[name].update)
                services[name].update();
        }
    }, 5000);
}