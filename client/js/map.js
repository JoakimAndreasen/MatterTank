function createBorder(screenSize,w){
    w = screenSize/20

    let wallOptions = {
        isStatic: true,
        isSensor: false,
        render: {
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

function makeBox(xSize, ySize, w) {
    let wallOptions = {
        isStatic: true,
        isSensor: false,
        render: {
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



    let box = Composite.create({bodies: [w1, w2, w3, w4]});
    return box;
}

function Cell(xSize, ySize, w,x,y) {
    this.object = makeBox(xSize, ySize, w);
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