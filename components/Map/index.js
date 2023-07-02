import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import styled from "styled-components";
import { MatchPreview } from "../BarCard";
import { Logo } from "../MatchCard";
import { useRouter } from "next/router";

const containerStyle = {
  marginTop: "47px",
  marginBottom: "47px",
  width: "100%",
  height: "590px",
};

const center = {
  lat: 53.551086,
  lng: 9.993682,
};

export function Map({ bars, extendedBarsWithMatches }) {
  const router = useRouter();

  const locations = bars.map((bar) => ({
    coordinates: bar.location,
    name: bar.name,
    showsMatch: bar.matches.length > 0 ? true : false,
  }));

  const [userLocation, setUserLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarkerDetails, setActiveMarkerDetails] = useState(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let script = document.querySelector(
      'script[src^="https://maps.googleapis.com/maps/api/js"]'
    );
    if (!script) {
      script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error retrieving user's location", error);
        }
      );
    }

    setActiveMarker(null);
    setShowInfoWindow(false);
  }, [router.asPath]);

  if (!loaded) {
    return null;
  }

  function handleMarkerClick(event, location) {
    setActiveMarker(location);
    setShowInfoWindow(true);
    setActiveMarkerDetails(
      extendedBarsWithMatches.find((bar) => bar.name === location.name)
    );
  }

  function handleMapClick() {
    setActiveMarker(null);
    setShowInfoWindow(false);
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={handleMapClick}
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
    >
      {userLocation && (
        <Marker
          position={{
            lat: userLocation.latitude,
            lng: userLocation.longitude,
          }}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}
      {locations.map((location, index) =>
        location.showsMatch ? (
          <Marker
            key={index}
            position={{
              lat: location.coordinates.latitude,
              lng: location.coordinates.longitude,
            }}
            title={location.name}
            onClick={(event) => handleMarkerClick(event, location)}
          />
        ) : null
      )}
      {activeMarker && showInfoWindow ? (
        <InfoWindow
          position={{
            lat: activeMarker.coordinates.latitude,
            lng: activeMarker.coordinates.longitude,
          }}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <InfoContent>
            <h3>{activeMarker.name}</h3>
            {activeMarkerDetails &&
              activeMarkerDetails.matches.map((match, index) => (
                <MatchPreview key={`${match.id}-${index}`}>
                  <Logo logoColor={match.homeTeam.logoColor} />
                  <p>-</p>
                  <Logo logoColor={match.awayTeam.logoColor} />
                </MatchPreview>
              ))}
          </InfoContent>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
}

export default React.memo(Map);

const InfoContent = styled.div`
  min-width: 100px;
`;
