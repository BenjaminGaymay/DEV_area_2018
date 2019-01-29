const simpleOauth2Reddit = require('simple-oauth2-reddit');


class RedditOauth2 {
  constructor(id, secret) {
    this.id = id;
    this.secret = secret;
    this.state = "random-stringzer";
    this.reddit = simpleOauth2Reddit.create({
      clientId: this.id,
      clientSecret: this.secret,
      callbackURL: `${process.env.IP}/auth/reddit/callback`,
      state: this.state
    });
  }

  authorizeUrl() {
    return this.reddit.authorize;
  }

  accessToken() {
    return this.reddit.accessToken;
  }
}

module.exports = RedditOauth2;
