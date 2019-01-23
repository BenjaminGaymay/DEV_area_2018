import express from "express";
import {router} from "./router";
import {run} from "./ServiceHTTP";
import http from "http";
import {rootDir} from "./constant";

const app = express();
app.use(express.json());

app.use(express.static(rootDir + '/assets'));

const server = http.createServer(app);
server.listen(8081, function () {
    console.log('Example app listening on port 8081 !')
});

router(app);
run().then(data => {
    console.log('OK');
    console.log(data);
}).catch(error => {
    console.log('KO');
    console.log(error);
});