module.exports = class Dice {
    // 무의미한 변수
    //  1. 1~6 중에 랜덤하게 롤
    //  2. 멤버로 face(면)로 point(주사위 값)
    //  3. 함수 : 3-1 주사위를 굴리는 함수 (rollDice)
    constructor(face) {
        this.point = 0;
        this.face = face;
    }

    // 주사위굴리기
    roll() {
        return Math.floor(Math.random() * this.face + 1);
    }

}

