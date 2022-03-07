import {createTank} from "../matterBodies.js";
import {Bullet} from "./Bullet.js";
import {engine} from "../matterComponents.js";
import {hexToHSL} from '../utils.js';
class Tank {
	constructor() {
		this.tankSize = 50;
		this.color = "#1F35FF";
		this.secondaryColor = this.getSecondaryColor();
		this.body = createTank(this.tankSize, this.color, this.secondaryColor);
		this.bullets = [];
		this.health = 100;
		this.state = "alive";
		
	}
	updateColor(color) {
		this.color = color;
		this.secondaryColor = this.getSecondaryColor();
		this.body.parts.forEach(part => {
			if (part.label == "secondary") {
				part.render.fillStyle = this.secondaryColor;
			} else if (part.label == "primary") {
				part.render.fillStyle = this.color;
			}
		});
	}

	getSecondaryColor() {
		let HSLArray = hexToHSL(this.color);
		return `hsl(${HSLArray[0]}, ${HSLArray[1]}%, ${HSLArray[2] - 15 > 0 ? HSLArray[2] - 15 : 15}%)`;
	}

	die() {
		this.state = "dead";
		this.health = 0;
		Matter.World.remove(engine.world, this.body);
	}


}

export {Tank};
