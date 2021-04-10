import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Moment from 'react-moment';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://shakespeare.podium.com/api/reviews";

function App() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getReviews() {
      const res = await fetch(API_URL, { headers: { "x-api-key": API_KEY } });
      const data = await res.json();
      setReviews(data);
    }

    getReviews();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Shakespear Quote Reviews</h1>
        </Col>
      </Row>
      <Row>
        {reviews && reviews.map(review => 
          <Card key={review.id} style={{ width: '12rem'}}>
            <Card.Body>
              <Card.Title>{review.author}</Card.Title>
              <Card.Subtitle>Rating: {review.rating} @ <Moment format="YYYY/MM/DD">{review.publish_date}</Moment></Card.Subtitle>
              <Card.Text>
                {review.body}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Container>
  );
}

export default App;
