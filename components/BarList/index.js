import styled from "styled-components"
import BarCard from "../BarCard"
import { Logo } from "../MatchCard"

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
const ListItem = styled.li`
list-style: none;
display: flex;
flex-direction: column;
justify-content: space-around;
margin: 5px;
border: 1px solid;
border-radius: 10px;
padding-left: 10px;
`

const MatchPreviewSection = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
font-size: 10px;
gap: 30px;
`

const MatchPreview = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
gap: 10px;
font-size: 10px;
`
