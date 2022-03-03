import { engine, render, runner, grid } from "./matterComponents.js";

import { Game } from "./classes/Game.js";
let gameInstance = new Game();

//socket
let socket = io.connect("http://localhost:3000");

import { setupSocket } from "./socketFunctions.js";
setupSocket(socket);

// run the renderer
Matter.Render.run(render);

// call tick on the runner to run the engine
setInterval(() => {
  Matter.Runner.tick(runner, engine, 1000 / 60);
}, 16);

import { movement } from "./keypresses.js";
import { collisions } from "./gameElements.js";

Matter.Events.on(runner, "tick", (event) => {
  movement();
  collisions();
  gameInstance.sendData(socket);
});

//theme
import { setupTheme } from "./themes.js";
setupTheme();

import { setupChat } from "./chat.js";
setupChat(socket);

import { setupLeftMenu } from "./menu.js";
setupLeftMenu(socket);

export { socket, gameInstance };
