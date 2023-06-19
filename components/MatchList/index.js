import styled from "styled-components";
import { matches } from "../../lib/mock-data/matches";
import { teams } from "../../lib/mock-data/teams";
import MatchCard from "../MatchCard";


export default function MatchList(){   

//used the matches mock-data and the teams mock-data to create a new array combining these two data-arrays to include the team names in the matches
const matchesWithTeamNames = matches.map((match) => (
    {...match, homeTeam: {name: teams.find((team) => team.id === match.homeTeamId).name, logoColor: teams.find((team) => team.id === match.homeTeamId).logoColor}, awayTeam:{name: teams.find((team) => team.id === match.awayTeamId).name, logoColor: teams.find((team) => team.id === match.awayTeamId).logoColor}}
))

    return(
        <>
        <h1>Match Overview</h1>
        <MatchUl>
        {matchesWithTeamNames.map(({id, homeTeam, awayTeam, date, time}) => (
            <MatchCard key={id} homeTeam={homeTeam.name} awayTeam={awayTeam.name} date={date} time={time} homeTeamColor={homeTeam.logoColor} awayTeamColor={awayTeam.logoColor}/>
        ))}
        </MatchUl>
        </>

    )
}

const MatchUl = styled.ul`
padding: 0;
`