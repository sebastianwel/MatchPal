import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import AnimationData from "../Lotties/BarLoaderAnimation.json";
import styled from "styled-components";

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

  return <Lottie ref={containerRef}></Lottie>;
}

const Lottie = styled.div`
  height: 100px;
  width: 100px;
  margin: auto;
`;

export default LottieAnimation;
