import express, { Application, Request, Response } from 'express';
import logger from './misc/logger';
import appRouter from './routes/index';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('runnnnnnnnnn');
});

app.use(appRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`running at port ${PORT}`);
});
