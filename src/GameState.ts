export class GameState {
  boardState: Array<string | null>;
  boardImage: string;
  playersTurn: { name: string; symbol: string } | null;
  winconditionMet: boolean;
  winner: { name: string; symbol: string } | null;
  winscenarios: Array<Array<number>>;
  playerSymbols: Array<string>;
  players: Array<{ name: string; symbol: string }>;

  constructor() {
    this.boardState = [null, null, null, null, null, null, null, null, null];
    this.boardImage = "";
    this.playersTurn = null;
    this.winconditionMet = false;
    this.winner = null;
    this.winscenarios = [
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
    this.playerSymbols = [
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
    this.players = [];
  }

  updateBoardState(position: number, symbol: string): void {
    this.boardState[position] = symbol;
  }

  getCurrentTurnsPlayer() {
    if ((this.playersTurn = null)) {
      return this.players[0];
    } else {
      return this.players[1];
    }
  }

  getWinner() {
    return this.winner;
  }

  addPlayer(player: { name: string; symbol: string }) {
    this.players.push(player);
  }

  switchTurns() {
    if (this.playersTurn === this.players[0]) {
      this.playersTurn = this.players[1];
    } else {
      this.playersTurn = this.players[0];
    }
  }

  updateWincondition() {
    for (let winscenario of this.winscenarios) {
      if (
        this.boardState[winscenario[0]] &&
        this.boardState[winscenario[1]] &&
        this.boardState[winscenario[2]] === this.playersTurn
      ) {
        this.winconditionMet = true;
        this.winner = this.playersTurn;
      } else {
        return;
      }
    }
  }

  renderGameBoard(): void {
    this.boardImage = "";
    let index = 0;
    for (let position of this.boardState) {
      if (position != null) {
        if (index === 3 || index === 6) {
          this.boardImage = this.boardImage.concat(`\n[${this.playersTurn}]`);
        } else {
          this.boardImage = this.boardImage.concat(`[${this.playersTurn}]`);
        }
        index++;
      } else {
        if (index === 3 || index === 6) {
          this.boardImage = this.boardImage.concat(`\n[]`);
        } else {
          this.boardImage = this.boardImage.concat(`[]`);
        }
        index++;
      }
    }
    console.log(this.boardImage);
  }
}
