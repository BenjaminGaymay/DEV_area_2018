'use strict';
import request from 'request';
import * as bdd from '../mysql';

// url: http://api.themoviedb.org/3/movie/upcoming?page=1&api_key=8e0abe397ffd3af9ac5d115c0f815c2c&language= + lang
// img: http://image.tmdb.org/t/p/w200 + img url

async function action(widget, data, resolve, reject) {
}

async function reaction(widget, data, resolve, reject) {
}

async function update(widget, data, resolve, reject) {
	// requete API pour avoir le dernier film sorti
	console.log(await bdd.getServiceDatasByName('imdb'));
	request('http://api.themoviedb.org/3/movie/upcoming?page=1&api_key=8e0abe397ffd3af9ac5d115c0f815c2c&language=fr', (error, response, body) => {
		if (error) {
			reject(error);
		}
		const lastMovie = JSON.parse(body)['results'][0]['title'];
		bdd.setServiceDatasByName('imdb', lastMovie);
		resolve(lastMovie);
	})
}

export async function run(type, widget, data) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'action':
                return action(widget, data, resolve, reject);
            case 'reaction':
				return reaction(widget, data, resolve, reject);
			case 'update':
				return update(widget, data, resolve, reject);
            default:
                return reject('Type not found.');
        }
    });
}