let gridWidth = 5; //if 10 or over, maximum call stack error

var engine = Matter.Engine.create({
	gravity: { x: 0, y: 0 },
	timing: {
		isFixed: true,
	},
});

let render = Matter.Render.create({
	canvas: document.getElementById("canvas"),
	engine: engine,
	options: {
		width: gridWidth * 200,
		height: gridWidth * 200,
		background: "rgb(0,0,0,255)",
		wireframes: false,
	},
});

let runner = Matter.Runner.create();

import { createGrid, createBorder } from "./matterBodies.js";
import { generateMaze } from "./mazeGenerator.js";

function createWorld(gridWidth) {
	let screenSize = gridWidth * 200
	let w = screenSize / gridWidth / 3;
	let border = createBorder(screenSize, w);
	let { grid, gridComposite } = createGrid([gridWidth, gridWidth]);
	return  [ border, grid, gridComposite ];
}

let [ border, grid, gridComposite ] = createWorld(gridWidth);
import { changeTheme } from "./themes.js";
function changeWorldSize(gridWidth){ //does not regenerate maze
	render = Matter.Render.create({
		canvas: document.getElementById("canvas"),
		engine: engine,
		options: {
			width: gridWidth * 200,
			height: gridWidth * 200,
			background: "rgb(0,0,0,255)",
			wireframes: false,
		},
	});
	let [newborder, newgrid, newgridComposite ] = createWorld(gridWidth);
	Matter.Composite.remove(engine.world, [border,gridComposite]);
	Matter.Composite.add(engine.world, [newborder,newgridComposite]);
	border = newborder;
	grid = newgrid;
	gridComposite = newgridComposite;
    let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark";
    changeTheme(currentTheme);

}
Matter.Composite.add(engine.world, [gridComposite, border]);

function getMapInfo() {
	return {border, grid, gridComposite};
}

export { engine, render, runner, createWorld,getMapInfo,changeWorldSize};
