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
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState();
  useEffect(() => {
    async function getReviews() {
      const res = await fetch(API_URL, { headers: { "x-api-key": API_KEY } });
      const data = await res.json();
      setReviews(data);
    }

    getReviews();
  }, []);

  useEffect(() => {
    const results =
      ratingFilter !== undefined
        ? reviews.filter(
            (r) => r.rating >= ratingFilter - 1 && r.rating <= ratingFilter
          )
        : reviews;
    setFilteredReviews(results);
  }, [reviews, ratingFilter]);

  const ratingsBadges = [1, 2, 3, 4, 5].map((val, idx) => (
    <Badge variant="secondary" key={idx} onClick={() => setRatingFilter(val)}>
      {val}
    </Badge>
  ));

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
            <Card key={review.id} style={{ width: "12rem" }}>
              <Card.Body>
                <Card.Title>{review.author}</Card.Title>
                <Card.Subtitle>
                  Rating: {review.rating} @{" "}
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
