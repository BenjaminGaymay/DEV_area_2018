import * as bdd from './src/bdd/mysql';

const exceptions = ['http', 'imdb'];

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

export async function updateServices(services) {
    services = services.filter(service => service != null && service.update && exceptions.indexOf(service.name) === -1)
    const interval = 300000; // 5 minutes

    console.log('Starting services update..');
    for (let service of services) {
        service.update();
    }

    setInterval(() => {
        console.log('Starting services update..');
        for (let service of services) {
            service.update();
        }
    }, 25000);
}