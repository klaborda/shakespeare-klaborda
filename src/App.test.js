import { render, screen } from '@testing-library/react';
import App from './App';

test('ensure main header is rendered', () => {
  render(<App />);
  const linkElement = screen.getByText(/Shakespeare Quote Reviews/i);
  expect(linkElement).toBeInTheDocument();
});
