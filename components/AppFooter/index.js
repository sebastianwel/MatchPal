import styled from "styled-components";
import Navigation from "../Navigation/Navigation";


export default function AppFooter(){
return(
    <Footer>
        <Navigation/>
    </Footer>
)
}

const Footer = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: #fff;
`