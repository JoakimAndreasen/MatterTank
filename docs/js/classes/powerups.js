import {engine} from "../matterComponents.js"
import {createPowerup} from "../matterBodies.js"

class PowerUp {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.active = true;
		this.body = createPowerup.call(this,{x, y}, this.width);
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
	constructor(x, y) {
		super(x, y);
		this.imagePath = "../assets/images/powerup.png";
	}
	effect(player) {
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
	effect(player) {
		player.driveSpeed = player.driveSpeed * 2;
		console.log(player.driveSpeed);
		setTimeout(() => {
			player.driveSpeed = player.driveSpeed / 2;
		}, 5000);
	}
}

export { speedBoost, laser };