import styled from "styled-components";
import Image from "next/image";

export default function TeamLogo({ logoUrl, teamName }) {
  return (
    <Logo>
      <Image alt={teamName} src={logoUrl} height={20} width={20} />
    </Logo>
  );
}

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  /* border-radius: 100%; */
  background-color: ${({ logoColor }) => logoColor};
`;
