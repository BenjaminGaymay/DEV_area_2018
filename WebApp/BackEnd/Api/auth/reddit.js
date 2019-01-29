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

  async getLastPostWithName(name) {
    return new Promise((resolve, reject) => {
      request.get('https://www.reddit.com/r/' + name + '/new/.json', (error, response) => {
        // console.log(error);
        response = JSON.parse(response.body);
        if (response.data.dist != 0) {
          response = response.data.children[0].data;
          console.log({'title': response.title, 'author': response.author, 'url': response.url});
          resolve({'title': response.title, 'author': response.author, 'url': response.url});
        }
        else {
          console.log('vide')
          resolve(null);
        }
      });
      // res.redirect('https://www.reddit.com/r/node/new/.json?count=20');
    });
  }

}



module.exports = RedditOauth2;
