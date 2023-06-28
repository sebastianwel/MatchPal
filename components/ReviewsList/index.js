import styled from "styled-components";
import ReviewCard from "../ReviewCard";

export default function ReviewsList({
  bars,
  currentBar,
  reviews,
  onDeleteReview,
  onEditReview,
}) {
  return (
    <ReviewsContainer>
      <h4>So gefiel es anderen Nutzern:</h4>
      <Reviews>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onDeleteReview={onDeleteReview}
            onEditReview={onEditReview}
            canDeleteReview={
              !bars
                .find((bar) => bar.id === currentBar.id)
                .reviews.includes(review)
            } //created the logic for only deleting reviews you added by yourself
          />
        ))}
      </Reviews>
    </ReviewsContainer>
  );
}

const ReviewsContainer = styled.section`
  margin: 10px;
  margin-bottom: 50px;
  list-style: none;
`;

const Reviews = styled.ul`
  list-style: none;
  padding-left: 0px;
`;
