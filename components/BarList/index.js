import styled from "styled-components";
import BarCard from "../BarCard";
import { CardLink } from "../CardLink";

export default function BarList({ barsWithMatchesOnDate }) {
  return (
    <List>
      {barsWithMatchesOnDate?.map((barWithMatch, index) => (
        <CardLink key={barWithMatch.id} href={`/bars/${barWithMatch.id}`}>
          <BarCard key={barWithMatch.id} barWithMatch={barWithMatch} />
        </CardLink>
      ))}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 50px;
`;
