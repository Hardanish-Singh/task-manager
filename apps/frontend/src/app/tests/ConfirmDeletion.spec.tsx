import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ConfirmDeletion from '../components/ConfirmDeletion';

jest.mock('axios');

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('ConfirmDeletion', () => {
  const mockOnModalClose = jest.fn();
  const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
  const taskTitle = 'Test Task';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with the correct title', () => {
    render(
      <ConfirmDeletion
        id={taskId}
        title={taskTitle}
        onModalClose={mockOnModalClose}
      />
    );

    expect(screen.getByText(`Delete ${taskTitle}`)).toBeTruthy();
    expect(
      screen.getByText('Are you sure you want to delete this task?')
    ).toBeTruthy();
  });

  it('should call axios.delete when the delete button is clicked', async () => {
    (axios.delete as jest.Mock).mockResolvedValueOnce({});

    render(
      <ConfirmDeletion
        id={taskId}
        title={taskTitle}
        onModalClose={mockOnModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:3000/api/tasks/${taskId}`
      );
      expect(mockOnModalClose).toHaveBeenCalledWith('delete');
    });
  });

  it('should call onModalClose with "cancel" when the cancel button is clicked', () => {
    render(
      <ConfirmDeletion
        id={taskId}
        title={taskTitle}
        onModalClose={mockOnModalClose}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnModalClose).toHaveBeenCalledWith('cancel');
  });

  it('should handle error when delete request fails', async () => {
    (axios.delete as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to delete task')
    );

    render(
      <ConfirmDeletion
        id={taskId}
        title={taskTitle}
        onModalClose={mockOnModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:3000/api/tasks/${taskId}`
      );
      expect(mockOnModalClose).not.toHaveBeenCalled();
    });
  });
});
