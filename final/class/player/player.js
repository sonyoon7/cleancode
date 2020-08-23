module.exports = class Player {
    constructor() {
        this.totalScore = 0;
        this.currentScore = 0;
        this.holdingScore = 0;
    }

    // 한 턴에 누적점수 세팅 메서드
    accumulateholdingScore(currentScore) { this.holdingScore += currentScore; }

    // 총 점수 누적하는 메서드
    accumulateTotalScore(holdingScore) { this.totalScore += holdingScore; }

    // 누적점수 가져오는 메서드
    getTotalScore() { return this.totalScore; }
}