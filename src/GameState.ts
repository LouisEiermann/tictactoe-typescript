export class GameState {
  boardState: Array<"playerOne" | "playerTwo" | null>;
  boardImage: string;
  playersTurn: "playerOne" | "playerTwo";
  winconditionMet: boolean;
  winner: "playerOne" | "playerTwo" | null;
  winscenarios: Array<Array<number>>;

  constructor() {
    this.boardState = [null, null, null, null, null, null, null, null, null];
    this.boardImage = "";
    this.playersTurn = "playerOne";
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
  }

  updateBoardState(position: number, symbol: "playerOne" | "playerTwo"): void {
    this.boardState[position] = symbol;
  }

  getPlayersTurn() {
    return this.playersTurn;
  }

  getWinner() {
    return this.winner;
  }

  setPlayersTurn() {
    if (this.playersTurn === "playerOne") {
      this.playersTurn = "playerTwo";
    } else {
      this.playersTurn = "playerOne";
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
