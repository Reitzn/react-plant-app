import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddSeed from "../AddSeed";
import { renderWithProviders } from "../../../utils/test-utils";
import { addSeedAction } from "../../../features/seeds/seedsSlice";

import testData from "./reduxMoc.json";

test("Add Seed Modal", async () => {
  renderWithProviders(<AddSeed />, {
    preloadedState: testData,
  });

  userEvent.click(screen.getByText("Add Seed"));
  expect(await screen.findByRole("heading")).toHaveTextContent("Add Seed");

  const textBoxes = await screen.findAllByRole("textbox");
  const submitButton = screen.getByRole("button", { name: "Make It" });

  userEvent.type(textBoxes[0], "Pepper");
  userEvent.type(textBoxes[1], "Pepper Pepper");
  userEvent.click(submitButton);

  expect(screen.queryByRole("modal")).toBeFalsy();
});
