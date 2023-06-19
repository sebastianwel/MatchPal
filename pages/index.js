import MatchList from "../components/MatchList";
import AppHeader from "../components/AppHeader/AppHeader";
import AppFooter from "../components/AppFooter/AppFooter";

export default function Home() {
  return (
    <>
    <AppHeader/>
      <main>
        <MatchList/>
      </main>
    <AppFooter/>
    </>
  );
}
