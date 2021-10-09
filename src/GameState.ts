import { Player } from "./Player";

export class GameState {
  boardState: Array<string | null> = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  boardImage: string = "";
  players: Player[] = [];
  turnCounter: 0 | 1 = 0;
  winconditionMet: boolean = false;
  winner: Player | null = null;
  winscenarios: Array<Array<number>> = [
    // horizontal winconditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical winconditions
    [0, 3, 6],
    [1, 4, 5],
    [2, 5, 8],
    // diagonal winconditions
    [0, 4, 8],
    [2, 4, 6],
  ];
  playerSymbols: string[] = [
    "x",
    "o",
    "§",
    "$",
    "%",
    "&",
    "?",
    "#",
    "+",
    "-",
    "*",
  ];
  availablePositions: string[] = [
    "Upper Left",
    "Upper Middle",
    "Upper Right",
    "Center Left",
    "Center",
    "Center Right",
    "Lower Left",
    "Lower Middle",
    "Lower Right",
  ];

  updateBoardState(position: number, symbol: string | null): void {
    this.boardState[position] = symbol;
  }

  clearGameState(): void {
    this.boardState = [null, null, null, null, null, null, null, null, null];
    this.boardImage = "";
    this.turnCounter = 0;
    this.winconditionMet = false;
    this.winner = null;
    this.availablePositions = [
      "Upper Left",
      "Upper Middle",
      "Upper Right",
      "Center Left",
      "Center",
      "Center Right",
      "Lower Left",
      "Lower Middle",
      "Lower Right",
    ];
  }

  getWinner() {
    return this.winner;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  switchTurns() {
    if (this.turnCounter === 0) {
      this.turnCounter = 1;
    } else {
      this.turnCounter = 0;
    }
  }

  updateWincondition() {
    for (let winscenario of this.winscenarios) {
      if (
        this.boardState[winscenario[0]] === this.players[0].getSymbol() &&
        this.boardState[winscenario[1]] === this.players[0].getSymbol() &&
        this.boardState[winscenario[2]] === this.players[0].getSymbol()
      ) {
        this.winconditionMet = true;
        this.winner = this.players[this.turnCounter];
      } else if (
        this.boardState[winscenario[0]] === this.players[1].getSymbol() &&
        this.boardState[winscenario[1]] === this.players[1].getSymbol() &&
        this.boardState[winscenario[2]] === this.players[1].getSymbol()
      ) {
        this.winconditionMet = true;
        this.winner = this.players[this.turnCounter];
      }
    }
  }

  renderGameBoard(): void {
    this.boardImage = "";
    let index = 0;
    for (let position of this.boardState) {
      if (position != null) {
        if (index === 3 || index === 6) {
          this.boardImage = this.boardImage.concat(
            `\n[${this.boardState[index]}]`
          );
        } else {
          this.boardImage = this.boardImage.concat(
            `[${this.boardState[index]}]`
          );
        }
        index++;
      } else {
        if (index === 3 || index === 6) {
          this.boardImage = this.boardImage.concat(`\n[ ]`);
        } else {
          this.boardImage = this.boardImage.concat(`[ ]`);
        }
        index++;
      }
    }
    console.log(this.boardImage);
  }
}
