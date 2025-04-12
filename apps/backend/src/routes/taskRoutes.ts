import { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

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

// Get all tasks
router.get('/', (req: Request, res: Response) => {
  try {
    const { status, sortBy, sortOrder, searchTerm } = req.query;
    let filteredTasks = [...tasks];
    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status == status);
    }
    if (searchTerm && typeof searchTerm === 'string') {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1;
      filteredTasks.sort((a, b) => {
        const aValue = a[sortBy as keyof Task];
        const bValue = b[sortBy as keyof Task];
        if (aValue instanceof Date && bValue instanceof Date) {
          return (aValue.getTime() - bValue.getTime()) * order;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
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

// Get a task by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const task = tasks.find((task) => task.id == req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    return res.status(500).send({ error: 'Error fetching task' });
  }
});

// Create a new task
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: Status.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    return res
      .status(201)
      .json({ message: 'Task created successfully', data: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).send({ error: 'Error creating task' });
  }
});

// Update a task
router.patch('/:id', (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const task = tasks.find((task) => task.id == taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const updatedTask = {
      ...task,
      title: title ?? task.title,
      description: description ?? task.description,
      status: status ?? task.status,
      updatedAt: new Date(),
    };
    tasks = tasks.map((task) => (task.id == taskId ? updatedTask : task));
    return res
      .status(200)
      .json({ message: 'Task updated successfully', data: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).send({ error: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const taskIndex = tasks.findIndex((task) => task.id == req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).send({ error: 'Error deleting task' });
  }
});

export default router;
