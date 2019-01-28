import RedditOauth2 from "./reddit";
import { github } from "./github";
import { facebook } from "./facebook";

export default function(app) {
  const reddit = new RedditOauth2(
    process.env.REDDIT_CLIENT_ID,
    process.env.REDDIT_CLIENT_SECRET
  );

  app.get("/auth/reddit", reddit.authorizeUrl());

  app.get("/auth/reddit/callback", reddit.accessToken(), (req, res) => {
    console.log('token: '+ req.token.token.access_token);

    var request = require('request');

    var headers = {
        'Authorization': 'bearer ' + req.token.token.access_token,
        'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
    };

    var options = {
        url: 'https://oauth.reddit.com/api/v1/me',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else
          console.log('asazd')
    }

    request(options, callback);

    // res.headers('Authorization: bearer ', req.token.access_token);
    // res.headers('ChangeMeClient/0.1 by YourUsername', User-Agent);

    // return res.redirect("https://oauth.reddit.com/api/v1/me");
    return res.status(200).json(req.token);
  });

  app.get("/auth/github", (req, res) => {
    const authorizationUri = github.githubOauth2.authorizationCode.authorizeURL(
      {
        redirect_uri: `${process.env.IP}/callback`,
        scope: "notifications",
        state: "3(#0/!~"
      }
    );
    res.redirect(authorizationUri);
  });

  app.get("/callback", async (req, res) => {
    const code = req.query.code;
    const options = {
      code
    };
    try {
      const result = await github.githubOauth2.authorizationCode.getToken(
        options
      );
      console.log("The resulting token: ", result);
      const token = github.githubOauth2.accessToken.create(result);
      return res.status(200).json(token);
    } catch (error) {
      console.error("Access Token Error", error.message);
      return res.status(500).json("Authentication failed");
    }
  });

  //Facebook
  app.get("/auth/facebook", (req, res) => {
    const authorizationUri = facebook.facebookOauth2.authorizationCode.authorizeURL(
      {
        redirect_uri: `${process.env.IP}/auth/facebook/callback`,
        scope: ["email"]
      }
    );

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
