import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RatingBadges from './RatingBadges';
import ReviewDisplay from './ReviewDisplay';
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

  const handleClick = (val) =>{
    setRatingFilter(val);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Shakespear Quote Reviews</h1>
          <RatingBadges ratingFilter={ratingFilter} handleClick={handleClick} />
        </Col>
      </Row>
      <Row>
        {filteredReviews &&
          filteredReviews.map((review) => (
            <ReviewDisplay key={review.id} review={review} />
          ))}
      </Row>
    </Container>
  );
}

export default App;
