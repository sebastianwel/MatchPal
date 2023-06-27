import styled from "styled-components";
import ReviewCard from "../ReviewCard";

export default function ReviewsList({ reviews, onDeleteReview }) {
  console.log(reviews);

  return (
    <ReviewsContainer>
      <h4>So gefiel es anderen Nutzern:</h4>
      <Reviews>
        {reviews?.map((review, index) => (
          <ReviewCard
            key={index}
            username={review.username}
            rating={review.rating}
            comment={review.comment}
            onDeleteReview={onDeleteReview}
            id={review.id}
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

const ReviewCardContainer = styled.div`
  border: 1px solid;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 5px;
`;
