import MatchList from "../components/MatchList";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import DateFilter from "../components/DateFilter";

export default function Home({
  matches,
  selectedDate,
  handleDateSelect,
  today,
}) {
  return (
    <>
      <AppHeader />
      <main>
        <DateFilter
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          today={today}
        />
        <MatchList matches={matches} />
      </main>
      <AppFooter />
    </>
  );
}
