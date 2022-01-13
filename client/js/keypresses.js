let keysDown = new Set();

document.addEventListener(
	"keydown",
	(e) => {
		if (!e.repeat) {
			if (e.key == " ") {
				player.fire();
			} else if (e.key == "b") {
				for (let x = 0; x < 10; x++) {
					player.fire();
				}
			} else {
				keysDown.add(e.key);
			}
		}
	},
	false
);
document.addEventListener("keyup", (e) => keysDown.delete(e.key), false);

function movement() {
	if (keysDown.has("d")) player.rotate(0.15); //right
	if (keysDown.has("a")) player.rotate(-0.15); //left
	if (keysDown.has("w")) player.drive(0.025); //up
	if (keysDown.has("s")) player.drive(-0.025); //down

	keysDown.has("s") ? (player.dir = -1) : (player.dir = 1);


}

