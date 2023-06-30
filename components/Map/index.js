import React from "react";
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import { useState } from "react";
import AppHeader from "../AppHeader";
import AppFooter from "../AppFooter";
import { useEffect } from "react";
import styled from "styled-components";
import { MatchPreview } from "../BarCard";
import { Logo } from "../MatchCard";

export function MapContainer({ google, bars, extendedBarsWithMatches }) {
  const locations = bars.map((bar) => ({
    coordinates: bar.location,
    name: bar.name,
    showsMatch: bar.matches.length > 0 ? true : false,
  }));

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("Error retrieving users location", error);
        }
      );
  }, []);

  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarkerDetails, setActiveMarkerDetails] = useState(null);

  function handleMarkerClick(props, marker) {
    setActiveMarker(marker);
    setShowInfoWindow(true);
    setActiveMarkerDetails(
      extendedBarsWithMatches.find((bar) => bar.name === marker?.title)
    );
  }

  function handleMapClick() {
    setActiveMarker(null);
    setShowInfoWindow(false);
  }

  const mapStyles = {
    marginTop: "47px",
    marginBottom: "47px",
    width: "100%",
    height: "85%",
  };
  return (
    <>
      <AppHeader />
      <Map
        google={google}
        zoom={12}
        initialCenter={{ lat: 53.551086, lng: 9.993682 }}
        style={mapStyles}
        onClick={handleMapClick}
      >
        {userLocation ? (
          <Marker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        ) : null}
        {locations.map((location, index) =>
          location.showsMatch ? (
            <Marker
              key={index}
              position={{
                lat: location.coordinates.latitude,
                lng: location.coordinates.longitude,
              }}
              title={location.name}
              onClick={handleMarkerClick}
            />
          ) : null
        )}
        <InfoWindow marker={activeMarker} visible={showInfoWindow}>
          <InfoContent>
            <h3>{activeMarker ? activeMarker.title : null}</h3>
            {activeMarkerDetails
              ? activeMarkerDetails.matches.map((match, index) => (
                  <MatchPreview key={`${match.id}-${index}`}>
                    <Logo logoColor={match.homeTeam.logoColor} />
                    <p>-</p>
                    <Logo logoColor={match.awayTeam.logoColor} />
                  </MatchPreview>
                ))
              : null}
          </InfoContent>
        </InfoWindow>
      </Map>
      <AppFooter />
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(React.memo(MapContainer));

const InfoContent = styled.div`
  min-width: 100px;
`;
