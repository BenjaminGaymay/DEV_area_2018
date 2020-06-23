'use strict';
import request from 'request';
import * as bdd from '../bdd/bdd';

// config_action: {"tag": "22RQY209Q", "trigger": ""} -> Trigger: "", "victory", "defeat", "equality"
// datas: {"date":"20190212T114210.000Z","type":"friendly","team":["TorresSwagg"],"opponent":["Shay"],"state":"victory"}

const url = 'https://api.clashroyale.com/v1/players/<tag>/battlelog';

// Recréer token : https://developer.clashroyale.com/#/
const token = '';

export async function update() {
	const widgets = await bdd.getLinkByActionLinkIdList(['11', '12', '13', '14', '15', '16', '17', '18', '19']);

	let headers = { Authorization: 'Bearer ' + token, Accept: 'application/json' };
	console.log('ClashRoyalService: starting update..');

	if (!widgets)
		return;

	for (const widget of widgets) {
		console.log(widget);
		request({
			url: url.replace('<tag>', '%23' + widget.config_action.tag),
			headers
		}, (error, response, body) => {
			if (error || response.statusCode !== 200) {
				console.log('ClashRoyalService:', error ? error : 'invalid status code:', response.statusCode);
				return;
			}
			const lastGame = JSON.parse(body)[0];

			let state = '';

			if (lastGame.team[0].crowns > lastGame.opponent[0].crowns)
				state = 'victory';
			else if (lastGame.team[0].crowns === lastGame.opponent[0].crowns)
				state = 'equality';
			else
				state = 'defeat';

			if ((widget.config_action.trigger === '' || widget.config_action.trigger === state) && (!widget.datas || widget.datas.date !== lastGame.battleTime)) {
				bdd.updateLinkData(widget.id, {
					date: lastGame.battleTime,
					type: lastGame.type,
					team: lastGame.team.length > 1 ? [lastGame.team[0].name, lastGame.team[1].name] : [lastGame.team[0].name],
					opponent: lastGame.opponent.length > 1 ? [lastGame.opponent[0].name, lastGame.opponent[1].name] : [lastGame.opponent[0].name],
					state: state
				}).then();
			}
			console.log('ClashRoyalService: update ended.');
		})
	}
}
