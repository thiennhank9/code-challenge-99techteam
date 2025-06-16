# Problem 1: Three Ways to Sum to n

**Duration**: You should not spend more than **2 hours** on this problem.  
_Time estimation is for internship roles, if you are a software professional you should spend significantly less time._

## Task

Provide 3 unique implementations of the following function in TypeScript.

**Input**: `n` - any integer

_Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`_.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

```typescript
export function sumMethod1(n: number): number {
  // your code here
}

export function sumMethod2(n: number): number {
  // your code here
}

export function sumMethod3(n: number): number {
  // your code here
}
```

---

## Setup, Run, and Test Instructions

### Prerequisites

- Node.js installed on your system.
- A package manager like `npm` or `yarn`.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

### Build the Project

To compile the TypeScript code into JavaScript, run:

```bash
npm run build
```

The compiled files will be located in the `dist` directory.

### Run the Script

To execute the compiled script, use:

```bash
npm start
```

### Run Tests

To run the unit tests, use:

```bash
npm test
```

This will execute the test cases defined in `tests/main.test.ts` and verify the correctness of the implementations.

---

## Project Structure

```
src/problem1/
├── main.ts          # Contains the three implementations of the summation function
├── tests/
│   └── main.test.ts # Unit tests for the summation functions
├── package.json     # Project configuration and dependencies
├── tsconfig.json    # TypeScript configuration
└── dist/            # Compiled JavaScript files (generated after build)
```
