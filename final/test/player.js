const assert = require('assert');
const chai = require('chai');
const Player = require('../class/player/player.js')
const expect = chai.expect;

describe('Player', function () {
    describe('Player Constructor ', function () {
        let player = new Player();
        it('Player is not null', done => {
            expect(player.totalScore == 0).to.be.true;
            expect(player.currentScore == 0).to.be.true;
            done();
        });
    })
    describe('Player accumulateholdingScore ', function () {
        let player = new Player();
        it('Player holdingScore 증가해야합니다.', done => {
            player.accumulateholdingScore(3);
            expect(player.holdingScore == 3).to.be.true;
            player.accumulateholdingScore(9);
            expect(player.holdingScore == 12).to.be.true;
            player.accumulateholdingScore(12);
            expect(player.holdingScore == 24).to.be.true;
            done();
        });
    });
    describe('Player accumulateTotalScore ', function () {
        let player = new Player();
        player.accumulateTotalScore(2);
        it('Player accumulateTotalScore', done => {
            expect(player.getTotalScore() == 2).to.be.true;
            done();
        });
    });
    describe('Player getTotalScore ', function () {
        let player = new Player();
        player.accumulateTotalScore(2);
        player.accumulateTotalScore(4);
        it('Player getTotalScore', done => {
            expect(player.getTotalScore() == 6).to.be.true;
            done(); // 비동기를 뜻함
        });
    });
});