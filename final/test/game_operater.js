const assert = require("assert");
const chai = require("chai");
const GameOperator = require("../class/game_operator/game_operator.js");
const Play = require("../class/play/play.js");
const Player = require("../class/player/player.js");
const Dice = require("../class/dice/dice.js");

const { get } = require("http");

const expect = chai.expect;

// 콜백 done을 매개변수로 줄 때 비동기처리, done()함수 호출로 해당 작업이 끝났다는 것을 알림. promise와 비슷함
describe("Game operator constructor test", function () {
    const gameOperator = new GameOperator();

    it("Game must be null", (done) => { 
        expect(gameOperator.play === null).to.be.true;
        done(); 
    })

    it("Player 1 must be null", (done) => { 
        expect(gameOperator.playerFirst === null).to.be.true;
        done(); 
    })
    it("Player 2 must be null", (done) => { 
        expect(gameOperator.playerSecond === null).to.be.true;
        done(); 
    })
    it("First dice must be null", (done) => { 
        expect(gameOperator.diceFirst === null).to.be.true;
        done(); 
    })
    it("Second dice must be null", (done) => { 
        expect(gameOperator.diceSecond === null).to.be.true;
        done(); 
    })
});

describe("Game operator prepare test", function () {
    const gameOperator = new GameOperator();
    gameOperator.prepare(100, 1);
    it("Game initial Type Check", (done) =>{
        expect( gameOperator.play instanceof Play).to.be.true;
        done();
    })
    it("Player 1 initial Type Check", (done) =>{
        expect(gameOperator.playerFirst instanceof Player).to.be.true;
        done();
    })
    it("Player 2 initial Type Check", (done) => {
        expect(gameOperator.playerSecond instanceof Player).to.be.true;
        done();
    })
    it("First dice initial Type Check", (done) => {
        expect(gameOperator.diceFirst instanceof Dice).to.be.true;
        done();
    })
    it("Second dice initial Type Check", (done) => {
        expect( gameOperator.diceSecond instanceof Dice).to.be.true;
        done();
    })
    
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

    it("Check aim score has been set correctly", () =>{
        expect(play.aimedScore === 100).to.be.true;
    })

    it("Play must have two players", () => {
        expect(play.playerList.length === 2).to.be.true;
    })
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
        currentPlayer.holdingScore = 0;
    } else {
        player1.accumulateholdingScore(0);
    }
    // it(`[currentPlayerIndex] ${play.turnIndex}`);
    it(`[currentPlayerIndex] check index 0`, () => {
        expect(play.turnIndex === 0).to.be.true;
    });
  

    it(`[nextPlayerIndex] check index 1`, () => {
        play.turnOver();
        expect(play.turnIndex === 1).to.be.true;
    });

    


    describe("play-case1", function () {
        const play = new Play();
        const player1 = new Player();
        const player2 = new Player();

        const dice1 = new Dice(6);
        const dice2 = new Dice(6);
        
        play.initDices(dice1,dice2)

        play.setPlayerList(player1, player2);

        const testPoints = [4, 5];

        play.punishOrAccumulate(testPoints); // play의 트랩포인트 검사 및 합산점수 업데이트

        let currentPlayer = play.getCurrentPlayer();
        let holdingScore = currentPlayer.holdingScore;
        console.log(`currentScore check ${holdingScore}`);

        it(
            "[holdingScore Score Test] Dice Point is ",
            () => {
                expect(holdingScore === 9).to.be.true;
            }
        );

    });

    describe("Check punishment works correctly", function () {
        const play = new Play();
        play.getCurrentPlayer();
        const dice1 = new Dice(1);
        const dice2 = new Dice(6);

        const player1 = new Player();
        const player2 = new Player();

        play.setPlayerList(player1, player2);

        play.initDices(dice1, dice2);

        it("Check play has two dices", (done) => {
            expect(play.diceList.length === 2).to.be.true;
            done();
        });
        //1. 턴 관리 (?)
        //2. 점수 관리

        //3. 점수 (points)에 1이 포함되어 있는지 확인.
        it("Check one of dices value is 1", (done) => {
            play.rollDice();
            console.log("play.points", play.points);
            expect(play.points.includes(1)).to.be.true;
            done();
        });

        // 주사위 값이 1이면 현재 플레이어 점수가 초기화 되는지 확인
        it("Check Player point 0 if one of dices has 1 value", (done) => {
            const currentPlayerIndex = play.currentPlayer
            play.punishTrappedPlayer();
            expect(play.playerList[currentPlayerIndex].currentScore === 0).to.be.true;
            done();
        });
        

    });
});


describe('hooks', function() {
    const play = new Play();

    // 1. 플레이어 세팅
    const player1 = new Player();
    const player2 = new Player();

    // 2. 주사위 세팅
    const dice1 = new Dice(6);
    const dice2 = new Dice(6);

    before('before 초기화 세팅',function() {
        play.setPlayerList(player1, player2);
        play.initDices(dice1, dice2);
        const currentPlayer = play.getCurrentPlayer();

         // 3. 주사위 굴림
         const resultOfRolling = play.rollDice();

         if (play.isTrapPoint(resultOfRolling)) {
             currentPlayer.holdingScore = 0;
         } else {
             player1.accumulateholdingScore(0);
         }
    });

   describe('sssssssss', () =>{

    
       it(`[currentPlayerIndex] check index 0`, () => {
        expect(play.turnIndex === 0).to.be.true;
        });


        it(`[nextPlayerIndex] check index 1`, () => {
            play.turnOver();
            expect(play.turnIndex === 1).to.be.true;
        });
   })

// test cases                                                                                                                                                                                                                                                                                                                                  
});
