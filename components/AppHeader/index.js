import styled from "styled-components";

export default function AppHeader() {
  return (
    <Header>
      <p>MatchPal ⚽️🍻</p>
    </Header>
  );
}

const Header = styled.header`
  background-color: var(--header-color);
  color: #fff;
  font-weight: 800;
  padding-left: 5px;
  position: fixed;
  top: 0px;
  width: 100%;
  margin-bottom: 10px;
  height: 55px;
  z-index: 99;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
`;
