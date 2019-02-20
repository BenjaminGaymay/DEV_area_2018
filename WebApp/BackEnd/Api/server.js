import express from "express";
import cors from "cors";
import {router} from "./router"
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
    let services = new Services();
    await services.build();
    setInterval(async () => {
        const widgets = await getAllLinkUpdated();

        console.log('Check for new updated services..');
        for (const widget of widgets) {
            widget.config_action = JSON.parse(widget.config_action);
            widget.config_reaction = JSON.parse(widget.config_reaction);
            widget.datas = JSON.parse(widget.datas);
            const link = services.getLinksByID(widget.subscribe_id);

            if (link) {
                link.run(widget).then();
                setLinksUpdatedFalse(widget.id).then();
            }
        }
    }, 15000);

    return services;
}

init().then(result => {
    router(app, result);
    result.updateServices(result);
});

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
