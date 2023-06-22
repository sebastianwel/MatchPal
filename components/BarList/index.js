import styled from "styled-components"
import BarCard from "../BarCard"
import { CardLink } from "../CardLink"

export default function BarList({matches, bars}){

const barsWithMatches = bars.filter((bar) => bar.matches.length > 0)
const matchesInBar = barsWithMatches.map((bar) => (
{...bar, 
matches: matches.filter((match) => bar.matches.includes(match.id)).map((team) => ({homeTeam: team.homeTeam, awayTeam: team.     awayTeam})) 
}))

    return(
        <List>
            {matchesInBar.map((barWithMatch, index) => (
                <CardLink key={barWithMatch.id} href={`/bars/${barWithMatch.id}`}>
                <BarCard key={`${barWithMatch.id}-${index}`} barWithMatch={barWithMatch}/>
                </CardLink>
            ))}
        </List>
    )
}

const List = styled.ul`
list-style: none;
padding-left: 0px;
margin-bottom: 50px;
`
