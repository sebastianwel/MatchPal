import GlobalStyle from "../styles";
import Head from "next/head";
import { matches } from "../lib/mock-data/matches";
import { teams } from "../lib/mock-data/teams";
import { bars } from "../lib/mock-data/bars";
import { barsInMatches } from "../lib/mock-data/barsInMatches";
import { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import DateFilter from "../components/DateFilter";

export default function App({ Component, pageProps }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  // extended the bars-array with the key "barShowsMatch" to make it usable for the bars-list
  const extendedBars = bars.map((bar) => {
    const showsMatch = barsInMatches.some(
      (barInMatches) =>
        barInMatches.gameIds.length > 0 && barInMatches.barId === bar.id
    );
    return {
      ...bar,
      showsMatch,
      matches: barsInMatches.find((match) => bar.id === match.barId).gameIds,
    };
  });

  const [updatedBars, setUpdatedBars] = useState(extendedBars);
  const barsWithMatches = updatedBars.filter((bar) => bar.matches.length > 0);

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
      .map((team) => ({
        date: matchesWithTeamNames.find((match) =>
          bar.matches.includes(match.id)
        ).date,
        homeTeam: team.homeTeam,
        awayTeam: team.awayTeam,
      })),
  }));

  const barsWithMatchesOnDate = extendedBarsWithMatches.filter((bar) =>
    bar.matches.some((match) => match.date === formattedSelectedDate)
  );

  function handleDeleteBarOrMatch(updatedBars) {
    setUpdatedBars([...updatedBars]);
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
  }

  return (
    <>
      <GlobalStyle />

      <Head>
        <title>MatchPal</title>
      </Head>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <Component
          {...pageProps}
          matches={matchesWithTeamNames}
          bars={updatedBars}
          barsInMatches={barsInMatches}
          onDeleteBarOrMatch={handleDeleteBarOrMatch}
          initialBars={bars}
          barsWithMatchesOnDate={barsWithMatchesOnDate}
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
          today={new Date()}
        />
      </LoadScript>
    </>
  );
}
