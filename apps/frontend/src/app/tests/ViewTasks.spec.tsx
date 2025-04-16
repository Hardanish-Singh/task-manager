import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ViewTasks from '../components/ViewTasks';
import { Status } from '../types/types';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn().mockReturnValue(() => jest.fn()),
}));

const tasksMock = [
  {
    id: 'cd6c9362-96cb-4604-9506-c36dc6e2974f',
    title: 'title 2',
    description: 'description 2',
    status: Status.OPEN,
    createdAt: '2025-04-09T18:32:08.416Z',
    updatedAt: '2025-04-09T18:32:08.416Z',
  },
  {
    id: '2d6c9362-96cb-4604-9506-c36dc6e2974f',
    title: 'title 1',
    description: 'description 1',
    status: Status.CLOSED,
    createdAt: '2025-04-10T18:32:08.416Z',
    updatedAt: '2025-04-10T18:32:08.416Z',
  },
];

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('ViewTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading icon while tasks are loading', () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    const { getAllByText } = render(
      <BrowserRouter>
        <ViewTasks />
      </BrowserRouter>
    );

    expect(getAllByText(/Loading.../i)).toBeTruthy();
  });

  it('should display an error message if fetching tasks fails', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <ViewTasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          'Error fetching tasks, please refresh the page and retry'
        )
      ).toBeTruthy();
    });
  });

  it('should render tasks in a table when tasks are fetched successfully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: tasksMock });

    render(
      <BrowserRouter>
        <ViewTasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('title 1')).toBeTruthy();
      expect(screen.getByText('description 1')).toBeTruthy();
      expect(screen.getByText('title 2')).toBeTruthy();
      expect(screen.getByText('description 2')).toBeTruthy();
      expect(screen.getByText('CLOSED')).toBeTruthy();
      expect(screen.getByText('Create Task'));
    });

    fireEvent.click(screen.getByText('Create Task'));
  });

  it('should sort tasks by title when title column is clicked', async () => {
    render(
      <BrowserRouter>
        <ViewTasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('title 2')).toBeTruthy();
      expect(screen.getByText('title 1')).toBeTruthy();
    });

    fireEvent.click(screen.getByText('Title'));

    expect(screen.getByText('title 1')).toBeTruthy();
    expect(screen.getByText('title 2')).toBeTruthy();
  });

  it('should delete a task from the table', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: tasksMock });

    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <ViewTasks />
      </BrowserRouter>
    );

    const title1Element = (await screen.findByText('title 1')) as any;

    expect(await screen.findByText('title 2')).toBeTruthy();

    const row = title1Element.closest('tr');

    if (!row) {
      throw new Error("Could not find table row for 'title 1'");
    }

    const deleteIcon = within(row).getByTestId(`delete-icon`);

    fireEvent.click(deleteIcon);

    const deleteButton = screen.getByTestId('delete-button');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText('title 1')).toBeNull();
    });

    expect(screen.getByText('title 2')).toBeTruthy();
  });

  it('should allow searching tasks by title or description', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: tasksMock });

    render(
      <BrowserRouter>
        <ViewTasks />
      </BrowserRouter>
    );

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(
        'Search Title, Description...'
      );

      const filteredTasks = tasksMock.filter(
        (task) =>
          task.title.includes('title 1') || task.description.includes('title 1')
      );

      (axios.get as jest.Mock).mockResolvedValueOnce({ data: filteredTasks });

      fireEvent.change(searchInput, { target: { value: 'title 1' } });

      expect(screen.getByText('title 1')).toBeTruthy();
      expect(screen.queryByText('title 2')).not.toBeTruthy();
    });
  });
});
