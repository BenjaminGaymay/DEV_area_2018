import RedditOauth2 from "./reddit";
import { github } from "./github";
import { facebook } from "./facebook";

export default function(app) {
  const reddit = new RedditOauth2(
    process.env.REDDIT_CLIENT_ID,
    process.env.REDDIT_CLIENT_SECRET
  );

  app.get("/auth/try", (req, res) => {
		reddit.getLastPostWithName('node').then(results => {
      console.log(results);
      res.send(results);
		});
  });

  app.get("/auth/reddit", reddit.authorizeUrl());

  app.get("/auth/reddit/callback", reddit.accessToken(), (req, res) => {
    console.log('token: '+ req.token.token.access_token);

    reddit.getTrophies(req.token.token.access_token, req, res)
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
    const options = {
      code
    };
    try {
      const result = await github.githubOauth2.authorizationCode.getToken(
        options
      );
      console.log("The resulting token: ", result);
      const token = github.githubOauth2.accessToken.create(result);
      console.log('token ' + token.token.access_token)

      github.getRepos(token.token.access_token, req, res)
      // return res.status(500).json(token.token.access_token);
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
