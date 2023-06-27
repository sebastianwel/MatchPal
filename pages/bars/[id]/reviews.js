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

export default function BarsDetailsReviews({ bars }) {
  const router = useRouter();
  const { id } = router.query;

  const currentBar = bars.find((bar) => bar.id === parseInt(id));

  const isCurrentSection = currentBar
    ? router.pathname === `/bars/[id]/reviews`
      ? true
      : false
    : null;

  const [reviews, setReviews] = useState(currentBar?.reviews);

  useEffect(() => {
    setReviews(currentBar?.reviews || []);
  }, [currentBar?.reviews]);

  function handleAddReview(newReview) {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  }

  return (
    <>
      <AppHeader />
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
      <ReviewsList currentBar={currentBar} reviews={reviews} />
      <ReviewForm onAddReview={handleAddReview} />
      <AppFooter />
    </>
  );
}
