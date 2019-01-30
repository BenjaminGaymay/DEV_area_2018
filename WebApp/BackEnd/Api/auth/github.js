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

      var options = {
            url: 'https://api.github.com/user/repos',
            headers: headers
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            const repos = []
            for (const i in body) {
                repos.push({ 'name':body[i].name, 'url':body[i].html_url});
            }
            return res.status(500).json(repos);
          }
          else {
            return res.status(500).json("raté la");

          }
      }

      request(options, callback);
    }

    getNotifs(access_token, req, res) {
        var request = require('request');

        var headers = {
          'Authorization': 'token ' + access_token,
          'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        var options = {
              url: 'https://api.github.com/notifications',
              headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                let a = JSON.parse(body);
                a = {'id':a[0].id, 'reason': a[0].reason, 'subject':a[0].subject};
                return res.status(500).json(a);
            }
            else {
                return res.status(500).json("raté la");
            }
        }

        request(options, callback);
      }

}

const github = new Github();

module.exports = {
	github
}