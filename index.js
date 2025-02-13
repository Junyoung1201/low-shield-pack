window.onclick = (e) => {
    console.log(`x: ${e.clientX}, y: ${e.clientY}`);

    createBullet(new Vector(e.clientX,e.clientY));

}

window.onmousemove = (e) => {
    let barrierCenterPos = getElementCenterPos(barrierElement);
    let mousePos = new Vector(e.clientX, e.clientY);

    let deg = getLookAtDegree(mousePos,barrierCenterPos)

    deg += 45;

    //barrierHitElement.style.rotate = `${deg}deg`
}