import MapContainer from "../../components/Map";

export default function MapPage({ bars }) {
  console.log(bars);
  return (
    <div>
      <MapContainer bars={bars} />
    </div>
  );
}
