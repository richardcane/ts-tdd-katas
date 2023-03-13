export enum Outcomes {
  Fizz = "Fizz",
  Buzz = "Buzz",
  FizzBuzz = "FizzBuzz",
  Whiz = "Whiz",
  FizzWhiz = "FizzWhiz",
  BuzzWhiz = "BuzzWhiz",
}

// A prime number is a natural number greater than 1
// whose only factors are 1 and the number itself.
// That is, it can only be divided equally by 1 and itself.
export function isPrime(input: number): boolean {
  if (input < 2) return false;
  else if (input === 2) return true;

  const sqrt = Math.sqrt(input);
  for (let i = 2; i < sqrt + 1; i++) {
    if (!(input % i)) return false;
  }
  return true;
}

export default function fizzbuzz(input: number): Outcomes | number {
  const divisibleBy3 = !(input % 3);
  const divisibleBy5 = !(input % 5);
  const prime = isPrime(input);

  if (divisibleBy3) {
    if (prime) return Outcomes.FizzWhiz; // can't be anything else
    else if (divisibleBy5) return Outcomes.FizzBuzz;
    else if (!divisibleBy5) return Outcomes.Fizz;

    return Outcomes.Fizz;
  } else if (divisibleBy5) {
    if (prime) return Outcomes.BuzzWhiz; // can't be anything else

    return Outcomes.Buzz;
  }

  if (prime) return Outcomes.Whiz;
  return input;
}
