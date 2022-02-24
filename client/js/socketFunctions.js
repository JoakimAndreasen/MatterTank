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

console.log(fesfsefes);