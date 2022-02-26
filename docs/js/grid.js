import {grid} from './matterComponents.js';

function setGridColor(grid, color) {
	grid.forEach((row) => {
		row.forEach((cell) => {
			cell.bodies.forEach(element => {
                element.render.fillStyle=color;
            });
		});
	});
}

function setBorderColor(border, color) {
	border.bodies.forEach((wall) => {
        wall.render.fillStyle=color;
	});
}
import {randomSeededFunction,generateMaze} from "./mazeGenerator.js"
function regenerateLevel(seed) {
	grid.forEach((row) => {
		row.forEach((cell) => {
			cell.reset();
		});
	});
	let randFunc = randomSeededFunction(String(seed));
	generateMaze(grid, randFunc);
}

export {setGridColor, setBorderColor, regenerateLevel}