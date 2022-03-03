import {gameInstance} from "./main.js";

function notification(message, type) {
	notifications.style.opacity = 1;

	if (type === "success") {
		notifications.classList.remove("error");
		notifications.classList.add("success");
	} else if (type === "error") {
		notifications.classList.remove("success");
		notifications.classList.add("error");
	}
	notifications.textContent = message;
	clearTimeout(notifications.timer);
	notifications.timer = setTimeout(() => {notifications.style.opacity = 0},6000)

	setTimeout(() => {
		notifications.style.opacity = 0;
	}, 6000);
}
import {engine} from "./matterComponents.js"
import {socket} from "./main.js"
function collisions() {
	let player = gameInstance.player;
	let collisions = Matter.Detector.collisions(engine.world, player.body);
	if (collisions.length > 0) {
		collisions.forEach((element) => {
			let bodies = [element.parentA, element.parentB];
			let bullet = bodies.find((body) => body.label == "bullet");
			let powerup = bodies.find((body) => body.label == "powerup");
			let playerBody = bodies.find((body) => body.label == "player");
			if (bullet && playerBody) {
				player.die();
				socket.emit("playerDied");
			}
			if (powerup && playerBody) {
				powerup.object.pickUp(player);
				console.log(powerup.object.id)
				socket.emit("deletePowerup",powerup.object.id)
			}
		});
	}
}

function updateLobbyInfo(lobbyData) {
	playersInfo.innerHTML = "";
	let players = lobbyData.players;
	let mainPlayer;
	players.forEach((player) => {
		let playerInfo = document.createElement("div");
		if (player.id == socket.id) {
			mainPlayer = player
		} else {
			let opponent = gameInstance.opponents.find((opponent) => opponent.id == player.id);
			if (opponent && player.color != opponent.color) {

				opponent.updateColor(player.color);
			}
		}
		let name = document.createElement("h2");
		name.innerHTML = player.username;

		let score = document.createElement("p");
		score.innerHTML = player.score;

		playerInfo.appendChild(name);
		playerInfo.appendChild(score);
		playersInfo.appendChild(playerInfo);
	});

	lobbyCode.innerHTML = lobbyData.id;
	seed.innerHTML = lobbyData.seed;
	if (mainPlayer.number) gameInstance.player.setStartingPos(mainPlayer.number);


}


export {notification, collisions, updateLobbyInfo}