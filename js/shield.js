/** 보호막 총알 피격 처리 */
function onBarrierHit(bulletPos) {
    let deg = getLookAtDegree(bulletPos,corePos);
    
    barrierHitElement.style.rotate = (deg+50)+'deg';

    // 보호막 효과 애니메이션
    barrierElement.animate([
        {
            boxShadow: `0 0 15px rgba(255, 255, 255, 1) inset`,
        },
        {
            boxShadow: `0 0 10px rgba(255, 255, 255, 0.5) inset`,
        }
    ], {
        fill: 'forwards',
        duration: 300
    })

    // 피격 효과 애니메이션
    barrierHitElement.animate([
        {
            opacity: 1
        },
        {
            opacity: 0
        }
    ], {
        fill: 'forwards',
        duration: 700,
        easing:'ease-out'
    })
}