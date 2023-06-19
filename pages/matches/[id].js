import { useRouter } from "next/router"
import { matches } from "../../lib/mock-data/matches";
import { teams } from "../../lib/mock-data/teams";
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import SelectedMatch from "../../components/SelectedMatch";


export default function MatchDetails(){
const router = useRouter();
const {id} = router.query;

const matchesWithTeamNames = matches.map((match) => (
    {...match, homeTeam: {name: teams.find((team) => team.id === match.homeTeamId).name, logoColor: teams.find((team) => team.id === match.homeTeamId).logoColor}, awayTeam:{name: teams.find((team) => team.id === match.awayTeamId).name, logoColor: teams.find((team) => team.id === match.awayTeamId).logoColor}}
))
const currentMatch = matchesWithTeamNames.find((match) => (
    match.id === parseInt(id)
))

console.log(currentMatch)



    return(
        <>
        <AppHeader/>
        <button style={{marginTop: 55}}>ᐸ</button>
        <SelectedMatch date={currentMatch.date} time={currentMatch.time} homeTeam={currentMatch.homeTeam.name} homeTeamLogoColor={currentMatch.homeTeam.logoColor} awayTeam={currentMatch.awayTeam.name} awayTeamLogoColor={currentMatch.awayTeam.logoColor}/>
        <AppFooter/>
        </>
    )
}

const MatchOverview = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

const LogoAndTeam = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Logo = styled.div`
height: 30px;
width: 30px;
border-radius: 100%;
`