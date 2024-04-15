import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSeed from "../AddSeed";
import { renderWithProviders } from "../../../utils/test-utils";

import testData from "./reduxMoc.json";

test("Add Seed Modal", async () => {
  renderWithProviders(<AddSeed />, {
    preloadedState: testData,
  });

  // To-Do: Why is this still throwing act warning

  userEvent.click(screen.getByText("Add Seed"));
  expect(await screen.findByRole("heading")).toHaveTextContent("Add Seed");
});
