import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Tasks from '../components/Tasks';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(() => jest.fn()),
}));

jest.mock('../components/Toast', () => ({
  __esModule: true,
  default: jest.fn(({ show, message, type, onClose }) => {
    return show ? (
      <div data-testid="mock-toast" data-type={type} onClick={onClose}>
        {message}
      </div>
    ) : null;
  }),
}));
const MockedToastComponent = jest.requireMock('../components/Toast').default;

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue({ id: '123' });

    const { baseElement } = render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should populate the form', async () => {
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({});

    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Description')).toBeTruthy();
      expect(screen.getByText('Status')).toBeTruthy();
      expect(screen.getByText('Submit')).toBeTruthy();
    });
  });

  it('should update input fields on change', async () => {
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({});

    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      const titleInput = screen.getByPlaceholderText('Enter Title');
      fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
      expect(screen.getByDisplayValue('Updated Title')).toBeTruthy();

      const descriptionInput = screen.getByPlaceholderText(
        'Write your description here...'
      );
      fireEvent.change(descriptionInput, {
        target: { value: 'Updated Description' },
      });
      expect(screen.getByDisplayValue('Updated Description')).toBeTruthy();
    });

    (axios.post as jest.Mock).mockResolvedValueOnce({
      status: 201,
      message: 'Task created successfully',
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(MockedToastComponent).toBeTruthy();
    });
  });

  it('should display an error message if fetching a task fails', async () => {
    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue({ id: '123' });

    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          'Error fetching task, please refresh the page and retry'
        )
      ).toBeTruthy();
    });
  });

  it('should update task when id is present (edit mode)', async () => {
    jest
      .spyOn(require('react-router-dom'), 'useParams')
      .mockReturnValue({ id: '123' });

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        id: '123',
        title: 'Old Title',
        description: 'Old Description',
        status: 'OPEN',
      },
    });

    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Old Title')).toBeTruthy();
      expect(screen.getByDisplayValue('Old Description')).toBeTruthy();
    });

    const titleInput = screen.getByPlaceholderText('Enter Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    const descriptionInput = screen.getByPlaceholderText(
      'Write your description here...'
    );
    fireEvent.change(descriptionInput, {
      target: { value: 'New Description' },
    });

    (axios.put as jest.Mock).mockResolvedValueOnce({
      status: 200,
      data: { message: 'Task updated successfully' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(MockedToastComponent).toBeTruthy();
    });
  });
});
