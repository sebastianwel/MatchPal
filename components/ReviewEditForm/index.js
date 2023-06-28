import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import { useState } from "react";

export default function ReviewEditForm({
  review,
  onUpdateReview,
  onCancelEdit,
}) {
  const [editedRating, setEditedRating] = useState(review?.rating || 0);
  const [editedComment, setEditedComment] = useState(review?.comment || "");
  const [editedUsername, setEditedUsername] = useState(review?.username || "");

  function handleStarRating(value) {
    setEditedRating(value);
  }

  function handleUsernameChange(event) {
    setEditedUsername(event.target.value);
  }

  function handleCommentChange(event) {
    setEditedComment(event.target.value);
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    const updatedReview = {
      ...review,
      username: editedUsername,
      rating: editedRating,
      comment: editedComment,
    };
    onUpdateReview(updatedReview);
  }

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleEditSubmit}>
          <Close onClick={onCancelEdit}>Schließen</Close>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="username"
            value={editedUsername}
            onChange={handleUsernameChange}
          />
          <label htmlFor="rating">Bewertung:</label>
          <StarContainer>
            {[1, 2, 3, 4, 5].map((value) => (
              <ReviewStar
                key={value}
                isSelected={value <= editedRating}
                onClick={() => handleStarRating(value)}
              />
            ))}
          </StarContainer>
          <label htmlFor="comment">Kommentar:</label>
          <textarea
            rows={4}
            cols={50}
            maxLength={100}
            id="comment"
            name="comment"
            value={editedComment}
            onChange={handleCommentChange}
          />
          <button type="submit">Submit</button>
        </Form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  background-color: #fff;
  position: relative;
  margin: 50px;
  display: flex;
`;

const Close = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  margin-bottom: 100px;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 55px;
  width: 300px;
  height: 300px;
  padding: 10px;
`;
