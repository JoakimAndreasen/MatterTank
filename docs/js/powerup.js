class PowerUp {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.active = true;
		this.body = this.createPowerup();
		Composite.add(engine.world, this.body);
	}
	createPowerup() {
		let body = Matter.Bodies.circle(this.x, this.y, this.width, {
			isStatic: false,
			label: "powerup",

			// render: {
			// 	fillStyle: "transparent",
			// 	strokeStyle: "transparent",
			// 	sprite: {
			// 		texture: this.imagePath,
			// 	},
			// },
		});
		body.object = this;
		return body;
	}
	pickUp() {
		Matter.World.remove(engine.world, this.body);
		this.effect();
	}
	effect() {
		console.log("No effect");
	}

	die() {
		Matter.World.remove(engine.world, this.body);
	}
}

class speedBoost extends PowerUp {
	constructor(x, y) {
		super(x, y);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect() {
		player.driveSpeed = player.driveSpeed * 2;
		player.rotationSpeed = player.rotationSpeed * 2;
		setTimeout(() => {
			player.driveSpeed = player.driveSpeed / 2;
			player.rotationSpeed = player.rotationSpeed / 2;
		}, 5000);
	}
}

class laser extends PowerUp {
	constructor(x, y) {
		super(x, y);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect() {
		player.driveSpeed = player.driveSpeed * 2;
		console.log(player.driveSpeed);
		setTimeout(() => {
			player.driveSpeed = player.driveSpeed / 2;
		}, 5000);
	}
}
