import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import SureToDeleteModal from "../SureToDeleteButton";
import { useState } from "react";

export default function ReviewCard({
  review,
  onDeleteReview,
  onEditReview,
  canDeleteReview,
}) {
  const { id, author_name, rating, text } = review;

  const renderReviewStars = (filledStars) => {
    const stars = [];

    for (let counter = 1; counter <= 5; counter++) {
      const isSelected = counter <= filledStars;
      stars.push(<ReviewStar key={counter} isSelected={isSelected} />);
    }

    return stars;
  };

  const [selectedReviewId, setSelectedReviewId] = useState(null);
  return (
    <li>
      <ReviewCardContainer>
        <p>{author_name}</p>
        <div>{renderReviewStars(rating)}</div>
        <p>{text}</p>
        {canDeleteReview ? (
          <>
            <DeleteButton type="button" onClick={() => setSelectedReviewId(id)}>
              x
            </DeleteButton>
            <EditButton onClick={() => onEditReview(id)}>Bearbeiten</EditButton>
          </>
        ) : null}
      </ReviewCardContainer>
      <>
        {selectedReviewId === id ? (
          <SureToDeleteModal
            onDelete={() => onDeleteReview(id)}
            onCancel={() => setSelectedReviewId(null)}
          >
            Bist du sicher, dass die Bar das Spiel nicht zeigt?
          </SureToDeleteModal>
        ) : null}
      </>
    </li>
  );
}

const ReviewCardContainer = styled.div`
  border-top: 1px solid;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 5px;
  position: relative;
  border-color: var(--text-color);
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 2px;
  background-color: #fff;
  border: none;
`;

const EditButton = styled.button`
  position: absolute;
  top: 5px;
  right: 20px;
  background-color: #fff;
  border: none;
`;
