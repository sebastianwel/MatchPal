import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import AnimationData from "../Lotties/MapLoader.json";

function LottieAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: AnimationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return <div ref={containerRef}></div>;
}

export default LottieAnimation;
