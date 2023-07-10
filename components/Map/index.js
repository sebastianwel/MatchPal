import React, { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import styled from "styled-components";
import { MatchPreview } from "../MatchPreview/MatchPreview";
import { useRouter } from "next/router";
import Link from "next/link";
import TeamLogo from "../Logo";

const containerStyle = {
  marginTop: "47px",
  marginBottom: "47px",
  width: "100%",
  height: "591px",
};

export function Map({ barsWithMatchesOnDate }) {
  const router = useRouter();

  const locations = barsWithMatchesOnDate.map((bar) => ({
    id: bar.place_id,
    coordinates: {
      longitude: bar.geometry.longitude,
      latitude: bar.geometry.latitude,
    },
    name: bar.name,
    showsMatch: bar.matches.length > 0 ? true : false,
  }));

  const [userLocation, setUserLocation] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarkerDetails, setActiveMarkerDetails] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  function handleMarkerClick(location) {
    setActiveMarker(location);
    setShowInfoWindow(true);

    const markerDetails = barsWithMatchesOnDate.find(
      (bar) => bar.name === location.name
    );
    setActiveMarkerDetails(markerDetails);
  }

  function handleMapClick() {
    setActiveMarker(null);
    setShowInfoWindow(false);
  }

  const center = userLocation
    ? { lat: userLocation?.latitude, lng: userLocation?.longitude }
    : null;

  const mapOptions = {
    mapId: "f857c239af13152a",
    zoom: 14,
    center: center,
  };

  return (
    <>
      {userLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onClick={handleMapClick}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          options={mapOptions}
        >
          <Marker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />

          {locations.map((location) =>
            location.showsMatch === true ? (
              <Marker
                key={location.id}
                position={{
                  lat: location.coordinates.latitude,
                  lng: location.coordinates.longitude,
                }}
                title={location.name}
                onClick={(event) => handleMarkerClick(location)}
                options={{ zIndex: 999 }}
              />
            ) : null
          )}
          {activeMarker && showInfoWindow && activeMarkerDetails ? (
            <InfoWindow
              position={{
                lat: activeMarker.coordinates.latitude,
                lng: activeMarker.coordinates.longitude,
              }}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <InfoContent>
                <LinkWithoutStyle href={`/bars/${activeMarker.id}`}>
                  {" "}
                  <h3>{activeMarker.name}</h3>{" "}
                </LinkWithoutStyle>
                {activeMarkerDetails.matches.map((match, index) => (
                  <div key={`${match.id}-${index}`}>
                    <LinkWithoutStyle
                      href={`/matches/${match.id}`}
                      key={`${match.id}-${index}`}
                    >
                      <MatchPreview>
                        <TeamLogo
                          logoUrl={match.homeTeam.logoURL}
                          teamName={match.homeTeam}
                          width={20}
                          height={20}
                        />
                        <p>-</p>
                        <TeamLogo
                          logoUrl={match.awayTeam.logoURL}
                          teamName={match.awayTeam}
                          width={20}
                          height={20}
                        />
                      </MatchPreview>
                    </LinkWithoutStyle>
                  </div>
                ))}
              </InfoContent>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </>
  );
}

export default React.memo(Map);

const InfoContent = styled.div`
  min-width: 100px;
`;

const LinkWithoutStyle = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
`;
