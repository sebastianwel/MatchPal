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
      //check wheter the place was already added
      const existingPlaceIds = prevPlaces.map((place) => place.place_id);
      const newPlaceId = newPlaces.map((place) => place.place_id);

      const newPlaceNotIncluded = newPlaces.filter(
        (place) => !existingPlaceIds.includes(place.place_id)
      );

      return [...prevPlaces, ...newPlaceNotIncluded];
    });
  }

  console.log("places:", places);

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
