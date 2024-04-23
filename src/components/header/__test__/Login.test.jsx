import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import { renderWithProviders } from "../../../utils/test-utils";

import testData from "../../seeds/__test__/reduxMoc.json";

test("Add Seed Modal", async () => {
  renderWithProviders(<Login />, {
    preloadedState: testData,
  });

  userEvent.click(screen.getByTestId("login-button"));
  expect(await screen.findByRole("heading")).toHaveTextContent("Login");

  userEvent.click(screen.getByTestId("modal-login-button"));

  expect(await screen.findByText("Email is required")).toBeInTheDocument();
  expect(await screen.findByText("Password is required")).toBeInTheDocument();
});
