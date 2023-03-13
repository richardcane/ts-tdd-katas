export const standins: string[] = [
  "friend",
  "amigo",
  "stranger",
  "dude",
  "guy",
];

export function standin() {
  return standins[Math.floor(Math.random() * standins.length)];
}

export function isShouted(name: string): boolean {
  const chars = name.split("");
  return chars.every((c) => c === c.toUpperCase());
}

export function greetMultiple(input: string[]): string {
  const names: Array<string[]> = [[], []];
  input.forEach((name) => {
    if (isShouted(name)) names[1].push(name);
    else names[0].push(name);
  });

  const [lower, upper] = names;

  let output = "Hello";
  lower.forEach((name, i) => {
    if (i < lower.length - 1) {
      output += `, ${name}`;
      return;
    }

    output += ` and ${name}.`;
  });

  upper.forEach((name) => {
    output += ` AND HELLO ${name}!`;
  });

  return output;
}

function split(input: string | string[]): string | string[] {
  if (typeof input === "string") {
    if (!input.includes(",")) return input;
    return input.replaceAll(" ", "").split(",");
  }
  return input.map((s) => s.replaceAll(" ", "").split(",")).flat();
}

export default function greet(input?: string | string[]): string {
  if (!input) return `Hello, ${standin()}`;

  input = split(input);
  if (typeof input !== "string") return greetMultiple(input);

  const chars = input.split("");
  if (chars.every((c) => c === c.toUpperCase())) return `HELLO ${input}!`;

  return `Hello, ${input}`;
}
