import express from 'express';
import { listData, sortData } from '../script/notion.js';

const router = express.Router();
export { router as apiRouter };

router.get('/list', async function(req, res) {
	const data = await listData();
	res.status(200);
	res.send(data);
});

router.post('/sort', async function(req, res) {
	const sortOption = req.body.sort;
	const data = await sortData(sortOption);
	res.status(200);
	res.send(data);
});

router.get('/query', async function (req, res) {
	const data = 'data'; //do something... query a data...
	res.status(200);
	res.send(data);
});