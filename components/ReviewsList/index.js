import styled from "styled-components";
import ReviewCard from "../ReviewCard";
import { SelectedBarContainer } from "../SelectedBarContainer";
import { useState } from "react";
import SureToDeleteModal from "../SureToDeleteButton";

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

const ReviewsContainer = styled(SelectedBarContainer)`
  margin-top: 15px;
  margin-bottom: 60px;
  padding: 10px;
`;

const Reviews = styled.ul`
  list-style: none;
  padding-left: 0px;
`;
