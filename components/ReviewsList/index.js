import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";
import ReviewForm from "../ReviewForm";
import { useEffect, useState } from "react";
import { uid } from "uid";

export default function ReviewsList({ currentBar }) {
  const [reviews, setReviews] = useState(currentBar?.reviews);

  useEffect(() => {
    setReviews(currentBar?.reviews || []);
  }, [currentBar?.reviews]);

  const [rating, setRating] = useState(0);

  function handleStarRating(value) {
    setRating(value);
  }
  const maxStars = 5;
  function renderReviewStars(filledStars) {
    const stars = [];

    //create a loop which defines how many stars are filled
    for (let counter = 1; counter <= maxStars; counter++) {
      //create the isSelected variable which is used as a prop in the stars-component
      const isSelected = counter <= filledStars;
      //now push a whole component into the array, to have a amount of "selected-stars" to render. Since the loop will iterate for 5-times, the difference in the array will be rendered as "!isSelected"
      stars.push(<ReviewStar key={counter} isSelected={isSelected} />);
    }

    return stars;
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

    setReviews((prevReviews) => [...prevReviews, newReview]);
  }

  return (
    <ReviewsContainer>
      <h4>So gefiel es anderen Nutzern:</h4>
      <Reviews>
        {reviews?.map((review, index) => (
          <ReviewCardContainer key={index}>
            <li>
              <p>{review.username}</p>
              <div>{renderReviewStars(review.rating)}</div>
              <p>{review.comment}</p>
            </li>
          </ReviewCardContainer>
        ))}
      </Reviews>
      <ReviewForm
        onSubmit={handleSubmit}
        rating={rating}
        handleStarRating={handleStarRating}
      />
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
