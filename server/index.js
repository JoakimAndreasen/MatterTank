//Import helper functions
const {createRoom,joinRoom} = require("./socketFunctions.js");

const options = {cors: {origin: '*'} };

const io = require("socket.io")(3000,options);

io.on("connection", (socket) => {
	console.log(socket.id, "joined the server");
	socket.data.currentRoom = "";

	socket.on("create-room", createRoom);

	socket.on("join-room", joinRoom);

	socket.on("updatePlayers", (playerData) => {
		if (socket.data.currentRoom) {
			socket.to(socket.data.currentRoom).emit("updatePlayers", [playerData, socket.id]);
		}
	});

	socket.on("updateBullets", (bulletsData) => {
		if (socket.data.currentRoom) {
			socket.to(socket.data.currentRoom).emit("updateBullets", [bulletsData, socket.id]);
		}
	});

	socket.on("playerDied", () => {
		if (socket.data.currentRoom) {
			socket.to(socket.data.currentRoom).emit("playerDied", socket.id);
		}
	});

	socket.on("addToScore", () => {
		if (socket.data.currentRoom) {
			allRooms[socket.data.currentRoom].publicData.score++; ///
			socket.to(socket.data.currentRoom).emit("updatePlayers", [playerData, socket.id]);
		}
	});

	socket.on("disconnecting", (reason) => {
		for (const room of socket.rooms) {
		  if (room !== socket.id) {
			socket.to(room).emit("leftRoom", socket.id);
		  }
		}
	  });
});

//io.to("room1").emit("message", "Hello from room1");
console.log("Server started");

