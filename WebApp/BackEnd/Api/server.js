import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { rootDir } from "./constant";

import authRouter from "./auth";


const port = 3000;

const app = express();
app.use(express.json());

app.use(express.static(rootDir + "/assets"));

authRouter(app);

app.get("/", (req, res) => {
  res.send(`
    <a href="/auth/reddit">Reddit</a>
    <a href="/auth/facebook">Facebook</a>
    <a href="/auth/github">Github</a>
    `);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
