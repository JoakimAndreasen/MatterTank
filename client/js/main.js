var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Vector = Matter.Vector;


let screenSize = 1000;
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

window.addEventListener('resize', function(event){
    canvas.resize();
  });

function createBorder(screenSize,w){
    w = screenSize/20
    let top = Bodies.rectangle(screenSize/2,1,screenSize,w,{isStatic: true});
    let bot = Bodies.rectangle(screenSize/2,screenSize-1,screenSize,w,{isStatic: true});
    let left = Bodies.rectangle(1,screenSize/2,w,screenSize,{isStatic: true});
    let right = Bodies.rectangle(screenSize,screenSize/2,w,screenSize,{isStatic: true});

    let border = Composite.create()
    return Composite.add(border, [top,bot,left,right])
}

function makeTank(size,color) {
    rsize = screenSize/8
    let barrel = Bodies.rectangle(rsize, rsize-(size-size/4), size/4, size,{
        render: {
            fillStyle: "#FF0000"
        }
    });
    let body = Bodies.rectangle(rsize, rsize, size, size, {
        frictionAir: 0.5,

        render: {
            fillStyle: "#00FF00"
        }
    });
    let tank = Matter.Body.create({
        parts: [body, barrel],
        mass: 3,
        inertia: 5000,
        frictionAir: 0.5,
        collisionFilter: {
            category: 0x0001,
        }
    });
    return tank;
}

function Player(size,color) {
    this.object = makeTank(size,color);
    this.color = color;
    this.bulletSpeed = 15;
    this.detector = Matter.Detector.create({
        Bodies: [this.object,engine.world],
    });
    this.getDirection = function () {
        let up = Vector.create(0, -1)
        let direction = Vector.rotate(up, this.object.angle);
        direction = Vector.normalise(direction)
        return direction
    };
    this.fire = function () {
        let direction = this.getDirection();
        let pos = Vector.add(this.object.position, Vector.mult(direction, screenSize/20));
        let bullet = Bodies.circle(pos.x, pos.y, screenSize/80, {
            label: "bullet",
            frictionAir: 0,
            restitution: 1,
            render: {
                fillStyle: "#FFFFFF"
            },
            collisionFilter: {
                mask: 0x0001
            }
        });
        Matter.Body.setVelocity(bullet, Vector.mult(direction, this.bulletSpeed));
        Matter.World.add(engine.world, bullet);
    }

}



var player = new Player(screenSize/16, "#00FF00");

function makeBox(xSize, ySize, w) {
    wallOptions = {
        isStatic: true,
        render: {
            strokeStyle: 'rgb(0,0,0,0)',
        }
    }
    wallOptions.label = "left"
    var w1 = Bodies.rectangle(0, ySize/2, w, ySize+w,wallOptions);
    wallOptions.label = "top"
    var w2 = Bodies.rectangle(xSize/2, 0, xSize+w, w,wallOptions);
    wallOptions.label = "right"
    var w3 = Bodies.rectangle(xSize, ySize/2, w, ySize+w,wallOptions);
    wallOptions.label = "bottom"
    var w4 = Bodies.rectangle(xSize/2, ySize, xSize+w, w,wallOptions);

    Box = Composite.create();
    
    Composite.add(Box, [w1, w2, w3, w4]);
    return Box;
}

function Cell(xSize, ySize, w,x,y) {
    this.object = makeBox(xSize, ySize, w);
    this.xSize = xSize;
    this.ySize = ySize;
    this.x = x;
    this.y = y;
    this.w = w;
    this.visited = false;
    this.removeWall = function(wallName) {
        let walls = Composite.allBodies(this.object);
        let wall = walls.find(e => e.label == wallName);
        Composite.remove(this.object, wall);
    }
}

function makeGrid(size, w) {
    let xSize = screenSize/size[0];
    let ySize = screenSize/size[1];

    var grid = [];
    let gridComposite = Composite.create();

    for(var i = 0; i < size[0]; i++) {
        let row = [];
        for(var j = 0; j < size[1]; j++) {
            row.push(new Cell(xSize, ySize, w,i,j));
            Composite.translate(row[j].object, { x: xSize*i, y: ySize*j });
            Composite.add(gridComposite, row[j].object);
        }
        grid.push(row);
    }
    return {grid, gridComposite};
    
}
let w = screenSize/40;
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

let keysDown = new Set();

//Register when a key is pressed
document.addEventListener('keydown', e => {
    if (!e.repeat) {
    if (e.key == " ") {
        player.fire();
    } else if (e.key == "b") {
        for(let x=0;x<10;x++) {
            player.fire();
        }
    } else {
        keysDown.add(e.key)
    }
    }
    
}, false);

//Register when a key is released
document.addEventListener('keyup', e => keysDown.delete(e.key), false);

function drive(speed) {
    let direction = player.getDirection();
    direction = Vector.mult(direction, speed)

    Matter.Body.applyForce(player.body, player.body.position, direction);
}

function rotate(rotation) {
    player.body.torque += rotation;
}

function movement() {
    if(keysDown.has("w")) drive(0.01); //up
    if(keysDown.has("s")) drive(-0.01); //down
    if(keysDown.has("d")) rotate(0.2); //right
    if(keysDown.has("a")) rotate(-0.2); //left
}

Matter.Events.on(engine, "beforeUpdate", event => {
    movement();
    //console.log(Matter.Detector.collisions(player1.detector));
    if (Matter.Detector.collisions(player1.detector).length > 0) {
        Composite.remove(engine.world, player.body);
    }
  });