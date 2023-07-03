import styled from "styled-components";
import BarCard from "../BarCard";
import { CardLink } from "../CardLink";

export default function BarList({ barsWithMatchesOnDate }) {
  return (
    <List>
      {barsWithMatchesOnDate.length > 0 ? (
        barsWithMatchesOnDate?.map((barWithMatch, index) => (
          <CardLink key={barWithMatch.id} href={`/bars/${barWithMatch.id}`}>
            <BarCard key={barWithMatch.id} barWithMatch={barWithMatch} />
          </CardLink>
        ))
      ) : (
        <p>Aktuell zeigen keine Bars Spiele.</p>
      )}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 50px;
`;
