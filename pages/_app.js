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



  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component {...pageProps} matches={matchesWithTeamNames} bars={bars} barsInMatches={barsInMatches} />
    </>
  );
}
