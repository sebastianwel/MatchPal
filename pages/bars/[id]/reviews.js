import { useRouter } from "next/router";
import AppHeader from "../../../components/AppHeader";
import { Button } from "../../../components/BackButton/BackButton";
import AppFooter from "../../../components/AppFooter";
import { SiteSection } from "../[id]";
import { SiteSectionTabs } from "../[id]";
import { Headline } from "../../../components/Headline/Headline";
import ReviewsList from "../../../components/ReviewsList";
import ReviewForm from "../../../components/ReviewForm";
import { useState, useEffect } from "react";
import ReviewEditModal from "../../../components/ReviewEditModal";
import { SelectedBarContainer } from "../../../components/SelectedBarContainer";
import styled from "styled-components";

export default function BarsDetailsReviews({ places }) {
  const router = useRouter();
  const { id } = router.query;

  const currentBar = places ? places.find((bar) => bar.place_id === id) : null;

  const isCurrentSection =
    router.pathname === `/bars/[id]/reviews` ? true : false;

  const [reviews, setReviews] = useState(currentBar?.reviews || []);

  useEffect(() => {
    setReviews(currentBar?.reviews || []);
  }, [currentBar]);

  function handleAddReview(newReview) {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  }

  function handleDeleteReview(reviewId) {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  }

  const [isEditMode, setIsEditMode] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);

  function handleEditReview(reviewId) {
    setIsEditMode(true);
    setEditReviewId(reviewId);
  }

  function handleUpdateReview(updatedReview) {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
    setIsEditMode(false);
  }

  return (
    <>
      <AppHeader />
      <SelectedBarContainer>
        <Button onClick={() => router.push("/bars")}>←</Button>
        <Headline>{currentBar?.name}</Headline>
        <SiteSectionTabs>
          <SiteSection onClick={() => router.push(`/bars/${id}`)}>
            Anstehende Spiele
          </SiteSection>
          <SiteSection onClick={() => router.push(`/bars/${id}/info`)}>
            Infos
          </SiteSection>
          <SiteSection isCurrentSection={isCurrentSection}>Reviews</SiteSection>
        </SiteSectionTabs>
      </SelectedBarContainer>

      <ReviewsList
        bars={places}
        currentBar={currentBar}
        reviews={reviews}
        onDeleteReview={handleDeleteReview}
        onEditReview={handleEditReview}
      />

      <ReviewForm onAddReview={handleAddReview} />
      {isEditMode ? (
        <ReviewEditModal
          review={reviews.find((review) => review.id === editReviewId)}
          onUpdateReview={handleUpdateReview}
          onCancelEdit={() => setIsEditMode(false)}
        />
      ) : null}
      <AppFooter />
    </>
  );
}
