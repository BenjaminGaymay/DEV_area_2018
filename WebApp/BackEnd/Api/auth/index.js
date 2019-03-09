import RedditOauth2 from "./reddit";
import {github} from "./github";
import {facebook} from "./facebook";
import {readFileSync} from "fs";

export default function (app) {
    const reddit = new RedditOauth2(
        process.env.REDDIT_CLIENT_ID,
        process.env.REDDIT_CLIENT_SECRET
    );

    app.get("/auth/try", (req, res) => {
        reddit.getLastPostWithName('funny').then(results => {
            console.log(results);
            res.send(results);
        });
    });

    app.get("/auth/reddit", reddit.authorizeUrl());

    app.get("/auth/reddit/callback", reddit.accessToken(), async (req, res) => {
        const data = readFileSync('./auth/template.html', { encoding: 'utf-8' }).replace('ACCESS_TOKEN', req.token.token.access_token);
        return res.status(200).send(data);
        // console.log('token: ' + req.token.token.access_token);

        // const response = await reddit.getTrophies(req.token.token.access_token, req, res);
        // return res.status(200).json(response);
    });

    app.get("/auth/github", (req, res) => {
        const authorizationUri = github.githubOauth2.authorizationCode.authorizeURL(
            {
                redirect_uri: `${process.env.IP}/auth/github/callback`,
                scope: "notifications",
                state: "3(#0/!~"
            }
        );
        res.redirect(authorizationUri);
    });

    app.get("/auth/github/callback", async (req, res) => {
        const code = req.query.code;
        const options = {code};
        try {
            const result = await github.githubOauth2.authorizationCode.getToken(
                options
            );
            const token = github.githubOauth2.accessToken.create(result);
            const at = token.token.access_token;
            const data = readFileSync('./auth/template.html', { encoding: 'utf-8' }).replace('ACCESS_TOKEN', at);
            return res.status(200).send(data);
        } catch (error) {
            console.error("Access Token Error", error.message);
            return res.status(500).json("Authentication failed");
        }
    });

    //Facebook
    app.get("/auth/facebook", (req, res) => {
        const authorizationUri = facebook.facebookOauth2.authorizationCode.authorizeURL({
            redirect_uri: `${process.env.IP}/auth/facebook/callback`,
            scope: ["email"]
        });
        res.redirect(authorizationUri);
    });

    app.get("/auth/facebook/callback", async (req, res) => {
        const code = req.query.code;
        const options = {
            code,
            redirect_uri: `${process.env.IP}/auth/facebook/callback`
        };

        try {
            // The resulting token.
            const result = await facebook.facebookOauth2.authorizationCode.getToken(
                options
            );

            // Exchange for the access token.
            const token = facebook.facebookOauth2.accessToken.create(result);

            console.log(token.token.access_token);
            return res.redirect('https://graph.facebook.com/me/accounts');
        } catch (error) {
            console.error("Access Token Error", error.message);
            return res.status(500).json("Authentication failed");
        }
    });
}
// module.exports = router;
