import { useRouter } from "next/router"
import { matches } from "../../lib/mock-data/matches";
import { teams } from "../../lib/mock-data/teams";
import styled from "styled-components";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";


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
        <div>
            <p style={{textAlign: "center"}}>{currentMatch.date}</p>
            <MatchOverview>
                <LogoAndTeam>
                <Logo style={{backgroundColor: currentMatch.homeTeam.logoColor}}/>
                <p>{currentMatch.homeTeam.name}</p>
                </LogoAndTeam>
                <p>—</p>
                <LogoAndTeam>
                <Logo style={{backgroundColor: currentMatch.awayTeam.logoColor}}/>
                <p>{currentMatch.awayTeam.name}</p>
                </LogoAndTeam>
            </MatchOverview>
            <p style={{textAlign: "center"}}>Das Spiel startet um {currentMatch.time}</p>
        </div>
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