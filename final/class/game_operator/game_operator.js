const Game = require('../game/game_operator')
const Player = require('../player/player')
const Dice = require('../dice/dice')
module.exports = class GameOperator {
    constructor() {
        this.game = null;
        this.palyerFirst = null;
        this.palyerSecond = null;
        this.diceFirst = null;
        this.diceSecond = null;
    }

    init(aimedScore, trapDicePoint) {
        this.prepare(aimedScore, trapDicePoint);
    }

    prepare(aimedScore, trapDicePoint) {
        this.palyerFirst = new Player();
        this.palyerSecond = new Player();
        this.diceFirst = new Dice();
        this.diceSecond = new Dice();

        this.game = new Game(aimedScore, trapDicePoint, palyerFirst, palyerSecond, dices);
    }

    rollDice() {

        try {
            this.game.rollDice();
        } catch (error) {

        }

    }

    turnOver() {
        this.game.turnOver();
    }

}