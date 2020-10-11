const Dice = require("../dice/dice.js");
const Player = require("../player/player.js");

module.exports = class Play {
    constructor() {
        this.aimedScore = 0; // 목표점수
        this.trapDicePoint = 1; // 점수를 무효화하는 주사위 숫자
        this.turnIndex = 0;
        this.currentPlayer = 0; // 현재 플레이어의 index === undefined
        this.winnerPlayer;
        this.playerList = [];
        this.diceList = [];
        this.points = [];
    }

    // 현재 플레이어를 설정합니다.
    getCurrentPlayer() {
        // this.currentPlayer = this.playerList[this.turnIndex];
        // return this.currenyPlayer;
        // this.currentPlayer => 얘가 없는거 같아요?
        // currentPlayer 얘가 현재 플레이어 판단하는 index인데 초기화는 안되어있음
        console.log("현재 플레이어 인덱스 : ", this.currentPlayer);
        console.log("플레이어 리스트 : ", this.playerList);
        console.log(`check point ${this.playerList[this.currentPlayer]}`);
        return this.playerList[this.currentPlayer];
    }

    setAimedScore(score) {
        this.aimedScore = score >= 0 && score <= 100 ? score : 0;
    }

    // 플레이어의 점수와 목표 점수를 비교합니다.
    comparePlayerScoreWithAimedScore(currentPlayerScore) {
        if (this.aimedScore <= currentPlayerScore) {
            return true;
        }
        return false;
    }

    decideWinnerPlayer(currentPlayerScore) {
        if (this.comparePlayerScoreWithPlayScore(currentPlayerScore)) {
            this.winnerPlayer = this.currentPlayer;
        }
    }

    //게임에 사용될 주사위를 만듭니다
    initDices(firstDice, secondDice) {
        this.diceList.push(firstDice);
        this.diceList.push(secondDice);
    }

    //플레이어를 추가합니다
    setPlayerList(firstPlayer, secondPlayer) {
        this.playerList.push(firstPlayer);
        this.playerList.push(secondPlayer);
    }

    //주사위 굴린다
    rollDice() {
        this.points = [];
        for (let dice of this.diceList) {
            this.points.push(dice.roll());
        }
        return this.points;
    }

    //주사위를 굴려서 나온 점수를 보고 어케할까
    punishOrAccumulate(points) {
        this.points = points;
        if (this.isTrapPoint(this.points)) {
            this.punishTrappedPlayer();
        } else {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let sumScore = points.reduce(reducer);
            console.log(`punishOrAccumulate check ${sumScore}`) // 여기선 9가 제대로 체크됨
            this.playerList[this.currentPlayer].accumulateholdingScore(sumScore);
            console.log(`세팅된 점수 업데이트 확인 ${this.playerList[this.currentPlayer].currentScore}`);
        }
    }

    //trapPoint인지 체크한다.
    isTrapPoint(points) {
        // includes 문자열로 알고있는데 => 테스트해봤는데 배열에서는 인자값으로 찾음
        return this.points.includes(this.trapDicePoint);
    }

    punishTrappedPlayer() {
        //1. 현재 플레이어의 주사위 중 하나의 값이 1인 경우, currentPlayer의 점수를 0으로 만든다
        console.log(this.currentPlayer);
        console.log(this.playerList[this.currentPlayer]);
        this.playerList[this.currentPlayer].holdingScore = 0;
        //2. 턴을 넘긴다
        this.turnOver();
    }

    //턴 넘긴다
    turnOver() {
        if (this.turnIndex >= this.playerList.length) {
            this.turnIndex = 0;
        } else {
            this.turnIndex++;
        }
        this.currentPlayer = this.turnIndex;
    }

    holdScore() {
        // 1. 홀드를 클릭하는 플레이어 (현재 플레이어)의 승/패 여부를 확인한다.
        // 1-1. 현재 플레이어가 승리한 경우 게임을 종료한다.
        if (currentPlayer.totalScore >= aimedScore) {
            return true;
        } else {
            // 2. currentPlayer의 점수를 누적시킨다
            // 3. 현재 플레이어의 점수가 목표 점수에 미치지 못하는 경우, 다음 플레이어에게 턴을 넘긴다.
            currentPlayer.accumulateTotalScore();

            return false;
        }
    }

    // 게임 클래스 초기화
    initiatePlay() {
        this.aimedScore = 0;
        this.trapDicePoint = 1;
        this.turnIndex = 0;
        this.currentPlayer = undefined;
        this.winnerPlayer = undefined;
        this.playerList.length = 0;
        this.diceList.length = 0;
    }
};
