import ReviewStar from "../../assets/ReviewStar";
import styled from "styled-components";

export default function ReviewCard({
  username,
  rating,
  comment,
  id,
  onDeleteReview,
  canDeleteReview,
}) {
  const renderReviewStars = (filledStars) => {
    const stars = [];

    for (let counter = 1; counter <= 5; counter++) {
      const isSelected = counter <= filledStars;
      stars.push(<ReviewStar key={counter} isSelected={isSelected} />);
    }

    return stars;
  };

  return (
    <li>
      <ReviewCardContainer>
        <p>{username}</p>
        <div>{renderReviewStars(rating)}</div>
        <p>{comment}</p>
        {canDeleteReview ? (
          <DeleteButton type="button" onClick={() => onDeleteReview(id)}>
            x
          </DeleteButton>
        ) : null}
      </ReviewCardContainer>
    </li>
  );
}

const ReviewCardContainer = styled.div`
  border: 1px solid;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 5px;
  position: relative;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #fff;
  border: none;
`;
