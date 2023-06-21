import styled from "styled-components";
import MatchIcon from "../../assets/MatchIcon";
import BarIcon from "../../assets/BarIcon";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Navigation(){

const router = useRouter()

useEffect(() => {
setCurrentPage(router.pathname)
}, [router.pathname])

const [currentPage, setCurrentPage] = useState()
function handlePageChange(page){
    setCurrentPage(page)
    router.push(page)
}

return(
<>
    <IconAndText onClick={() => handlePageChange("/")}>
        <MatchIcon isCurrent={currentPage === "/"}/>
        <Page isCurrent={currentPage === "/"}>Matches</Page>
    </IconAndText>
    <IconAndText onClick={() => handlePageChange("/bars")}>
        <BarIcon isCurrent={currentPage === "/bars"}/>
        <Page isCurrent={currentPage === "/bars"}>Bars</Page>
    </IconAndText>
</>
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
color:${page => (page.isCurrent ? "#0079FF" : "#000" )};
`