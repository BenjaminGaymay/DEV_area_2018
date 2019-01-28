const oauth2 = require('simple-oauth2');

class Github {

	constructor() {
        this.githubOauth2 = oauth2.create({
            client: {
                id: '07608ec23798cfb149de', //client_id
                secret: '336735b7ce21d14e474e64781455060fc23b440b', //client_secret,
            },
            auth: {
                tokenHost: 'https://github.com',
                tokenPath: '/login/oauth/access_token',
                authorizePath: '/login/oauth/authorize',
            },
        });
    }
}

const github = new Github();

module.exports = {
	github
}