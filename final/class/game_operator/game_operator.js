const Play = require("../play/play");
const Player = require("../player/player");
const Dice = require("../dice/dice");
module.exports = class GameOperator {
    constructor() {
        this.play = null;
        this.playerFirst = null;
        this.playerSecond = null;
        this.diceFirst = null;
        this.diceSecond = null;
    }

    init(aimedScore, trapDicePoint) {
        this.prepare(aimedScore, trapDicePoint);
    }

    prepare(aimedScore, trapDicePoint) {
        this.playerFirst = new Player();
        this.playerSecond = new Player();
        this.diceFirst = new Dice();
        this.diceSecond = new Dice();
        this.play = new Play();

        // this.play = new Play(
        //     aimedScore,
        //     trapDicePoint,
        //     playerFirst,
        //     playerSecond,
        //     dices
        // );
    }

    rollDice() {
        try {
            this.play.rollDice();
        } catch (error) { }
    }

    turnOver() {
        this.play.turnOver();
    }
};
