import express from "express";
import cors from "cors";
import {router} from "./router"
import {services} from "./services"
import authRouter from './auth';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.set('view_engine', 'ejs');

authRouter(app);
router(app);

// app.get("/", (req, res) => {
//   res.send(`
//     <a href="/auth/reddit">Reddit</a>
//     <a href="/auth/facebook">Facebook</a>
//     <a href="/auth/github">Github</a>
//     `);
// });

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
