import styled from "styled-components";
import { MatchPreview } from "../MatchPreview/MatchPreview";
import TeamLogo from "../Logo";

export default function BarCard({ barWithMatch }) {
  return (
    <ListItem>
      <Flex>
        <div>
          <p>{barWithMatch.name}</p>
          <MatchPreviewSection>
            {barWithMatch.matches.map((match, index) => (
              <MatchPreview key={`${match.id}-${index}`}>
                {/* <Logo logoColor={match.homeTeam.logoColor} /> */}
                <TeamLogo
                  logoUrl={match.homeTeam.logoURL}
                  teamName={match.homeTeam}
                  width={20}
                  height={20}
                />
                <p>-</p>
                <TeamLogo
                  logoUrl={match.awayTeam.logoURL}
                  teamName={match.awayTeam}
                  width={20}
                  height={20}
                />
                {/* <Logo logoColor={match.awayTeam.logoColor} /> */}
              </MatchPreview>
            ))}
          </MatchPreviewSection>
        </div>
      </Flex>
    </ListItem>
  );
}

const ListItem = styled.li`
  list-style: none;
  display: flex;
  width: 93%;
  margin-top: 10px;
  margin-left: 13px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 5px 20px 5px 20px;
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
`;

const MatchPreviewSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 10px;
  gap: 30px;
  overflow: none;
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
