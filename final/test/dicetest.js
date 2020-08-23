var assert = require('assert');
const chai = require('chai');
const Dice = require('../class/dice/dice.js')
const expect = chai.expect;

// var dicetest = require('./dicetest').dicetest;

// describe('inner', function () {
//     let dicetest = new dicetest(6);
//     it('test start', () => {
//         dicetest.sayHello();
//     });
// });

// 체크할것(원준이형 마이크)
// 1. 정수인지 
// 2. 범위안에 있는지
// 

describe('dice CLASS 테스트', function () {
    let dice = new Dice(6);
    let roll = dice.roll();
    it('테스트 나와라!!!!', done => {
        expect(roll <= 6).to.be.true
        done();
    });
})