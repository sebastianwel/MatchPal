import MatchList from ".";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<MatchList/>);
  const element = screen.getByText("Match Overview");
  expect(element).toBeInTheDocument();
});