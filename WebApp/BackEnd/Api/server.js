import express from "express";
import { rootDir } from "./constant";

import authRouter from "./auth";


const port = 8080;

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
