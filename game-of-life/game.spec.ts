import GameOfLife from "./game";

describe("game of life", () => {
  it("exists", () => {
    expect(GameOfLife).toBeDefined();
  });

  it("validates that width not less than 3", () => {
    const width = 2;

    expect(() => GameOfLife.newGame(width, 3)).toThrow(Error);
  });

  it("validates height not less than 3", () => {
    const height = 2;

    expect(() => GameOfLife.newGame(height, 3)).toThrow(Error);
  });

  it("initialises the game board with the specified dimensions", () => {
    let width = Math.floor(Math.random() * 10);
    let height = Math.floor(Math.random() * 10);
    width = width >= 3 ? width : 3;
    height = height >= 3 ? height : 3;

    const sut = GameOfLife.newGame(width, height);

    expect(sut.board.length).toBe(height);
    expect(sut.board[0].length).toBe(width);
  });

  describe("nextGeneration", () => {
    let sut: GameOfLife;

    // o o o
    // o x o
    // o o o
    beforeEach(() => {
      sut = GameOfLife.newGame(3, 3);
      sut.board[1][1] = true;
    });

    it("kills cells with 0 live neighbours", () => {
      sut.nextGeneration();

      expect(sut.board[1][1]).toBe(false);
    });

    // x o o
    // o x o
    // o o o
    it("kills cells with 1 live neighbours", () => {
      sut.board[0][0] = true;

      sut.nextGeneration();

      expect(sut.board[1][1]).toBe(false);
    });

    // x x x
    // x x o
    // o o o
    it("kills cells with 4 or more live neighbours", () => {
      sut.board[0][0] = true;
      sut.board[0][1] = true;
      sut.board[0][2] = true;
      sut.board[1][0] = true;

      console.log(sut.board);
      sut.nextGeneration();
      console.log(sut.board);
      expect(sut.board[1][1]).toBe(false);
    });

    // x x o
    // o x o
    // o o o
    it("leaves alive cells with 2 live neighbours", () => {
      sut.board[0][0] = true;
      sut.board[0][1] = true;
      sut.nextGeneration();

      expect(sut.board[1][1]).toBe(true);
    });

    // x x x
    // o o o
    // o o o
    it("leaves alive cells with 3 live neighbours", () => {
      sut.board[0][0] = true;
      sut.board[0][1] = true;
      sut.board[0][2] = true;

      sut.nextGeneration();

      expect(sut.board[1][1]).toBe(true);
    });

    // x x x
    // o x o
    // o o o
    it("revives cells with exactly 3 live neighbours", () => {
      sut.board[0][0] = true;
      sut.board[0][1] = true;
      sut.board[0][2] = true;

      sut.board[1][1] = false;

      sut.nextGeneration();

      expect(sut.board[1][1]).toBe(true);
    });

    // x x o
    // o x o
    // o o o
    it("doesn't revive cells with 2 live neighbours", () => {
      sut.board[0][0] = true;
      sut.board[0][1] = true;
      sut.board[1][1] = false;

      sut.nextGeneration();

      expect(sut.board[1][1]).toBe(false);
    });
  });

  describe("randomise", () => {
    it("exists", () => {
      const sut = GameOfLife.newGame(3, 3);
      expect(sut.randomise).toBeDefined();
    });

    it("initialises the game board with some live cells and some dead cells", () => {
      const sut = GameOfLife.newGame(100, 100);

      sut.randomise();

      expect(sut.board.flat().some((c) => c)).toBe(true);
      expect(sut.board.flat().some((c) => !c)).toBe(true);
    });
  });

  describe("printLines", () => {
    it("exists", () => {
      const sut = GameOfLife.newGame(10, 10);
      expect(sut.printLines).toBeDefined();
    });

    it("prints lines of o characters for dead cells", () => {
      const game = GameOfLife.newGame(3, 3);

      const sut = game.printLines();

      expect(sut[1]).toBe("o o o");
    });

    it("prints lines of x characters for live cells", () => {
      const game = GameOfLife.newGame(3, 3);
      game.board[0][0] = true;
      game.board[0][1] = true;
      game.board[0][2] = true;

      const sut = game.printLines();

      expect(sut[1]).toBe("x x x");
    });

    it("prints x for alive and o for dead cells together", () => {
      const game = GameOfLife.newGame(3, 3);
      game.board[0][0] = true;
      game.board[0][1] = false;
      game.board[0][2] = true;

      const sut = game.printLines();

      expect(sut[1]).toBe("x o x");
    });
  });
});
