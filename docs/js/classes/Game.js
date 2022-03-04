import {Player} from "./Player.js";
import {engine} from "../matterComponents.js";
import {grid, gridComposite} from "../matterComponents.js";
import {generateMaze} from "../mazeGenerator.js"
import { regenerateLevel } from "../grid.js";
class Game {
    constructor() {
        this.player = new Player();
        this.opponents = [];
        this.powerups = [];
        this.opponentComposite = Matter.Composite.create();
        Matter.Composite.add(engine.world, this.opponentComposite);
        generateMaze(grid);
        this.bulletDetector = Matter.Detector.create({bodies: [...gridComposite.composites.map(e => e.bodies).flat()]});
    }  
    
    removeFromWorld(objects) {
        objects.forEach((object) => {
            Matter.Composite.remove(engine.world, object.body);
        });
    }
    clearOpponents(){
        console.log("REMOVING OPPONENTS");
        Matter.Composite.clear(this.opponentComposite);
        this.opponents = [];
    }
    clearBullets() {
        this.removeFromWorld(this.player.bullets); //clear player bullets
        this.player.bullets = [];
        this.bulletDetector = Matter.Detector.create({bodies: [...gridComposite.composites.map(e => e.bodies).flat()]});
        this.opponents.forEach((opponent) => { //clear opponent bullets
            this.removeFromWorld(opponent.bullets);
        });
        
    }
    
    sendData(socket) {
        socket.emit("updatePlayers", {
            position: this.player.body.position,
            angle: this.player.body.angle,
        });
        socket.emit("updateBullets", this.getBulletData());
    }

    getBulletData() {
        return this.player.bullets.map(e => ({ pos: e.body.position, vel: e.body.velocity, id: e.id }));;
    }
    
    pausePlayerCollision(n) {
        n *= 1000;
        this.player.body.collisionFilter.mask = 0x0000;
        setTimeout(() => {
            this.player.body.collisionFilter.mask = 0x0011;
        }, n);
    }

    pausePlayerControl(n) {
        n *= 1000;
        this.player.canMove = false;
        this.player.canFire = false;
        setTimeout(() => {
            this.player.canMove = true;
            this.player.canFire = true;
        }, n);
    }

    countDownFrom(n) { //recursive countdown
        countDown.innerHTML = n;
        if (n > 0) {
            setTimeout(() => {
                this.countDownFrom(n - 1);
            }, 1000);
        } else {
            countDown.innerHTML = "";
        }
    }

    resetLevel() {
        this.pausePlayerCollision(2);
        this.clearBullets();
        this.player.reset();

        this.opponents.forEach((opponent) => {
            opponent.reset();
        });
    }

    showWinner(name) {
        winnerText.innerHTML = name + " wins!";
        setTimeout(() => {
            winnerText.innerHTML = "";
        }, 2000);
    }

    newRound(newRoundData) {
        console.log("NEW ROUND");
        if (newRoundData.winner) {
            this.showWinner(newRoundData.winner);
        }
        this.powerups.forEach((powerup) => {
            powerup.die()
        })

        this.pausePlayerControl(3);
        this.countDownFrom(3);
        regenerateLevel(newRoundData.seed);
        this.resetLevel();
    }


    

        

}

export {Game}