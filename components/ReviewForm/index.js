import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import { useState } from "react";
import { uid } from "uid";
import { SubmitButton } from "../SubmitButton";

export default function ReviewForm({ onAddReview }) {
  const ratingPossibilities = [1, 2, 3, 4, 5];

  const [rating, setRating] = useState(0);
  function handleStarRating(value) {
    setRating(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    //since I am not using a form-field for the stars, I need to copy the form-data and add the value from the selected stars into the copy
    const formDataWithRating = { ...formData, rating: parseInt(rating) };

    const newReview = {
      id: uid(),
      author_name: formDataWithRating.author_name,
      text: formDataWithRating.text,
      rating: formDataWithRating.rating,
      isDeleteAble: true,
    };

    onAddReview(newReview);
    setRating(0);
    event.target.reset();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h4>Wie fandest du es? Lass ein Kommentar da:</h4>
        <label htmlFor="name">Name:</label>
        <Input id="name" name="author_name" />
        <label htmlFor="rating">Bewertung:</label>
        <StarContainer>
          {ratingPossibilities.map((value, index) => (
            <ReviewStar
              key={index}
              isSelected={value <= rating}
              onClick={() => handleStarRating(value)}
            />
          ))}
        </StarContainer>
        <label htmlFor="comment">Kommentar:</label>
        <Textarea rows={4} cols={50} maxLength={100} id="comment" name="text" />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </>
  );
}

const StarContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  margin-bottom: 60px;
`;

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
