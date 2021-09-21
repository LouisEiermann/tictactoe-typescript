import { GameState } from "./GameState";
const { Select } = require("enquirer");

export class GameClient {
  constructor() {
    this.gameloop();
  }

  gameloop() {
    const prompt = new Select({
      name: "menu",
      message: "Main Menu",
      choices: ["Start Game", "Quit"],
    });

    prompt
      .run()
      .then((answer: string) => {
        if (answer === "Quit") {
          return;
        } else {
          this.chooseGamemode();
        }
      })
      .catch(console.error);
  }

  renderGameboard() {
    let gameboard = new GameState();
    let board = gameboard.renderGameBoard();
    console.log(board);
  }

  chooseGamemode() {
    const prompt = new Select({
      name: "gamemode selection",
      message: "Select Gamemode",
      choices: ["Play against AI", "Play local Multiplayer"],
    });

    prompt
      .run()
      .then((answer: string) => {
        if (answer === "Play against AI") {
          return;
        } else {
          this.startLocalMultiplayer;
        }
      })
      .catch(console.error);
  }

  startLocalMultiplayer() {
    let wincondition = false;
    let winner = "";
    while (!wincondition) {
      this.renderGameboard();
    }
  }
}
