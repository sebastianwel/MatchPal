import styled from "styled-components"
import BarCard from "../BarCard"

export default function BarList({matches, bars}){

const barsWithMatches = bars.filter((bar) => bar.matches.length > 0)
const matchesInBar = barsWithMatches.map((bar) => (
{...bar, 
matches: matches.filter((match) => bar.matches.includes(match.id)).map((team) => ({homeTeam: team.homeTeam, awayTeam: team.     awayTeam})) 
}))
    return(
        <BarsUl>
            {matchesInBar.map((barWithMatch) => (
                <BarCard key={barWithMatch.id} barWithMatch={barWithMatch}/>
            ))}
        </BarsUl>
    )
}

const BarsUl = styled.ul`
list-style: none;
padding-left: 0px;
margin-bottom: 50px;
`
