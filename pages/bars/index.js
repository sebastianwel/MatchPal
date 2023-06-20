import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import BarList from "../../components/BarList";
import styled from "styled-components";


export default function Bars({matches, bars, barsInMatches}){

    return(
        <>
        <AppHeader/>
        <Headline>Bars Overview</Headline>
        <BarList matches={matches} bars={bars} barsInMatches={barsInMatches}/>
        <AppFooter/>
        </>
)   
}

const Headline = styled.h1`
margin-top: 55px;
`