const express = require('express');

const app = express();

const port = 3000;

const secret_key = 'KrqRjPUhWCo1P5ge1EiNWce-F0o';
const state = 'random-string';
const redirection = 'http://127.0.0.1/auth_callback';
const url = `https://www.reddit.com/api/v1/authorize?client_id=${secret_key}&response_type=code&
state=${state}&redirect_uri=${redirection}&duration=permanent&scope=SCOPE_STRING`


const simpleOAuth2Reddit = require('simple-oauth2-reddit');

const reddit = simpleOAuth2Reddit.create({
  clientId: 'ZFLId6m5HYJzfw',
  clientSecret: 'KrqRjPUhWCo1P5ge1EiNWce-F0o',
  callbackURL: 'http://localhost:3000/auth/reddit/callback',
  state: 'random-unique-string',
});

// Ask the user to authorize.
app.get('/auth/reddit', reddit.authorize);

// Exchange the token for the access token.
app.get('/auth/reddit/callback', reddit.accessToken, (req, res) => {
  return res.status(200).json(req.token);
});

app.get('/', (req, res) => {
    res.send('<a href="/auth/reddit/">Reddddit</a>');
})

app.listen(port, () => console.log(`Server listening on port ${port}`));