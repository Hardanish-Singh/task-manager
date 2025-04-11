import { render, screen } from '@testing-library/react';
import LoadingIcon from '../components/LoadingIcon';

describe('LoadingIcon', () => {
  it('should render the SVG icon', () => {
    render(<LoadingIcon />);
    const statusDiv = screen.getByRole('status') as any;
    const svgElement = statusDiv.querySelector('svg');
    expect(svgElement).toBeTruthy();
    expect(svgElement?.classList.contains('animate-spin')).toBe(true);
  });

  it('should have a screen reader accessible loading text', () => {
    render(<LoadingIcon />);
    const loadingText = screen.getByText(/loading/i) as any;
    expect(loadingText).toBeTruthy();
    expect(loadingText?.classList.contains('sr-only')).toBe(true);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });
});
