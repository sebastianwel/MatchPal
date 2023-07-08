import { render, screen } from "@testing-library/react";
import MatchList from ".";

test("renders MatchList component", () => {
  const matches = [
    {
      id: 1,
      homeTeam: { name: "Team A", logoColor: "#123456" },
      awayTeam: { name: "Team B", logoColor: "#789012" },
      date: "2023-05-18",
      time: "18:00",
    },
    {
      id: 2,
      homeTeam: { name: "Team C", logoColor: "#345678" },
      awayTeam: { name: "Team D", logoColor: "#901234" },
      date: "2023-05-19",
      time: "20:00",
    },
  ];

  render(<MatchList matches={matches} />);

  const matchCardElements = screen.getAllByRole("link");
  expect(matchCardElements).toHaveLength(matches.length);
});
