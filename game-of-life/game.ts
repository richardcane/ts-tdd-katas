export default class GameOfLife {
  board: boolean[][];
  width: number;
  height: number;

  private constructor(width: number, height: number) {
    const board = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );

    this.board = board;
    this.width = width;
    this.height = height;
  }

  public static newGame(width: number, height: number) {
    if (width < 3) throw new Error("Width must be greater than 3");
    if (height < 3) throw new Error("Height must be greater than 3");
    return new GameOfLife(width, height);
  }

  nextGeneration() {
    const output: boolean[][] = [];
    // kill if 0 live neighbours

    for (let h = 0; h < this.height; h++) {
      const above = Math.max(0, h - 1);
      const below = Math.min(h + 1, this.height - 1);

      output[h] = [];
      for (let w = 0; w < this.width; w++) {
        const left = Math.max(0, w - 1);
        const right = Math.min(w + 1, this.width - 1);

        const neighbours: boolean[] = [];
        if (above < h)
          neighbours.push(...this.board[above].slice(left, right + 1));
        if (below > h)
          neighbours.push(...this.board[below].slice(left, right + 1));
        if (w > left) neighbours.push(this.board[h][left]);
        if (w < right) neighbours.push(this.board[h][right]);

        const liveNeighbours = neighbours.filter((n) => n).length;
        output[h][w] =
          liveNeighbours === 3 || (this.board[h][w] && liveNeighbours === 2);
      }
    }

    this.board = output;
  }

  randomise() {
    this.board.forEach((row, h) => {
      for (let w = 0; w < row.length; w++) {
        const alive = Math.random() * 100 > 80;
        this.board[h][w] = alive;
      }
    });
  }

  printLines() {
    let out: string[] = ["\n"];

    this.board.forEach((row, i) => {
      out.push(row.map((c) => (c ? "x" : "o")).join(" "));
      i < this.board.length - 1 && out.push("\n");
    });

    return out;
  }
}
