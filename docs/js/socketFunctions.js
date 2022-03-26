
import {updateLobbyInfo, notification} from "./gameElements.js"
import {regenerateLevel} from "./grid.js"
import {changeWorldSize} from "./matterComponents.js"
import {Opponent} from "./classes/Opponent.js"
import {speedBoost} from "./classes/Powerups.js"
import {gameInstance} from "./main.js"
import {setLobbySection} from "./menu.js"

function setupSocket(socket) {
	socket.on("connect_error", (err) => {
		if (err = "xhr poll error") console.log("Couldn't connect to server... trying again."); 
	});
	
	socket.on("connect", () => {
		notification("Connected to server!", "success");
	});
	
	socket.on("reply", (reply) => {
		notification(reply.message, reply.type);
	});

	socket.on("joinedRoom", (roomData) => {
		let player = gameInstance.player;
		gameInstance.pausePlayerCollision();
		let playerNumber = roomData.players.find((player) => player.id == socket.id).number
		//set spawn position
		player.setStartingPos(playerNumber, roomData.size);
		player.resetPosition();
		// if (roomData.playerAmount == 4) {
		// 	startGameButton.style.display = "block";
		// }

		gameInstance.clearOpponents();
		console.log(roomData.size)
		if (gameInstance.size != roomData.size) {
			changeWorldSize(roomData.size);
			gameInstance.size = roomData.size;
		}
		regenerateLevel(roomData.seed);
		gameInstance.resetLevel();

		if (usernameInput.value){
			socket.emit("updateUsername", usernameInput.value);
		}

		setLobbySection("inLobby");
		updateLobbyInfo(roomData);
	});

	socket.on("leftRoom", (id) => {
		console.log("Left room: " + id);
		let opponent = gameInstance.opponents.find((e) => e.id == id);
		console.log(gameInstance.opponents);
		if (opponent) {
			gameInstance.opponents.splice(gameInstance.opponents.indexOf(opponent), 1);
			Matter.Composite.remove(gameInstance.opponentComposite, opponent.body);
		}
	});
	
	socket.on("updatePlayers", (data) => {
		let position = data[0];
		let id = data[1];
		let opponent = gameInstance.opponents.find((e) => e.id == id);

		if (!opponent) {
			let newOpponent = new Opponent(id);
			gameInstance.pausePlayerCollision();
			gameInstance.opponents.push(newOpponent);

		} else {
			opponent.update(position.position, position.angle);
		}
	});

	socket.on("updateBullets", (data) => {
		let [bulletsData, id] = data;
		let opponent = gameInstance.opponents.find((e) => e.id == id);
		if (opponent) {
			opponent.updateBullets(bulletsData);
		}
	});

	socket.on("playerDied", (id) => {
		let opponent = gameInstance.opponents.find((e) => e.id == id);
		if (opponent) {
			console.log("Player died: " + opponent.id);
			opponent.die();
		}
	});

	socket.on("spawnPowerup", ({x,y, pid}) => {
		gameInstance.powerups.push(new speedBoost(x, y, pid));
	});

	socket.on("deletePowerup", ({pid}) => {
		let powerup = gameInstance.powerups.find((e) => e.id == pid)
		if( powerup ){
		console.log(powerup)
			powerup.die()
		}
	});


	socket.on("updateLobbyInfo", updateLobbyInfo);

	socket.on("newRound", (data) => {gameInstance.newRound(data)});
	socket.on("error", errorMessage => notification(errorMessage,'error'));
}
export {setupSocket}