class Room {
	constructor(id, seed) {
		this.id = id;
		this.seed = seed;

		this.gameState = "UNBORN";
		this.playerScores = {};
		this.playerAmount = 0;

	}
	getPublicData() {
		return {
			seed:this.seed,
			id:this.id,
			players:this.players
		};
	}
	addToScore() {
		
	}
}

module.exports = Room;
