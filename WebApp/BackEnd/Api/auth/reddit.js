import simpleOauth2Reddit from 'simple-oauth2-reddit';
import request from 'request';


class RedditOauth2 {
    constructor(id, secret) {
        this.id = id;
        this.secret = secret;
        this.state = 'random-stringzer';
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

    async getTrophies(access_token, req, res) {
        let headers = {
            'Authorization': 'bearer ' + access_token,
            'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        let options = {
            url: 'https://oauth.reddit.com/api/v1/me/trophies',
            headers: headers
        };


        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    try {
                        body = JSON.parse(body).data.trophies;
                        const trophies = [];
                        for (const i in body) {
                            trophies.push({name: body[i].data.name, image: body[i].data.icon_40});
                        }
                        return resolve(trophies);
                    } catch {
                        console.log(error);
                        return reject('KO');
                    }
                } else {
                    console.log(error);
                    return reject('KO');
                }
            });
        });
    }

    async getLastPostWithName(name) {
        return new Promise((resolve, reject) => {
            request.get('https://www.reddit.com/r/' + name + '/new/.json', (error, response) => {
                response = JSON.parse(response.body);
                if (response.data.dist !== 0) {
                    response = response.data.children[0].data;
                    /*console.log({'title': response.title, 'author': response.author, 'url': response.url});*/
                    resolve({'title': response.title, 'author': response.author, 'url': response.url, 'created': response.created});
                } else {
                    resolve(undefined);
                }
            });
        });
    }

}

module.exports = RedditOauth2;
