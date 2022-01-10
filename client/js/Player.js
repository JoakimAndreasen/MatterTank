class Player{
    constructor(){
        this.color;
        this.bulletspeed = 20*canvas.size;
        this.speed = 5*canvas.size; 
        this.tankSize = 1*canvas.size
    }

    createTank(){
        this.barrel = Bodies.rectangle(this.tankSize, this.tankSize-(size-size/4), size/4, size,{
            render: {
                fillStyle: "#FF0000"
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
        return this.tank
        });
    }

}