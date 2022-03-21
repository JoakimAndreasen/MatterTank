//Import helper functions
const {createRoom,joinRoom, callRoomFunction, leaveCurrentRoom } = require("./socketFunctions.js");

const options = {cors: {origin: '*'} };

const io = require("socket.io")(process.env.PORT || 3000,options);

io.on("connection", (socket) => {
	console.log(socket.id, "joined the server");
	socket.data.currentRoom = "";

	socket.on("updateUsername", (username) => {callRoomFunction(socket,"updateUsername",username)});
	socket.on("updateColor", (color) => {callRoomFunction(socket,"updateColor",color)});

	socket.on("create-room", ([seed, size]) => {createRoom(socket,seed,size,io)});
	socket.on("join-room", (roomID) => {joinRoom(roomID,socket,io)});
	socket.on("leave-room", () => {leaveCurrentRoom(socket)});
	//socket.on("start-game", () =>{callRoomFunction(socket,"startGame")});
	socket.on("playerDied", () =>{callRoomFunction(socket,"playerDied")});
	socket.on("deletePowerup", (pid) =>{callRoomFunction(socket,"deletePowerup",pid)});

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

	socket.on('send-chat-message',message => {
        socket.to(socket.data.currentRoom).emit('chat-message', {message: message, username: socket.data.username})
		callRoomFunction(socket,"addChatMessage",{message: message, username: socket.data.username})
    })

	socket.on("disconnecting", (reason) => {
		leaveCurrentRoom(socket);
	  });
});


console.log("Server started");

