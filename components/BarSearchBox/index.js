import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

export default function BarSearchBox() {
  const searchBoxRef = useRef(null);

  return (
    <div>
      <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)}>
        <input type="text" placeholder="Search for bars" />
      </StandaloneSearchBox>
    </div>
  );
}
