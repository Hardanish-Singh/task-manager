import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import EditIcon from '../components/EditIcon';

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('EditIcon', () => {
  const mockNavigate = jest.fn();
  const mockId = 'task-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to the correct path when the edit icon is clicked', () => {
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <BrowserRouter>
        <EditIcon id={mockId} />
      </BrowserRouter>
    );
    const editIcon = screen.getByTestId('edit-icon');
    expect(editIcon).toBeTruthy();
    fireEvent.click(editIcon);
    expect(mockNavigate).toHaveBeenCalledWith(`/tasks/${mockId}`);
  });
});
