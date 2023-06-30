import MapContainer from "../../components/Map";

export default function MapPage({ bars, extendedBarsWithMatches }) {
  return (
    <div>
      <MapContainer
        bars={bars}
        extendedBarsWithMatches={extendedBarsWithMatches}
      />
    </div>
  );
}
