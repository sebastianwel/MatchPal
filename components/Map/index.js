import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import { useState } from "react";
import AppHeader from "../AppHeader";
import AppFooter from "../AppFooter";
import { useEffect } from "react";

export function MapContainer({ google, bars }) {
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

  console.log(bars);

  const mapStyles = {
    marginTop: "47px",
    marginBottom: "47px",
    width: "100%",
    height: "85%",
  };

  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  function handleMarkerClick(props, marker) {
    setActiveMarker(marker);
    setShowInfoWindow(true);
  }

  function handleMapClick() {
    setActiveMarker(null);
    setShowInfoWindow(false);
  }

  console.log(bars);
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
          <div>
            <h3>{activeMarker ? activeMarker.title : null}</h3>
          </div>
        </InfoWindow>
      </Map>
      <AppFooter />
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(MapContainer);
