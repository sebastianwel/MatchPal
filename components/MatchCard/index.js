import styled from "styled-components";
import { Logo } from "../Logo";

export default function MatchCard({
  id,
  homeTeam,
  awayTeam,
  date,
  time,
  homeTeamColor,
  awayTeamColor,
  onDeleteMatch,
  isDeletable,
}) {
  return (
    <ListItem key={id}>
      <div>
        <TeamContainer>
          <Logo logoColor={homeTeamColor} />
          <p>{homeTeam}</p>
        </TeamContainer>
        <TeamContainer>
          <Logo logoColor={awayTeamColor} />
          <p>{awayTeam}</p>
        </TeamContainer>
      </div>
      <ArrowAndTime>
        <TimeAndDateContainer>
          <TimeOrDate>{date}</TimeOrDate>
          <TimeOrDate>{time}</TimeOrDate>
        </TimeAndDateContainer>
      </ArrowAndTime>
    </ListItem>
  );
}

const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 93%;
  margin: auto;
  border-radius: 10px;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
`;

const TeamContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowAndTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const TimeOrDate = styled.p`
  margin: 2px;
`;

const TimeAndDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`;
