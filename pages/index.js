import MatchList from "../components/MatchList";
import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";

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
