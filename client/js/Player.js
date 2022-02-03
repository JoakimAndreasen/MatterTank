class Player {
	constructor() {
		this.tankSize = 50;
		this.body = createTank(this.tankSize);
		this.startingPosition = { x: 100, y: 100 };
		this.color = "hsl()";
		this.bulletspeed = 0.01;
		this.bullets = [];
		this.driveSpeed = 1;
		this.dir = 1;
		this.health = 100;
		this.state = "alive";
		this.rotationSpeed = 1;
	}

	die() {
		this.state = "dead";
		this.health = 0;
		Matter.World.remove(engine.world, this.body);
		socket.emit("playerDied");
	}

	getDirection() {
		let up = Vector.create(0, -1);
		let direction = Vector.rotate(up, this.body.angle);
		direction = Vector.normalise(direction);
		return direction;
	}

	drive(speed) {
		if (this.state !== "dead") {
			let direction = this.getDirection();
			direction = Vector.mult(direction, speed * this.driveSpeed);
			Matter.Body.applyForce(this.body, this.body.position, direction);
		}
	}

	rotate(rotation) {
		if (this.dir > 0) {
			this.body.torque += rotation * this.rotationSpeed;
		} else if (this.dir < 0) {
			this.body.torque -= rotation * this.rotationSpeed;
		}
	}

	fire() {
		if (this.state !== "dead") {
			let direction = this.getDirection();
			let pos = Vector.add(this.body.position, Vector.mult(direction, 40));
			let velocity = Vector.mult(direction, 7);
			let bullet = new Bullet(pos, velocity);
			this.bullets.push(bullet);
			Matter.World.add(engine.world, bullet.body);
		}
	}
}

class Opponent {
	constructor(position, id) {
		this.tankSize = 50;
		this.body = createTank(this.tankSize);
		this.body.collisionFilter.category = 0x0100;
		this.body.collisionFilter.mask = 0x0011;
		this.position = position;
		this.color;
		this.bullets = [];
		this.id = id;
		this.health = 100;
		this.state = "alive";
	}

	die() {
		this.state = "dead";
		this.health = 0;
		Matter.World.remove(engine.world, this.body);
	}

	update(position, angle) {
		if (this.state !== "dead") {
			Matter.Body.setPosition(this.body, position);
			Matter.Body.setAngle(this.body, angle);
		}
	}
	updateBullets(bulletsData) {
		if (bulletsData.length > 0) {
			bulletsData.forEach((bulletData) => {
				let exisitingBullet = this.bullets.find((e) => e.id == bulletData.id);
				if (!exisitingBullet) {
					let newBullet = new Bullet(
						bulletData.pos,
						bulletData.vel,
						bulletData.id
					);
					this.bullets.push(newBullet);
					Composite.add(engine.world, newBullet.body);
				} else {
					exisitingBullet.update(bulletData.pos, bulletData.vel);
				}
			});
		}
	}
}
class Bullet {
	constructor(position, velocity, id) {
		this.position = position;
		this.velocity = velocity;
		this.body = createBullet(position, velocity);
		this.body.collisionFilter.mask = 0x0001;
		this.id = id ?? Math.floor(Math.random() * 100000);
		setTimeout(() => {
			this.bulletAddCollision();
		}, 100);
	}
	update(position, velocity) {
		Matter.Body.setPosition(this.body, position);
		Matter.Body.setVelocity(this.body, velocity);
	}
	bulletAddCollision() {
		this.body.collisionFilter.mask = 0x0011;
	}
}

function createBullet(pos, velocity) {
	let body = Bodies.circle(pos.x, pos.y, 10, {
		label: "bullet",
		frictionAir: 0,
		restitution: 1,
		velocity: velocity,
		render: {
			fillStyle: "#FFFFFF",
		},
		collisionFilter: {
			mask: 0x0001,
		},
		label: "bullet",
	});
	Matter.Body.setVelocity(body, velocity);
	return body;
}

function createTank(tankSize) {
	let body = Bodies.rectangle(100, 100, tankSize * 0.8, tankSize * 1.1, {
		render: {
			fillStyle: "#11820B",
		},
	});
	let barrel = Bodies.rectangle(100, 70, tankSize / 4, tankSize * 0.8, {
		frictionAir: 0.5,
		render: {
			fillStyle: "#0B5607",
		},
	});
	let topElement = Bodies.rectangle(100, 100, tankSize / 2, tankSize / 2, {
		angle: Math.PI / 4,
		frictionAir: 0.5,
		render: {
			fillStyle: "#0B5607",
		},
	});
	let leftTrack = Bodies.rectangle(
		tankSize * 1.5,
		tankSize * 2,
		tankSize / 5,
		tankSize * 1.3,
		{
			frictionAir: 0.5,
			render: {
				fillStyle: "#0B5607",
			},
		}
	);
	let rightTrack = Bodies.rectangle(
		tankSize * 2.5,
		tankSize * 2,
		tankSize / 5,
		tankSize * 1.3,
		{
			frictionAir: 0.5,
			render: {
				fillStyle: "#0B5607",
			},
		}
	);
	let tank = Matter.Body.create({
		parts: [body, barrel, topElement, leftTrack, rightTrack],
		mass: 10,
		inertia: 5000,
		frictionAir: 0.4,
		label: "player",
		collisionFilter: {
			category: 0x0010,
		},
	});
	return tank;
}