import { GameState } from "./GameState";
const { Select } = require("enquirer");

export class Match {
  wincondition: boolean;
  winner: string | null;
  gamestate: GameState;

  constructor() {
    this.wincondition = false;
    this.winner = null;
    this.gamestate = new GameState();
  }

  start() {}
  turn() {
    this.gamestate.renderGameBoard();
    const prompt = new Select({
      name: "turn",
      message: `Player ${this.gamestate.turn}'s Turn:`,
      choices: [
        "Upper Left",
        "Upper Middle",
        "Upper Right",
        "Center Left",
        "Center",
        "Center Right",
        "Lower Left",
        "Lower Middle",
        "Lower Right",
      ],
    });

    prompt
      .run()
      .then((answer: string) => {
        switch (answer) {
          case "Upper Left":
            return;
          case "Upper Middle":
            return;
          case "Upper Right":
            return;
          case "Center Left":
            return;
          case "Center":
            return;
          case "Center Right":
            return;
          case "Lower Left":
            return;
          case "Lower Middle":
            return;
          case "Lower Right":
            return;
        }
      })
      .catch(console.error);
    if (!this.wincondition) {
      this.turn();
    }
  }
}
