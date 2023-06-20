import { useRouter } from "next/router"
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import SelectedMatch from "../../components/SelectedMatch";


export default function MatchDetails({matches, bars, barsInMatches}){
const router = useRouter();
const {id} = router.query;

//use the current id of the router to find the fitting match
const currentMatch = matches.find((match) => (
    match.id === parseInt(id)
))

//filter the bars, which contain the id of the current match
const currentBars = currentMatch ? (bars.filter((bar) => (bar.matches.includes(currentMatch.id)))) : null

    return(
        <>
        <AppHeader/>
        <Button onClick={() => router.push("/")}>←</Button>
        {currentMatch ? <SelectedMatch date={currentMatch.date} time={currentMatch.time} homeTeam={currentMatch.homeTeam.name} homeTeamLogoColor={currentMatch.homeTeam.logoColor} awayTeam={currentMatch.awayTeam.name} awayTeamLogoColor={currentMatch.awayTeam.logoColor}/> : <h2>loading</h2>}
        <StyledHeadline>Folgende Bars zeigen das Spiel:</StyledHeadline>
        <List>
            {currentBars?.map((bar) => (
                <ListItem key={bar.id}>{bar.name}</ListItem>
            ))}
        </List>

        <AppFooter/>
        </>
    )
}

const Button = styled.button`
margin-top: 55px;
font-size: 20px;
background: none;
border: none;
`

const List = styled.ul`
padding-left: 0px;
`

const ListItem = styled.li`
list-style: none;
border: 1px solid;
border-radius: 10px;
margin: 10px;
padding: 10px;
`

const StyledHeadline = styled.h3`
margin-left: 10px;
`