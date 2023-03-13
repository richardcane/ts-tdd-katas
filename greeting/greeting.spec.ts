import greet, { standins, standin, isShouted } from "./greeting";

describe("greet", () => {
  it("exists", () => {
    expect(greet).toBeDefined();
  });

  it("returns 'Hello, <input>' for any given input", () => {
    expect(greet("Bob")).toBe("Hello, Bob");
  });

  it("returns a standin when no input is provided", () => {
    expect(standins.some((s) => greet().indexOf(s))).toBe(true);
  });

  it("handles shouting", () => {
    expect(greet("BOB")).toBe("HELLO BOB!");
    expect(greet("JERRY")).toBe("HELLO JERRY!");
  });

  it("handles 2 names", () => {
    expect(greet(["Amy", "George"])).toBe("Hello, Amy and George.");
    expect(greet(["Jill", "Jane"])).toBe("Hello, Jill and Jane.");
  });

  it("handles arbitrary number of names", () => {
    expect(greet(["Bob", "Jack", "Rick", "Effy"])).toBe(
      "Hello, Bob, Jack, Rick and Effy."
    );
    expect(greet(["James", "Carl", "Emma", "Lucia", "Kane", "Ernest"])).toBe(
      "Hello, James, Carl, Emma, Lucia, Kane and Ernest."
    );
  });

  it("handles both normal and shouted names", () => {
    expect(greet(["Amy", "BOB", "Diane"])).toBe(
      "Hello, Amy and Diane. AND HELLO BOB!"
    );
  });

  it("splits names with commas into separate entries", () => {
    expect(greet(["Amy", "Bob", "Diane, Charles"])).toBe(
      "Hello, Amy, Bob, Diane and Charles."
    );
    expect(greet(["Amy, Bob", "Diane", "Charles"])).toBe(
      "Hello, Amy, Bob, Diane and Charles."
    );

    expect(greet("Amy, Bob")).toBe("Hello, Amy and Bob.");
  });
});
