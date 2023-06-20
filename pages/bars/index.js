import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import BarList from "../../components/BarList";


export default function Bars({matches}){

    return(
        <>
        <AppHeader/>
        <h1>Bars Overview</h1>
        <BarList matches={matches}/>
        <AppFooter/>
        </>
)   

}