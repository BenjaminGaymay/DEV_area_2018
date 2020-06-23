"use strict";

import * as bdd from '../bdd/bdd';

// config_action: {"name": "TorresSwagg"}
// datas: {"name":"TorresSwagg","level":55,"lastChampion":"Lux","rank":"GOLD I","lp":24,"win":27,"lose":14}

import * as r from  'request';
import * as file from '../../auth/lol.json';

function checkDataForUpdate(response, data, id) {
	if (response !== data)
		bdd.updateLinkData(id, response).then();
	console.log('LolService: ending update..')
}

export async function update() {
	const widgets = await bdd.getLinkByActionLinkIdList(['63', '64']);
	const key = '';

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
