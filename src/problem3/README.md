# TLDR:

Please navigate to [src/WalletPage.tsx](src/WalletPage.tsx) for my implementation.

# Problem 3: Messy React

**Frontend**  
**Duration**: You should not spend more than **6 hours** on this problem.  
_Time estimation is for internship roles, if you are a software professional you should spend significantly less time._

## Task

List out the computational inefficiencies and anti-patterns found in the code block below.

This code block uses:

- ReactJS with TypeScript.
- Functional components.
- React Hooks.

You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

### Original Code Block

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
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
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```

---

## Setup, Run, and Test Instructions

### Prerequisites

- Node.js installed on your system.
- A package manager like `npm` or `yarn`.

### Setup

Install dependencies:

```bash
npm install
```

### Build the Project

To compile the TypeScript code into JavaScript, run:

```bash
npm run build
```

The compiled files will be located in the `dist` directory.

### Run the Development Server

To start the development server, use:

```bash
npm run dev
```

Open the project in your browser at the URL provided by Vite (e.g., `http://localhost:5173`).

### Run Tests

To run the unit tests, use:

```bash
npm test
```

This will execute the test cases and verify the correctness of the implementations.

---

Let me know if you need further adjustments or additional sections!
