import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MatchDetailsForm from "../MatchDetailsForm";
import { Paragraph } from "../Paragraph";

export default function BarSearchBox({
  places,
  setPlaces,
  handleSubmit,
  currentMatch,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [radius, setRadius] = useState(1000);
  const [showRange, setShowRange] = useState(false);
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          searchNearbyBars(latitude, longitude);
        },
        (error) => {
          console.error("Error retrieving user's location", error);
        }
      );
    }

    const loadingTimeout = setTimeout(() => {
      setShowRange(true);
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  console.log(radius);
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
      radius: radius,
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

  function handleRadiusIncrease(value) {
    setRadius(value);
    searchNearbyBars(userLocation.latitude, userLocation.longitude);
  }
  return (
    <>
      {showRange && isLoading && suggestedPlaces.length === 0 ? (
        <>
          <Paragraph>
            Leider wurden keine Bars in deiner Nähe gefunden, erhöhe bitte den
            Suchradius:
          </Paragraph>
          <RadiusChanger>
            <label htmlFor="radius"></label>
            <input
              type="range"
              id="radius"
              value={radius}
              min={0}
              max={50000}
              step={1000}
              onChange={(event) => handleRadiusIncrease(event.target.value)}
            />
            <Paragraph>{radius}m</Paragraph>
          </RadiusChanger>
        </>
      ) : null}
      {isLoading && !showRange ? (
        <Paragraph>Vorschläge werden geladen...</Paragraph>
      ) : null}

      {!isLoading ? (
        <MatchDetailsForm
          bars={suggestedPlaces}
          onSubmit={handleSubmit}
          currentMatch={currentMatch}
          places={places}
          onSelectSuggestedPlace={handleSelectSuggestedPlace}
          setPlaces={setPlaces}
        />
      ) : null}
    </>
  );
}

const RadiusChanger = styled.div`
  display: flex;
  flex-direction: column;
`;
