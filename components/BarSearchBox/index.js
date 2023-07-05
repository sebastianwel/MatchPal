import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function BarSearchBox({ places, setPlaces }) {
  const router = useRouter();
  const { id } = router.query;

  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        searchNearbyBars(latitude, longitude);
      });
    }
  }, []);

  function searchNearbyBars(latitude, longitude) {
    if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places ||
      !window.google.maps.places.PlacesService
    ) {
      console.error("Google Maps PlacesService is not available");
      return;
    }

    const searchRequest = {
      location: {
        lat: latitude,
        lng: longitude,
      },
      radius: 1000,
      type: ["bar", "establishment"],
      keyword: ["bar"],
    };

    const placeService = new window.google.maps.places.PlacesService(
      new window.google.maps.Map(document.createElement("div"))
    );

    placeService.nearbySearch(searchRequest, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const limitSuggestedPlaces = results.slice(0, 200);
        setSuggestedPlaces(limitSuggestedPlaces);
        setIsLoading(false);
      } else {
        console.error("Request failed");
      }
    });
  }

  //since I need specific infos from the bars, I needed to implement this
  function handleSelectSuggestedPlace(suggestedPlace) {
    const existingPlace = places.find(
      (place) => place.place_id === suggestedPlace.place_id
    );

    if (existingPlace) {
      if (!existingPlace.matches.includes(id)) {
        existingPlace.matches = [...existingPlace.matches, parseInt(id)];
      }
    } else {
      // Perform a Detail Search for the selected suggested place
      const request = {
        placeId: suggestedPlace.place_id,
        fields: [
          "name",
          "formatted_address",
          "formatted_phone_number",
          "website",
          "rating",
          "reviews",
          "photos",
          "opening_hours",
          "geometry",
        ],
      };

      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails(request, (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newPlace = {
            ...suggestedPlace,
            matches: [parseInt(id)],
            name: result.name,
            formatted_address: result.formatted_address,
            formatted_phone_number: result.formatted_phone_number,
            website: result.website,
            rating: result.rating,
            reviews: result.reviews,
            photos: result.photos,
            opening_hours: result.opening_hours,
            geometry: {
              longitude: result.geometry.location.lng(),
              latitude: result.geometry.location.lat(),
            },
          };

          setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
        } else {
          console.error("Detail Search failed");
        }
      });
    }
  }

  return (
    <>
      <div>
        <label htmlFor="barSearch">
          Eine Bar in deiner nähe zeigt das Spiel?
        </label>
      </div>
      <DropdownContainer>
        <DropdownButton id="barSearch" onClick={handleToggleOpen}>
          Wähle die Bar
        </DropdownButton>
        {isOpen ? (
          <Dropdown>
            {isLoading ? <p>Bars werden geladen </p> : null}
            {suggestedPlaces.map((suggestedPlace) => (
              <p
                key={suggestedPlace.place_id}
                onClick={() => handleSelectSuggestedPlace(suggestedPlace)}
              >
                {suggestedPlace.name}
              </p>
            ))}
          </Dropdown>
        ) : null}
      </DropdownContainer>
    </>
  );
}

const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 200px;
  border-radius: 5px;
  background-color: #efefef;
  border: 0.5px solid;
  font-size: small;
`;

const Dropdown = styled.div`
  max-height: 150px;
  overflow-y: auto;
  background-color: #efefef;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  height: 20px;
`;
