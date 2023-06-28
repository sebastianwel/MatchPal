import styled from "styled-components";
import ReviewEditForm from "../ReviewEditForm";

export default function ReviewEditModal({
  review,
  onUpdateReview,
  onCancelEdit,
}) {
  function handleUpdateReview(updatedReview) {
    onUpdateReview(updatedReview);
  }

  return (
    <EditReviewModalOverlay>
      <ReviewEditForm
        review={review}
        onUpdateReview={handleUpdateReview}
        onCancelEdit={onCancelEdit}
      />
    </EditReviewModalOverlay>
  );
}

const EditReviewModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: auto;
`;
