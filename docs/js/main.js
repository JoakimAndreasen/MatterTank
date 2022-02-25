let screenSize = 1000;

let socket = io.connect("https://server.tankz.dk");
socket.on("connect_error", (err) => {
	if (err = "xhr poll error") console.log("Couldn't connect to server... trying again."); 
});

socket.on("connect", () => {
	notification("Connected to server!", "success");
});


var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;
Vector = Matter.Vector;

var engine = Engine.create({
	gravity: { x: 0, y: 0 },
	timing: {
		isFixed: true,
	}
});
var render = Render.create({
	canvas: document.getElementById("canvas"),
	engine: engine,
	options: {
		width: screenSize,
		height: screenSize,
		background: 'rgb(0,0,0,255)',
		wireframes: false,
	},
});

let w = screenSize / 40;
let player = new Player();
let lobbyLeader = false;

var { grid, gridComposite } = makeGrid([5, 5], w);

let Border = createBorder(screenSize, w);
let opponentsComposite = Composite.create({});
let opponents = [];
let bullets = [];
const d = new Date();
let time = d.getSeconds();
let powerups = [];

// add all of the bodies to the world
Composite.add(engine.world, [
	player.body,
	gridComposite,
	Border,
	opponentsComposite,
]);

// run the renderer
Render.run(render);

// create runner and run the engine
var runner = Runner.create();
//Runner.run(runner, engine);
setInterval(() => {
	Matter.Runner.tick(runner, engine, 1000 / 60);
}, 16);
//Generates a maze from the mazeGenerator.js file
generateMaze(grid);

Matter.Events.on(runner, "tick", (event) => {
	movement();
	collisions();
	sendData();
});

//Color Theme
changeTheme(currentTheme);