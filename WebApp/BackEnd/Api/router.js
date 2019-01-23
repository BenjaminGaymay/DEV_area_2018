export function router(app) {
    app.get('/', function (req, res) {
        res.send("coucou");
    });

    app.get('/test', function (req, res) {
        console.log(req.headers);
        console.log(req.params);
        res.send("coucou");
    });

    app.post('/test', function (req, res) {
        console.log(req.headers);
        console.log(req.body);
        res.send("coucou");
    });
}