import { render, screen } from "@testing-library/react";
import WalletPage from "./WalletPage";

// Mock the hooks used in WalletPage
jest.mock("./WalletPage", () => {
  const originalModule = jest.requireActual("./WalletPage");
  return {
    ...originalModule,
    useWalletBalances: jest.fn(() => [
      { currency: "Osmosis", blockchain: "Osmosis", amount: 100 },
      { currency: "Ethereum", blockchain: "Ethereum", amount: 50 },
    ]),
    usePrices: jest.fn(() => ({
      Osmosis: 1.0,
      Ethereum: 2000.0,
    })),
  };
});

describe("WalletPage", () => {
  it("renders wallet rows correctly", () => {
    render(<WalletPage />);

    // Check if the rows are rendered with the correct data
    expect(
      screen.getByText(/Amount: 100, USD Value: 100.00, Formatted Amount: 100/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Amount: 50, USD Value: 100000.00, Formatted Amount: 50/)
    ).toBeInTheDocument();
  });

  it("renders no rows if balances are empty", () => {
    const useWalletBalances = jest.fn(() => []);
    jest.mocked(useWalletBalances).mockReturnValueOnce([]);
    render(<WalletPage />);

    // Check that no rows are rendered
    expect(screen.queryByText(/Amount:/)).not.toBeInTheDocument();
  });
});
