let Bodies = Matter.Bodies,
	Composite = Matter.Composite;

function createTank(tankSize, color, secondaryColor) {

	let body = Bodies.rectangle(100, 100, tankSize * 0.8, tankSize * 1.1, {
		label: "primary",	
		render: {
			fillStyle: color,
		},
	});
	let barrel = Bodies.rectangle(100, 70, tankSize / 4, tankSize * 0.8, {
		frictionAir: 0.5,
		label: "secondary",
		render: {
			fillStyle: secondaryColor,
		},
	});
	let topElement = Bodies.rectangle(100, 100, tankSize / 2, tankSize / 2, {
		angle: Math.PI / 4,
		frictionAir: 0.5,
		label: "secondary",
		render: {
			fillStyle: secondaryColor,
		},
	});
	let leftTrack = Bodies.rectangle(
		tankSize * 1.5,
		tankSize * 2,
		tankSize / 5,
		tankSize * 1.3,
		{
			frictionAir: 0.5,
			label: "secondary",
			render: {
				fillStyle: secondaryColor,
			},
		}
	);
	let rightTrack = Bodies.rectangle(
		tankSize * 2.5,
		tankSize * 2,
		tankSize / 5,
		tankSize * 1.3,
		{
			frictionAir: 0.5,
			label: "secondary",
			render: {
				fillStyle: secondaryColor,
			},
		}
	);
	let tank = Matter.Body.create({
		parts: [body, barrel, topElement, leftTrack, rightTrack],
		mass: 10,
		inertia: 5000,
		frictionAir: 0.4,
		label: "player",
		collisionFilter: {
			category: 0x0010,
		},
	});
	return tank;
}

function createBullet(pos, velocity) {
	let body = Bodies.circle(pos.x, pos.y, 10, {
		label: "bullet",
		frictionAir: 0,
		restitution: 1,
		velocity: velocity,
		render: {
			fillStyle: "#FFFFFF",
		},
		collisionFilter: {
			mask: 0x0001,
		},
		label: "bullet",
	});
	Matter.Body.setVelocity(body, velocity);
	body.object = this;
	return body;
}

function createBorder(screenSize,w){
    w = screenSize/20

    let wallOptions = {
        isStatic: true,
        isSensor: false,
        render: {
            fillStyle: "#000000",
            strokeStyle: 'rgb(0,0,0,0)',
            visible: true,
        }
    }

    let top = Bodies.rectangle(screenSize/2,1,screenSize,w,wallOptions);
    let bot = Bodies.rectangle(screenSize/2,screenSize-1,screenSize,w,wallOptions);
    let left = Bodies.rectangle(1,screenSize/2,w,screenSize,wallOptions);
    let right = Bodies.rectangle(screenSize,screenSize/2,w,screenSize,wallOptions);

    let border = Composite.create()
    return Composite.add(border, [top,bot,left,right])
}

function createBox(xSize, ySize, w) {

    let wallOptions = {
        isStatic: true,
        isSensor: false,
        render: {
            fillStyle: "#000000",
            strokeStyle: 'rgb(0,0,0,0)',
            visible: true,
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

    return Composite.create({bodies: [w1, w2, w3, w4]});
}
import {Cell} from './classes/Cell.js'
function createGrid(screenSize,size, w) {
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

function createPowerup(pos, width) {
	let body = Matter.Bodies.circle(pos.x, pos.y, width, {
		isStatic: true,
		label: "powerup",
		collisionFilter: {
			mask: 0x010
		},

	});
	body.object = this;
	return body;
}

export { createTank, createBullet, createBorder, createBox, createGrid, createPowerup };