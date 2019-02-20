import * as bdd from './src/bdd/bdd';
import { readdir } from 'fs';

export class Services {

    constructor() {
        this.services = [];
        this.links = [];
        this.exceptions = ['http'];
    }

    async build() {
        return new Promise((resolve, reject) => {

            readdir('./src/services/links/', (err, files) => {
                files.forEach(file => {
                    const newLink = require('./src/services/links/' + file);
                    this.links[this.links.length] = {
                        id: newLink.id,
                        name: newLink.name,
                        run: newLink.run,
                        subscribe: newLink.subscribe,
                        schema: newLink.getSchema

                    };
                });
            });

            bdd.getAllServices().then(result => {
                for (let service of result) {
                    const path = './src/services/' + service.filename;
                    let file = require(path);
                    this.services[service.filename] = {
                        id: service.id,
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

    getLinks() {
        return this.links;
    }

    getLinksByID(id) {
        if (typeof id === "string") {
            id = Number(id);
        }
        for (let item in this.links) {
            if (this.links[item].id === id) {
                return this.links[item];
            }
        }
        return null;
    }

    updateServices() {
        const interval = 300000; // 5 minutes

        console.log('Starting services update..');

        for (const name in this.services) {
            if (this.exceptions.indexOf(name) === -1) {
                this.services[name].update().catch(error => {
                    console.log(error);
                });
            }
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