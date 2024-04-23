import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../Header";
import { renderWithProviders } from "../../../utils/test-utils";

import testData from "../../seeds/__test__/reduxMoc.json";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("Add Seed Modal", async () => {
  renderWithProviders(<Header />, {
    preloadedState: testData,
  });

  const avatar = await screen.findByTestId("avatar");

  expect(avatar).toBeInTheDocument();

  userEvent.click(avatar);

  expect(avatar).toBeInTheDocument();
});
