class PowerUp {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.active = true;
		this.body = createPowerup();
	}
	createPowerup() {
		Matter.Bodies.circle(this.x, this.y, this.width, {
			isStatic: true,
			label: "powerup",
			render: {
				fillStyle: "transparent",
				strokeStyle: "transparent",
				sprite: {
					texture: this.imagePath,
				},
			},
		});
	}
	pickUp() {
		this.active = false;
		this.effect();
	}
	effect() {
		console.log("No effect");
	}
}

class speedBoost extends PowerUp {
	constructor(x, y) {
		super(x, y);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect() {
		player.speed = player.speed * 2;
		setTimeout(() => {
			player.speed = player.speed / 2;
		}, 5000);
	}
}

class laser extends PowerUp {
	constructor(x, y) {
		super(x, y);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect() {
		player.speed = player.speed * 2;
		setTimeout(() => {
			player.speed = player.speed / 2;
		}, 5000);
	}
}
