import styled from "styled-components";
import Image from "next/image";

export default function TeamLogo({ logoUrl, teamName, width, height }) {
  return (
    <Logo>
      <Image alt={teamName} src={logoUrl} height={width} width={height} />
    </Logo>
  );
}

const Logo = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ logoColor }) => logoColor};
`;
