let gridWidth = 5;
let screenSize = gridWidth * 200;

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

import { createGrid, createBorder } from "./matterBodies.js";
let w = screenSize / gridWidth / 3;
let border = createBorder(screenSize, w);
let { grid, gridComposite } = createGrid([gridWidth, gridWidth]);

Matter.Composite.add(engine.world, [gridComposite, border]);

export { engine, render, runner, screenSize, border, grid, gridComposite };
