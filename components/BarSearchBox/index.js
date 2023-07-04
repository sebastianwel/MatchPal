import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { matches } from "../../lib/mock-data/matches";

export default function BarSearchBox({ places, setPlaces }) {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  const searchBoxRef = useRef(null);

  function handlePlaceInput() {
    const newPlaces = searchBoxRef.current.getPlaces();
    setPlaces((prevPlaces) => {
      const updatedPlaces = [...prevPlaces];

      newPlaces.forEach((newPlace) => {
        const existingPlace = updatedPlaces.find(
          (place) => place.place_id === newPlace.place_id
        );

        if (existingPlace) {
          // Bar already exists
          if (!existingPlace.matches.includes(id)) {
            // Update the matches array only if the match ID is not already present
            existingPlace.matches = [...existingPlace.matches, parseInt(id)];
          }
        } else {
          // New Bar, add it with the match ID
          updatedPlaces.push({ ...newPlace, matches: [parseInt(id)] });
        }
      });

      return updatedPlaces;
    });
  }

  return (
    <div>
      <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)}>
        <input type="text" placeholder="Search for bars" />
      </StandaloneSearchBox>
      <button type="button" onClick={handlePlaceInput}>
        test
      </button>
    </div>
  );
}
