import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.js';

const app = express();
const port = 5961;

app.use(cors());
app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Now server is running on localhost:${port}`);
});