import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import styled from "styled-components";
import { Button } from "../../components/BackButton/BackButton";
import { Headline } from "../../components/Headline/Headline";
import MatchCard from "../../components/MatchCard";
import { CardLink } from "../../components/CardLink/index";
import { useState, useEffect } from "react";

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
    console.log(formData);

    const newCurrentMatches = [
      ...currentMatches,
      matches.find((match) => match.id === parseInt(formData.newMatchId)),
    ];

    const isMatchAlreadyAdded = updatedMatches.some(
      (match) => match.id === parseInt(formData.newMatchId)
    );

    //check wheter the current list already contains the match
    if (!isMatchAlreadyAdded) {
      const newCurrentBar = currentBar;
      newCurrentBar.matches.push(parseInt(formData.newMatchId));

      setUpdatedMatches(newCurrentMatches);
      setUpdatedBar(newCurrentBar);
    }
  }

  console.log(bars);
  return (
    <>
      <AppHeader />
      <Button onClick={() => router.push("/bars")}>←</Button>
      <Headline>{updatedBar?.name}</Headline>
      <SiteSection>Anstehende Spiele</SiteSection>
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

      {/* Maybe I can use the MatchDetailsForm component here */}
      <Form onSubmit={handleSubmit} aria-labelledby="bar-details-form">
        <label htmlFor="matchSelector">Match</label>
        <select id="matchSelector" name="newMatchId">
          <option>--Match auswählen--</option>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.homeTeam.name}-{match.awayTeam.name}
            </option>
          ))}
        </select>
        <button type="submit">Hinzufügen</button>
      </Form>
      <AppFooter />
    </>
  );
}

const SiteSection = styled.p`
  margin: 10px;
  margin-top: 30px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-bottom: 55px;
  gap: 10px;
`;
