import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
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
const MockToast = jest.requireMock('../components/Toast').default;

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
      <Router>
        <Tasks />
      </Router>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('should populate the form', async () => {
    jest.spyOn(require('react-router-dom'), 'useParams').mockReturnValue({});
    render(
      <Router>
        <Tasks />
      </Router>
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
      <Router>
        <Tasks />
      </Router>
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
      expect(MockToast).toBeTruthy();
    });
  });
});
