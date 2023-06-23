import styled from "styled-components";

export default function BarDetailsForm({ onSubmit, matches, bar }) {
  const matchesToAdd = matches?.filter(
    (match) => !bar?.matches.includes(match.id)
  );

  return (
    <Form onSubmit={onSubmit} aria-labelledby="bar-details-form">
      <label htmlFor="matchSelector">Match</label>
      <select id="matchSelector" name="newMatchId">
        <option>--Match auswählen--</option>
        {matchesToAdd.map((match) => (
          <option key={match.id} value={match.id}>
            {match.homeTeam.name}-{match.awayTeam.name}
          </option>
        ))}
      </select>
      <button type="submit">Hinzufügen</button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-bottom: 55px;
  gap: 10px;
`;
