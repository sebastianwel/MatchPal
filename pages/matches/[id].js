import { useRouter } from "next/router"
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/";
import AppFooter from "../../components/AppFooter/";
import SelectedMatch from "../../components/SelectedMatch";
import { useState, useEffect } from "react";
import MatchDetailsForm from "../../components/MatchDetailsForm";


export default function MatchDetails({matches, bars}){
const router = useRouter();
const {id} = router.query;

//use the current id of the router to find the fitting match
const currentMatch = matches.find((match) => (
    match.id === parseInt(id)
))

//filter the bars, which contain the id of the current match
const currentBars =(bars.filter((bar) => (bar.matches.includes(currentMatch?.id))))

const [updatedBars, setUpdatedBars] = useState(currentBars)

useEffect(() => {
    setUpdatedBars(bars.filter((bar) => bar.matches.includes(currentMatch?.id)));
  }, [bars, currentMatch]);


// create function to handle the submit event
function handleSubmit(event){
event.preventDefault();
const data = new FormData(event.target)
const formData = Object.fromEntries(data);

const selectedBar = bars.find((bar) => bar.id === parseInt(formData.newBarId))
const isBarAlreadyAdded = updatedBars.some((bar) => bar.id === selectedBar.id);

//check wheter the current list already contains the bar
if (selectedBar && !isBarAlreadyAdded) {
const updatedSelectedBar = {...selectedBar}
updatedSelectedBar.matches.push(parseInt(currentMatch.id))
const newUpdatedBars = [...currentBars, updatedSelectedBar]

setUpdatedBars(newUpdatedBars)}
}

    return(
        <>
        <AppHeader/>
        <Button onClick={() => router.push("/")}>←</Button>
        {currentMatch ? <SelectedMatch date={currentMatch.date} time={currentMatch.time} homeTeam={currentMatch.homeTeam.name} homeTeamLogoColor={currentMatch.homeTeam.logoColor} awayTeam={currentMatch.awayTeam.name} awayTeamLogoColor={currentMatch.awayTeam.logoColor}/> : <h2>loading</h2>}
        <StyledHeadline>Folgende Bars zeigen das Spiel:</StyledHeadline>
        <List>
            {updatedBars?.map((bar) => (
                <ListItem key={bar.id}>{bar.name}</ListItem>
            ))}
        </List>
        <h4>Du weißt wo es läuft?</h4>
        <MatchDetailsForm bars={bars} onSubmit={handleSubmit} currentMatch={currentMatch}/>
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