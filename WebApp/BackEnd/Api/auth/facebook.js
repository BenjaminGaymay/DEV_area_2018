const oauth2 = require('simple-oauth2');

class Facebook {

	constructor() {
        this.facebookOauth2 = oauth2.create({
            client: {
            id: "",
            secret: ""
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
