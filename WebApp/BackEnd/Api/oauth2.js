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





// app.get('/facebook', (req, res) => {
//     res.send('Hello<br><a href="/auth/facebook">Log in with Github</a>');
// });

// app.get('/github', (req, res) => {
//     res.send('Hello<br><a href="/auth/github">Log in with Github</a>');
// });

app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth/facebook">Log in with Facebook</a><br><a href="/auth/github">Log in with Github</a>');
});