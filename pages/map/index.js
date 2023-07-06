import Map from "../../components/Map/index.js";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

export default function MapPage({ bars, barsWithMatchesOnDate, userLocation }) {
  return (
    <>
      <AppHeader />
      <Map
        bars={bars}
        barsWithMatchesOnDate={barsWithMatchesOnDate}
        userLocation
      />
      <AppFooter />
    </>
  );
}
