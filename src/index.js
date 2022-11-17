import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';

const app = express();
const port = 5173;

app.use(cors());
app.use('/api', apiRouter);

app.listen(port, () => {
	console.log(`Now server is running on localhost:${port}`);
});