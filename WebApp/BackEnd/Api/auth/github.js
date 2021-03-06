const oauth2 = require('simple-oauth2');

class Github {

	constructor() {
        this.githubOauth2 = oauth2.create({
            client: {
                id: '', //client_id
                secret: '', //client_secret,
                // 
            },
            auth: {
                tokenHost: 'https://github.com',
                tokenPath: '/login/oauth/access_token',
                authorizePath: '/login/oauth/authorize',
            },
        });
    }

    async getRepos(access_token, req, res) {
      const request = require('request');

      const headers = {
        Authorization: 'token ' + access_token,
        'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
      };

      const options = {
            url: 'https://api.github.com/user/repos',
            headers: headers,
            method: 'GET'
      };

      return new Promise((resolve, reject) => {
          request(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                try {
                    const repos = [];
                    body = JSON.parse(body);
                    for (const i in body) {
                        repos.push({ 'name':body[i].name, 'url':body[i].html_url});
                    }
                    return resolve(repos);
                }
                catch {
                    console.log(error);
                    return reject('KO');
                }
            }
            else {
                console.log(error);
                return reject('KO');
            }
            });
        });
    }

    async getLastIssue(access_token, req, res) {
        const request = require('request');

        const headers = {
          Authorization: 'token ' + access_token,
          'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        const options = {
              url: 'https://api.github.com/user/issues',
              headers: headers,
              method: 'GET',

        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
              if (!error && response.statusCode === 200) {
                  try {
                      body = JSON.parse(body)[0]
                      let finalResponse = {id: body.id, url:body.html_url, title: body.title}

                      resolve(finalResponse);
                  }
                  catch {
                      console.log(error);
                      return reject('KO');
                  }
              }
              else {
                  console.log(error);
                  return reject('KO');
              }
              });
          });
      }

    async getNotifs(access_token, req, res) {
        const request = require('request');

        console.log(access_token)
        const headers = {
          Authorization: 'token ' + access_token,
          'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        const options = {
              url: 'https://api.github.com/notifications',
              headers: headers,
              method: 'GET'
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let a = JSON.parse(body);
                    try {
                        a = {
                            id: a[0].id,
                            reason: a[0].reason,
                            title: a[0].subject.title,
                            type: a[0].subject.type,
                            url: a[0].repository.html_url
                        };
                        return resolve(a);
                    }
                    catch {
                        console.log(error);
                        return reject('KO');
                    }
                }
                else {
                    console.log(error);
                    return reject('KO');
                }
              });
          });
      }

      async createRepo(access_token, name) {
        const request = require('request');

        const headers = {
          Authorization: 'token ' + access_token,
          'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        const dataString = '{ "name": "' + name + '","homepage": "https://github.com","private": false,"has_issues": true,"has_projects": true,"has_wiki": true}';

        const options = {
            url: 'https://api.github.com/user/repos',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                console.log('Ok repo created')
                resolve('Ok')
            });
        });
      }

      async createIssue(access_token, username, repoName, title, description) {
        const request = require('request');

        const headers = {
          Authorization: 'token ' + access_token,
          'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
        };

        const dataString = '{"title": "' + title + '","body": "' + description + '"}';

        const options = {
            url: 'https://api.github.com/repos/' + username + '/' + repoName + '/issues',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                console.log("Ok Issue created");
                resolve('Ok');
            });
        });
      }
}

const github = new Github();

module.exports = {
	github
}
