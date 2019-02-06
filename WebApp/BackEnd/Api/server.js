import express from "express";
import cors from "cors";
import {router} from "./router"
import {Services} from "./services"
import authRouter from './auth';
import bodyParser from 'body-parser';
import { getUpdatedSubscribe, setSubscribeUpdatedFalse } from './src/bdd/bdd';


const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.set('view_engine', 'ejs');

authRouter(app);
let services = new Services();
services.build().then(result => {
    router(app, services);
    services.updateServices(services);

    setInterval(async () => {
        const widgets = await getUpdatedSubscribe();
        for (const widget of widgets) {
            services.getById(widget.action_service_id).run('action', undefined, undefined);
            setSubscribeUpdatedFalse(widget.id);
        }
    }, 1500);
}).catch(error => {
    console.log(error);
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
