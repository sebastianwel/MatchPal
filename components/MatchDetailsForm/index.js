import styled from "styled-components"

export default function MatchDetailsForm({bars, onSubmit, currentMatch}){

const barsToAdd = bars.filter((bar) => (
        !bar.matches.includes(currentMatch?.id)
    ))

    return(
        <Form onSubmit={onSubmit} aria-labelledby="match-details-form">
        <label htmlFor="barSelector">Bar</label>
        <select id="barSelector" name="newBarId">
            <option>--Bar auswählen--</option>
            {barsToAdd.map((bar) => (
                <option key={bar.id} value={bar.id}>{bar.name}</option>
            ))}
        </select>
        <button type="submit">Hinzufügen</button>
        </Form>
    )
}

const Form = styled.form`
display: flex;
flex-direction: column;
margin: 10px;
gap: 10px;
`