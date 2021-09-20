import { Gameboard } from "./Gameboard";
import readline from "readline";

export class Client {
  running: boolean;

  constructor() {
    this.running = true;
    this.gameloop();
  }

  gameloop() {
    const prompt = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    while (this.running) {
      this.renderGameboard();
    }
  }

  renderGameboard() {
    let gameboard = new Gameboard();
    let board = gameboard.getGameBoard();
    console.log(board);
  }
}
