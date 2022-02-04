class Room {
	constructor(id, seed, io) {
		this.id = id;
		this.seed = seed;
		this.io = io;
		this.gameState = "PLAYING";
		this.players = [];
		this.deadPlayers = [];
	}

	getRoomData() {
		return {
			seed:this.seed,
			id:this.id,
			playerAmount: this.players.length,
			players: this.players
		};
	}
	/*addToScore(playerID, amount) {
		let player = this.players.find(player => player.id === playerID);
		if (player) {
			player.score += amount;
		}
	}*/
	addPlayer(socket) {
		let newPlayer = {
			score: 0,
			id: socket.id,
			username: socket.data.username != "Guest" ? socket.data.username : "Guest"
		};
		this.players.push(newPlayer);
	}

	removePlayer(playerID) {
		this.players.splice(this.players.findIndex(player => player.id === playerID), 1);
	}
	updateUsername(socket, username) {
		if (username !="" || username !=" ") { //USERNAME check here
			socket.data.username = username;
			let player = this.players.find(player => player.id === socket.id);
			if (player) {
				player.username = username;
			}
			this.io.in(this.id).emit("updateLobbyInfo", this.getRoomData());
		}
	}
	startGame() {
		this.gameState = "PLAYING";
		this.deadPlayers = [];
		this.io.in(this.id).emit("newRound", "Game Starting");
	}
	playerDied(socket) {
		let currentPlayer = this.deadPlayers.find(id => id === socket.id);
		if (!currentPlayer && this.gameState === "PLAYING") {
			this.deadPlayers.push(socket.id);
			socket.to(this.id).emit("playerDied", socket.id);

			if (this.deadPlayers.length >= this.players.length - 1) { //if only one player is left
				this.newRound();
			}
		};	
	}
	newRound() {
		this.gameState = "PAUSED";
		let scoreToAdd = 1;
		this.deadPlayers.reverse().forEach(id => {
			this.players.find(player => player.id === id).score += scoreToAdd;
			scoreToAdd++;
		});
		let IDs = this.players.map(player => player.id);
		let winnerID = IDs.find(id => !this.deadPlayers.includes(id));
		if (winnerID) {
			let winner = this.players.find(player => player.id === winnerID);
			this.io.in(this.id).emit("newRound",winner.username);
			winner.score += scoreToAdd;
		}
		this.io.in(this.id).emit("updateLobbyInfo", this.getRoomData());
		this.deadPlayers = [];
		setTimeout(() => {
			this.gameState = "PLAYING";
		}, 2000);
	}
}

module.exports = Room;
