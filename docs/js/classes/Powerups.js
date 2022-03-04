import {engine} from "../matterComponents.js"
import {createPowerup} from "../matterBodies.js"

class PowerUp {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.active = true;
		this.body = createPowerup.call(this,{x, y}, this.width);
		this.id = id
		Matter.Composite.add(engine.world, this.body);
	}

	pickUp(player) {
		Matter.World.remove(engine.world, this.body);
		this.effect(player);
	}
	effect(player) {
		console.log("No effect");
	}

	die() {
		Matter.World.remove(engine.world, this.body);
	}
}
class speedBoost extends PowerUp {
	constructor(x, y, id) {
		super(x, y, id);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect(player) {
		player.driveSpeed = player.driveSpeed * 2;
		player.rotationSpeed = player.rotationSpeed * 2;
		let timeout = setTimeout(() => {
			player.driveSpeed = player.driveSpeed / 2;
			player.rotationSpeed = player.rotationSpeed / 2;
		}, 5000);
		player.currentPowerupTimeout.push(timeout);
	}
}

class laser extends PowerUp {
	constructor(x, y, id) {
		super(x, y, id);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect(player) {
		player.driveSpeed = player.driveSpeed * 2;
		console.log(player.driveSpeed);
		setTimeout(() => {
			player.driveSpeed = player.driveSpeed / 2;
		}, 5000);
	}
}

export { speedBoost, laser };
