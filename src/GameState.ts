export class GameState {
  boardState: Array<{ occupied: boolean; symbol: string | null }>;
  boardImage: string;
  turn: string | null;

  constructor() {
    this.boardState = [
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
      { occupied: false, symbol: null },
    ];
    this.boardImage = "";
    this.turn = null;
  }

  getState() {
    return this.boardState;
  }

  setState(position: number, symbol: string): void {
    this.boardState[position] = { occupied: true, symbol: symbol };
  }

  renderGameBoard(): string {
    let index = 0;
    for (let position of this.getState()) {
      if (position.occupied) {
        if (index === 3 || index === 6) {
          this.boardImage = this.boardImage.concat(`\n[${position.symbol}]`);
        } else {
          this.boardImage = this.boardImage.concat(`[${position.symbol}]`);
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
    return this.boardImage;
  }
}
