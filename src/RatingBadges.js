import Badge from "react-bootstrap/Badge";

function RatingBadges({ ratingFilter, handleClick }) {
  // generate badges that span the 0-5 rating scale
  const badges = [1, 2, 3, 4, 5].map((val, idx) => {
    // handle styling to show the active badge
    const active = ((idx + 1) === ratingFilter) ? 'primary' : 'secondary';
    return (
      <Badge variant={active} key={idx} onClick={() => handleClick(val)}>
        {val}
      </Badge>
    );
  });

  // if filter is set, provide a way of clearing it
  if (ratingFilter) {
    badges.push(<Badge variant="info" key="clear" onClick={() => handleClick()}>Clear</Badge>);
  }
    return <div>
        Ratings: {badges}
    </div>
}

export default RatingBadges;