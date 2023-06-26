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

export default function BarDetails({ bars, matches }) {
  const router = useRouter();
  const { id } = router.query;

  //find current Bar by using the router-id
  const currentBar = bars ? bars.find((bar) => bar.id === parseInt(id)) : null;

  //create an array containing only the match-ids to search for the match-ids in the matches-array and filter those matches
  const currentMatchIds = currentBar?.matches.map((match) => match);
  const currentMatches = matches
    ? matches.filter((match) => currentMatchIds?.includes(match.id))
    : null;

  const [updatedMatches, setUpdatedMatches] = useState([]);
  useEffect(() => {
    setUpdatedMatches(
      matches?.filter((match) => currentMatchIds?.includes(match.id))
    );
  }, [matches]);

  const [updatedBar, setUpdatedBar] = useState(currentBar);
  useEffect(() => {
    setUpdatedBar(bars ? bars.find((bar) => bar.id === parseInt(id)) : null);
  }, [bars]);

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
        {updatedMatches?.map((match) => (
          <CardLink key={match.id} href={`/matches/${match.id}`}>
            <MatchCard
              key={match.id}
              id={match.id}
              homeTeam={match.homeTeam.name}
              awayTeam={match.awayTeam.name}
              date={match.date}
              time={match.time}
              homeTeamColor={match.homeTeam.logoColor}
              awayTeamColor={match.awayTeam.logoColor}
            />
          </CardLink>
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
