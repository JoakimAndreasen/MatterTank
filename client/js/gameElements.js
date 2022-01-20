function collisions() {
	let collisions = Matter.Detector.collisions(engine.world, player.body);
	if (collisions.length > 0) {
		collisions.forEach((element) => {
			let bodies = [element.parentA, element.parentB];
			let bullet = bodies.find((body) => body.label == "bullet");
			let playerBody = bodies.find((body) => body.label == "player");
			if (bullet && playerBody) {
				player.die();	
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

function removeOpponents() {
	if (opponents.length !=0) { 
		opponents.forEach((opponent) => {
			Composite.remove(engine.world, opponent.body);
		});
	}
	opponents = [];
}

function resetLevel() {

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

function pausePlayerCollision() {

	player.body.collisionFilter.mask = 0x0000;
	setTimeout(() => {
		player.body.collisionFilter.mask = 0x0011;
	},2000);

}

function checkForWin() {
	if (opponents.length == 0 && player.state == "alive") {
		player.win();
	}

}