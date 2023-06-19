import styled from "styled-components"


export default function SelectedMatch({date, time, homeTeam, homeTeamLogoColor, awayTeam, awayTeamLogoColor}){
return(
    <div>
    <p style={{textAlign: "center"}}>{date}</p>
    <MatchOverview>
        <LogoAndTeam>
        <Logo style={{backgroundColor: homeTeamLogoColor}}/>
        <p>{homeTeam}</p>
        </LogoAndTeam>
        <p>—</p>
        <LogoAndTeam>
        <Logo style={{backgroundColor:awayTeamLogoColor}}/>
        <p>{awayTeam}</p>
        </LogoAndTeam>
    </MatchOverview>
    <p style={{textAlign: "center"}}>Das Spiel startet um {time}</p>
</div>
)

}

const MatchOverview = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`

const LogoAndTeam = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Logo = styled.div`
height: 30px;
width: 30px;
border-radius: 100%;
`