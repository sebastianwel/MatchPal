import styled from "styled-components";


export default function AppHeader(){
return(
    <Header>
        <p>MatchPal</p>
    </Header>
)
}

const Header = styled.header`
    background-color: #BBDC2F;
    color: #fff;
    padding-left: 5px;
    position: fixed;
    top: 0px;
    width: 100%;
    margin-bottom: 10px;
    height: 47px;
`