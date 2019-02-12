"use strict";

import * as bdd from '../bdd/bdd';

// config_action: {"name": "TorresSwagg"}
// datas: {"name":"TorresSwagg","level":55,"lastChampion":"Lux","rank":"GOLD I","lp":24,"win":27,"lose":14}

const r = require('request');
const file = require('../../auth/lol.json');

async function action(widget, data, resolve, reject) {
	console.log('action');
	run('reaction', undefined, undefined);
	resolve('action');
}

async function reaction(widget, data, resolve, reject) {
	console.log('reaction');
	resolve('reaction');
}

function checkDataForUpdate(response, data, id) {
	if (response != data)
		bdd.updateLinkData(id, response);
	console.log('LolService: ending update..')
}

export async function update() {
	const widgets = await bdd.getLinkByActionLinkIdList(['45678']);
	const key = 'RGAPI-0e7847bf-0ab3-4e3d-9ebd-9f27d1abf3ee';

	console.log('LolService: starting update..');

	if (!widgets)
		return;

	for (const widget of widgets) {
		const datas = widget.datas
		let response = {name:'', level:'', lastChampion: '', rank: '', lp: '', win: 0, lose: 0};

		r.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + widget.config_action.name + '?api_key=' + key, (a, b) => {
		  const responseAccount = JSON.parse(b.body);
		  response.name = responseAccount.name;
		  response.level = responseAccount.summonerLevel;

		  r.get('https://euw1.api.riotgames.com/lol/league/v4/positions/by-summoner/' + responseAccount.id + '?api_key=' + key, (a, b) => {
			try {
			  const responseRank = JSON.parse(b.body)[0];
			  response.rank = responseRank.tier + ' ' + responseRank.rank;
			  response.lp = responseRank.leaguePoints
			  response.win = responseRank.wins
			  response.lose = responseRank.losses
			}
			catch {}

			r.get('https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + responseAccount.accountId + '?api_key=' + key, (a, b) => {
			  try {
				const responseMatchlist = JSON.parse(b.body).matches[0];
				for (const f in file) {
				  if (responseMatchlist.champion == file[f].key) {
					responseMatchlist.champion = file[f].name
					break;
				  }
				}
				response.lastChampion = responseMatchlist.champion;
				checkDataForUpdate(JSON.stringify(response), JSON.stringify(datas), widget.id)
			  }
			  catch {}
			})

		})
	})

	}
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
