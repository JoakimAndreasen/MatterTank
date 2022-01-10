var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Vector = Matter.Vector;

var engine = Engine.create({
    gravity: { x: 0, y: 0 }
});

var render = Render.create({
    canvas: document.getElementById('canvas'),
    engine: engine,
    options: {
        width: screenSize,
        height: screenSize,
        background: '#000',
        wireframes: false
    }
});

let w = screenSize/40;
let player = new Player();

var {grid, gridComposite} = makeGrid([5, 5], w);

let Border = createBorder(screenSize,w);

// add all of the bodies to the world
Composite.add(engine.world, [player.body, gridComposite,Border]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//Generates a maze from the mazeGenerator.js file
generateMaze();

Matter.Events.on(engine, "beforeUpdate", event => {
    movement();
  });