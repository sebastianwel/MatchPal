import styled from "styled-components";
import BarCard from "../BarCard";
import { CardLink } from "../CardLink";

export default function BarList({
  barsWithMatchesOnDate,
  selectedDate,
  today,
}) {
  return (
    <List>
      {barsWithMatchesOnDate.length > 0 ? (
        barsWithMatchesOnDate?.map((barWithMatch, index) => (
          <CardLink
            key={barWithMatch.id}
            href={`/bars/${barWithMatch.place_id}`}
          >
            <BarCard key={barWithMatch.place_id} barWithMatch={barWithMatch} />
          </CardLink>
        ))
      ) : selectedDate.getDate() < today.getDate() ? (
        <p>
          Am {selectedDate.getDate()}.{selectedDate.getMonth() + 1} hat keine
          Bar ein Spiel gezeigt.
        </p>
      ) : (
        <p>
          {today.getDate() === selectedDate.getDate()
            ? "Heute"
            : `Am ${selectedDate.getDate()}.${
                selectedDate.getMonth() + 1
              }`}{" "}
          werden keine Spiele gezeigt.
        </p>
      )}
    </List>
  );
}

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 50px;
`;
