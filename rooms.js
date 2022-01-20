const Room = require("./room");

let allRooms = {};

function randomNumber() {
	let start = 10000,
		range = 99999;
	return String(Math.floor(Math.random() * (range - start) + start));
}

function createRoom(seed) {
	const socket = this;
	//Checks if the seed only conatins digits
	seed = /^\d+$/.test(seed) ? seed : randomNumber();
	roomID = randomNumber();

	console.log("Creating room with code: " + roomID, " and seed: " + seed);
	//create and save room instance
	let room = new Room(roomID, seed);
	allRooms[roomID] = room;

	//leave current room
	if (socket.data.currentRoom) {
		leaveCurrentRoom(socket, socket.data.currentRoom);
	}
	
	//join room and reply
	socket.data.currentRoom = roomID;
	socket.join(roomID);
	socket.emit("joinedRoom", allRooms[socket.data.currentRoom].publicData);
	socket.emit("reply", {"message":"Joining room " + roomID, "type":"success"});

}


function leaveCurrentRoom(socket) {
	let currentRoom = socket.data.currentRoom;
	if (currentRoom != "") {
		allRooms[currentRoom].players--;
		socket.leave(currentRoom);
		socket.to(currentRoom).emit("leftRoom", socket.id);
		socket.emit("reply", {"message":"Left Room", "type":"success"});
	}
}

function joinRoom(roomID) {
	const socket = this;
	leaveCurrentRoom(socket);
	if (allRooms[roomID] && allRooms[roomID].publicData.players < 4) {
		socket.join(roomID);
		socket.data.currentRoom = roomID;
		allRooms[roomID].publicData.players++;
		console.log(socket.id + " joined room " + roomID);
		socket.emit("joinedRoom", allRooms[roomID].publicData);
		socket.emit("reply", {"message":"Joining room " + roomID, "type":"success"});
	} else {
		socket.emit("reply", {"message":"Room not found or is full", "type":"error"});
	}
}

module.exports = {
	createRoom: createRoom,
	joinRoom: joinRoom
};
