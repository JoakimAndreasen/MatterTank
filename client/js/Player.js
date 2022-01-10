class Player{
    constructor(){
        this.body = this.createTank()
        this.color;
        this.bulletspeed = 20*canvas.size;
        this.speed = 5*canvas.size; 
        this.tankSize = 1*canvas.size
    }

    getDirection() {
        let up = Vector.create(0, -1)
        let direction = Vector.rotate(up, this.object.angle);
        direction = Vector.normalise(direction)
        return direction
    };

    drive() {
        let direction = player1.getDirection();
        direction = Vector.mult(direction, this.speed)
    
        Matter.Body.applyForce(this.body, this.body.position, direction);
    }
    
    rotate(rotation) {
        this.body.torque += rotation;
    }

    fire() {
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

    createTank(){
        this.barrel = Bodies.rectangle(this.tankSize, this.tankSize-(size-size/4), size/4, size,{
            render: {
                fillStyle: "#00FF00"
            }
        });
        this.body = Bodies.rectangle(this.tankSize, this.tankSize, size, size, {
            frictionAir: 0.5,
            render: {
                fillStyle: "#00FF00"
            }
        });
        this.tank = Matter.Body.create({
            parts: [this.body, this.barrel],
            mass: 3,
            inertia: 5000,
            frictionAir: 0.5,
            collisionFilter: {
    
                category: 0x0001,
    
            }
        });
        return this.tank
        
    }

}