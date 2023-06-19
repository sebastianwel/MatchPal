import styled from "styled-components";
import MatchIcon from "../../assets/MatchIcon";


export default function Navigation(){
return(
<div>
    <IconAndText>
    <MatchIcon isCurrent/>
    <Page>Matches</Page>
    </IconAndText>
</div>
)
}

const IconAndText = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Page = styled.p`
margin-top: 5px;
margin-bottom: 5px;
font-size: 0.8rem;
`