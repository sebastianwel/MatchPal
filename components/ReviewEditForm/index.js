import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import { useState } from "react";
import { SelectedBarContainer } from "../SelectedBarContainer";
import { SubmitButton } from "../SubmitButton";
import { DeleteButton } from "../DeleteButton";

export default function ReviewEditForm({
  review,
  onUpdateReview,
  onCancelEdit,
}) {
  const [editedRating, setEditedRating] = useState(review?.rating || 0);
  const [editedComment, setEditedComment] = useState(review?.text || "");
  const [editedUsername, setEditedUsername] = useState(
    review?.author_name || ""
  );

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
      author_name: editedUsername,
      rating: editedRating,
      text: editedComment,
    };
    onUpdateReview(updatedReview);
  }

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleEditSubmit}>
          <DeleteButton onClick={onCancelEdit}>x</DeleteButton>
          <label htmlFor="name">Name:</label>
          <Input
            id="name"
            name="author_name"
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
          <Textarea
            rows={4}
            cols={50}
            maxLength={100}
            id="comment"
            name="text"
            value={editedComment}
            onChange={handleCommentChange}
          />
          <SubmitButton type="submit">Ändern</SubmitButton>
        </Form>
      </FormContainer>
    </>
  );
}

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 10px;
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
  align-self: center;
  border: none;
  appearance: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 10px;
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
  align-self: center;
  border: none;
  appearance: none;
`;

const FormContainer = styled(SelectedBarContainer)`
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
