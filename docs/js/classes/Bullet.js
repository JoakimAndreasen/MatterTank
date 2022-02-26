import {createBullet} from "../matterBodies.js";
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
export { Bullet };
