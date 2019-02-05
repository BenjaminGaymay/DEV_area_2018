"use strict";
import request from "request";
import {jsonCompare as compare} from "../jsonSchemaCompare";
import * as bdd from "../bdd/mysql";

const schemaMail = {
    url: "",
    method: "",
};

const schema = JSON.stringify(schemaMail);

async function action(widget, data, resolve, reject) {
    resolve('OK');
}

async function reaction(widget, data, resolve, reject) {
    resolve('OK');

}

export async function run(type, widget, data) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'action':
                return action(widget, data, resolve, reject);
            case 'reaction':
                return reaction(widget, data, resolve, reject);
            default:
                return reject('Type not found.');
        }
    });
}

export async function update(widget) {

}

export function getSchema() {
    return {
        action: {},
        reaction: {}
    }
}