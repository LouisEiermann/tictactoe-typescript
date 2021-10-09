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
          this.startMatch();
        }
      })
      .catch(console.error);
  }

  startMatch() {
    let match = new Match();
    match.setupMatch();
  }
}
