class Room {
	constructor(id, seed, io) {
		this.id = id;
		this.seed = seed;
		this.io = io;
		this.gameState = "UNBORN";
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
	addPlayer(playerID) {
		let newPlayer = {
			score: 0,
			id: playerID
		};
		this.players.push(newPlayer);
	}

	removePlayer(playerID) {
		this.players.splice(this.players.findIndex(player => player.id === playerID), 1);
	}
	startGame() {
		this.gameState = "PLAYING";
		this.deadPlayers = [];
		this.io.in(this.id).emit("newRound");
	}
	playerDied(socket) {
		this.deadPlayers.push(socket.id);
		socket.to(this.id).emit("playerDied", socket.id);

		if (this.deadPlayers.length == this.players.length - 1) { //if only one player is left
			this.newRound();
			this.io.in(this.id).emit("newRound");
		}
			
	}
	newRound() {
		let scoreToAdd = 1;
		this.deadPlayers.forEach(id => {
			this.players.find(player => player.id === id).score += scoreToAdd;
			scoreToAdd++;
		});
		this.io.in(this.id).emit("updateLobbyInfo", this.players);
		this.deadPlayers = [];
	}
}

module.exports = Room;
