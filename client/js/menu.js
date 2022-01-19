

//Gets the chat form, input and container from the HTML document
let createLobbyButton = document.getElementById("createLobbyButton");
let seedInput = document.getElementById("seedInput");
let notafications = document.getElementById("notifications");

createLobbyButton.onclick = function () {
	socket.emit("create-room", seedInput.value);
};

joinLobbyButton.onclick = function () {
	socket.emit("join-room", joinLobbyInput.value);
};

socket.on("reply", (reply) => {
	let notification = document.createElement("p");
	notification.innerHTML = reply.message;
	notification.classList.add("notification");
	if (reply.type === "success") {
		notification.classList.add("success");
	} else if (reply.type === "error") {
		notification.classList.add("error");
	}
	notifications.appendChild(notification);
	
	setTimeout(() => {notification.style.opacity = 0},6000)
	setTimeout(() => {notification.style.display = "none"},6450)
});

socket.on("joinedRoom", (roomData) => {
	startNewGame();
	//set spawn position
	if (roomData.players == 1) {
		player.startingPosition = {"x":900,"y":100}
	} else if (roomData.players == 2) {
		player.startingPosition = {"x":100,"y":900}
	} else if (roomData.players == 3) {
		player.startingPosition = {"x":900,"y":900}
	}
	Matter.Body.setPosition(player.body,player.startingPosition);

	resetLevel()
	console.log("ROOMCODE: "+roomData.id);
	let randFunc = randomSeededFunction(String(roomData.seed))
	generateMaze(grid,randFunc);
	
	
});

socket.on("leftRoom", (id) => {
	console.log("Left room: " + id);
	console.log("Opponents: " + opponents[0].id);
	let opponent = opponents.find( e => e.id==id);
	Composite.remove(engine.world, opponent.body);

});

socket.on("updatePlayers", (data) => {
	let position = data[0];
	let id = data[1];
	let opponent = opponents.find(e => e.id==id)

	if (!opponent) {
		let newOpponent = new Opponent(position, id);
		opponents.push(newOpponent);
		Composite.add(engine.world, newOpponent.body);
		startNewGame();

	} else {
		opponent.update(position.position, position.angle);
	}
});

socket.on("updateBullets", (data) => {
	let [bulletsData,id] = data;

	let opponent = opponents.find(e => e.id==id);

	if (opponent) {
		
		opponent.updateBullets(bulletsData);
	}

});
