const assert = require("assert");
const chai = require("chai");
const GameOperator = require("../class/game_operator/game_operator.js");
const Play = require("../class/play/play.js");
const Player = require("../class/player/player.js");
const Dice = require("../class/dice/dice.js");

const { get } = require("http");

const expect = chai.expect;

describe("Game operator constructor test", function () {
    const gameOperator = new GameOperator();

    it("Game must be null", (done) =>
        expect(gameOperator.game === null).to.be.true);
    it("Player 1 must be null", (done) =>
        expect(gameOperator.playerFirst === null).to.be.true);
    it("Player 2 must be null", (done) =>
        expect(gameOperator.playerSecond === null).to.be.true);
    it("First dice must be null", (done) =>
        expect(gameOperator.diceFirst === null).to.be.true);
    it("Second dice must be null", (done) =>
        expect(gameOperator.diceSecond === null).to.be.true);
});

describe("Player initiating", function () {
    // 초기화 단계, 새로운 게임 생성
    let play = new Play();
    play.initDices(6, 6);

    // 이 클래스가 하는 일부터 정리해보자
    // 1. player 2명 세팅
    const player1 = new Player();
    const player2 = new Player();
    play.setPlayerList(player1, player2);

    // 2. 목표점수 세팅
    play.setAimedScore(100);

    it("Check aim score has been set correctly", (done) =>
        expect(play.aimedScore === 100).to.be.true);

    it("Play must have two players", (done) =>
        expect(play.playerList.length === 2).to.be.true);
});

/**
 * play 심판, 운영
 */
describe("play", function () {
    const play = new Play();

    // 1. 플레이어 세팅
    const player1 = new Player();
    const player2 = new Player();
    play.setPlayerList(player1, player2);

    // 2. 주사위 세팅
    const dice1 = new Dice(6);
    const dice2 = new Dice(6);

    play.initDices(dice1, dice2);

    const currentPlayer = play.getCurrentPlayer();

    // 3. 주사위 굴림
    const resultOfRolling = play.rollDice();

    if (play.isTrapPoint(resultOfRolling)) {
        currentPlayer.holdingScore() = 0;
    } else {
        player1.accumulateholdingScore();
    }

    // it(`[currentPlayerIndex] ${play.turnIndex}`);
    it(`[currentPlayerIndex] ${play.turnIndex}`, (done) => {
        expect(play.turnIndex === 0).to.be.true;
    });
    play.turnOver();
    it(`[nextPlayerIndex] ${play.turnIndex}`, (done) => {
        expect(play.turnIndex === 1).to.be.true;
    });

    describe("play-case1", function () {
        const play = new Play();

        const currentPlayer = play.getCurrentPlayer();

        const player1 = new Player();
        const player2 = new Player();

        const dice1 = new Dice(6);
        const dice2 = new Dice(6);

        play.setPlayerList(player1, player2);

        const testPoints = [4, 5];

        // play.punishOrAccumulate(testPoints);

        let currentPlayer1 = play.getCurrentPlayer();
        let currentScore = currentPlayer1.currentScore;

        it(
            "[Current Score Test] Dice Point is " + testPoints,
            (done) => expect(currentScore === 9).to.be.true
        );
    });

    describe("Check punishment works correctly", function () {
        const play = new Play();
        play.getCurrentPlayer();
        const dice1 = new Dice(1);
        const dice2 = new Dice(6);

        play.initDices(dice1, dice2);

        it("Check play has two dices", (done) => {
            expect(play.diceList.length === 2).to.be.true;
        });
        //1. 턴 관리 (?)
        //2. 점수 관리

        //3. 다이스 굴렸을 때 1 체크
        it("Check one of dice value is 1", (done) => {
            expect(play.rollDice().includes(1)).to.be.true;
        });

        // 주사위 값이 1이면 현재 플레이어 점수가 초기화 되는지 확인
        if (play.rollDice().includes(1)) {
            it("Check Player point 0 if one of dices has 1 value", (done) => {
                play.punishTrappedPlayer();
                expect(play.playerList[play.currentPlayer].currentScore === 0).to.be
                    .true;
            });
        }
    });
});
