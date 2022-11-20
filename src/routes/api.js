import express from 'express';
import { listData } from '../script/notion.js';

const router = express.Router();
export { router as apiRouter };

router.get('/list', async function(req, res) {
	const data = await listData();
	res.status(200);
	res.send(data);
});

router.get('/query', async function (req, res) {
	const data = 'data'; //do something... query a data...
	res.status(200);
	res.send(data);
});