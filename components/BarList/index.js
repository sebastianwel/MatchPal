import styled from "styled-components";
import BarCard from "../BarCard";
import { CardLink } from "../CardLink";

export default function BarList({ extendedBarsWithMatches }) {
  return (
    <List>
      {extendedBarsWithMatches?.map((barWithMatch, index) => (
        <CardLink key={barWithMatch.id} href={`/bars/${barWithMatch.id}`}>
          <BarCard
            key={`${barWithMatch.id}-${index}`}
            barWithMatch={barWithMatch}
          />
        </CardLink>
      ))}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding-left: 0px;
  margin-bottom: 50px;
`;
