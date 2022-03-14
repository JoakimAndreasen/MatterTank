import {gameInstance} from "./main.js";

let keysDown = new Set();
let typing = false;
document.addEventListener(
	"keydown",
	(e) => {
		if (!e.repeat && !typing) {
			if (e.key == controls.player1.shoot) {
				gameInstance.player.fire();
			} else if (e.key == "b") {
				for (let x = 0; x < 10; x++) {
					gameInstance.player.fire();
				}
			} else {
				keysDown.add(e.key);
			}
		}
	},
	false
);
document.addEventListener("keyup", (e) => keysDown.delete(e.key), false);

let controlsPreset = {
    player1: {
        forward: "w",
    	backward: "s",
        right: "d",
		left: "a",
		shoot: " "
    },
	player2: {
        forward: "ArrowUp",
    	backward: "ArrowDown",
        right: "ArrowRight",
		left: "ArrowLeft",
		shoot: "m"
    }
}

let controls = localStorage.getItem('controls') ? localStorage.getItem('controls') : JSON.stringify(controlsPreset);
controls = JSON.parse(controls);

Object.keys(controls).forEach(category => {
	Object.keys(controls[category]).forEach(setting => {
		document.getElementById(category + setting).textContent = controls[category][setting];
	})
})

document.querySelectorAll('.setting').forEach(item => {
	item.addEventListener('keydown', updateControl)
})

function updateControl(e) {
	this.textContent = e.key;
}

let saveSettings = document.getElementById("saveSettings");
saveSettings.addEventListener('click', saveControls);

function saveControls() {
	//Player 1 controls
	controls.player1.forward = document.getElementById("player1forward").textContent;
	controls.player1.backward = document.getElementById("player1backward").textContent;
	controls.player1.right = document.getElementById("player1right").textContent;
	controls.player1.left = document.getElementById("player1left").textContent;
	controls.player1.shoot = document.getElementById("player1shoot").textContent;

	//Player 2 controls
	controls.player2.forward = document.getElementById("player2forward").value;
	controls.player2.backward = document.getElementById("player2backward").value;
	controls.player2.right = document.getElementById("player2right").value;
	controls.player2.left = document.getElementById("player2left").value;
	controls.player2.shoot = document.getElementById("player2shoot").value;
	
	localStorage.setItem('controls', JSON.stringify(controls));
}

function movement() {
	let player = gameInstance.player;
	if (keysDown.has(controls.player1.forward)) player.drive(0.025); //up
	if (keysDown.has(controls.player1.backward)) player.drive(-0.025); //down
	if (keysDown.has(controls.player1.right)) player.rotate(0.15); //right
	if (keysDown.has(controls.player1.left)) player.rotate(-0.15); //left

	keysDown.has(controls.player1.backward) ? (gameInstance.player.dir = -1) : (gameInstance.player.dir = 1);
}

function startTyping() {
	typing = true;
}

function stopTyping() {
	typing = false;
}

export {movement, startTyping, stopTyping};