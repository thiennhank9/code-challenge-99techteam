import { sumMethod1, sumMethod2, sumMethod3 } from "../main";

describe("sumMethod1", () => {
  it("should return 0 for n <= 0", () => {
    expect(sumMethod1(0)).toBe(0);
    expect(sumMethod1(-5)).toBe(0);
  });

  it("should calculate the sum of integers from 1 to n", () => {
    expect(sumMethod1(1)).toBe(1);
    expect(sumMethod1(5)).toBe(15);
    expect(sumMethod1(10)).toBe(55);
  });
});

describe("sumMethod2", () => {
  it("should return 0 for n <= 0", () => {
    expect(sumMethod2(0)).toBe(0);
    expect(sumMethod2(-5)).toBe(0);
  });

  it("should calculate the sum of integers from 1 to n", () => {
    expect(sumMethod2(1)).toBe(1);
    expect(sumMethod2(5)).toBe(15);
    expect(sumMethod2(10)).toBe(55);
  });
});

describe("sumMethod3", () => {
  it("should return 0 for n <= 0", () => {
    expect(sumMethod3(0)).toBe(0);
    expect(sumMethod3(-5)).toBe(0);
  });

  it("should calculate the sum of integers from 1 to n", () => {
    expect(sumMethod3(1)).toBe(1);
    expect(sumMethod3(5)).toBe(15);
    expect(sumMethod3(10)).toBe(55);
  });
});
