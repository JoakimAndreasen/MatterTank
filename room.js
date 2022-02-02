class Room {
	constructor(id, seed) {
		this.id = id;
		this.seed = seed;

		this.gameState = "UNBORN";
		this.score = [];
		this.players = [];
		this.publicData = {seed:this.seed,id:this.id,players:this.players};
	}
	addToScore() {
		
	}
}

module.exports = Room;
