export class Player {
  private name: string | null = null;
  private symbol: string | null = null;

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getSymbol() {
    return this.symbol;
  }

  setSymbol(symbol: string) {
    this.symbol = symbol;
  }
}
