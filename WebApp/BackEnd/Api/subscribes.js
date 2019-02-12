import * as bdd from './src/bdd/bdd';

export class Subscribes {

    constructor() {
        this.services = [];
    }

    async build() {
        return new Promise((resolve, reject) => {
            bdd.getAllSubscribes().then(result => {
                for (let subscribe of result) {
                    const path = './src/subscribe/' + subscribe.filename;
                    let file = require(path);
                    this.services[subscribe.filename] = {
                        id: subscribe.id,
                        run: file.run,
                        //getSchema: file.getSchema
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
        if (typeof id === "string") id = Number(id);
        for (let item in this.services) {
            if (this.services[item].id === id) {
                return this.services[item];
            }
        }
        return null;
    }
}