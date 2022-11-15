import express from 'express';
import { apiRouter } from './routes/api';

const app = express();
const port = 5173;

app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Now server is running on localhost:${port}`);
});