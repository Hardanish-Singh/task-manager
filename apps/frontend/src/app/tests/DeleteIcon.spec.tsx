import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DeleteIcon from '../components/DeleteIcon';

describe('DeleteIcon', () => {
  const taskId = 'cd6c9362-96cb-4604-9506-c36dc6e2974f';
  const taskTitle = 'Test Task';
  const mockUpdateTasks = jest.fn();

  it('should show the ConfirmDeletion modal when the delete icon is clicked', () => {
    render(
      <DeleteIcon id={taskId} title={taskTitle} updateTasks={mockUpdateTasks} />
    );

    fireEvent.click(screen.getByTestId('delete-icon'));

    expect(screen.getByText(`Delete ${taskTitle}`)).toBeTruthy();
  });

  it('should not call updateTasks when the cancel button is clicked in the modal', async () => {
    render(
      <DeleteIcon id={taskId} title={taskTitle} updateTasks={mockUpdateTasks} />
    );

    fireEvent.click(screen.getByTestId('delete-icon'));
    fireEvent.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(mockUpdateTasks).not.toHaveBeenCalled();
    });
  });

  it('should close the modal when the cancel button is clicked', () => {
    render(
      <DeleteIcon id={taskId} title={taskTitle} updateTasks={mockUpdateTasks} />
    );

    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.getByText(`Delete ${taskTitle}`)).toBeTruthy();

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText(`Delete ${taskTitle}`)).toBeFalsy();
  });
});
