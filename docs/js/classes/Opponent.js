import {createTank} from "../matterBodies.js";
import {Bullet} from "./Bullet.js";
import {engine} from "../matterComponents.js";
import {Tank} from './Tank.js';

class Opponent extends Tank{
	constructor(id) {
		super();

		this.body.collisionFilter.category = 0x0100;
		this.body.collisionFilter.mask = 0x0011;
		this.position = { x: -100, y: -100 };
		this.id = id;
	}

	reset() {
		this.state = "alive";
		this.health = 100;
		Matter.World.add(engine.world, this.body);
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
					Matter.Composite.add(engine.world, newBullet.body);
				} else {
					exisitingBullet.update(bulletData.pos, bulletData.vel);
				}
			});
		}
	}
}
export { Opponent };