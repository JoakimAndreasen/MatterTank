//From underscore.js
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function notification(message, type) {
	notifications.style.opacity = 1;

	if (type === "success") {
		notifications.classList.remove("error");
		notifications.classList.add("success");
	} else if (type === "error") {
		notifications.classList.remove("success");
		notifications.classList.add("error");
	}
	notifications.textContent = message;

	setTimeout(() => {
		notifications.style.opacity = 0;
	}, 6000);
}
function collisions() {
	let collisions = Matter.Detector.collisions(engine.world, player.body);
	if (collisions.length > 0) {
		collisions.forEach((element) => {
			let bodies = [element.parentA, element.parentB];
			let bullet = bodies.find((body) => body.label == "bullet");
			let powerup = bodies.find((body) => body.label == "powerup");
			let playerBody = bodies.find((body) => body.label == "player");
			if (bullet && playerBody) {
				player.die();
			}
			if (powerup && playerBody) {
				powerup.object.pickUp();
			}
		});
	}
}

function clearBullets() {
	//remove old bullets
	if (player.bullets.length != 0) {
		player.bullets.forEach((bullet) => {
			Composite.remove(engine.world, bullet.body);
		});
	}
	if (opponents.length != 0) {
		opponents.forEach((opponent) => {
			opponent.bullets.forEach((bullet) => {
				Composite.remove(engine.world, bullet.body);
			});
		});
	}
	player.bullets = [];
}

function removeOpponents() {
	if (opponents.length != 0) {
		opponents.forEach((opponent) => {
			Composite.remove(engine.world, opponent.body);
		});
	}
	opponents = [];
}

function regenerateLevel(seed) {
	grid.forEach((row) => {
		row.forEach((cell) => {
			cell.reset();
		});
	});
	let randFunc = randomSeededFunction(String(seed));
	generateMaze(grid, randFunc);
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
	player.bullets.forEach((e) => {
		data.push({ pos: e.body.position, vel: e.body.velocity, id: e.id });
	});
	return data;
}

function pausePlayerCollision(n) {
	n *= 1000;
	player.body.collisionFilter.mask = 0x0000;
	setTimeout(() => {
		player.body.collisionFilter.mask = 0x0011;
	}, n);
}

function pausePlayerControl(n) {
	n *= 1000;
	player.canMove = false;
	player.canFire = false;
	setTimeout(() => {
		player.canMove = true;
		player.canFire = true;
	}, n);
}

function countDownFrom(n) {
	countDown.innerHTML = n;
	if (n > 0) {
		setTimeout(() => {
			countDownFrom(n - 1);
		}, 1000);
	} else {
		countDown.innerHTML = "";
	}
}

function resetLevel() {
	pausePlayerCollision(2);
	clearBullets();
	player.reset();

	opponents.forEach((opponent) => {
		opponent.reset();
	});
}

function showWinner(name) {
	winnerText.innerHTML = name + " wins!";
	setTimeout(() => {
		winnerText.innerHTML = "";
	}, 2000);
}

function newRound(newRoundData) {
	console.log("New round");
	if (newRoundData.winner) {
		showWinner(newRoundData.winner);
	}
	pausePlayerControl(3);
	countDownFrom(3);
	regenerateLevel(newRoundData.seed);
	resetLevel();
}

function updateLobbyInfo(lobbyData) {
	console.log(lobbyData);
	playersInfo.innerHTML = "";
	let players = lobbyData.players;
	players.forEach((player) => {
		let playerInfo = document.createElement("div");

		let name = document.createElement("h2");
		name.innerHTML = player.username;

		let score = document.createElement("p");
		score.innerHTML = player.score;

		playerInfo.appendChild(name);
		playerInfo.appendChild(score);
		playersInfo.appendChild(playerInfo);
	});

	lobbyCode.innerHTML = lobbyData.id;
	seed.innerHTML = lobbyData.seed;
}
