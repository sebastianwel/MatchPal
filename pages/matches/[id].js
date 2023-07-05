import { useRouter } from "next/router";
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/";
import AppFooter from "../../components/AppFooter/";
import SelectedMatch from "../../components/SelectedMatch";
import { useState, useEffect } from "react";
import MatchDetailsForm from "../../components/MatchDetailsForm";
import { Button } from "../../components/BackButton/BackButton";
import { Headline } from "../../components/Headline/Headline";
import { CardLink } from "../../components/CardLink";
import { DeleteButton } from "../../components/DeleteButton";
import { Fragment } from "react";
import BarSearchBox from "../../components/BarSearchBox";

export default function MatchDetails({
  matches,
  bars,
  onDeleteBarOrMatch,
  places,
  setPlaces,
}) {
  const router = useRouter();
  const { id } = router.query;

  //use the current id of the router to find the fitting match
  const currentMatch = matches.find((match) => match.id === parseInt(id));

  //filter the bars, which contain the id of the current match
  const currentBars = bars.filter((bar) =>
    bar.matches.some((match) => match.id === parseInt(currentMatch.id))
  );

  const [updatedCurrentBars, setUpdatedCurrentBars] = useState(currentBars);

  useEffect(() => {
    setUpdatedCurrentBars(currentBars);
  }, [bars, currentMatch]);

  function handleDeleteBar(id) {
    const updatedBars = places.map((bar) => {
      if (bar.place_id === id) {
        const matches = bar.matches.filter(
          (match) => match !== parseInt(currentMatch.id)
        );
        return {
          ...bar,
          matches,
          showsMatch: !bar.matches?.length > 0 ? true : false,
        };
      }
      return bar;
    });

    onDeleteBarOrMatch(updatedBars);
  }

  return (
    <>
      <AppHeader />
      <Button onClick={() => router.push("/")}>←</Button>
      {currentMatch ? (
        <SelectedMatch
          date={currentMatch.date}
          time={currentMatch.time}
          homeTeam={currentMatch.homeTeam.name}
          homeTeamLogoColor={currentMatch.homeTeam.logoColor}
          awayTeam={currentMatch.awayTeam.name}
          awayTeamLogoColor={currentMatch.awayTeam.logoColor}
        />
      ) : (
        <h2>loading</h2>
      )}
      {updatedCurrentBars?.length === 0 ? (
        <Headline>Aktuell zeigt keine Bar das Spiel!</Headline>
      ) : (
        <Headline>Folgende Bars zeigen das Spiel:</Headline>
      )}
      <List>
        {updatedCurrentBars?.map((bar, index) => (
          <OuterCard key={`${bar.place_id}-${index}`}>
            <Delete onClick={() => handleDeleteBar(bar.place_id)}>x</Delete>
            <CardLink href={`/bars/${bar.place_id}`} key={bar.place_id}>
              <ListItem key={bar.place_id}>
                {bar.name} <p>{">"}</p>
              </ListItem>
            </CardLink>
          </OuterCard>
        ))}
      </List>
      <h4 id="match-details-form">Eine Bar in deiner Nähe zeigt das Spiel?</h4>
      <BarSearchBox
        places={places}
        setPlaces={setPlaces}
        currentMatch={currentMatch}
      />
      <AppFooter />
    </>
  );
}

const List = styled.ul`
  padding-left: 0px;
  position: relative;
`;

const OuterCard = styled.div`
  position: relative;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  border: 1px solid;
  border-radius: 10px;
  margin: 10px;
  margin-right: 10px;
  padding: 10px;
`;

const Delete = styled(DeleteButton)`
  position: absolute;
  top: 5px;
  right: 20px;
`;
