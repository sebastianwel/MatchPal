import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import BarList from "../../components/BarList";
import styled from "styled-components";

export default function Bars({ extendedBarsWithMatches }) {
  return (
    <>
      <AppHeader />
      <Headline>Bars Overview</Headline>
      <BarList extendedBarsWithMatches={extendedBarsWithMatches} />
      <AppFooter />
    </>
  );
}

const Headline = styled.h1`
  margin-top: 55px;
`;
