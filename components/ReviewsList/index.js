import styled from "styled-components";
import ReviewCard from "../ReviewCard";

export default function ReviewsList({ reviews, onDeleteReview, onEditReview }) {
  const canDeleteReview = (review) => review.isDeleteAble;
  return (
    <ReviewsContainer>
      <h4>So gefiel es anderen Nutzern:</h4>
      <Reviews>
        {reviews.map((review) => (
          <ReviewCard
            key={review.author_url}
            review={review}
            onDeleteReview={onDeleteReview}
            onEditReview={onEditReview}
            canDeleteReview={canDeleteReview(review)} //created the logic for only deleting reviews you added by yourself
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
