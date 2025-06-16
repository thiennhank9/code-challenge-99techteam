// This function calculates the sum of all integers from 1 to n using the formula n(n + 1) / 2.
export function sumMethod1(n: number): number {
  if (n <= 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
}

// This function calculates the sum of all integers from 1 to n using a loop.
export function sumMethod2(n: number): number {
  if (n <= 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

// This function calculates the sum of all integers from 1 to n using recursion.
export function sumMethod3(n: number): number {
  if (n <= 0) {
    return 0;
  }

  return n + sumMethod3(n - 1);
}
