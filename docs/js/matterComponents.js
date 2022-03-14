let screenSize = 1000;
var engine = Matter.Engine.create({
	gravity: { x: 0, y: 0 },
	timing: {
		isFixed: true,
	},
});
var render = Matter.Render.create({
	canvas: document.getElementById("canvas"),
	engine: engine,
	options: {
		width: screenSize,
		height: screenSize,
		background: "rgb(0,0,0,255)",
		wireframes: false,
	},
});

let runner = Matter.Runner.create();

import {createGrid, createBorder} from "./matterBodies.js"
let w = screenSize / 40;
let border = createBorder(screenSize, w);
let { grid, gridComposite } = createGrid(screenSize,[5, 5], w);


Matter.Composite.add(engine.world, [gridComposite,border]);

export { engine, render, runner, screenSize, border, grid, gridComposite };