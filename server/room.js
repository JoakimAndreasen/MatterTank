class Room {
	constructor(id, seed) {
		this.id = id;
		this.seed = seed;
		this.players = {};
		this.gameState = "UNBORN";
		this.score = [];
	}

	updatePlayers(room) {
		room.emit("update", {
			players: this.players,
		});
	}
}

module.exports = Room;
