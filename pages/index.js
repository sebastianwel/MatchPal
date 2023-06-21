import MatchList from "../components/MatchList";
import AppHeader from "../components/AppHeader/index.js";
import AppFooter from "../components/AppFooter/index.js";

export default function Home({matches}) {
  return (
    <>
    <AppHeader/>
      <main>
        <MatchList matches={matches}/>
      </main>
    <AppFooter/>
    </>
  );
}
