import Card from "react-bootstrap/Card";
import Moment from "react-moment";

function ReviewDisplay({ review }) {
  return (
    <Card key={review.id} className="m-1" style={{ width: "14rem" }}>
      <Card.Body>
        <Card.Title>{review.author}</Card.Title>
        <Card.Subtitle>
          Rating: <b>{review.rating}</b> @{" "}
          <Moment format="YYYY/MM/DD">{review.publish_date}</Moment>
        </Card.Subtitle>
        <Card.Text>{review.body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ReviewDisplay;
