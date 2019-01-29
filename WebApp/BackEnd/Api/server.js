const dotenv = require('dotenv');
dotenv.config();

import express from "express";
import {router} from "./router"
import bodyParser from 'body-parser';

// import authRouter from "./auth";

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.set('view_engine', 'ejs');

// authRouter(app);

// app.get("/", (req, res) => {
//   res.send(`
//     <a href="/auth/reddit">Reddit</a>
//     <a href="/auth/facebook">Facebook</a>
//     <a href="/auth/github">Github</a>
//     `);
// });

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

router(app);