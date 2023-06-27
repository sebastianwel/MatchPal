import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import ReviewForm from "../ReviewForm";
import { useEffect, useState } from "react";
import { uid } from "uid";
import ReviewCard from "../ReviewCard";

export default function ReviewsList({ currentBar }) {
  const [reviews, setReviews] = useState(currentBar?.reviews);

  useEffect(() => {
    setReviews(currentBar?.reviews || []);
  }, [currentBar?.reviews]);

  function handleAddReview(newReview) {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  }

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
          />
        ))}
      </Reviews>
      <ReviewForm onAddReview={handleAddReview} />
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
