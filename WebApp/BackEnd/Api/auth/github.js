const oauth2 = require('simple-oauth2');

class Github {

	constructor() {
        this.githubOauth2 = oauth2.create({
            client: {
                id: '194cfee6fc3a10ed3719', //client_id
                secret: 'bdb4a654bf231a30792c127f04d9b6aaf20d45ba', //client_secret,
                // 6a5e2554c2e3ed9fa33131aa2ae0b0b5a07bb275
            },
            auth: {
                tokenHost: 'https://github.com',
                tokenPath: '/login/oauth/access_token',
                authorizePath: '/login/oauth/authorize',
            },
        });
    }

    getRepos(access_token, req, res) {
      var request = require('request');

      var headers = {
        'Authorization': 'token ' + access_token,
        'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
      };

      var mdr = {
          url: 'https://api.github.com/user/repos',
          headers: headers
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
              return res.status(500).json(JSON.parse(body));
          }
          else {
            return res.status(500).json("raté la");

          }
      }

      request(mdr, callback);
    }
}

const github = new Github();

module.exports = {
	github
}