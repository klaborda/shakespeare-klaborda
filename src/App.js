import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://shakespeare.podium.com/api/reviews";

function App() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    fetch(API_URL, { headers: { 'x-api-key': API_KEY }})
      .then((response) => response.json())
      .then(
        (data) => setReviews([...data]),
        (error) => console.error(error)
      );
  };

  return (
    <Container fluid>
      <Row>
        <Col>{JSON.stringify(reviews, null, 4)}</Col>
      </Row>
    </Container>
  );
}

export default App;
