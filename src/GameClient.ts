const { Select } = require("enquirer");
import { Match } from "./Match";

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
          this.startLocalMultiplayer();
        }
      })
      .catch(console.error);
  }

  startLocalMultiplayer() {
    let match = new Match();
    match.startTurn();
  }
}
