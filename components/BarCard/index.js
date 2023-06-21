import styled from "styled-components";
import { Logo } from "../MatchCard";

export default function BarCard({barWithMatch}){
    return(
        <ListItem key={barWithMatch.id}>
        <p>{barWithMatch.name}</p>
        <MatchPreviewSection>
            {barWithMatch.matches.map((match) => (
            <MatchPreview key={barWithMatch.id}>
                <Logo key={match.homeTeam.name} style={{ backgroundColor: match.homeTeam.logoColor }} />
                <p>-</p>
                <Logo key={match.awayTeam.name} style={{ backgroundColor: match.awayTeam.logoColor }} />
            </MatchPreview>
            ))}
        </MatchPreviewSection>
    </ListItem>
    )
}

const BarsUl = styled.ul`
list-style: none;
padding-left: 0px;
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