import express from "express";
import cors from "cors";
import {router} from "./router"
import {services, updateServices} from "./services"
import authRouter from './auth';
import bodyParser from 'body-parser';
import { getUpdatedSubscribe } from './src/bdd/mysql';

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.set('view_engine', 'ejs');

authRouter(app);
services().then(services => {
    //console.log(services);
    router(app, services);
    updateServices(services);
}).catch(error => {
    console.log(error);
});

// app.get("/", (req, res) => {
//   res.send(`
//     <a href="/auth/reddit">Reddit</a>
//     <a href="/auth/facebook">Facebook</a>
//     <a href="/auth/github">Github</a>
//     `);
// });

console.log(getUpdatedSubscribe());

// setInterval(() => {
//     // for (const widget of widgets) {
//     //     setSubscribeUpdatedFalse(widget.id);
//     // }
// }), 150000;

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
