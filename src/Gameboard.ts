export class Gameboard {
  state: Array<{ occupied: boolean; symbol: string | null }>;
  boardImage: string;

  constructor() {
    this.state = [
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
  }

  getState() {
    return this.state;
  }

  setState(position: number, symbol: string): void {
    this.state[position] = { occupied: true, symbol: symbol };
  }

  getGameBoard(): string {
    for (let position of this.getState()) {
      if (position.occupied) {
        this.boardImage.concat(`[${position.symbol}]`);
      } else {
        this.boardImage.concat("[]");
      }
    }
    return this.boardImage;
  }
}
