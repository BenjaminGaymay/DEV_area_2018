import * as bdd from './src/bdd/bdd';

export class Services {

    constructor() {
        this.services = [];
        this.exceptions = ['http'];
    }

    async build() {
        return new Promise((resolve, reject) => {
            bdd.getAllServices().then(result => {
                for (let service of result) {
                    const path = './src/services/' + service.name;
                    let file = require(path);
                    this.services[service.name] = {
                        id: service.id,
                        run: file.run,
                        update: file.update,
                        getSchema: file.getSchema
                    };
                }
                return resolve('Ok');

            }).catch(error => {
                console.log(error);
                return reject(error);
            });
        });
    }

    getServices() {
        return this.services;
    }

    getByName(name) {
        return this.services[name];
    }

    getById(id) {
        if (typeof id === "string") {
            id = Number(id);
        }
        for (let item in this.services) {
            if (this.services[item].id === id) {
                return this.services[item];
            }
        }
        return null;
    }

    updateServices() {
        const interval = 300000; // 5 minutes

        console.log('Starting services update..');

        for (const name in this.services) {
            if (this.exceptions.indexOf(name) === -1)
                this.services[name].update();
        }

        setInterval(() => {
            console.log('Starting services update..');
            for (const name in this.services) {
                if (this.exceptions.indexOf(name) === -1)
                    this.services[name].update();
            }
        }, interval);
    }
}