const Dice = require('../dice/dice.js')
const Player = require('../player/player.js')

module.exports = class Game {
    constructor() {
        this.aimedScore = 0; // 목표점수
        this.trapDicePoint = 1; // 점수를 무효화하는 주사위 숫자
        this.turnIndex = 0;
        this.currentPlayer;
        this.winnerPlayer;
        this.playerList = [];
        this.diceList = [];
    }

    // 현재 플레이어를 설정합니다.
    setCurrentPlayer() {
        this.currentPlayer = playerList[this.turnIndex];
    }

    setAimedScore(score) {
        this.aimedScore = (score >= 0 && score <= 100) ? score : 0;
    }

    // 플레이어의 점수와 목표 점수를 비교합니다.
    comparePlayerScoreWithAimedScore(currentPlayerScore) {
        if (this.aimedScore <= currentPlayerScore) {
            return true;
        }
        return false
    }

    decideWinnerPlayer(currentPlayerScore) {
        if (this.comparePlayerScoreWithGameScore(currentPlayerScore)) {
            this.winnerPlayer = this.currentPlayer
        }
    }

    //게임에 사용될 주사위를 만듭니다
    setDiceList(NumberOfFirstDiceFace, NumberOfSecondDiceFace) {
        let firstDice = new Dice(NumberOfFirstDiceFace);
        let secondDice = new Dice(NumberOfSecondDiceFace);

        this.diceList.push(firstDice);
        this.diceList.push(secondDice);
    }

    //플레이어를 추가합니다
    setPlayerList() {
        let firstPlayer = new Player();
        let secondPlayer = new Player();

        this.playerList.push(firstPlayer);
        this.playerList.push(secondPlayer);
    }

    //주사위 굴린다
    rollDice() {
        let points = [];
        for (dice of diceList) {
            points.push(dice.roll());
        }
        return points;
    }

    //주사위를 굴려서 나온 점수를 보고 어케할까
    punishOrAccumulate(points) {
        if (isTrapPoint(points)) {
            punishTrappedPlayer();
        } else {
            this.currentPlayer.accumulateholdingScore();
        }
    }

    //trapPoint인지 체크한다.
    isTrapPoint(points) {
        return points.includes(trapDicePoint);
    }

    punishTrappedPlayer() {
        //1. 현재 플레이어의 주사위 중 하나의 값이 1인 경우, currentPlayer의 점수를 0으로 만든다
        this.currentPlayer.holdingScore = 0;
        //2. 턴을 넘긴다
        turnOver();
    }

    //턴 넘긴다
    turnOver() {
        if (this.turnIndex >= playerList.size()) {
            this.turnIndex = 0;
        } else {
            this.turnIdex++;
        }
        setCurrentPlayer();
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
    initiateGame() {
        this.aimedScore = 0;
        this.trapDicePoint = 1;
        this.turnIndex = 0;
        this.currentPlayer = undefined;
        this.winnerPlayer = undefined;
        this.playerList.length = 0;
        this.diceList.length = 0;
    }
}