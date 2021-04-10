import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Moment from "react-moment";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://shakespeare.podium.com/api/reviews";

function App() {
  // initial state setup
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState();
  // handle the initial API call for loading
  useEffect(() => {
    async function getReviews() {
      const res = await fetch(API_URL, { headers: { "x-api-key": API_KEY } });
      const data = await res.json();
      setReviews(data);
    }

    getReviews();
  }, []);

  // handling filtering of the data
  useEffect(() => {
    const results =
      ratingFilter !== undefined
        ? reviews.filter(
            (r) => r.rating < (ratingFilter + 1) && r.rating >= ratingFilter
          )
        : reviews;
    setFilteredReviews(results);
  }, [reviews, ratingFilter]);

  // create badges for filtering the ratings
  const ratingsBadges = [1, 2, 3, 4, 5].map((val, idx) => {
    // handle styling to show the active badge
    const active = ((idx + 1) === ratingFilter) ? 'primary' : 'secondary';
    return (
      <Badge variant={active} key={idx} onClick={() => setRatingFilter(val)}>
        {val}
      </Badge>
    );
  });
  // if filter is set, provide a way of clearing it
  if (ratingFilter) {
    ratingsBadges.push(<Badge variant="info" onClick={() => setRatingFilter()}>Clear</Badge>);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Shakespear Quote Reviews</h1>
          Ratings: {ratingsBadges}
        </Col>
      </Row>
      <Row>
        {filteredReviews &&
          filteredReviews.map((review) => (
            <Card key={review.id} className="m-1" style={{ width: "14rem" }}>
              <Card.Body>
                <Card.Title>{review.author}</Card.Title>
                <Card.Subtitle>
                  Rating: <b>{review.rating}</b> @{' '}
                  <Moment format="YYYY/MM/DD">{review.publish_date}</Moment>
                </Card.Subtitle>
                <Card.Text>{review.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  );
}

export default App;
