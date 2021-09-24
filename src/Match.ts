import { GameState } from "./GameState";
const { Select, Input } = require("enquirer");

export class Match {
  gamestate: GameState;

  constructor() {
    this.gamestate = new GameState();
  }

  start() {
    this.setupPlayers();
    this.startTurn();
  }

  setupPlayers() {
    let index = this.gamestate.players.length + 1;
    let player = { name: "", symbol: "" };

    const namePrompt = new Input({
      name: "name selection",
      message: `Player ${index}'s Turn to choose a name:`,
      initial: `Player ${index}`,
    });

    namePrompt.run().then((answer: string) => {
      player.name = answer;
    });

    const symbolPrompt = new Select({
      name: "symbol selection",
      message: `Player ${index}'s Turn to choose a symbol:`,
      choices: this.gamestate.players,
    });

    symbolPrompt.run().then((answer: string) => {
      player.symbol = answer;
    });

    this.gamestate.addPlayer(player);
    console.log(this.gamestate.players);
  }

  startTurn() {
    this.gamestate.renderGameBoard();
    const prompt = new Select({
      name: "turn",
      message: `Player ${this.gamestate.getCurrentTurnsPlayer().name}'s Turn:`,
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
            this.gamestate.updateBoardState(
              0,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Upper Middle":
            this.gamestate.updateBoardState(
              1,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Upper Right":
            this.gamestate.updateBoardState(
              2,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Center Left":
            this.gamestate.updateBoardState(
              3,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Center":
            this.gamestate.updateBoardState(
              4,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Center Right":
            this.gamestate.updateBoardState(
              5,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Lower Left":
            this.gamestate.updateBoardState(
              6,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Lower Middle":
            this.gamestate.updateBoardState(
              7,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
          case "Lower Right":
            this.gamestate.updateBoardState(
              8,
              this.gamestate.getCurrentTurnsPlayer().symbol
            );
            break;
        }
      })
      .then(() => {
        this.gamestate.switchTurns();
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
