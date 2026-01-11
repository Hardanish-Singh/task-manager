import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import taskRoutes from './routes/taskRoutes';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  return res.send({ message: 'Task Manager App Running' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
