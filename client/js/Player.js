let screenSize = 1000

class Player{
    constructor(){
        this.tankSize = 50;
        this.body = this.createTank()
        this.color;
        this.bulletspeed = 0.01;
        this.dir = 1
    }

    getDirection() {
        let up = Vector.create(0, -1)
        let direction = Vector.rotate(up, this.body.angle);
        direction = Vector.normalise(direction)
        return direction
    };

    drive(speed) {
        let direction = this.getDirection();
        direction = Vector.mult(direction, speed)
        Matter.Body.applyForce(this.body, this.body.position, direction);
    }

    dirController(dir){
        this.dir = dir
    }
    
    rotate(rotation) {
        if (this.dir > 0){
            this.body.torque += rotation;
        }
        else if (this.dir < 0){
            this.body.torque -= rotation;
        }

        
    }

    fire() {
        let direction = this.getDirection();
        let pos = Vector.add(this.body.position, Vector.mult(direction, 40));
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
        Matter.Body.setVelocity(bullet, Vector.mult(direction, 15));
        Matter.World.add(engine.world, bullet);
    }

    createTank(){
        this.body = Bodies.rectangle(100,100, this.tankSize*1.2,this.tankSize*1.5,{
            render: {
                fillStyle: "#11820B"
            }
        });
        this.barrel = Bodies.rectangle(100,70,15,70, {
            frictionAir: 0.5,
            render: {
                fillStyle: "#0B5607"
            }
        });
        this.topElement = Bodies.rectangle(100,100,25,25, {
            angle: Math.PI/4,
            frictionAir: 0.5,
            render: {
                fillStyle: "#0B5607"
            }});
        this.leftTrack = Bodies.rectangle(70,100,10,80, {
            frictionAir: 0.5,
            render: {
                fillStyle: "#0B5607"
            }});
        this.rightTrack = Bodies.rectangle(130,100,10,80, {
            frictionAir: 0.5,
            render: {
                fillStyle: "#0B5607"
            }});
        this.tank = Matter.Body.create({
            parts: [this.body, this.barrel,this.topElement,this.leftTrack,this.rightTrack],
            mass: 10,
            inertia: 5000,
            frictionAir: 0.4,
            collisionFilter: {
    
                category: 0x0001,
    
            }
        });
        return this.tank
        
    }

}