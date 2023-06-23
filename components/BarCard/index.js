import styled from "styled-components";
import { Logo } from "../MatchCard";

export default function BarCard({ barWithMatch }) {
  return (
    <ListItem>
      <Flex>
        <div>
          <p>{barWithMatch.name}</p>
          <MatchPreviewSection>
            {barWithMatch.matches.map((match, index) => (
              <MatchPreview key={`${match.id}-${index}`}>
                <Logo logoColor={match.homeTeam.logoColor} />
                <p>-</p>
                <Logo logoColor={match.awayTeam.logoColor} />
              </MatchPreview>
            ))}
          </MatchPreviewSection>
        </div>
        <LinkIcon>{">"}</LinkIcon>
      </Flex>
    </ListItem>
  );
}

const ListItem = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 5px;
  border: 1px solid;
  border-radius: 10px;
  padding-left: 10px;
`;

const MatchPreviewSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 10px;
  gap: 30px;
`;

const MatchPreview = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  font-size: 10px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const LinkIcon = styled.p`
  margin-right: 22px;
`;
