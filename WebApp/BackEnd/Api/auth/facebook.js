const oauth2 = require('simple-oauth2');

class Facebook {

	constructor() {
        this.facebookOauth2 = oauth2.create({
            client: {
            id: "562433650890969",
            secret: "841c5ea2417282f9144c7c737e43e40a"
            },
            auth: {
            authorizeHost: 'https://facebook.com/',
            authorizePath: '/dialog/oauth',

            tokenHost: 'https://graph.facebook.com',
            tokenPath: '/oauth/access_token'
            }
        });
    }
}

const facebook = new Facebook();

module.exports = {
	facebook
}