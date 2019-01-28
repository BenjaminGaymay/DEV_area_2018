
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'EYH9kon26eLLhFfTd4vZparm0',
    consumerSecret: 'eEyY9osHJjqNbK3bouth98IMVBiMPtvFjsP4cA8XkSYSmfMAyF',
    callback: 'https://young-owl-7.localtunnel.me/callback'
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        console.log(results);
        //store token and tokenSecret somewhere, you'll need them later; redirect user
    }
});