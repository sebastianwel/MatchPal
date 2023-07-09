import styled from "styled-components";
import { Paragraph } from "../Paragraph";
import { SelectBox } from "../SelectBox";
import { SubmitButton } from "../SubmitButton";

export default function BarDetailsForm({ onSubmit, matches, bar }) {
  const matchesToAdd = matches?.filter(
    (match) => !bar?.matches?.includes(match.id)
  );
  return (
    <>
      {matchesToAdd.length > 0 ? (
        <Form onSubmit={onSubmit} aria-labelledby="bar-details-form">
          <label htmlFor="matchSelector">Match</label>
          <SelectBox id="matchSelector" name="newMatchId">
            <option>--Match auswählen--</option>
            {matchesToAdd.map((match) => (
              <option key={match.id} value={match.id}>
                {match.homeTeam.name}-{match.awayTeam.name}
              </option>
            ))}
          </SelectBox>
          <SubmitButton type="submit">Hinzufügen</SubmitButton>
        </Form>
      ) : (
        <Paragraph>Heute stehen Leider keine weiteren Spiele an.</Paragraph>
      )}
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-bottom: 65px;
  gap: 10px;
`;
