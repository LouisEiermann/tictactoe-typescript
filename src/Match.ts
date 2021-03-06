import { GameState } from "./GameState";
import { Player } from "./Player";
const { Select, Input } = require("enquirer");

export class Match {
  gamestate: GameState;

  constructor() {
    this.gamestate = new GameState();
  }

  // is called until the players have chosen their names and player symbols
  setupMatch() {
    if (this.gamestate.players.length < 2) {
      let index = this.gamestate.players.length + 1;

      let playerName: string;
      let playerSymbol: string;

      const namePrompt = new Input({
        name: "name selection",
        message: `Player ${index}'s Turn to choose a name:`,
        initial: `Player ${index}`,
      });

      namePrompt.run().then((answer: string) => {
        playerName = answer;

        const symbolPrompt = new Select({
          name: "symbol selection",
          message: `Player ${index}'s Turn to choose a symbol:`,
          choices: this.gamestate.playerSymbols,
        });

        symbolPrompt.run().then((answer: string) => {
          // remove symbol from possible ones for this match
          this.gamestate.playerSymbols.splice(
            // ts-ignore needed since the type of "symbol" is changed from string to object on runtime which the type
            // declaration of "symbol" does not know and would lead to a typescript error, why this is a thing i cannot
            // trace right now
            this.gamestate.playerSymbols.findIndex(
              //@ts-ignore
              (symbol) => symbol.name === answer
            ),
            1
          );

          playerSymbol = answer;

          let playerToBeAdded = new Player();
          playerToBeAdded.setName(playerName);
          playerToBeAdded.setSymbol(playerSymbol);

          this.gamestate.addPlayer(playerToBeAdded);

          this.setupMatch();
        });
      });
    } else {
      this.gameloop();
    }
  }

  gameloop() {
    this.gamestate.renderGameBoard();
    const prompt = new Select({
      name: "turn",
      message: `Player ${this.gamestate.players[
        this.gamestate.turnCounter
      ].getName()}'s Turn:`,
      choices: this.gamestate.availablePositions,
    });

    prompt
      .run()
      .then((answer: string) => {
        // remove chosen position from possible ones for this match
        this.gamestate.availablePositions.splice(
          // ts-ignore needed since the type of "symbol" is changed from string to object on runtime which the type
          // declaration of "symbol" does not know and would lead to a typescript error, why this is a thing i cannot
          // trace right now
          this.gamestate.availablePositions.findIndex(
            // @ts-ignore
            (position) => position.name === answer
          ),
          1
        );

        switch (answer) {
          case "Upper Left":
            this.gamestate.updateBoardState(
              0,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Upper Middle":
            this.gamestate.updateBoardState(
              1,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Upper Right":
            this.gamestate.updateBoardState(
              2,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Center Left":
            this.gamestate.updateBoardState(
              3,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Center":
            this.gamestate.updateBoardState(
              4,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Center Right":
            this.gamestate.updateBoardState(
              5,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Lower Left":
            this.gamestate.updateBoardState(
              6,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Lower Middle":
            this.gamestate.updateBoardState(
              7,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
          case "Lower Right":
            this.gamestate.updateBoardState(
              8,
              this.gamestate.players[this.gamestate.turnCounter].getSymbol()
            );
            break;
        }
      })
      .then(() => {
        this.gamestate.updateWincondition();
        console.clear();
        if (!this.gamestate.winconditionMet) {
          if (this.gamestate.availablePositions.length === 0) {
            this.gamestate.renderGameBoard();
            console.log("Tie!");
            this.askForRematch();
          } else {
            this.gamestate.switchTurns();
            this.gameloop();
          }
        } else {
          this.gamestate.renderGameBoard();
          console.log(this.gamestate.getWinner()?.getName() + " has won");
          this.askForRematch();
        }
      });
  }

  askForRematch() {
    const prompt = new Select({
      name: "repeat",
      message: "Rematch?",
      choices: ["Yes", "No"],
    });
    prompt.run().then((answer: string) => {
      if (answer === "Yes") {
        this.gamestate.clearGameState();
        console.clear();
        this.setupMatch();
      } else {
        // Tidy up console after game ended
        console.clear();
        return;
      }
    });
  }
}
