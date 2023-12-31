import { useRouter } from "next/router";
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/";
import AppFooter from "../../components/AppFooter/";
import SelectedMatch from "../../components/SelectedMatch";
import { useState, useEffect } from "react";
import { Headline } from "../../components/Headline/Headline";
import { CardLink } from "../../components/CardLink";
import { DeleteButton } from "../../components/DeleteButton";
import BarSearchBox from "../../components/BarSearchBox";
import SureToDeleteModal from "../../components/SureToDeleteButton";

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
  const currentBars = bars?.filter((bar) =>
    bar.matches.some((match) => match.id === parseInt(currentMatch?.id))
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

  const [selectedBarId, setSelectedBarId] = useState(null);
  return (
    <>
      <AppHeader />
      {currentMatch ? (
        <SelectedMatch
          date={currentMatch.date}
          time={currentMatch.time}
          homeTeam={currentMatch.homeTeam.name}
          homeTeamLogoColor={currentMatch.homeTeam.logoColor}
          awayTeam={currentMatch.awayTeam.name}
          awayTeamLogoColor={currentMatch.awayTeam.logoColor}
          homeTeamLogoURL={currentMatch.homeTeam.logoURL}
          awayTeamLogoURL={currentMatch.awayTeam.logoURL}
        />
      ) : (
        <p>loading...</p>
      )}
      {updatedCurrentBars?.length === 0 ? (
        <Headline>Aktuell zeigt keine Bar das Spiel!</Headline>
      ) : (
        <Headline>Folgende Bars zeigen das Spiel:</Headline>
      )}
      <List>
        {updatedCurrentBars?.map((bar, index) => (
          <OuterCard key={`${bar.place_id}-${index}`}>
            <Delete onClick={() => setSelectedBarId(bar.place_id)}>x</Delete>
            {selectedBarId === bar.place_id ? (
              <SureToDeleteModal
                onDelete={() => handleDeleteBar(bar.place_id)}
                onCancel={() => setSelectedBarId(null)}
              >
                Bist du sicher, dass die Bar das Spiel nicht zeigt?
              </SureToDeleteModal>
            ) : null}
            <CardLink href={`/bars/${bar.place_id}`} key={bar.place_id}>
              <ListItem key={bar.place_id}>{bar.name}</ListItem>
            </CardLink>
          </OuterCard>
        ))}
      </List>
      <Headline id="match-details-form">Bei dir in der Nähe läufts?</Headline>
      <BarSearchBox
        places={places}
        setPlaces={setPlaces}
        currentMatch={currentMatch}
      />
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
  width: 93%;
  height: 70px;
  margin: auto;
  margin-top: 10px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 5px;
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
`;

const Delete = styled(DeleteButton)`
  position: absolute;
  top: 5px;
  right: 20px;
`;
