import styled from "styled-components";

export default function MatchDetailsForm({
  bars,
  currentMatch,
  places,
  onSelectSuggestedPlace,
  setPlaces,
}) {
  const barsToAdd = bars.filter((bar) => {
    return !places.some(
      (place) =>
        place.matches?.includes(currentMatch?.id) &&
        place.place_id === bar.place_id
    );
  });

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    const selectedBarId = formData.newBarId;

    const selectedBar = bars.find((bar) => bar.place_id === selectedBarId);

    if (selectedBar) {
      const existingPlace = places.find(
        (place) =>
          place.place_id === selectedBar.place_id &&
          place.matches.includes(currentMatch.id)
      );

      if (existingPlace) {
        // Bar already added to the current match, no need to add again
        return;
      }

      const updatedPlaces = places.map((place) => {
        if (place.place_id === selectedBar.place_id) {
          const updatedMatches = [...place.matches, currentMatch.id];
          return {
            ...place,
            matches: updatedMatches,
          };
        }
        return place;
      });

      onSelectSuggestedPlace(selectedBar);
      setPlaces(updatedPlaces);
    }
  }

  return (
    <Form onSubmit={handleSubmit} aria-labelledby="match-details-form">
      <label htmlFor="barSelector">Bar</label>
      <select id="barSelector" name="newBarId">
        <option>--Bar auswählen--</option>
        {barsToAdd.map((bar) => (
          <option key={bar.place_id} value={bar.place_id}>
            {bar.name}
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
