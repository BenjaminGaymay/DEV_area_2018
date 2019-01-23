const express = require('express');
const http = require('http');
const oauth2 = require('simple-oauth2');
const app = express();

const server = http.createServer(app);

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

// const oauth2 = require('simple-oauth2').create({
//     client: {
//         id: '07608ec23798cfb149de', //client_id
//         secret: '336735b7ce21d14e474e64781455060fc23b440b', //client_secret,
//     },
//     auth: {
//         tokenHost: 'https://github.com',
//         tokenPath: '/login/oauth/access_token',
//         authorizePath: '/login/oauth/authorize',
//     },
// });

// Authorization uri definition
// const authorizationUri = oauth2.authorizationCode.authorizeURL({
//     redirect_uri: 'http://localhost:3000/auth/facebook/callback',
//     scope: 'notifications',
//     state: '3(#0/!~',
// });

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

// Initial page redirecting to Github
app.get('/auth/github', (req, res) => {
    const authorizationUri = github.githubOauth2.authorizationCode.authorizeURL({
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'notifications',
        state: '3(#0/!~',
    });
    res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const options = {
        code,
    };
    try {
        const result = await github.githubOauth2.authorizationCode.getToken(options);
        console.log('The resulting token: ', result);
        const token = github.githubOauth2.accessToken.create(result);
        return res.status(200).json(token)
    } catch (error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }
});

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

app.get('/auth/facebook', (req, res) => {
    const authorizationUri = facebook.facebookOauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/facebook/callback',
    scope: ['email']
    });

    res.redirect(authorizationUri);
});

app.get('/auth/facebook/callback', async(req, res) => {
    const code = req.query.code;
    const options = {
    code,
    redirect_uri: 'http://localhost:3000/auth/facebook/callback'
    };

    try {
    // The resulting token.
    const result = await facebook.facebookOauth2.authorizationCode.getToken(options);

    // Exchange for the access token.
    const token = facebook.facebookOauth2.accessToken.create(result);

    return res.status(200).json(token);
    } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
    }
});

// app.get('/facebook', (req, res) => {
//     res.send('Hello<br><a href="/auth/facebook">Log in with Github</a>');
// });

// app.get('/github', (req, res) => {
//     res.send('Hello<br><a href="/auth/github">Log in with Github</a>');
// });

app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth/facebook">Log in with Facebook</a><br><a href="/auth/github">Log in with Github</a>');
});