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

export default function MatchDetails({ matches, bars, onDeleteBarOrMatch }) {
  const router = useRouter();
  const { id } = router.query;

  //use the current id of the router to find the fitting match
  const currentMatch = matches.find((match) => match.id === parseInt(id));

  //filter the bars, which contain the id of the current match
  const currentBars = bars.filter((bar) =>
    bar.matches?.includes(currentMatch?.id)
  );

  const [updatedCurrentBars, setUpdatedCurrentBars] = useState(currentBars);

  useEffect(() => {
    setUpdatedCurrentBars(
      bars?.filter((bar) => bar.matches?.includes(currentMatch?.id))
    );
  }, [bars, currentMatch]);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);

    const selectedBar = bars.find(
      (bar) => bar.id === parseInt(formData.newBarId)
    );
    const isBarAlreadyAdded = updatedCurrentBars?.some(
      (bar) => bar.id === selectedBar.id
    );

    //check wheter the current list already contains the bar
    if (selectedBar && !isBarAlreadyAdded) {
      const updatedSelectedBar = { ...selectedBar };
      updatedSelectedBar.matches.push(parseInt(currentMatch.id));

      setUpdatedCurrentBars((prevBars) => [...prevBars, updatedSelectedBar]);
    }
  }

  function handleDeleteBar(id) {
    const updatedBars = bars.map((bar) => {
      if (bar.id === id) {
        const matches = bar.matches.filter(
          (match) => match !== parseInt(currentMatch.id)
        );
        return { ...bar, matches };
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
          <>
            <Delete
              key={`${bar.id}-${index}`}
              onClick={() => handleDeleteBar(bar.id)}
            >
              x
            </Delete>
            <CardLink href={`/bars/${bar.id}`} key={bar.id}>
              <ListItem key={bar.id}>
                {bar.name} <p>{">"}</p>
              </ListItem>
            </CardLink>
          </>
        ))}
      </List>
      <h4 id="match-details-form">Du weißt wo es läuft?</h4>
      <MatchDetailsForm
        bars={bars}
        onSubmit={handleSubmit}
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
