import styled from "styled-components";
import ReviewStar from "../../assets/ReviewStar";

export default function ReviewsList({ currentBar }) {
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

  return (
    <ReviewsContainer>
      {/* ReviewList */}
      <h4>So gefiel es anderen Nutzern:</h4>
      <Reviews>
        {currentBar?.reviews.map((review, index) => (
          <ReviewCardContainer key={index}>
            <li>
              <p>{review.username}</p>
              <div>{renderReviewStars(review.rating)}</div>
              <p>{review.comment}</p>
            </li>
          </ReviewCardContainer>
        ))}
      </Reviews>
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
