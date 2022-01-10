let keysDown = new Set();
document.addEventListener('keyup', e => keysDown.delete(e.key), false);

function movement() {
    if(keysDown.has("w")) drive(0.01); //up
    if(keysDown.has("s")) drive(-0.01); //down
    if(keysDown.has("d")) rotate(0.2); //right
    if(keysDown.has("a")) rotate(-0.2); //left
}