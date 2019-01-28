import dotenv from "dotenv";

import express from "express";
import {rootDir} from "./constant";
import {router} from "./router"
import bodyParser from 'body-parser';

// import authRouter from "./auth";

dotenv.config();
const port = 8081;
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(rootDir + "/assets"));
app.set('view_engine', 'ejs');

// authRouter(app);

// app.get("/", (req, res) => {
//   res.send(`
//     <a href="/auth/reddit">Reddit</a>
//     <a href="/auth/facebook">Facebook</a>
//     <a href="/auth/github">Github</a>
//     `);
// });

app.listen(port, () => console.log(`Server is listening on port ${port}`));

router(app);