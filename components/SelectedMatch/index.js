import styled from "styled-components";
import { Button } from "../BackButton/BackButton";
import { useRouter } from "next/router";
import TeamLogo from "../Logo";

export default function SelectedMatch({
  date,
  time,
  homeTeam,
  homeTeamLogoColor,
  awayTeam,
  awayTeamLogoColor,
  homeTeamLogoURL,
  awayTeamLogoURL,
}) {
  const router = useRouter();
  return (
    <SelectedMatchContainer>
      <Button onClick={() => router.push("/")}>←</Button>
      <StyledP>{date}</StyledP>
      <MatchOverview>
        <LogoAndTeam>
          {/* <Logo style={{ backgroundColor: homeTeamLogoColor }} /> */}
          <TeamLogo
            logoUrl={homeTeamLogoURL}
            teamName={homeTeam}
            width={35}
            height={35}
          />
          <p>{homeTeam}</p>
        </LogoAndTeam>
        <p>—</p>
        <LogoAndTeam>
          {/* <Logo style={{ backgroundColor: awayTeamLogoColor }} /> */}
          <TeamLogo
            logoUrl={awayTeamLogoURL}
            teamName={awayTeam}
            width={35}
            height={35}
          />
          <p>{awayTeam}</p>
        </LogoAndTeam>
      </MatchOverview>
      <StyledP>Das Spiel startet um {time}</StyledP>
    </SelectedMatchContainer>
  );
}

const SelectedMatchContainer = styled.div`
  margin: 60px 10px 0px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 5px;
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
`;

const MatchOverview = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoAndTeam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
`;

const StyledP = styled.p`
  text-align: center;
  font-weight: 600;
`;
