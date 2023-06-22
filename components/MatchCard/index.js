import styled from "styled-components";


export default function MatchCard({id, homeTeam, awayTeam, date, time, homeTeamColor, awayTeamColor}){
return(
    <ListItem key={id}>
        <div>
            <TeamContainer><Logo logoColor={homeTeamColor}/><p>{homeTeam}</p></TeamContainer>
            <TeamContainer><Logo logoColor={awayTeamColor}/><p>{awayTeam}</p></TeamContainer>
        </div>
        <ArrowAndTime>
        <TimeAndDateContainer>
            <p style={{marginBottom: 0}}>{date}</p>
            <p style={{marginTop: 0}}>{time}</p>
        </TimeAndDateContainer>
        <p>{'>'}</p>
        </ArrowAndTime>
    </ListItem>
)

}

const ListItem = styled.li`
list-style: none;
display: flex;
justify-content: space-around;
margin: 5px;
border: 1px solid;
border-radius: 10px;
`

const TeamContainer = styled.div`
display: flex;
align-items: center;
`

const ArrowAndTime = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 15px;
`

const TimeAndDateContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
align-self: center;
`

export const Logo = styled.div`
width: 15px;
height: 15px;
margin-right: 10px;
border-radius: 100%;
margin: 0px;
background-color: ${({ logoColor }) => logoColor};
`