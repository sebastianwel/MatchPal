import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";

export default function ReviewForm({ onSubmit, rating, handleStarRating }) {
  const ratingPossibilities = [1, 2, 3, 4, 5];

  return (
    <Form onSubmit={onSubmit}>
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
