import GlobalStyle from "../styles";
import Head from "next/head";
import { matches } from "../lib/mock-data/matches";
import { teams } from "../lib/mock-data/teams";
import { bars } from "../lib/mock-data/bars";
import { barsInMatches } from "../lib/mock-data/barsInMatches";
import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function getPlacesFromLocalStorage() {
  if (typeof window !== "undefined") {
    const placesData = localStorage.getItem("places");
    if (placesData) {
      try {
        return JSON.parse(placesData);
      } catch (error) {
        console.error("Error parsing placesData from localStorage:", error);
      }
    }
  }
  return [];
}

function savePlacesToLocalStorage(places) {
  if (typeof window !== "undefined") {
    localStorage.setItem("places", JSON.stringify(places));
  }
}

export default function App({ Component, pageProps }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sureToDelete, setSureToDelete] = useState(false);
  const [places, setPlaces] = useState(getPlacesFromLocalStorage());

  useEffect(() => {
    savePlacesToLocalStorage(places);
  }, [places]);

  function handleSureToDelete() {
    setSureToDelete(!sureToDelete);
  }

  const formattedSelectedDate = selectedDate.toISOString().split("T")[0];

  const extendedBars = places?.map((bar) => {
    const showsMatch = bar.matches?.length > 0;
    return {
      ...bar,
      showsMatch,
    };
  });

  const barsWithMatches = extendedBars?.filter((bar) => bar.matches.length > 0);

  const filteredMatchesByDate = matches.filter(
    (match) => match.date === formattedSelectedDate
  );

  const matchesWithTeamNames = filteredMatchesByDate.map((match) => ({
    ...match,
    homeTeam: {
      name: teams.find((team) => team.id === match.homeTeamId).name,
      logoColor: teams.find((team) => team.id === match.homeTeamId).logoColor,
      logoURL: teams.find((team) => team.id === match.homeTeamId).logoUrl,
    },
    awayTeam: {
      name: teams.find((team) => team.id === match.awayTeamId).name,
      logoColor: teams.find((team) => team.id === match.awayTeamId).logoColor,
      logoURL: teams.find((team) => team.id === match.awayTeamId).logoUrl,
    },
  }));

  const extendedBarsWithMatches = barsWithMatches?.map((bar) => ({
    ...bar,
    matches: matchesWithTeamNames
      .filter((match) => bar.matches.includes(match.id))
      .map((match) => ({
        id: match.id,
        date: matchesWithTeamNames.find((match) =>
          bar.matches.includes(match.id)
        ).date,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
      })),
  }));

  const barsWithMatchesOnDate = extendedBarsWithMatches?.filter((bar) =>
    bar.matches.some((match) => match.date === formattedSelectedDate)
  );

  function handleDeleteBarOrMatch(updatedBars) {
    setPlaces([...updatedBars]);
  }

  function handleDeleteMatch(matchId) {
    const updatedPlaces = places.map((place) => {
      if (place.matches.includes(matchId)) {
        const updatedBar = { ...place };
        const updatedMatches = updatedBar.matches.filter(
          (match) => match !== matchId
        );
        const showsMatch = updatedMatches.length > 0;
        updatedBar.matches = updatedMatches;
        updatedBar.showsMatch = showsMatch;
        return updatedBar;
      }
      return place;
    });
    setPlaces(updatedPlaces);
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
  }

  return (
    <>
      <GlobalStyle />

      <Head>
        <title>MatchPal</title>
      </Head>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Component
          {...pageProps}
          matches={matchesWithTeamNames}
          bars={extendedBarsWithMatches}
          barsInMatches={barsInMatches}
          onDeleteBarOrMatch={handleDeleteBarOrMatch}
          initialBars={bars}
          barsWithMatchesOnDate={barsWithMatchesOnDate}
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
          today={new Date()}
          places={places}
          setPlaces={setPlaces}
          handleDeleteMatch={handleDeleteMatch}
          sureToDelete={sureToDelete}
          setSureToDelete={setSureToDelete}
          handleSureToDelete={handleSureToDelete}
        />
      </LoadScript>
    </>
  );
}
