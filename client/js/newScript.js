// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Vector = Matter.Vector;

// create an engine
var engine = Engine.create({
    gravity: { x: 0, y: 0 }
});

let canvas = new Canvas();
let gridSize = 6

function createBox(x,y) {
    let cellSize = canvas.size/gridSize;
    let xSize=cellSize;
    let ySize=cellSize;
    let width=10;

    console.log(gridSize)
    wallOptions = {
        isStatic: true,
        render: {
            strokeStyle: 'rgb(0,0,0,0)',
        }
    }
    wallOptions.label = "left"
    var w1 = Bodies.rectangle(0+x-xSize/2, ySize/2+y-ySize/2, width, ySize+width,wallOptions);
    wallOptions.label = "right"
    var w3 = Bodies.rectangle(xSize-0+x-xSize/2, ySize/2+y-ySize/2, width, ySize+width,wallOptions);
    wallOptions.label = "top"
    var w2 = Bodies.rectangle(xSize/2+x-xSize/2, 0+y-ySize/2, xSize+width, width,wallOptions);
    wallOptions.label = "bottom"
    var w4 = Bodies.rectangle(xSize/2+x-xSize/2, ySize-0+y-ySize/2, xSize+width, width,wallOptions);
    

    let Box = Matter.Body.create({
        parts: [w1, w2, w3, w4],
        isStatic: true,
        render: {
            strokeStyle: 'rgb(0,0,0,0)',
            fillStyle: '#fff'
        }
    });
    return Box;     
}


let box = createBox(0, 0);


box.removeWall = function(wallName) {
    let walls = Composite.allBodies(box);
    let wall = walls.find(e => e.label == wallName);
    Composite.remove(box, wall);
}



//let grid = Matter.Composites.stack(3, 3, 3, 3, 50, 50, createBox);

var stack = Matter.Composites.stack(0, 0, gridSize, gridSize, -10, -10, createBox);
console.log(stack);
Composite.add(engine.world, [box,stack]);
// create a renderer
var render = Render.create({
    canvas: document.getElementById('canvas'),
    engine: engine,
    options: {
        width: canvas.size,
        height: canvas.size,
        background: '#000',
        wireframes: false
    }
});

// run the renderer
Render.run(render);

// create runner and run
var runner = Runner.create();
Runner.run(runner, engine);

window.addEventListener('resize', canvas.resize());