import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import styled from "styled-components";
import { Button } from "../../components/BackButton/BackButton";
import { Headline } from "../../components/Headline/Headline";
import MatchCard from "../../components/MatchCard";
import { CardLink } from "../../components/CardLink/index";
import { useState, useEffect } from "react";
import BarDetailsForm from "../../components/BarDetailsForm";
import { DeleteButton } from "../../components/DeleteButton";
import { Fragment } from "react";
import { Paragraph } from "../../components/Paragraph";
import { SelectedBarContainer } from "../../components/SelectedBarContainer";
import SureToDeleteModal from "../../components/SureToDeleteButton";

export default function BarDetails({
  matches,
  setPlaces,
  places,
  sureToDelete,
  setSureToDelete,
  handleSureToDelete,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [updatedMatches, setUpdatedMatches] = useState(matches);

  //find current Bar by using the router-id
  const currentBar = places ? places.find((bar) => bar.place_id === id) : null;

  const [updatedBar, setUpdatedBar] = useState(currentBar);
  // const newMatches = updatedBar?.matches.map((match) => match);

  useEffect(() => {
    setUpdatedMatches(
      matches.filter((match) => updatedBar.matches.includes(match.id))
    );
  }, [id, matches, updatedBar]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);

    const isMatchAlreadyAdded = updatedMatches.some(
      (match) => match.id === parseInt(formData.newMatchId)
    );
    //check wheter the current list already contains the match
    if (!isMatchAlreadyAdded) {
      const newCurrentBar = currentBar;
      newCurrentBar.matches.push(parseInt(formData.newMatchId));

      setUpdatedMatches((prevCurrentMatches) => [
        ...prevCurrentMatches,
        matches.find((match) => match.id === parseInt(formData.newMatchId)),
      ]);
      setUpdatedBar(newCurrentBar);
      setSelectedMatchId(null);
    }
  }

  function handleDeleteMatchFromBar(matchId) {
    setUpdatedMatches((prevUpdatedMatches) =>
      prevUpdatedMatches.filter((match) => match.id !== matchId)
    );

    const updatedPlaces = places.map((place) => {
      if (place.place_id === currentBar.place_id) {
        const matches = place.matches.filter((match) => match !== matchId);
        const showsMatch = matches.length > 0;
        return { ...place, matches, showsMatch };
      }
      return place;
    });

    setPlaces(updatedPlaces);
    setSureToDelete(!sureToDelete);
  }

  useEffect(() => {
    setUpdatedBar(
      places.find((place) => place.place_id === currentBar.place_id)
    );
  }, [places, currentBar]);

  const isCurrentSection = currentBar
    ? router.pathname === `/bars/[id]`
      ? true
      : false
    : null;

  const [selectedMatchId, setSelectedMatchId] = useState(null);
  console.log("selectedMatchId", selectedMatchId);

  return (
    <>
      <AppHeader />

      <SelectedBarContainer>
        <Button onClick={() => router.push("/bars")}>←</Button>
        <CenteredHeadline>{updatedBar?.name}</CenteredHeadline>
        <SiteSectionTabs>
          <SiteSection isCurrentSection={isCurrentSection}>
            Anstehende Spiele
          </SiteSection>
          <SiteSection onClick={() => router.push(`/bars/${id}/info`)}>
            Infos
          </SiteSection>
          <SiteSection onClick={() => router.push(`/bars/${id}/reviews`)}>
            Reviews
          </SiteSection>
        </SiteSectionTabs>
      </SelectedBarContainer>
      <List>
        {updatedMatches.length < 1 ? (
          <>
            <Paragraph>Aktuell zeigt diese Bar keine Spiele!</Paragraph>
            <Paragraph>
              Du weißt welches Spiel gezeigt wird? Füge es hinzu:
            </Paragraph>
          </>
        ) : null}
        {updatedMatches?.map((match, index) => (
          <Fragment key={`${match.id}-${index}`}>
            <CardContainer>
              <DeleteButton onClick={() => setSelectedMatchId(match.id)}>
                x
              </DeleteButton>
              {selectedMatchId === match.id ? (
                <SureToDeleteModal
                  onDelete={() => handleDeleteMatchFromBar(match.id)}
                  onCancel={() => setSelectedMatchId(null)}
                >
                  Bist du sicher, dass die Bar das Spiel nicht zeigt?
                </SureToDeleteModal>
              ) : null}

              <CardLink href={`/matches/${match.id}`}>
                <MatchCard
                  key={match.id}
                  id={match.id}
                  homeTeam={match.homeTeam.name}
                  awayTeam={match.awayTeam.name}
                  date={match.date}
                  time={match.time}
                  homeTeamColor={match.homeTeam.logoColor}
                  awayTeamColor={match.awayTeam.logoColor}
                  onDeleteMatch={handleDeleteMatchFromBar}
                  isDeletable
                />
              </CardLink>
            </CardContainer>
          </Fragment>
        ))}
      </List>
      <BarDetailsForm
        onSubmit={handleSubmit}
        matches={matches}
        bar={updatedBar}
      />
      <AppFooter />
    </>
  );
}

export const SiteSectionTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 10px;
`;

export const SiteSection = styled.p`
  margin: 10px;
  color: ${(section) => (section.isCurrentSection ? "#0079FF" : "#000")};
`;

const List = styled.ul`
  list-style: none;
  align-items: center;
  padding-left: 0px;
`;

const CardContainer = styled.div`
  position: relative;
`;

const CenteredHeadline = styled(Headline)`
  text-align: center;
  margin: 10px;
`;
