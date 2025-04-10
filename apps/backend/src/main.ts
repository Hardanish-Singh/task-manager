import cors from 'cors';
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use(cors());

enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

interface Task {
  id: string | number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

let tasks: Task[] = [];

// Endpoint to get all tasks
app.get('/api/tasks', (req: Request, res: Response) => {
  try {
    const { status, sortBy, sortOrder, searchTerm } = req.query;
    let filteredTasks = [...tasks];
    // Filter by status if provided
    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status == status);
    }
    // Filter by searchTerm if provided (search in both title and description)
    if (searchTerm && typeof searchTerm === 'string') {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sort if sortBy is provided
    if (sortBy) {
      const order = sortOrder == 'desc' ? -1 : 1;
      filteredTasks.sort((a, b) => {
        const aValue = a[sortBy as keyof Task];
        const bValue = b[sortBy as keyof Task];
        // Handle Date objects
        if (aValue instanceof Date && bValue instanceof Date) {
          return (aValue.getTime() - bValue.getTime()) * order;
        }
        // Handle string comparison
        if (typeof aValue == 'string' && typeof bValue == 'string') {
          return aValue.localeCompare(bValue) * order;
        }
        return 0;
      });
    }
    return res.status(200).json(filteredTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).send({ error: 'Error fetching tasks' });
  }
});

// Endpoint to get a task by ID
app.get('/api/tasks/:id', (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id == taskId);
    if (!task) {
      return res.status(404).send({ error: 'task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return res.status(500).send({ error: 'Error fetching task' });
  }
});

// Endpoint to create a new task
app.post('/api/tasks', (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: Status.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    return res.status(201).json({
      message: 'Task created successfully',
      data: newTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).send({ error: 'Error creating task' });
  }
});

// Endpoint to update an existing task
app.patch('/api/tasks/:id', (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const task = tasks.find((task) => task.id == taskId);
    if (!task) {
      return res.status(404).send({ error: 'task not found' });
    }
    const updatedTask = {
      ...task,
      title: title || task.title,
      description: description || task.description,
      status: status || task.status,
      updatedAt: new Date(),
    };
    tasks = tasks.map((task) => (task.id == taskId ? updatedTask : task));
    return res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).send({ error: 'Error updating task' });
  }
});

// Endpoint to delete a task
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id == taskId);
    if (taskIndex == -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // Remove task from the array
    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).send({ error: 'Error deleting task' });
  }
});

app.get('/', (req: Request, res: Response) => {
  return res.send({ message: 'Task Manager App Running' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
