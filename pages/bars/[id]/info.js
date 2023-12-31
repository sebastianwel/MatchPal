import { useRouter } from "next/router";
import AppHeader from "../../../components/AppHeader";
import AppFooter from "../../../components/AppFooter";
import { Headline } from "../../../components/Headline/Headline";
import { Button } from "../../../components/BackButton/BackButton";
import { SiteSection, SiteSectionTabs } from "../[id]";
import styled from "styled-components";
import { SelectedBarContainer } from "../../../components/SelectedBarContainer";

export default function BarsDetailsInfo({ places }) {
  const router = useRouter();
  const { id } = router.query;

  const currentBar = places ? places.find((bar) => bar.place_id === id) : null;
  const isCurrentSection = currentBar
    ? router.pathname === `/bars/[id]/info`
      ? true
      : false
    : null;

  return (
    <>
      <AppHeader />

      {!currentBar ? (
        <p>...loading</p>
      ) : (
        <>
          <SelectedBarContainer>
            <Button onClick={() => router.push("/bars")}>←</Button>
            <CenteredHeadline>{currentBar.name}</CenteredHeadline>
            <SiteSectionTabs>
              <SiteSection onClick={() => router.push(`/bars/${id}`)}>
                Anstehende Spiele
              </SiteSection>
              <SiteSection isCurrentSection={isCurrentSection}>
                Infos
              </SiteSection>
              <SiteSection onClick={() => router.push(`/bars/${id}/reviews`)}>
                Reviews
              </SiteSection>
            </SiteSectionTabs>
          </SelectedBarContainer>

          <Infos>
            <h4>Kontakt</h4>
            <p>Adresse: {currentBar.vicinity}</p>
            <p>Telefon: {currentBar.formatted_phone_number}</p>
            <h4>Öffnungszeiten</h4>
            {currentBar.opening_hours ? (
              currentBar.opening_hours.weekday_text.map((day) => (
                <p key={day}>{day}</p>
              ))
            ) : (
              <p>Daten nicht vorhanden</p>
            )}
            <h4>Preisniveau</h4>
            {currentBar.price_leve ? (
              <p>{currentBar.price_level}</p>
            ) : (
              <p>Leider nicht verfügbar</p>
            )}
          </Infos>
        </>
      )}
    </>
  );
}

const Infos = styled(SelectedBarContainer)`
  margin-top: 15px;
  padding: 10px;
  margin-bottom: 60px;
`;

const CenteredHeadline = styled(Headline)`
  text-align: center;
  margin: 10px;
`;
