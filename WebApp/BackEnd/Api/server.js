import express from "express";
import cors from "cors";
import {router} from "./router"
import {Subscribes} from "./subscribes"
import {Services} from "./services"
import bodyParser from 'body-parser';
import authRouter from "./auth";

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.set('view_engine', 'ejs');

authRouter(app);

async function init() {
    let subscribes = new Subscribes();
    await subscribes.build();
    let services = new Services();
    await services.build();
    return {subscribes: subscribes, services: services};
}

init().then(result => {
    console.log(result);
    router(app, result.services, result.subscribes);
});

app.get("/", (req, res) => {
    res.send(`
    <a href="/auth/reddit">Reddit</a>
    <a href="/auth/facebook">Facebook</a>
    <a href="/auth/github">Github</a>
    <a href="/auth/try">Try</a>
    `);
});

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
