const simpleOauth2Reddit = require('simple-oauth2-reddit');
var request = require('request');

class RedditOauth2 {
  constructor(id, secret) {
    this.id = id;
    this.secret = secret;
    this.state = "random-stringzer";
    this.reddit = simpleOauth2Reddit.create({
      clientId: this.id,
      clientSecret: this.secret,
      callbackURL: `http://localhost:3000/auth/reddit/callback`,
      state: this.state
    });
  }

  authorizeUrl() {
    return this.reddit.authorize;
  }

  accessToken() {
    return this.reddit.accessToken;
  }

  getTrophies(access_token, req, res) {
    var headers = {
        'Authorization': 'bearer ' + access_token,
        'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
    };

    var options = {
        url: 'https://oauth.reddit.com/api/v1/me/trophies',
        headers: headers
    };

    function callbackTrophies(error, response, body) {
        if (!error && response.statusCode == 200) {
          return res.status(200).json(JSON.parse(body));
        }
        else {
          return res.status(200).json(error);
        }
    }

    request(options, callbackTrophies);
  }

}



module.exports = RedditOauth2;
