function collisions() {
	let collisions = Matter.Detector.collisions(engine.world, player.body);
	if (collisions.length > 0) {
		collisions.forEach((element) => {
			let bodies = [element.parentA, element.parentB];
			let player = bodies.find((body) => body.label == "player");
			if (player) {
				Matter.World.remove(engine.world, bodies);
			}
		});
	}
}

function clearBullets(){
	//remove old bullets
	if (player.bullets.length !=0) {
		player.bullets.forEach((bullet) => {
			Composite.remove(engine.world, bullet.body);
		});
	}
	player.bullets = [];
}

function resetLevel() {
	//remove old players
	if (opponents.length !=0) { 
		opponents.forEach((opponent) => {
			Composite.remove(engine.world, opponent.body);
		});
	}
	opponents = [];
	clearBullets();
	
	grid.forEach((row) => {
		row.forEach((cell) => {
			cell.reset();
			
		});
	});
}

function sendData() {
	socket.emit("updatePlayers", {
		position: player.body.position,
		angle: player.body.angle,
	});
	socket.emit("updateBullets", getBulletData());
}

function getBulletData() {
	let data = [];
	player.bullets.forEach(e => {
		data.push({"pos":e.body.position,"vel":e.body.velocity,"id":e.id});
	});
	return data
}

function startNewGame() {

	player.body.collisionFilter.mask = 0x0000;
	setTimeout(() => {
		player.body.collisionFilter.mask = 0x0111;
	});

}

