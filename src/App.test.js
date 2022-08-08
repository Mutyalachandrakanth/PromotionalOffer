import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import sampleJson from "./mock/sample.json";

delete window.location;
window.location = { href: "http://localhost:3000/" };

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(sampleJson),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("User should navigate to jackpotjoy.com on Opt in button click", async () => {
  render(<App />);
  const button = await screen.findByTestId("optInButton");
  expect(button).toHaveClass("optin-button");
  fireEvent.click(button);
  expect(window.location.href).toEqual("https://www.jackpotjoy.com/");
});

test("User should see offered amount and remaining time to accept offer", async () => {
  render(<App />);
  expect(await screen.findByTestId("promoOffer")).toHaveTextContent(
    "Get Your Free £10.00 Now"
  );
  expect(await screen.findByTestId("timerValue")).toHaveTextContent(
    "00 : 00 : 02"
  );
});

test("When time runs out zero timer should be shown", async () => {
  render(<App />);
  await new Promise((r) => setTimeout(r, 3000));
  expect(screen.getByTestId("timerValue")).toHaveTextContent("00 : 00 : 00");
});
