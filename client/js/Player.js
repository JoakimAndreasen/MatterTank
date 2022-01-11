class Player {
	constructor() {
		this.tankSize = 50;
		this.body = createTank(this.tankSize);
		this.color = "hsl()";
		this.bulletspeed = 0.01;
		this.driveSpeed = 1;
		this.dir = 1;
		this.health = 100;
		this.state = "alive";
	}

	die() {
		this.state = "dead";
		this.health = 0;
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
			this.body.torque += rotation;
		} else if (this.dir < 0) {
			this.body.torque -= rotation;
		}
	}

	fire() {
		if (this.state !== "dead") {
			let collitionWaitTime = 100;
			let direction = this.getDirection();
			let pos = Vector.add(this.body.position, Vector.mult(direction, 40));
			let bullet = Bodies.circle(pos.x, pos.y, 10, {
				label: "bullet",
				frictionAir: 0,
				restitution: 1,
				render: {
					fillStyle: "#FFFFFF",
				},
				collisionFilter: {
					mask: 0x0101,
				},
			});
			Matter.Body.setVelocity(bullet, Vector.mult(direction, 7));
			Matter.World.add(engine.world, bullet);
			setTimeout(() => {
				bullet.collisionFilter.mask = 0x0011;
			}, collitionWaitTime);
		}
	}
}

class Opponent {
	constructor() {
		this.tankSize = 50;
		this.body = createTank(this.tankSize);
		this.body.collisionFilter.category = 0x0100;
		this.position;
		this.angle;
		this.color;
	}
	update(position, angle) {
		Matter.Body.setPosition(this.body, position);
		Matter.Body.setAngle(this.body, angle);
	}
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
