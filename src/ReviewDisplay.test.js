import { render, screen } from '@testing-library/react';
import ReviewDisplay from './ReviewDisplay';

const fakeReview = {
    "rating": 4,
    "publish_date": "2021-04-10T17:25:47.642350Z",
    "id": "9753211420868",
    "body": "Shakespeare is legit",
    "author": "Kevin Laborda"
};

test('ensure the body is displayed for the review', () => {
  render(<ReviewDisplay review={fakeReview} />);

  const reviewBody = screen.getByText(/legit/i);
  expect(reviewBody).toBeInTheDocument();
});

test('ensure the author is displayed for the review', () => {
  render(<ReviewDisplay review={fakeReview} />);

  const reviewAuthor = screen.getByText(/Kevin Laborda/i);
  expect(reviewAuthor).toBeInTheDocument();
});

test('ensure the rating is displayed for the review', () => {
  render(<ReviewDisplay review={fakeReview} />);

  const reviewRating = screen.getByText('4');
  expect(reviewRating).toBeInTheDocument();
});