// There're several issues in the original code that need to be addressed:
// 1. the function "getPriotity" isn't related to the data state, so it should be moved outside of the component. It's simply a pure function.
// 2. The logic for filtering and sorting the balances is not correctly implemented. I changed the line "balance.amount <= 0" to be "balance.amount >= 0". As the original implementation, nothing will be rendered.
// 3. The orignal hook "useMemo" for "sortedBalances" doesn't really need the dependency of "prices".
// 4. The sort function inside "sortedBalances" doesn't handle the case when the priorities are equal.
// 5. As we display the "formattedBalances", so we also need to put it into the "useMemo" hook.
// 6. As we need "usdValue" in the "WalletRow", so we add it under "formattedBalances".
// 7. We put too much logic inside the "WalletRow" component, which is not necessary. I simplified it by moving out the logic for calculating "formattedBalances" into a separate hook.
// 8. Could put the rendering logic of the list "WalletRow" inside a "useMemo" hook to avoid unnecessary re-renders.
// 9. I also implemented some addinational codes to make the code runnable, such as WalletRow component, useWalletBalances and usePrices hooks, etc.

import React, { useMemo } from "react";

const WalletRow: React.FC<{
  amount: number;
  usdValue: number;
  formattedAmount: string;
}> = ({ amount, usdValue, formattedAmount }) => {
  return (
    <div>
      Amount: {amount}, USD Value: {usdValue.toFixed(2)}, Formatted Amount:{" "}
      {formattedAmount}
    </div>
  );
};

interface WalletBalance {
  currency: string;
  blockchain: string;
  amount: number;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  usdValue: number;
}

function useWalletBalances(): WalletBalance[] {
  return [
    { currency: "Osmosis", blockchain: "Osmosis", amount: 100 },
    { currency: "Ethereum", blockchain: "Ethereum", amount: 50 },
    { currency: "Arbitrum", blockchain: "Arbitrum", amount: 30 },
    { currency: "Zilliqa", blockchain: "Zilliqa", amount: 20 },
    { currency: "Neo", blockchain: "Neo", amount: 20 },
  ];
}

function usePrices(): Record<string, number> {
  return {
    Osmosis: 1.0,
    Ethereum: 2000.0,
    Arbitrum: 1500.0,
    Zilliqa: 0.1,
    Neo: 10.0,
  };
}

// Priority mapping as a key-value object
const blockchainPriorities: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => {
  return blockchainPriorities[blockchain] ?? -99; // Default to -99 if not found
};

// Custom hook to calculate formatted balances
function useFormattedBalances(
  balances: WalletBalance[],
  prices: Record<string, number>
): FormattedWalletBalance[] {
  return useMemo(() => {
    const sortedBalances = balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99) {
          // Updated the condition
          if (balance.amount >= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        if (leftPriority > rightPriority) {
          return -1;
        }

        if (rightPriority > leftPriority) {
          return 1;
        }

        // Handle the case when priorities are equal
        return 0;
      });

    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      // Calculate the formatted amount in useMemo
      formatted: balance.amount.toFixed(),
      // Add usdValue calculation here as well
      usdValue: prices[balance.currency] * balance.amount,
    }));
  }, [balances, prices]);
}

type DivProps = React.HTMLAttributes<HTMLDivElement>;

const WalletPage: React.FC<DivProps> = (props) => {
  const balances = useWalletBalances();
  const prices = usePrices();
  const formattedBalances = useFormattedBalances(balances, prices);

  const rows = useMemo(
    () =>
      formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => (
          <WalletRow
            key={index}
            amount={balance.amount}
            usdValue={balance.usdValue}
            formattedAmount={balance.formatted}
          />
        )
      ),
    [formattedBalances]
  );

  return <div {...props}>{rows}</div>;
};

export default WalletPage;
