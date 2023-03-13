import fizzbuzz, { Outcomes, isPrime } from "./fizzbuzz";

const { Fizz, Buzz, FizzBuzz, Whiz, FizzWhiz, BuzzWhiz } = Outcomes;

describe("fizzbuzz", () => {
  it("exists", () => {
    expect(fizzbuzz).toBeDefined();
  });

  it("returns 'fizz' if input is divisible by 3", () => {
    expect(fizzbuzz(9)).toBe(Fizz);
  });

  it("returns 'buzz' if input is divisible by 5", () => {
    expect(fizzbuzz(10)).toBe(Buzz);
  });

  it("returns 'FizzBuzz if input is divisible by both 3 and 5", () => {
    expect(fizzbuzz(15)).toBe(FizzBuzz);
  });

  it("returns input if input is divisible by neither 3 nor 5", () => {
    expect(fizzbuzz(4)).toBe(4);
  });

  it("appends Whiz for prime numbers", () => {
    expect(fizzbuzz(2)).toBe(Whiz);
    expect(fizzbuzz(3)).toBe(FizzWhiz);
    expect(fizzbuzz(5)).toBe(BuzzWhiz);
    expect(fizzbuzz(7)).toBe(Whiz);
  });

  it("passes general test cases", () => {
    expect(fizzbuzz(1)).toBe(1);
    expect(fizzbuzz(6)).toBe(Fizz);
    expect(fizzbuzz(20)).toBe(Buzz);
    expect(fizzbuzz(30)).toBe(FizzBuzz);
    expect(fizzbuzz(75)).toBe(FizzBuzz);
  });
});

describe("isPrime", () => {
  it("exists", () => {
    expect(isPrime).toBeDefined();
  });

  it("returns true for prime numbers", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(7)).toBe(true);
  });

  it("returns false for inputs lower than 2", () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(-1)).toBe(false);
  });

  it("returns false for non prime numbers", () => {
    const random = Math.floor(Math.random() * 10) * 4; //?
    expect(isPrime(random)).toBe(false);
  });
});
