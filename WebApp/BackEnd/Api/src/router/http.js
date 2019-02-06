function Http(req, res, services) {
    services.getByName("http").update(services, req, res).then(result => {
        console.log(result);
        res.status(200);
        res.send("OK");
    }).catch(error => {
        console.log(error);
        res.status(500);
        res.send("KO");
    });
}

export default function router(app, services) {
    app.get("/http/:token", (req, res) => {
        return Http(req, res, services);
    });
    app.post("/http/:token", (req, res) => {
        return Http(req, res, services);
    });
}