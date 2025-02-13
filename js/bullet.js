/**  총알 속도  */
const BULLET_SPEED = 10;

function createBullet({x,y}) {
    let bullet = document.createElement("div")
    bullet.className = "bullet";
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y-15}px`;

    let bulletContent = document.createElement("div");

    bullet.appendChild(bulletContent);

    bulletsElement.appendChild(bullet);

    // 총알 방향 벡터
    let originBulletDir = new Vector(x,y).getDirection(corePos);
    let bulletDir = new Vector(x,y).getDirection(corePos).normalize();

    let bulletUpdateTimer;

    console.log(`방향 벡터: ${originBulletDir.x}, ${originBulletDir.y} --> 정규화된 벡터: ${bulletDir.x}, ${bulletDir.y}`)

    /*  총알 이동 함수  */
    function move() {
        let {left:prevLeft,top:prevTop} = bullet.getBoundingClientRect()
        
        let _x = bulletDir.x * BULLET_SPEED;
        let _y = bulletDir.y * BULLET_SPEED;

        let nextLeft = prevLeft+_x;
        let nextTop = prevTop+_y;

        bullet.style.left = `${nextLeft}px`;
        bullet.style.top = `${nextTop}px`;
    }

    /*  총알 생성 시 회전 시키는 함수  */
    function rotate() {
        let rect = bullet.getBoundingClientRect();
        let x = rect.left;
        let y = rect.top;

        let deg = getLookAtDegree(new Vector(x,y), new Vector(x+bulletDir.x,y+bulletDir.y));
        bulletContent.style.rotate = deg+'deg';
    }
    
    /*  총알 요소 삭제 함수  */
    function destroy() {
        clearInterval(bulletUpdateTimer);
        bullet.remove();
    }

    rotate();

    bulletUpdateTimer = setInterval(() => {
        move();

        // 저각 보호막에 닿았으면 삭제 후 피격 함수 호출
        let bulletRect = bullet.getBoundingClientRect();
        let bulletHitPos = new Vector(bulletRect.width+bulletRect.left, bulletRect.height+bulletRect.top);

        if(isBarrierCollision(bulletHitPos)) {
            onBarrierHit(bulletHitPos);
            destroy();
        }

        // 화면 밖으로 나갔으면 삭제
        else if(isOut(bullet)) {
            destroy();
        }
    },10);
}