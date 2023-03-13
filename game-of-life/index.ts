import cli from "cli-color";
import readline from "readline";
import GameOfLife from "./game";

const x = cli.greenBright("x");
const o = cli.red("o");

function addPrintlineColours(lines: string[]) {
  return lines.map((line: string) =>
    line.replaceAll("x", x).replaceAll("o", o)
  );
}

const game = GameOfLife.newGame(10, 10);
game.randomise();
console.log(...addPrintlineColours(game.printLines()));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "r to randomise, q to quit, anything else to continue\n",
});

rl.prompt();

rl.on("line", (line) => {
  const command = line.toLowerCase();
  switch (command) {
    case "q":
      process.exit(0);
    case "r":
      game.randomise();
      console.log(...addPrintlineColours(game.printLines()));
      break;
    default:
      game.nextGeneration();
      console.log(...addPrintlineColours(game.printLines()));
  }

  rl.prompt();
}).on("close", () => {
  process.exit(0);
});
