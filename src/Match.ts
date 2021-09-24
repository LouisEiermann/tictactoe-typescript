import { GameState } from "./GameState";
const { Select } = require("enquirer");

export class Match {
  gamestate: GameState;

  constructor() {
    this.gamestate = new GameState();
  }

  startTurn() {
    this.gamestate.renderGameBoard();
    const prompt = new Select({
      name: "turn",
      message: `Player ${this.gamestate.getPlayersTurn()}'s Turn:`,
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
            this.gamestate.updateBoardState(0, this.gamestate.getPlayersTurn());
            break;
          case "Upper Middle":
            this.gamestate.updateBoardState(1, this.gamestate.getPlayersTurn());
            break;
          case "Upper Right":
            this.gamestate.updateBoardState(2, this.gamestate.getPlayersTurn());
            break;
          case "Center Left":
            this.gamestate.updateBoardState(3, this.gamestate.getPlayersTurn());
            break;
          case "Center":
            this.gamestate.updateBoardState(4, this.gamestate.getPlayersTurn());
            break;
          case "Center Right":
            this.gamestate.updateBoardState(5, this.gamestate.getPlayersTurn());
            break;
          case "Lower Left":
            this.gamestate.updateBoardState(6, this.gamestate.getPlayersTurn());
            break;
          case "Lower Middle":
            this.gamestate.updateBoardState(7, this.gamestate.getPlayersTurn());
            break;
          case "Lower Right":
            this.gamestate.updateBoardState(8, this.gamestate.getPlayersTurn());
            break;
        }
      })
      .then(() => {
        this.gamestate.setPlayersTurn();
        this.gamestate.updateWincondition();
        if (!this.gamestate.winconditionMet) {
          console.clear();
          this.startTurn();
        } else {
          console.log(this.gamestate.getWinner() + "has won");
        }
      });
  }
}
