'use strict';
import request from 'request';
import * as bdd from '../bdd/bdd';

// url: http://api.themoviedb.org/3/movie/upcoming?page=1&api_key=8e0abe397ffd3af9ac5d115c0f815c2c&language= + lang
// img: http://image.tmdb.org/t/p/w200 + img url

export async function update() {
	// requete API pour avoir le dernier film sorti
	const previous = await bdd.getServiceDatasByName('imdb');

	request('http://api.themoviedb.org/3/movie/upcoming?page=1&api_key=&language=fr', (error, response, body) => {
		if (error) {
			return Promise.reject(error);
		}
		const lastMovie = JSON.parse(body)['results'][0]['title'];
		bdd.setServiceDatasByName('imdb', lastMovie).then();
		if (previous !== lastMovie)
			console.log('IMDb widgets needs to be updated');
		else
			console.log('IMDb already update');
		// resolve(lastMovie);
	})
}
