/*  벡터  */
class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 목표 벡터를 향하기 위한 방향 벡터를 반환
     */
    getDirection(vec) {
        return new Vector(vec.x - this.x, vec.y - this.y);
    }

    static zero() {
        return new Vector(0,0);
    }
    /**
     * 정규화
     */
    normalize() {

        // 벡터 크기 계산
        let size = Math.sqrt(this.x ** 2 + this.y ** 2);

        if(size === 0) {
            this.x = 0;
            this.y = 0;
            return this;
        }

        this.x /= size;
        this.y /= size;

        return this;
    }

    get() {
        return {x: this.x, y: this.y}
    }
}