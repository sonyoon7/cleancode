// const assert = require("assert");
// const chai = require("chai");
// const Game = require("../class/play/play.js");
// const Player = require("../class/player/player.js");
// const expect = chai.expect;

// describe("Game", function () {
//   describe("Game Constructor ", function () {
//     let game = new Game();
//     it("game is not null", (done) => {
//       expect(game.aimedScore == 0).to.be.true;
//       expect(game.currentPlayer == undefined).to.be.true;
//       expect(game.winnerPlayer == undefined).to.be.true;
//       expect(game.playerList.size == 2).to.be.true;
//       expect(game.diceList.size == 2).to.be.true;
//     });
//   });

//   describe("Game setCurrentPlayer ", function () {
//     let player = new Player();
//     let game = new Game();
//     game.setPlayer(player);

//     it("game is not null", (done) => {
//       expect(game.currentPlayer.totalScore == 0).to.be.true;
//       expect(game.currentPlayer.currentScore == 0).to.be.true;
//       expect(game.currentPlayer.holdingScore == 0).to.be.true;
//     });
//   });

//   describe("Game setGameScore ", function () {
//     let game = new Game();

//     it("Game setAimedScore", (done) => {
//       game.setAimedScore(100);
//       expect(game.aimedScore == 100).to.be.true;
//     });
//   });

//   describe("Game comparePlayerScoreWithGameScore ", function () {
//     let game = new Game();
//     game.setAimedScore(100);

//     it("Game comparePlayerScoreWithGameScore", (done) => {
//       let overScore = game.comparePlayerScoreWithGameScore(101);
//       expect(overScore).to.be.false;

//       overScore = game.comparePlayerScoreWithGameScore(99);
//       expect(overScore).to.be.true;
//     });
//   });

//   describe("Game setWinnerPlayer ", function () {
//     let player = new Player();
//     player.accumulateholdingScore(0);
//     player.accumulateTotalScore(12);
//     let game = new Game();
//     game.decideWinnerPlayer(40);

//     it("Game setWinnerPlayer", (done) => {
//       expect(game.winnerPlayer.holdingScore == 0).to.be.true;
//       expect(game.winnerPlayer.totalScore == 12).to.be.true;
//     });
//   });

//   describe("aimedScore smallest value", function () {
//     it("aimedScore is smaller than 0", (done) => {
//       try {
//         let game = new Game();
//         game.setAimedScore(-1);
//       } catch (err) {
//         console.error(err);
//       }
//     });

//     // Game have to return Fail with msg "Too Small aimed Score"
//   });

//   describe("aimedScore largest value", function () {
//     it("aimedScore is larger than 10000", (done) => {
//       try {
//         let game = new Game();
//         game.setAimedScore(10001);
//       } catch (err) {
//         console.error(err);
//       }
//     });

//     // Game have to return Fail with msg "Too Large aimed Score"
//   });

//   describe("aimedScore is not Integer", function () {
//     // Game have to return Fail with msg "aimedScore have to be Integer"
//   });

//   describe("Player1 keep rolling dice, Get dice point 1", function () {
//     // Show Dice, and Player1`s turn is over
//   });

//   describe("Player1 roll dice once, and hold the dice ", function () {
//     // Player1`s totalScore up, Player1`s turn is over
//   });

//   describe("Player1 roll dice three times, and hold the dice ", function () {
//     // Player1`s totalScore up, Player1`s turn is over
//   });

//   describe("After Player1 turn, Player2 Get dice point 1", function () {
//     // Show Dice, and Player2`s turn is over
//   });

//   describe("After Player1 turn, Player2 roll dice once, and hold the dice ", function () {
//     // Player2`s totalScore up, Player2`s turn is over
//   });

//   describe("After Player1 turn, Player2 roll dice three times, and hold the dice", function () {
//     // Player2`s totalScore up, Player2`s turn is over
//   });

//   describe("Player1 get aimedScore.", function () {
//     // Player1 win
//   });

//   describe("Player2 get aimedScore.", function () {
//     // Player2 win
//   });
// });
