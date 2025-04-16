import { render, screen } from '@testing-library/react';
import Toast from '../components/Toast';

jest.useFakeTimers(); // Mock setTimeout and setInterval

describe('Toast', () => {
  it('renders with the correct message and style for success type', () => {
    const onClose = jest.fn();
    const message = 'Success message';
    const type = 'success';

    render(<Toast message={message} type={type} onClose={onClose} />);

    expect(screen.getByText(message)).toBeTruthy();
  });

  it('renders with the correct message and style for error type', () => {
    const onClose = jest.fn();
    const message = 'Error message';
    const type = 'error';

    render(<Toast message={message} type={type} onClose={onClose} />);

    expect(screen.getByText(message)).toBeTruthy();
  });

  it('calls onClose after 1 second', () => {
    const onClose = jest.fn();
    const message = 'This will close after 1 second';
    const type = 'success';

    render(<Toast message={message} type={type} onClose={onClose} />);

    // Fast-forward time by 1 second
    jest.advanceTimersByTime(1000);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const onClose = jest.fn();

    const { unmount } = render(
      <Toast message="Toast" type="success" onClose={onClose} />
    );

    // Unmount the component
    unmount();

    // Ensure that the timeout is cleared and onClose is not called
    jest.advanceTimersByTime(1000);

    expect(onClose).toHaveBeenCalledTimes(0);
  });
});
