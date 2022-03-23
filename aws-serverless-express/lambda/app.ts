import serverlessExpress from '@vendia/serverless-express';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const todos: Todo[] = [
  { id: 1, title: 'Todo 001', completed: false },
  { id: 2, title: 'Todo 002', completed: true },
  { id: 3, title: 'Todo 003', completed: false },
  { id: 4, title: 'Todo 004', completed: true },
];

app.get('todos', (_: Request, res: Response) => {
  res.status(200).send(JSON.stringify(todos));
});

app.get('/todos/id', (req: Request, res: Response) => {
  const id = Number(req.params['id']);
  res.status(200).send(JSON.stringify(todos[id]));
});

exports.handler = serverlessExpress({ app });
