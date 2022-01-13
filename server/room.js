class Room {
	constructor(id, seed) {
		this.id = id;
		this.seed = seed;

		this.gameState = "UNBORN";
		this.score = [];
		this.publicData = {seed:this.seed,id:this.id,players:0};
	}

}

module.exports = Room;
