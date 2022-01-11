let screenSize = 1000;

class Player {
  constructor() {
    this.tankSize = 50;
    this.body = this.createTank();
    this.color;
    this.bulletspeed = 0.01;
    this.dir = 1;
  }

  getDirection() {
    let up = Vector.create(0, -1);
    let direction = Vector.rotate(up, this.body.angle);
    direction = Vector.normalise(direction);
    return direction;
  }

  drive(speed) {
    let direction = this.getDirection();
    direction = Vector.mult(direction, speed);
    Matter.Body.applyForce(this.body, this.body.position, direction);
  }


  rotate(rotation) {
    if (this.dir > 0) {
      this.body.torque += rotation;
    } else if (this.dir < 0) {
      this.body.torque -= rotation;
    }
  }

  fire() {
    let collitionWaitTime = 100;
    let direction = this.getDirection();
    let pos = Vector.add(this.body.position, Vector.mult(direction, 40));
    let bullet = Bodies.circle(pos.x, pos.y, 10, {
      label: "bullet",
      frictionAir: 0,
      restitution: 1,
      render: {
        fillStyle: "#FFFFFF",
      },
      collisionFilter: {
        mask: 0x0001,
      },
    });
    Matter.Body.setVelocity(bullet, Vector.mult(direction, 7));
    Matter.World.add(engine.world, bullet);
    setTimeout(() => {
      bullet.collisionFilter.mask = 0x0011;
    }, collitionWaitTime);
  }

  createTank() {
    this.body = Bodies.rectangle(
      100,
      100,
      this.tankSize * 0.8,
      this.tankSize * 1.1,
      {
        render: {
          fillStyle: "#11820B",
        },
      }
    );
    this.barrel = Bodies.rectangle(
      100,
      70,
      this.tankSize / 4,
      this.tankSize * 0.8,
      {
        frictionAir: 0.5,
        render: {
          fillStyle: "#0B5607",
        },
      }
    );
    this.topElement = Bodies.rectangle(
      100,
      100,
      this.tankSize / 2,
      this.tankSize / 2,
      {
        angle: Math.PI / 4,
        frictionAir: 0.5,
        render: {
          fillStyle: "#0B5607",
        },
      }
    );
    this.leftTrack = Bodies.rectangle(
      this.tankSize * 1.5,
      this.tankSize * 2,
      this.tankSize / 5,
      this.tankSize * 1.3,
      {
        frictionAir: 0.5,
        render: {
          fillStyle: "#0B5607",
        },
      }
    );
    this.rightTrack = Bodies.rectangle(
      this.tankSize * 2.5,
      this.tankSize * 2,
      this.tankSize / 5,
      this.tankSize * 1.3,
      {
        frictionAir: 0.5,
        render: {
          fillStyle: "#0B5607",
        },
      }
    );
    this.tank = Matter.Body.create({
      parts: [
        this.body,
        this.barrel,
        this.topElement,
        this.leftTrack,
        this.rightTrack,
      ],
      mass: 10,
      inertia: 5000,
      frictionAir: 0.4,
      label: "player",
      collisionFilter: {
        category: 0x0010,
      },
    });
    return this.tank;
  }
}
