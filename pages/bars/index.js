import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import BarList from "../../components/BarList";
import styled from "styled-components";
import DateFilter from "../../components/DateFilter";

export default function Bars({
  barsWithMatchesOnDate,
  selectedDate,
  handleDateSelect,
  today,
}) {
  return (
    <>
      <AppHeader />
      <DateFilter
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        today={today}
      />
      <Headline>Bars Overview</Headline>
      <BarList barsWithMatchesOnDate={barsWithMatchesOnDate} />
      <AppFooter />
    </>
  );
}

const Headline = styled.h1`
  margin-top: 55px;
`;
