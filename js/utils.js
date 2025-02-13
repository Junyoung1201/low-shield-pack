const bulletsElement = document.querySelector("div#bullets");
const barrierElement = document.querySelector("div#shield>div.barrier");
const barrierHitElement = document.querySelector("div#shield>div.hit-barrier");
const coreElement = document.querySelector("div#shield>div.core");

let corePos = getElementCenterPos(coreElement)

window.onresize = (e) => {
    corePos = getElementCenterPos(coreElement);
}

/**
 * 특정 위치가 보호막과 닿는지 여부 반환
 */
function isBarrierCollision({x,y}) {

    // 보호막 가로 시작 위치, 끝 위치
    let rect = barrierElement.getBoundingClientRect();

    let startX = rect.left;
    let endX = rect.left + rect.width;
    
    let startY = rect.top;
    let endY = rect.top + rect.height;

    // 총알 위치

    return startX <= x && endX >= x && startY <= y && endY >= y;
}

/**
 * 요소가 화면 밖으로 나갔는지 여부 반환
 */
function isOut(element) {
    let pos = getElementCenterPos(element)
    
    return window.innerWidth <= pos.x || window.innerHeight <= pos.y
}

/**
 * 화면을 기준으로 특정 요소의 중심 위치를 반환
 */
function getElementCenterPos(element) {

    let rect = element.getBoundingClientRect(); 
    let x = rect.left + rect.width / 2; 
    let y = rect.top + rect.height / 2;

    return new Vector(x,y);
}

/**
 * 특정 위치에서 다른 위치를 향하는 방향 각도를 반환
 * 각도는 CSS Rotate 기준
 */
function getLookAtDegree(v1,v2) {
    let {x: fromX,y: fromY} = v1;
    let {x: toX, y: toY} = v2;

    let x = fromX - toX
    let y = fromY - toY
    
    // 라디안 값
    let rad = Math.atan2(y,x);

    // 라디안(rad)을 각도(deg)로 변환 후
    // 90도 보정 (Math.atan2는 (1,0)이 기준, css의 rotate는 (0,1)이 기준)
    return rad * (180 / Math.PI) + 90;
}