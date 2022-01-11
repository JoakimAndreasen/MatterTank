//Only run script if webpage is loaded

let socket = io.connect("http://localhost:3000");
console.log("Connected to Server");

let opponents = {};

window.addEventListener("load", function () {
	//connect to server

	//Gets the chat form, input and container from the HTML document
	let createLobbyButton = document.getElementById("createLobbyButton");
	let seedInput = document.getElementById("seedInput");

	createLobbyButton.onclick = function () {
		socket.emit("create-room", seedInput.value);
	};
	joinLobbyButton.onclick = function () {
		socket.emit("join-room", joinLobbyInput.value);
	};
	socket.on("reply", (reply) => {
		console.log(reply);
	});
	socket.on("update", (data) => {
		let position = data[0];
		let id = data[1];

		if (!opponents.hasOwnProperty(id)) {
			opponents[id] = new Opponent(position);
			Composite.add(engine.world, opponents[id].body);
			console.log(opponents);
		} else {
			opponents[id].update(position.position, position.angle);
		}
	});
});
