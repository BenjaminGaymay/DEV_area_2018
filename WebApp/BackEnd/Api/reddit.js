const express = require('express');

const app = express();

const port = 3000;

const simpleOAuth2Reddit = require('simple-oauth2-reddit');

class RedditOauth2 {
    constructor(id, secret) {
        this.id = id;
        this.secret = secret;
        this.state = 'random-stringzer';
        this.reddit = simpleOAuth2Reddit.create({
            clientId: this.id,
            clientSecret: this.secret,
            callbackURL: 'http://localhost:3000/auth/reddit/callback',
            state: this.state
        })
    }

    authorizeUrl() { return this.reddit.authorize; }

    accessToken() { return this.reddit.accessToken; }
}
const reddit = new RedditOauth2('ZFLId6m5HYJzfw', 'KrqRjPUhWCo1P5ge1EiNWce-F0o');
// Ask the user to authorize.
app.get('/auth/reddit', reddit.authorizeUrl());

// Exchange the token for the access token.
app.get('/auth/reddit/callback', reddit.accessToken(), (req, res) => {
    console.log(req.token.refresh_token);
    return res.status(200).json(req.token);
});

// const secret_key = 'KrqRjPUhWCo1P5ge1EiNWce-F0o';
// const state = 'random-string';
// const redirection = 'http://127.0.0.1/auth_callback';
// const url = `https://www.reddit.com/api/v1/authorize?client_id=${secret_key}&response_type=code&
// state=${state}&redirect_uri=${redirection}&duration=permanent&scope=SCOPE_STRING`




app.get('/', (req, res) => {
    res.send('<a href="/auth/reddit/">Reddddit</a>');
})

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = RedditOauth2;