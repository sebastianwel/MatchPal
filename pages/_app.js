import GlobalStyle from "../styles";
import Head from "next/head";
import { matches } from "../lib/mock-data/matches";
import { teams } from "../lib/mock-data/teams";
import { bars } from "../lib/mock-data/bars";
import { barsInMatches } from "../lib/mock-data/barsInMatches";
import { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import DateFilter from "../components/DateFilter";

const libraries = ["places"];

export default function App({ Component, pageProps }) {
  const [places, setPlaces] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  // extended the bars-array with the key "barShowsMatch" to make it usable for the bars-list
  const extendedBars = places.map((bar) => {
    const showsMatch = bar.matches?.length > 0;
    return {
      ...bar,
      showsMatch,
    };
  });

  const [updatedBars, setUpdatedBars] = useState(extendedBars);

  console.log("updatedBars", updatedBars);
  const barsWithMatches = extendedBars.filter((bar) => bar.matches.length > 0);

  const filteredMatchesByDate = matches.filter(
    (match) => match.date === formattedSelectedDate
  );

  const matchesWithTeamNames = filteredMatchesByDate.map((match) => ({
    ...match,
    homeTeam: {
      name: teams.find((team) => team.id === match.homeTeamId).name,
      logoColor: teams.find((team) => team.id === match.homeTeamId).logoColor,
    },
    awayTeam: {
      name: teams.find((team) => team.id === match.awayTeamId).name,
      logoColor: teams.find((team) => team.id === match.awayTeamId).logoColor,
    },
  }));

  const extendedBarsWithMatches = barsWithMatches.map((bar) => ({
    ...bar,
    matches: matchesWithTeamNames
      .filter((match) => bar.matches.includes(match.id))
      .map((match) => ({
        id: match.id,
        date: matchesWithTeamNames.find((match) =>
          bar.matches.includes(match.id)
        ).date,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
      })),
  }));

  console.log("extendedBars", extendedBarsWithMatches);

  const barsWithMatchesOnDate = extendedBarsWithMatches.filter((bar) =>
    bar.matches.some((match) => match.date === formattedSelectedDate)
  );

  function handleDeleteBarOrMatch(updatedBars) {
    setPlaces([...updatedBars]);
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
  }

  console.log("places:", places);
  return (
    <>
      <GlobalStyle />

      <Head>
        <title>MatchPal</title>
      </Head>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Component
          {...pageProps}
          matches={matchesWithTeamNames}
          bars={extendedBarsWithMatches}
          barsInMatches={barsInMatches}
          onDeleteBarOrMatch={handleDeleteBarOrMatch}
          initialBars={bars}
          barsWithMatchesOnDate={barsWithMatchesOnDate}
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
          today={new Date()}
          places={places}
          setPlaces={setPlaces}
        />
      </LoadScript>
    </>
  );
}
