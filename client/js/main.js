
let screenSize = 1000;
let socket = io.connect("http://localhost:3000");
console.log("Connected to Server");



var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;
Vector = Matter.Vector;

var engine = Engine.create({
	gravity: { x: 0, y: 0 },
});

var render = Render.create({
	canvas: document.getElementById("canvas"),
	engine: engine,
	options: {
		width: screenSize,
		height: screenSize,
		background: "#000",
		wireframes: false,
	},
});

let w = screenSize / 40;
let player = new Player();

var { grid, gridComposite } = makeGrid([5, 5], w);

let Border = createBorder(screenSize, w);
let opponentsComposite = Composite.create({});
let opponents = [];
let bullets = [];
//let powerup = new Powerup(100,100,);
// add all of the bodies to the world
Composite.add(engine.world, [
	player.body,
	gridComposite,
	Border,
	opponentsComposite,
]);
console.log(Matter.Query.ray(engine.world, { x: 0, y: 0 }, { x: 400, y: 400 }));
// run the renderer
Render.run(render);

// create runner and run the engine
var runner = Runner.create();
Runner.run(runner, engine);

//Generates a maze from the mazeGenerator.js file
generateMaze(grid);

Matter.Events.on(engine, "beforeUpdate", (event) => {
	movement();
	//collisions();
	sendData();
});
