import {createBullet} from "../matterBodies.js";
import {engine} from "../matterComponents.js"
import {gameInstance} from "../main.js";

class Bullet {
	constructor(position, velocity, id) {
		this.position = position;
		this.velocity = velocity;
		this.maxBounces = 10
		this.currentBounces = 0
		this.body = createBullet.call(this, position, velocity);
		this.body.collisionFilter.mask = 0x0001;
		this.id = id ?? Math.floor(Math.random() * 100000);
		Matter.Detector.setBodies(gameInstance.bulletDetector, [...gameInstance.bulletDetector.bodies,this.body]);
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

	remove() {
		Matter.Composite.remove(engine.world, this.body);
		let bullet = gameInstance.bulletDetector.bodies.find(body => {
			if (body.object) {
				return body.object.id == this.id 
			} else {
				return false
			}
		});
		Matter.Detector.setBodies(gameInstance.bulletDetector, gameInstance.bulletDetector.bodies.filter(body => body != bullet));
	}

	deleteOnWallCollision(){
		this.currentBounces ++
		if(this.currentBounces >= this.maxBounces){
			gameInstance.player.bullets = gameInstance.player.bullets.filter(bullet => bullet.id != this.id);
			this.remove()
		}
	}

}
export { Bullet };
