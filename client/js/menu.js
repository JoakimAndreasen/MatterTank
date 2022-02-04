

//Gets the chat form, input and container from the HTML document
let createLobbyButton = document.getElementById("createLobbyButton");
let seedInput = document.getElementById("seedInput");
let notafications = document.getElementById("notifications");
let startGameButton = document.getElementById("startGameButton");
let playersInfo = document.getElementById("playersInfo");
let lobbyCode = document.getElementById("lobbyCode");
let seedText = document.getElementById("seedText");

let joinLobbyInput = document.getElementById("joinLobbyInput");
let usernameInput = document.getElementById("usernameInput");

let sendUsername = debounce( (e) => {
	if (usernameInput.value){
		socket.emit("updateUsername", usernameInput.value);
	}
}, 300);

document.addEventListener('keyup', () => {
	sendUsername();
});

function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	notification("Copied to clipboard","success");
}


lobbyCode.onclick = () => {copyToClipboard(lobbyCode.innerHTML)};
seedText.onclick = () => {copyToClipboard(seedText.innerHTML)};

createLobbyButton.onclick = function () {
	socket.emit("create-room", seedInput.value);
};

joinLobbyButton.onclick = function () {
	socket.emit("join-room", joinLobbyInput.value);
};

startGameButton.onclick = function () {
	socket.emit("start-game");
}
socket.on("reply", (reply) => {
	notification(reply.message, reply.type);
});

socket.on("joinedRoom", (roomData) => {
	pausePlayerCollision();
	
	//set spawn position
	player.setStartingPos(roomData.playerAmount)

	// if (roomData.playerAmount == 4) {
	// 	startGameButton.style.display = "block";
	// }
	
	removeOpponents()
	regenerateLevel(roomData.seed)
	resetLevel();
	console.log("ROOMCODE: "+roomData.id);

	updateLobbyInfo(roomData);
	
});

socket.on("leftRoom", (id) => {
	console.log("Left room: " + id);
	let opponent = opponents.find( e => e.id==id);
	if (opponent) {
		opponents.splice(opponents.indexOf(opponent), 1);
		Composite.remove(engine.world, opponent.body);
	}
});

socket.on("updatePlayers", (data) => {
	let position = data[0];
	let id = data[1];
	let opponent = opponents.find(e => e.id==id)

	if (!opponent) {
		let newOpponent = new Opponent(id);
		pausePlayerCollision();
		opponents.push(newOpponent);
		Composite.add(engine.world, newOpponent.body);

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

socket.on("playerDied", (id) => {
	let opponent = opponents.find(e => e.id==id);
	if (opponent) {
		console.log("Player died: " + opponent.id);
		opponent.die();
	}
});

socket.on("updateLobbyInfo", updateLobbyInfo);

socket.on("newRound", newRound);
socket.on("error", errorMessage => notification(errorMessage,'error'));
