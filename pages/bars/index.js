import { matches } from "../../lib/mock-data/matches";
import { teams } from "../../lib/mock-data/teams";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";


export default function Bars(){
    const matchesWithTeamNames = matches.map((match) => (
        {...match, 
            homeTeam: {name: teams.find((team) => team.id === match.homeTeamId).name, 
            logoColor: teams.find((team) => team.id === match.homeTeamId).logoColor}, 
            awayTeam:{name: teams.find((team) => team.id === match.awayTeamId).name, 
            logoColor: teams.find((team) => team.id === match.awayTeamId).logoColor}}
    ))



    return(
        <>
        <AppHeader/>
        <h1>Bars Overview</h1>
        <AppFooter/>
        </>
)   

}