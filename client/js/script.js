// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Vector = Matter.Vector;

let Height = document.body.clientHeight,
    Width = document.body.clientWidth;

// create an engine
var engine = Engine.create({
    gravity: { x: 0, y: 0 }
});

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: Width,
        height: Height,
        background: '#000',
        wireframes: false
    }
});

function makeTank(size,color) {
    let barrel = Bodies.rectangle(Width/2, Height/2-(size-size/4), size/4, size,{
        render: {
            fillStyle: "#FF0000"
        }
    });
    let body = Bodies.rectangle(Width/2, Height/2, size, size, {
        frictionAir: 0.5,

        render: {
            fillStyle: "#00FF00"
        }
    });
    let tank = Matter.Body.create({
        parts: [body, barrel],
        mass: 5,
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
        let pos = Vector.add(this.object.position, Vector.mult(direction, 40));
        let bullet = Bodies.circle(pos.x, pos.y, 10, {
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



var player1 = new Player(50, "#00FF00");

function makeBox(xSize, ySize, thicness) {
    var w1 = Bodies.rectangle(thicness/2, ySize/2, thicness, ySize,{ isStatic: true, label: "left"});
    var w2 = Bodies.rectangle(xSize/2, thicness/2, xSize, thicness,{ isStatic: true,label: "top"});
    var w3 = Bodies.rectangle(xSize-thicness/2, ySize/2, thicness, ySize,{ isStatic: true, label: "right" });
    var w4 = Bodies.rectangle(xSize/2, ySize-thicness/2, xSize, thicness,{ isStatic: true, label: "bottom" });

    Box = Composite.create();
    Composite.add(Box, [w1, w2, w3, w4]);
    return Box;
}

function Cell(xSize, ySize, thicness,x,y) {
    this.object = makeBox(xSize, ySize, thicness);
    this.xSize = xSize;
    this.ySize = ySize;
    this.x = x;
    this.y = y;
    this.thicness = thicness;
    this.visited = false;
    this.removeWall = function(wallName) {
        let walls = Composite.allBodies(this.object);
        let wall = walls.find(e => e.label == wallName);
        Composite.remove(this.object, wall);
    }
}

function makeGrid(size, thicness) {
    let xSize = Width/size[0];
    let ySize = Height/size[1];

    var grid = [];
    let gridComposite = Composite.create();

    for(var i = 0; i < size[0]; i++) {
        let row = [];
        for(var j = 0; j < size[1]; j++) {
            row.push(new Cell(xSize, ySize, thicness,i,j));
            Composite.translate(row[j].object, { x: xSize*i, y: ySize*j });
            Composite.add(gridComposite, row[j].object);
        }
        grid.push(row);
    }
    return {grid, gridComposite};
    
}

var {grid, gridComposite} = makeGrid([5, 5], 10);

// add all of the bodies to the world
Composite.add(engine.world, [player1.object, gridComposite]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//Generates a maze from the mazeGenerator.js file
generateMaze(grid);



let keysDown = new Set();

//Register when a key is pressed
document.addEventListener('keydown', e => {
    if (e.key == " ") {
        player1.fire();
    } else if (e.key == "b") {
        for(let x=0;x<10;x++) {
            player1.fire();
        }
    } else {
        keysDown.add(e.key)
    }
    
}, false);

//Register when a key is released
document.addEventListener('keyup', e => keysDown.delete(e.key), false);

function drive(speed) {
    let direction = player1.getDirection();
    direction = Vector.mult(direction, speed)

    Matter.Body.applyForce(player1.object, player1.object.position, direction);
}

function rotate(rotation) {
    player1.object.torque += rotation;
}

function movement() {
    if(keysDown.has("w")) drive(0.01); //up
    if(keysDown.has("s")) drive(-0.01); //down
    if(keysDown.has("d")) rotate(0.2); //right
    if(keysDown.has("a")) rotate(-0.2); //left
}

Matter.Events.on(engine, "beforeUpdate", event => {
    movement();
    if (Matter.Detector.collisions(player1.detector).length > 0) {
        Composite.remove(engine.world, player1.object);
    }
  });