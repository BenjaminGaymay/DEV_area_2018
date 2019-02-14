"use strict";

import { getLinkByActionLinkIdList, updateLinkData } from '../bdd/bdd';

export async function update() {
    await updateGetRepos();
	await updateGetNotifs();
	await updateGetLastIssue();
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(let i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

export  async function updateGetRepos() {
    const widgets = await getLinkByActionLinkIdList(['30']);

    console.log('GithubGetReposService: starting update..');

	if (!widgets)
		return;

    for (const widget of widgets) {
		const request = require('request');

		const headers = {
			Authorization: 'token ' + widget.config_action.access_token,
			'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
		};

		const options = {
			url: 'https://api.github.com/user/repos',
			headers: headers
		};

		request(options, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				let repos = [];
				body = JSON.parse(body);
				for (const i in body) {
					repos.push({ 'name':body[i].name, 'url':body[i].html_url});
				}

				if (JSON.stringify(repos) !== JSON.stringify(widget.datas.repos)) {
					updateLinkData(widget.id, { repos }).then();
				}
			}
		});
	}

	console.log('GithubGetReposService: ending update..');
}

export async function updateGetNotifs() {
	const widgets = await getLinkByActionLinkIdList(['40']);

    console.log('GithubGetNotifsService: starting update..');

	if (!widgets)
		return;

    for (const widget of widgets) {

		const request = require('request');

		const headers = {
		Authorization: 'token ' + widget.config_action.access_token,
		'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
		};

		const options = {
			url: 'https://api.github.com/notifications',
			headers: headers
		};

		request(options, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				let a = JSON.parse(body);
				try {
					a = {
						id: a[0].id,
						reason: a[0].reason,
						title: a[0].subject.title,
						type: a[0].subject.type,
						url: a[0].repository.html_url
					};
					if (JSON.stringify(a) !== JSON.stringify(widget.datas)) {
						updateLinkData(widget.id, a).then();
					}
				}
				catch {}
			}
		});
	}
	console.log('GithubGetNotifsService: ending update..');

}

export async function updateGetLastIssue() {
	const widgets = await getLinkByActionLinkIdList(['50']);

    console.log('GithubGetLastIssueService: starting update..');

	if (!widgets)
		return;

    for (const widget of widgets) {
		const request = require('request');

		const headers = {
		Authorization: 'token ' + widget.config_action.access_token,
		'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
		};

		const options = {
			url: 'https://api.github.com/user/issues',
			headers: headers
		};

		request(options, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				try {
					body = JSON.parse(body)[0];
					let finalResponse = {id: body.id, url:body.html_url, title: body.title};

					if (JSON.stringify(finalResponse) !== JSON.stringify(widget.datas)) {
						updateLinkData(widget.id, finalResponse).then();
					}
				}
				catch {}
			}
		});
	}
    console.log('GithubGetLastIssueService: ending update..');

}
