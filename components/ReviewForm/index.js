import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import { useState } from "react";
import { uid } from "uid";

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
      username: formDataWithRating.username,
      comment: formDataWithRating.comment,
      rating: formDataWithRating.rating,
    };

    onAddReview(newReview);
    setRating(0);
    event.target.reset();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" name="username" />
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
      <textarea
        rows={4}
        cols={50}
        maxLength={100}
        id="comment"
        name="comment"
      />
      <button type="submit">Submit</button>
    </Form>
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
  margin-bottom: 55px;
`;
