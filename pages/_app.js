import GlobalStyle from "../styles";
import Head from "next/head";
import { matches } from "../lib/mock-data/matches";
import { teams } from "../lib/mock-data/teams";
import { bars } from "../lib/mock-data/bars";
import { barsInMatches } from "../lib/mock-data/barsInMatches";

export default function App({ Component, pageProps }) {

  const matchesWithTeamNames = matches.map((match) => (
      {...match, 
          homeTeam: {name: teams.find((team) => team.id === match.homeTeamId).name, 
          logoColor: teams.find((team) => team.id === match.homeTeamId).logoColor}, 
          awayTeam:{name: teams.find((team) => team.id === match.awayTeamId).name, 
          logoColor: teams.find((team) => team.id === match.awayTeamId).logoColor}}
  ))

  //extended the bars-array with the key "barShowsMatch", to make it usable for the bars-list
  const barShowsMatch = barsInMatches.some((bar) => bar.gameIds.length > 0)
  const extendedBars = bars.map((bar) => ({...bar, barShowsMatch}))

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component {...pageProps} matches={matchesWithTeamNames} bars={extendedBars} barsInMatches={barsInMatches} />
    </>
  );
}
