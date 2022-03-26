class Room {
	constructor(id, seed, staticSeed,size, io) {
		this.id = id;
		this.seed = seed;
		this.staticSeed = staticSeed;
		this.io = io;
		this.size = size;
		this.gameState = "PLAYING";
		this.players = [];
		this.deadPlayers = [];
		this.chat = [];
		this.powerups = [];
		this.powerupDelay = setInterval(() => this.spawnPowerUp(), 20000);
	}

	getRoomData() {
		return {
			seed: this.seed,
			id: this.id,
			size: this.size,
			playerAmount: this.players.length,
			players: this.players,
		};
	}
	/*addToScore(playerID, amount) {
		let player = this.players.find(player => player.id === playerID);
		if (player) {
			player.score += amount;
		}
	}*/

	addChatMessage(socket, messageData) {
		this.chat.push(messageData);
	}

	getAllMessages(socket) {
		this.chat.forEach((element) => {
			socket.emit("chat-message", {
				message: element.message,
				username: element.username,
			});
		});
	}

	getNextEmptyPlayerNumber() {
		let playerNumbers = this.players.map((player) => player.number);
		let nextEmptyPlayerNumber = 1;
		while (playerNumbers.includes(nextEmptyPlayerNumber)) {
			nextEmptyPlayerNumber++;
		}
		return nextEmptyPlayerNumber;
	}

	updatePlayerNumbers() {
		this.players.forEach((player) => {
			let nextNumber = this.getNextEmptyPlayerNumber();
			player.number =
				nextNumber > player.number ? player.number : nextNumber;
		});
	}

	addPlayer(socket) {
		let newPlayer = {
			score: 0,
			id: socket.id,
			color: socket.data.color ?? "#00ff00",
			number: this.getNextEmptyPlayerNumber(),
			username:
				socket.data.username ??
				"Guest" + Math.floor(Math.random() * 1000),
		};
		this.players.push(newPlayer);
	}

	removePlayer(playerID) {
		this.players.splice(
			this.players.findIndex((player) => player.id === playerID),
			1
		);
		if (this.players.length <= 1) {
			//if only one player is left
			this.newRound();
		}
	}
	updateUsername(socket, username) {
		if (username != "" || username != " ") {
			//USERNAME check here
			socket.data.username = username;
			let player = this.players.find((player) => player.id === socket.id);
			if (player) {
				player.username = username;
			}
			this.io.in(this.id).emit("updateLobbyInfo", this.getRoomData());
		}
	}
	updateColor(socket, color) {
		socket.data.color = color;
		let player = this.players.find((player) => player.id === socket.id);
		if (player) {
			player.color = color;
		}
		this.io.in(this.id).emit("updateLobbyInfo", this.getRoomData());
	}
	startGame() {
		if (this.players.length > 1) {
			this.gameState = "PLAYING";
			this.deadPlayers = [];
			this.io.in(this.id).emit("newRound", "Game Starting");
		} else {
			this.io
				.in(this.id)
				.emit(
					"error",
					"You can't start a game with only one player!",
					"error"
				);
		}
	}
	playerDied(socket) {
		let currentPlayer = this.deadPlayers.find((id) => id === socket.id);
		if (!currentPlayer && this.gameState === "PLAYING") {
			this.deadPlayers.push(socket.id);
			socket.to(this.id).emit("playerDied", socket.id);

			if (this.deadPlayers.length >= this.players.length - 1) {
				//if only one player is left
				this.newRound();
			}
		}
	}

	randomNumber() {
		let start = 10000,
			range = 99999;
		return String(Math.floor(Math.random() * (range - start) + start));
	}

	spawnPowerUp() {
		if (this.powerups.length < 3) {
			let pid = String(this.randomNumber());
			this.powerups.push(pid);
			this.io.in(this.id).emit("spawnPowerup", {
				x: Math.floor(Math.random() * 3) * 200 + 300,
				y: Math.floor(Math.random() * 3) * 200 + 300,
				pid: pid,
			});
		}
	}

	deletePowerup(socket, pid) {
		this.powerups.splice(this.powerups.indexOf(pid), 1);
		this.io.in(this.id).emit("deletePowerup", { pid });
	}

	deleteAllPowerups() {
		this.powerups.forEach((id) => {
			this.deletePowerup("", id);
		});
		this.powerups = [];
	}

	newRound() {
		this.updatePlayerNumbers();
		this.gameState = "PAUSED";
		let scoreToAdd = 0;
		this.deadPlayers.reverse().forEach((id) => {
			let player = this.players.find((player) => player.id === id);
			if (player) player.score += scoreToAdd;
			scoreToAdd++;
		});
		let IDs = this.players.map((player) => player.id);
		let winnerID = IDs.find((id) => !this.deadPlayers.includes(id));

		if (!this.staticSeed) {
			this.seed = this.randomNumber();
		}
		if (winnerID) {
			let winner = this.players.find((player) => player.id === winnerID);
			let winnername = "";
			if (winner) winnername = winner.username;
			this.io
				.in(this.id)
				.emit("newRound", { winner: winnername, seed: this.seed });
			if (winner) winner.score += scoreToAdd;
		} else {
			this.io
				.in(this.id)
				.emit("newRound", { winner: "", seed: this.seed });
		}
		this.io.in(this.id).emit("updateLobbyInfo", this.getRoomData());
		this.deadPlayers = [];
		this.deleteAllPowerups();
		this.spawnPowerUp();
		setTimeout(() => {
			this.gameState = "PLAYING";
		}, 2000);
	}
}

module.exports = Room;
