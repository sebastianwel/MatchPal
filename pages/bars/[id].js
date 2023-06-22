import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import styled from "styled-components";
import { Button } from "../../components/BackButton/BackButton";
import { Headline } from "../../components/Headline/Headline";
import MatchCard from "../../components/MatchCard";
import {CardLink} from "../../components/CardLink/index"

export default function BarDetails({bars, matches}){
const router = useRouter();
const { id } = router.query

//find current Bar by using the router-id
const currentBar = bars ? bars.find((bar) => (bar.id === parseInt(id))) : null

//create an array containing only the match-ids to search for the match-ids in the matches-array and filter those matches
const currentMatchIds = currentBar?.matches.map((match) => (match))
const currentMatches = matches ? matches.filter((match) => currentMatchIds?.includes(match.id)) : null

console.log(currentMatches)
 
return(
    <>
    <AppHeader/>
    <Button onClick={() => router.push("/bars")}>←</Button>
    <Headline>{currentBar?.name}</Headline>
    <SiteSection>Anstehende Spiele</SiteSection>
    <List>
        {currentMatches?.map((match) => (
            <CardLink key={match.id} href={`/matches/${match.id}`}>
            <MatchCard key={match.id}id={match.id} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} date={match.date} time={match.time} homeTeamColor={match.homeTeam.logoColor} awayTeamColor={match.awayTeam.logoColor} />
            </CardLink>
        ))}
    </List>


    <AppFooter/>
    </>
)

}

const SiteSection = styled.p`
margin: 10px;
margin-top: 30px;
`

const List = styled.ul`
list-style: none;
padding-left: 0px;
`
