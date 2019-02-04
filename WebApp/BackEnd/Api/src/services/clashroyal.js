'use strict';
import request from 'request';
import * as bdd from '../bdd/mysql';

// Trigger: "" "victory" "defeat" "equality"

const url = 'https://api.clashroyale.com/v1/players/<tag>/battlelog';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI2ZDlkOWM1LTVkNzAtNDNlOC1iMDBhLTQxZDY0Mzk0Y2UxNiIsImlhdCI6MTU0OTI3ODM5Mywic3ViIjoiZGV2ZWxvcGVyL2FmYTAxMzk5LWJjNjItNjRjZi0wODZhLTYwMDY2Y2I5MDQ4YSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNjMuNS4yMjAuMjUiLCIxNjMuNS4yMjAuMjMiLCIxNjMuNS4yMjAuMTYiLCI3Ny4xMzYuMTcuODEiXSwidHlwZSI6ImNsaWVudCJ9XX0._T10bHQX_rD_pUsz_V1RZkNcHf7KV1GtReGbjZMg4HpNMaCTMDutYM3rXeJetR_1WwrwNQ5R5pUSB7ER4rWZxQ';

async function action(widget, data, resolve, reject) {
	console.log('action');
	run('reaction', undefined, undefined);
	resolve('action');
}

async function reaction(widget, data, resolve, reject) {
	console.log('reaction');
	resolve('reaction');
}

export async function update() {
	const widgets = await bdd.getSubscribeByActionServiceId('16');
	let headers = { Authorization: 'Bearer ' + token, Accept: 'application/json' };

	for (const widget of widgets) {
		request({
			url: url.replace('<tag>', widget.config_action_data.tag),
			headers
		}, (error, response, body) => {
			if (!error) {
				const lastGame = JSON.parse(body)[0];
				let state = '';

				if (lastGame.team[0].crowns > lastGame.opponent[0].crowns)
					state = 'victory';
				else if (lastGame.team[0].crowns === lastGame.opponent[0].crowns)
					state = 'equality';
				else
					state = 'defeat';

				if ((widget.config_action_data.trigger === '' || widget.config_action_data.trigger === state) && widget.action_data !== lastGame.battleTime) {
					bdd.updateSubscribeData(widget.id, lastGame.battleTime, {
						type: lastGame.type,
						team: lastGame.team.length > 1 ? [lastGame.team[0].name, lastGame.team[1].name] : [lastGame.team[0].name],
						opponent: lastGame.opponent.length > 1 ? [lastGame.opponent[0].name, lastGame.opponent[1].name] : [lastGame.opponent[0].name],
						state: state
					});
				}
			}
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