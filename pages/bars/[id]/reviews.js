import { useRouter } from "next/router";
import AppHeader from "../../../components/AppHeader";
import { Button } from "../../../components/BackButton/BackButton";
import AppFooter from "../../../components/AppFooter";
import { SiteSection } from "../[id]";
import { SiteSectionTabs } from "../[id]";
import { Headline } from "../../../components/Headline/Headline";
import styled from "styled-components";
import ReviewsList from "../../../components/ReviewsList";

export default function BarsDetailsReviews({ bars }) {
  const router = useRouter();
  const { id } = router.query;

  const currentBar = bars.find((bar) => bar.id === parseInt(id));

  const isCurrentSection = currentBar
    ? router.pathname === `/bars/[id]/reviews`
      ? true
      : false
    : null;

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
      <ReviewsList currentBar={currentBar} />
    </>
  );
}
