import { useRouter } from "next/router";
import AppHeader from "../../../components/AppHeader";
import AppFooter from "../../../components/AppFooter";
import { Headline } from "../../../components/Headline/Headline";
import { Button } from "../../../components/BackButton/BackButton";
import { SiteSection, SiteSectionTabs } from "../[id]";
import styled from "styled-components";

export default function BarsDetailsInfo({ bars }) {
  const router = useRouter();
  const { id } = router.query;

  const currentBar = bars ? bars.find((bar) => bar.id === parseInt(id)) : null;
  const isCurrentSection = currentBar
    ? router.pathname === `/bars/[id]/info`
      ? true
      : false
    : null;

  return (
    <>
      <AppHeader />
      <Button onClick={() => router.push("/bars")}>←</Button>
      {!currentBar ? (
        <p>...loading</p>
      ) : (
        <>
          <Headline>{currentBar.name}</Headline>
          <SiteSectionTabs>
            <SiteSection onClick={() => router.push(`/bars/${id}`)}>
              Anstehende Spiele
            </SiteSection>
            <SiteSection isCurrentSection={isCurrentSection}>Infos</SiteSection>
            <SiteSection onClick={() => router.push(`/bars/${id}/reviews`)}>
              Reviews
            </SiteSection>
          </SiteSectionTabs>
          <Infos>
            <h4>Kontakt</h4>
            <p>Adresse: {currentBar.address}</p>
            <p>Telefon: {currentBar.phone}</p>
            <h4>Öffnungszeiten</h4>
            <p>Montag: {currentBar.openingHours.monday}</p>
            <p>Dienstag: {currentBar.openingHours.tuesday}</p>
            <p>Mittwoch: {currentBar.openingHours.wednesday}</p>
            <p>Donnerstag: {currentBar.openingHours.thursday}</p>
            <p>Freitag: {currentBar.openingHours.friday}</p>
            <p>Samstag: {currentBar.openingHours.saturday}</p>
            <p>Sonntag: {currentBar.openingHours.sunday}</p>
            <h4>Spezialitäten</h4>
            <Specialities>
              {currentBar.specialties?.map((speciality, index) => (
                <Speciality key={index}>
                  <p>{speciality}</p>
                </Speciality>
              ))}
            </Specialities>
            <h4>Bier Preise</h4>
            <p>Pils: {currentBar.beerPrices.pils}€</p>
          </Infos>
        </>
      )}
      <AppFooter />
    </>
  );
}

const Infos = styled.section`
  margin: 10px;
  margin-bottom: 50px;
`;

const Specialities = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Speciality = styled.div`
  border: 1px solid;
  border-radius: 10px;
  margin: 10px;
  align-self: center;
  text-align: center;
`;
