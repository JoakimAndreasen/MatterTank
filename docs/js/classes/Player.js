import {createTank} from "../matterBodies.js";
import {Bullet} from "./Bullet.js";
import {engine} from "../matterComponents.js";
import {hexToHSL} from '../utils.js';
import {Tank} from './Tank.js';

class Player extends Tank {
	constructor() {
		super();
		this.startingPosition = { x: 100, y: 100 };
		this.bulletspeed = 15;
		this.driveSpeed = 3;
		this.dir = 1;
		this.rotationSpeed = 3;
		this.canMove = true;
		this.canFire = true;
		Matter.Body.setPosition(this.body, this.startingPosition);
		Matter.Composite.add(engine.world, this.body);
	}


	getDirection() {
		let up = Matter.Vector.create(0, -1);
		let direction = Matter.Vector.rotate(up, this.body.angle);
		direction = Matter.Vector.normalise(direction);
		return direction;
	}

	drive(speed) {
		if (this.state != "dead" && this.canMove) {
			let direction = this.getDirection();
			direction = Matter.Vector.mult(direction, speed * this.driveSpeed);
			Matter.Body.applyForce(this.body, this.body.position, direction);
		}
	}

	rotate(rotation) {
		if (this.state != "dead" && this.canMove) {
			if (this.dir > 0) {
				this.body.torque += rotation * this.rotationSpeed;
			} else if (this.dir < 0) {
				this.body.torque -= rotation * this.rotationSpeed;
			}
		}
	}

	fire() {
		if (this.state != "dead" && this.canFire) {
			let direction = this.getDirection();
			let pos = Matter.Vector.add(this.body.position, Matter.Vector.mult(direction, 40));
			let velocity = Matter.Vector.mult(direction, this.bulletspeed);
			let bullet = new Bullet(pos, velocity);
			this.bullets.push(bullet);
			Matter.World.add(engine.world, bullet.body);
			this.spawnMuzzleFlash(pos,direction);
		}
	}
	spawnMuzzleFlash(pos,direction) {
		let perpendicular = Matter.Vector.perp(direction);
		let muzzlePos = Matter.Vector.add(pos, Matter.Vector.mult(perpendicular, -6));
		Matter.Vector.add(muzzlePos, Matter.Vector.mult(direction, 40),muzzlePos);
		let container = document.querySelector(".gameContainer");
		let scale = container.offsetHeight  / 1000;
		
		let flash = document.createElement("img");
		flash.style.height = "10px";
		flash.style.width = "10px";
		//flash.style.backgroundColor = "white";
		flash.style.position = "absolute";
		flash.style.zIndex = "1";
		flash.style.top = muzzlePos.y * scale + "px";
		flash.style.left = muzzlePos.x * scale + "px";
		flash.style.transform = "rotate(" + (this.body.angle - (Math.PI/2)) + "rad) scale(5)";

		flash.src = "../docs/assets/muzzleflash.gif";
		setTimeout(() => {
			container.removeChild(flash);
		}, 100);
		container.appendChild(flash);
	}

	resetPosition() {
		Matter.Body.setPosition(this.body,this.startingPosition);
		Matter.Body.setAngle(this.body,0);
	}
	reset() {
		this.bulletspeed = 15;
		this.driveSpeed = 3;
		this.rotationSpeed = 3;
		this.resetPosition();
		this.health = 100;
		if (this.state === "dead") {
			Matter.World.add(engine.world, this.body);
			this.state = "alive";

		}
	}
	setStartingPos(n) {
		switch (n) {
			case 1:
				this.startingPosition = {"x":100,"y":100};
				break;
			case 2:
				this.startingPosition = {"x":900,"y":100};
				break;
			case 3:
				this.startingPosition = {"x":100,"y":900};
				break;
			case 4:
				this.startingPosition = {"x":900,"y":900};
				break;
		}
	}
}

export {Player};
