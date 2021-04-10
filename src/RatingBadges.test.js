import { render, screen } from '@testing-library/react';
import RatingBadges from './RatingBadges';

test('ensure that the rating badges get rendered', () => {
  render(<RatingBadges />);
  const badges = screen.getByText('3');
  expect(badges).toBeInTheDocument();
});
