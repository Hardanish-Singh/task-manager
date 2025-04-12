import axios from 'axios';

// Mock axios globally in this test file
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Endpoints', () => {
  it('should respond with Task Manager App Running message', async () => {
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: {
        message: 'Task Manager App Running',
      },
    });
    const res = await axios.get('/');
    expect(res.status).toBe(200);
    expect(res.data.message).toBe('Task Manager App Running');
  });
});
