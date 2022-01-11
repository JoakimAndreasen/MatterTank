const Room = require("./room");

function createRoom(socket, seed, lobbyNumber) {
	//Checks if the seed only conatins digits
	if (!/^\d+$/.test(seed)) {
		seed = Math.floor(Math.random() * 100000);
	}

	console.log("Creating room with code: " + lobbyNumber, " and seed: " + seed);

	socket.join(lobbyNumber);
	console.log(socket.rooms);
	let room = new Room(lobbyNumber, seed);
	return room;
}

module.exports = {
	createRoom: createRoom,
};
