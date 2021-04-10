const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = 'https://shakespeare.podium.com/api/reviews/9783221620868';

describe('Ensure API health', () => {
  it('shows restaurants from the server', () => {
    cy.server({force404: true});

    cy.route({
      method: 'GET',
      headers: {'x-api-key': API_KEY},
      url: API_URL,
      response: [
        {
          rating: 0.8,
          publish_date: '2016-09-05T23:25:47.642350Z',
          id: '9783221620868',
          body:
            'The fool doth think he is wise, but the wise man knows himself to be a fool.',
          author: 'Kaley Schiller',
        },
      ],
    });

    cy.visit('/');
    cy.contains('Kaley Schiller');
  });
});
