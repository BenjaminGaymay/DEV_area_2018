import express from "express";
import cors from "cors";
import {router} from "./router"
import {Subscribes} from "./subscribes"
import {Services} from "./services"
import authRouter from './auth';
import bodyParser from 'body-parser';
import ejs from "ejs";
import { getAllLinkUpdated, setLinksUpdatedFalse } from './src/bdd/bdd';


const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

authRouter(app);

async function init() {
    let subscribes = new Subscribes();
    await subscribes.build();
    let services = new Services();
    await services.build();
    setInterval(async () => {
        const widgets = await getAllLinkUpdated();

        console.log('Check for new updated services..');
        for (const widget of widgets) {
            const link = services.getLinksByID(widget.subscribe_id);

            if (link) {
                link.run(widget);
                setLinksUpdatedFalse(widget.id);
            }
        }
    }, 1500);

    return {subscribes: subscribes, services: services};
}

init().then(result => {
    //console.log(result);
    router(app, result.services, result.subscribes);
    result.services.updateServices(result.services);
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
