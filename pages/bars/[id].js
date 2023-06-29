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

export default function BarDetails({ bars, matches, onDeleteBarOrMatch }) {
  const router = useRouter();
  const { id } = router.query;

  //find current Bar by using the router-id
  const currentBar = bars ? bars.find((bar) => bar.id === parseInt(id)) : null;

  //create an array containing only the match-ids to search for the match-ids in the matches-array and filter those matches
  const currentMatchIds = currentBar?.matches.map((match) => match);

  const [updatedMatches, setUpdatedMatches] = useState(
    matches?.filter((match) => currentMatchIds?.includes(match.id))
  );
  const [updatedBar, setUpdatedBar] = useState(currentBar);

  useEffect(() => {
    const currentBar = bars
      ? bars.find((bar) => bar.id === parseInt(id))
      : null;
    const currentMatchIds = currentBar?.matches.map((match) => match);

    const filteredMatches = matches?.filter((match) =>
      currentMatchIds?.includes(match.id)
    );

    setUpdatedMatches(filteredMatches);
    setUpdatedBar(currentBar);
  }, [bars, matches, id]);

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
    }
  }

  function handleDeleteMatchFromBar(matchId) {
    setUpdatedMatches((prevUpdatedMatches) =>
      prevUpdatedMatches.filter((match) => match.id !== matchId)
    );

    const updatedBars = bars.map((bar) => {
      if (bar.id === currentBar.id) {
        const matches = bar.matches.filter((match) => match !== matchId);
        const showsMatch = !bar.matches.length >= 1 ? true : false;
        return { ...bar, matches, showsMatch };
      }
      return bar;
    });
    console.log("updatedBarsInBar", updatedBars);
    onDeleteBarOrMatch(updatedBars);
  }

  const isCurrentSection = currentBar
    ? router.pathname === `/bars/[id]`
      ? true
      : false
    : null;

  return (
    <>
      <AppHeader />
      <Button onClick={() => router.push("/bars")}>←</Button>
      <Headline>{updatedBar?.name}</Headline>
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
      <List>
        {updatedMatches.length < 1 ? (
          <>
            <Headline>Aktuell zeigt diese Bar keine Spiele!</Headline>
            <p>Du weißt welches Spiel gezeigt wird? Füge es hinzu:</p>
          </>
        ) : null}
        {updatedMatches?.map((match, index) => (
          <Fragment key={`${match.id}-${index}`}>
            <CardContainer>
              <DeleteButton onClick={() => handleDeleteMatchFromBar(match.id)}>
                x
              </DeleteButton>
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
  border: 1px solid;
  margin: 10px;
`;

export const SiteSection = styled.p`
  margin: 10px;
  color: ${(section) => (section.isCurrentSection ? "#0079FF" : "#000")};
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

const CardContainer = styled.div`
  position: relative;
`;
