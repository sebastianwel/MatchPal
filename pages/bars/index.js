import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import BarList from "../../components/BarList";
import styled from "styled-components";

export default function Bars({ matches, bars, barsInMatches }) {
  console.log("bars", bars);
  return (
    <>
      <AppHeader />
      <Headline>Bars Overview</Headline>
      <BarList matches={matches} bars={bars} barsInMatches={barsInMatches} />
      <AppFooter />
    </>
  );
}

const Headline = styled.h1`
  margin-top: 55px;
`;
