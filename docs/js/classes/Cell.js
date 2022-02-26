import {createBox} from "../matterBodies.js";

let Bodies = Matter.Bodies,
    Composite = Matter.Composite; 

function Cell(xSize, ySize, w,x,y) {
    this.object = createBox(xSize, ySize, w);
    this.bodies = Composite.allBodies(this.object);
    this.xSize = xSize;
    this.ySize = ySize;
    this.x = x;
    this.y = y;
    this.w = w;
    this.visited = false;
    
    this.removeWall = function(wallName) {
        let wall = this.object.bodies.find(e => e.label == wallName);
        if (wall) {
            wall.render.visible = false;
            wall.isSensor = true;
        }

    }

    this.reset = function () {
        this.visited = false;
        this.object.bodies.forEach(element => {
            element.render.visible = true;
            element.isSensor = false;
        });

    }
}

export {Cell}