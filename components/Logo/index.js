import styled from "styled-components";

export const Logo = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border-radius: 100%;
  margin: 0px;
  background-color: ${({ logoColor }) => logoColor};
`;
