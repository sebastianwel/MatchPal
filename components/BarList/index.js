export default function BarList({matches, bars, barsInMatches}){

    console.log("test:",barsInMatches)
    const barsShowingMatches = bars.map((bar) => (
        {...bar, showsMatch: barsInMatches.map((barInMatch) => (barInMatch.gameIds.length)) > 0 ? true : false}
    ))

    console.log(barsShowingMatches)

    
    return(
        <ul>
            <li>test</li>
        </ul>
    )
}