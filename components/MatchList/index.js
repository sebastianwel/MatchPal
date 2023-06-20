import styled from "styled-components";
import MatchCard from "../MatchCard";
import Link from "next/link";


export default function MatchList({matches}){   
    return(
        <>
        <h1 style={{marginTop: 55}}>Match Overview</h1>
        <MatchUl style={{marginBottom: 55}}>
        {matches.map(({id, homeTeam, awayTeam, date, time}) => (
            <>
            <Link style={{textDecoration: "none", color: "#000"}} href={`/matches/${id}`}>
            <MatchCard key={id} homeTeam={homeTeam.name} awayTeam={awayTeam.name} date={date} time={time} homeTeamColor={homeTeam.logoColor} awayTeamColor={awayTeam.logoColor}/>
            </Link>
            </>
        ))}
        </MatchUl>
        </>
    )
}

const MatchUl = styled.ul`
padding: 0;
`