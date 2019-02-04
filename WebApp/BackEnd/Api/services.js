import * as bdd from './src/bdd/mysql';

export class Services {

    constructor() {
        this.services = [];
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
                        update: file.update
                    };
                }
                return resolve('Ok');

            }).catch(error => {
                console.log(error);
                return reject(error);
            });
        });
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
}