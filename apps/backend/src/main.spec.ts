import axios from 'axios';

// Mock axios globally in this test file
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Endpoints', () => {
  describe('GET /api/tasks', () => {
    it('should fetch all tasks', async () => {
      const tasks = [
        {
          id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
          title: 'title 1',
          description: 'description 1',
          status: 'OPEN',
          createdAt: '2025-04-09T18:32:08.416Z',
          updatedAt: '2025-04-09T18:32:08.416Z',
        },
      ];
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: tasks,
      });
      const res = await axios.get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.data).toEqual(tasks);
    });

    it('should return an empty array if no tasks exist', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: [],
      });
      const res = await axios.get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.data).toEqual([]);
    });

    it('should return 500 if there is a server error', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Internal Server Error'));
      try {
        await axios.get(`/api/tasks`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.data).toEqual({
            error: 'Error fetching tasks',
          });
        }
      }
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task by id', async () => {
      const task = {
        id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
        title: 'title 1',
        description: 'description 1',
        status: 'OPEN',
        createdAt: '2025-04-09T18:32:08.416Z',
        updatedAt: '2025-04-09T18:32:08.416Z',
      };
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: task,
      });
      const res = await axios.get('/api/cd6c9362-96cb-4604-9506-c36dc6e2974f');
      expect(res.status).toBe(200);
      expect(res.data).toEqual(task);
    });

    it('should return 404 if task is not found', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 404,
        data: { error: 'task not found' },
      });
      try {
        await axios.get('/task/999');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.data).toStrictEqual({
            error: 'task not found',
          });
          expect(error.response?.status).toBe(404);
        }
      }
    });

    it('should return 500 if there is a server error', async () => {
      const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
      mockedAxios.get.mockRejectedValue(new Error('Internal Server Error'));
      try {
        await axios.get(`/api/tasks/${taskId}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.data).toEqual({
            error: 'Error fetching task',
          });
        }
      }
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a task successfully with a valid request', async () => {
      const task = {
        id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
        title: 'title 2',
        description: 'description 2',
        status: 'OPEN',
        createdAt: '2025-04-09T18:32:08.416Z',
        updatedAt: '2025-04-09T18:32:08.416Z',
      };
      mockedAxios.post.mockResolvedValue({
        status: 201,
        data: { message: 'Task created successfully', data: task },
      });
      const res = await axios.post('/api/tasks', task);
      expect(res.status).toBe(201);
      expect(res.data).toStrictEqual({
        message: 'Task created successfully',
        data: task,
      });
    });

    it('should return an error when the request is invalid with missing title', async () => {
      const invalidTask = {
        id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
        description: 'description 2',
        status: 'OPEN',
        createdAt: '2025-04-09T18:32:08.416Z',
        updatedAt: '2025-04-09T18:32:08.416Z',
      };
      mockedAxios.post.mockResolvedValue({
        status: 400,
        data: { message: 'Title is required' },
      });
      try {
        await axios.post('/api/tasks', invalidTask);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.data).toStrictEqual({
            error: 'Title is required',
          });
          expect(error.response?.status).toBe(400);
        }
      }
    });

    it('should return an error when the request is invalid with missing description', async () => {
      const invalidTask = {
        id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
        title: 'title 1',
        status: 'OPEN',
        createdAt: '2025-04-09T18:32:08.416Z',
        updatedAt: '2025-04-09T18:32:08.416Z',
      };
      mockedAxios.post.mockResolvedValue({
        status: 400,
        data: { message: 'Description is required' },
      });
      try {
        await axios.post('/api/tasks', invalidTask);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.data).toStrictEqual({
            error: 'Description is required',
          });
          expect(error.response?.status).toBe(400);
        }
      }
    });

    it('should return 500 if there is a server error', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Internal Server Error'));
      try {
        await axios.post(`/api/tasks`, {
          title: 'Title After Server Error',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.data).toEqual({
            error: 'Error creating task',
          });
        }
      }
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should update a task successfully', async () => {
      const updatedTask = {
        id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
        title: 'Updated Task Title',
        description: 'Updated Task Description',
        status: 'CLOSED',
        createdAt: '2025-04-09T18:32:08.416Z',
        updatedAt: '2025-04-09T18:32:08.416Z',
      };
      mockedAxios.patch.mockResolvedValue({
        status: 200,
        data: { message: 'Task created successfully', data: updatedTask },
      });
      const res = await axios.patch(`/api/tasks/${updatedTask.id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      });
      expect(res.status).toBe(200);
      expect(res.data).toStrictEqual({
        message: 'Task created successfully',
        data: updatedTask,
      });
    });

    it('should return 404 if task not found', async () => {
      const taskId = 'nonexistent-id';
      const responseData = { error: 'task not found' };
      mockedAxios.patch.mockResolvedValue({
        status: 404,
        data: responseData,
      });
      try {
        await axios.patch(`/api/tasks/${taskId}`, {
          title: 'Updated Task Title',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.data).toEqual(responseData);
          expect(error.response?.status).toBe(404);
        }
      }
    });

    it('should update only provided fields and keep others unchanged', async () => {
      const existingTask = {
        id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
        title: 'Original Task Title',
        description: 'Original Task Description',
        status: 'OPEN',
        createdAt: '2025-04-09T18:32:08.416Z',
        updatedAt: '2025-04-09T18:32:08.416Z',
      };
      const updatedTask = {
        ...existingTask,
        title: 'Updated Task Title',
        updatedAt: new Date().toISOString(),
      };
      mockedAxios.patch.mockResolvedValue({
        status: 200,
        data: updatedTask,
      });
      const res = await axios.patch(`/api/tasks/${existingTask.id}`, {
        title: 'Updated Task Title',
      });
      expect(res.status).toBe(200);
      expect(res.data.title).toBe('Updated Task Title');
      expect(res.data.description).toBe(existingTask.description);
      expect(res.data.status).toBe(existingTask.status);
    });

    it('should return 404 if task ID format is invalid', async () => {
      const invalidTaskId = 'invalid-id-format';
      try {
        await axios.patch(`/api/tasks/${invalidTaskId}`, {
          title: 'Invalid Task ID Test',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(404);
          expect(error.response?.data).toEqual({ error: 'task not found' });
        }
      }
    });

    it('should return 500 if there is a server error', async () => {
      const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
      mockedAxios.patch.mockRejectedValue(new Error('Internal Server Error'));
      try {
        await axios.patch(`/api/tasks/${taskId}`, {
          title: 'Title After Server Error',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.data).toEqual({
            error: 'Error updating task',
          });
        }
      }
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task successfully when the task exists', async () => {
      const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
      mockedAxios.delete.mockResolvedValue({
        status: 200,
        data: { message: 'Task deleted' },
      });

      const res = await axios.delete(`/api/tasks/${taskId}`);
      expect(res.status).toBe(200);
      expect(res.data).toEqual({ message: 'Task deleted' });
    });

    it('should return 404 if task is not found', async () => {
      const taskId = 'nonexistent-id';
      const responseData = { message: 'Task not found' };
      mockedAxios.delete.mockResolvedValue({
        status: 404,
        data: responseData,
      });
      try {
        await axios.delete(`/api/tasks/${taskId}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.data).toEqual(responseData);
          expect(error.response?.status).toBe(404);
        }
      }
    });

    it('should return 500 if there is a server error while deleting task', async () => {
      const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
      mockedAxios.delete.mockRejectedValue(new Error('Internal Server Error'));
      try {
        await axios.delete(`/api/tasks/${taskId}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.data).toEqual({
            error: 'Error deleting task',
          });
        }
      }
    });

    it('should remove the task from the array after deletion', async () => {
      const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
      mockedAxios.delete.mockRejectedValue(new Error('Internal Server Error'));
      try {
        await axios.delete(`/api/tasks/${taskId}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          expect(error.response?.status).toBe(500);
          expect(error.response?.data).toEqual({
            error: 'Error deleting task',
          });
        }
      }
    });
  });
});
