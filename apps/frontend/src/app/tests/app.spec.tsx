import { render } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import App from '../app';

jest.mock('axios');

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('App', () => {
  it('should render App component successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
          title: 'title 1',
          description: 'description 1',
          status: 'OPEN',
          createdAt: '2025-04-09T18:32:08.416Z',
          updatedAt: '2025-04-09T18:32:08.416Z',
        },
      ],
    });
    const { baseElement, getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(getAllByText(/Task Manager/i)).toBeTruthy();
    expect(getAllByText(/Home/i)).toBeTruthy();
    expect(getAllByText(/Create Task/i)).toBeTruthy();
  });
});
