import styled from "styled-components";

export default function AppHeader() {
  return (
    <Header>
      <p>MatchPal</p>
    </Header>
  );
}

const Header = styled.header`
  background-color: var(--header-color);
  color: #fff;
  padding-left: 5px;
  position: fixed;
  top: 0px;
  width: 100%;
  margin-bottom: 10px;
  height: 55px;
  z-index: 99;
`;
