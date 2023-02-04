import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { apiRouter } from "./routes/api.js";

console.log(`${process.env.NOTION_DBID}`);

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Now server is running on localhost:${port}`);
});
