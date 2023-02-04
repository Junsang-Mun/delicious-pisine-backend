import express from "express";
import { listData, sortData, queryData } from "../script/notion.js";

const router = express.Router();
export { router as apiRouter };

router.get("/list", async function (req, res) {
  const data = await listData();
  res.status(200);
  res.send(data);
});

router.post("/sort", async function (req, res) {
  const sortOption = req.body.sort;
  const data = await sortData(sortOption);
  res.status(200);
  res.send(data);
});

router.post("/query", async function (req, res) {
  const query = req.body.query;
  console.log(`got query ${query}`);
  const data = await queryData(query);
  res.status(200);
  res.send(data);
});
