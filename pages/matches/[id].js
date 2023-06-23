import { useRouter } from "next/router"
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/";
import AppFooter from "../../components/AppFooter/";
import SelectedMatch from "../../components/SelectedMatch";
import { useState, useEffect } from "react";
import MatchDetailsForm from "../../components/MatchDetailsForm";
import { Button } from "../../components/BackButton/BackButton";
import { Headline } from "../../components/Headline/Headline";
import { CardLink } from "../../components/CardLink";


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
        <Headline>Folgende Bars zeigen das Spiel:</Headline>
        <List>
            {updatedBars?.map((bar) => (
                <CardLink  href={`/bars/${bar.id}`} key={bar.id}>
                <ListItem key={bar.id}>{bar.name} <p>{'>'}</p></ListItem>
                </CardLink>
            ))}
        </List>
        <h4 id="match-details-form">Du weißt wo es läuft?</h4>
        <MatchDetailsForm bars={bars} onSubmit={handleSubmit} currentMatch={currentMatch}/>
        <AppFooter/>
        </>
    )
}

const List = styled.ul`
padding-left: 0px;
`

const ListItem = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
list-style: none;
border: 1px solid;
border-radius: 10px;
margin: 10px;
margin-right: 10px;
padding: 10px;
`

const CardContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`