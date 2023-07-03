import styled from "styled-components";
import MatchCard from "../MatchCard";
import Link from "next/link";

export default function MatchList({ matches, selectedDate, today }) {
  return (
    <>
      <h1 style={{ marginTop: 55 }}>Match Overview</h1>
      <MatchUl style={{ marginBottom: 55 }}>
        {matches.length > 0 ? (
          matches.map(({ id, homeTeam, awayTeam, date, time }, index) => (
            <Link
              key={`${id}-${index}`}
              style={{ textDecoration: "none", color: "#000" }}
              href={`/matches/${id}`}
            >
              <MatchCard
                homeTeam={homeTeam.name}
                awayTeam={awayTeam.name}
                date={date}
                time={time}
                homeTeamColor={homeTeam.logoColor}
                awayTeamColor={awayTeam.logoColor}
              />
            </Link>
          ))
        ) : selectedDate.getDate() === today.getDate() ? (
          <p>Heute stehen leider keine Spiele an.</p>
        ) : (
          <p>
            Am {selectedDate.getDate()}.{selectedDate.getMonth() + 1} stehen
            leider keine Spiele an.
          </p>
        )}
      </MatchUl>
    </>
  );
}

const MatchUl = styled.ul`
  padding: 0;
`;
