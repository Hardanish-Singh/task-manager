import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../app';

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('App', () => {
  it('should render App component successfully', () => {
    const { baseElement, getAllByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(getAllByText(/Task Manager/i)).toBeTruthy();
  });
});
