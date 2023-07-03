import GlobalStyle from "../styles";
import Head from "next/head";
import { matches } from "../lib/mock-data/matches";
import { teams } from "../lib/mock-data/teams";
import { bars } from "../lib/mock-data/bars";
import { barsInMatches } from "../lib/mock-data/barsInMatches";
import { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";

export default function App({ Component, pageProps }) {
  const matchesWithTeamNames = matches.map((match) => ({
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

  //extended the bars-array with the key "barShowsMatch", to make it usable for the bars-list
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

  function handleDeleteBarOrMatch(updatedBars) {
    setUpdatedBars([...updatedBars]);
  }

  //defined the extendedBarsWithMatches here to pass it down as props and also use it in the map-page
  const barsWithMatches = updatedBars.filter((bar) => bar.matches.length > 0);
  const extendedBarsWithMatches = barsWithMatches.map((bar) => ({
    ...bar,
    matches: matchesWithTeamNames
      .filter((match) => bar.matches.includes(match.id))
      .map((team) => ({ homeTeam: team.homeTeam, awayTeam: team.awayTeam })),
  }));

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
          extendedBarsWithMatches={extendedBarsWithMatches}
        />
      </LoadScript>
    </>
  );
}
