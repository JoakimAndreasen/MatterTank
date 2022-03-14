import {notification} from "./gameElements.js"
import { gameInstance } from "./main.js";
import {debounce} from "./utils.js"
import {socket} from "./main.js"
import { startTyping, stopTyping } from "./keypresses.js";


//onfocus="focusFunction()" onblur="blurFunction()"

//Copy to clipboard Buttons
function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	notification("Copied to clipboard","success");
}

function setupLeftMenu(socket) {
	//Handle username
	let sendUsername = debounce( (e) => {
		if (usernameInput.value){
			socket.emit("updateUsername", usernameInput.value);
		}
	}, 300);
	usernameInput.addEventListener('keyup', (e) => {
		sendUsername();
	});
	usernameInput.onfocus = startTyping;
	usernameInput.onblur = stopTyping;

	startGameButton.onclick = function () {
		socket.emit("start-game");
	}

	colorPicker.onchange = function () {
		gameInstance.player.updateColor(colorPicker.value)
		socket.emit("updateColor", colorPicker.value);
	};

	messageInput.onfocus = startTyping;
	messageInput.onblur = stopTyping;
}

function setLobbySection(newSetting) {
	document.getElementById("lobbySection").innerHTML = "";

	if (newSetting == "notInLobby") {
		//Box
		let box = document.createElement("div")
		box.className = "box";

		//Title
		let title = document.createElement("h2");
		title.textContent = "Lobby";
		box.append(title);

		//Create lobby button
		let createLobby = document.createElement("button");
		createLobby.textContent = "Create Lobby";
		createLobby.onclick = () => {setLobbySection("createLobby")};
		box.append(createLobby);

		//Join lobby button
		let joinLobby = document.createElement("button")
		joinLobby.textContent = "Join Lobby";
		joinLobby.onclick = () => {setLobbySection("joinLobby")};
		box.append(joinLobby);

		//Append to dom
		document.getElementById("lobbySection").append(box)

	} else if (newSetting == "createLobby") {
		//Box
		let box = document.createElement("div")
		box.className = "box";

		//Title
		let title = document.createElement("h2");
		title.textContent = "Lobby";
		box.append(title);

		//Seed
		let seed = document.createElement("input");
		seed.id = "seedInput";
		seed.type = "text";
		seed.placeholder = "seed";
		seed.onfocus = startTyping;
		seed.onblur = stopTyping;
		box.append(seed);

		//Create lobby button
		let createLobby = document.createElement("button");
		createLobby.textContent = "Create Lobby";
		createLobby.onclick = () => {socket.emit("create-room", document.getElementById("seedInput").value);};
		box.append(createLobby);

		//Back
		let back = document.createElement("button");
		back.textContent = "Back";
		back.onclick = () => {setLobbySection("notInLobby")};
		box.append(back);

		//Append to dom
		document.getElementById("lobbySection").append(box)

	} else if (newSetting == "joinLobby") {
		//Box
		let box = document.createElement("div")
		box.className = "box";

		//Title
		let title = document.createElement("h2");
		title.textContent = "Lobby";
		box.append(title);

		//Seed
		let lobbyCode = document.createElement("input");
		lobbyCode.id = "joinLobbyInput";
		lobbyCode.type = "number";
		lobbyCode.placeholder = "Lobby Code";
		lobbyCode.onfocus = startTyping;
		lobbyCode.onblur = stopTyping;
		box.append(lobbyCode);

		//Create lobby button
		let joinLobby = document.createElement("button");
		joinLobby.textContent = "Join Lobby";
		joinLobby.onclick = () => {socket.emit("join-room", document.getElementById("joinLobbyInput").value);};
		box.append(joinLobby);

		//Back
		let back = document.createElement("button");
		back.textContent = "Back";
		back.onclick = () => {setLobbySection("notInLobby")};
		box.append(back);

		//Append to dom
		document.getElementById("lobbySection").append(box)

	} else if (newSetting == "inLobby") {
		//Box
		let box = document.createElement("div")
		box.className = "box";

		//Title
		let title = document.createElement("h2");
		title.textContent = "Lobby";
		box.append(title);

		//Lobby Code
		let lobbyCode = document.createElement("button");
		lobbyCode.id = "lobbyCodeButton";
		lobbyCode.onclick = () => {copyToClipboard(lobbyCodeNumber.innerHTML)};

		let lobbyCodeText = document.createElement("p");
		lobbyCodeText.textContent = "Lobby Code"
		lobbyCode.append(lobbyCodeText);

		lobbyCodeText.append(document.createElement("br"));

		let lobbyCodeNumber = document.createElement("span");
		lobbyCodeNumber.id = "lobbyCode";
		lobbyCodeText.append(lobbyCodeNumber);

		box.append(lobbyCode);

		//Lobby Seed
		let seed = document.createElement("button");
		seed.id = "seedButton";
		seed.onclick = () => {copyToClipboard(seedNumber.innerHTML)};

		let seedText = document.createElement("p");
		seedText.textContent = "Seed"
		seed.append(seedText);

		seedText.append(document.createElement("br"));

		let seedNumber = document.createElement("span");
		seedNumber.id = "seed";
		seedText.append(seedNumber);

		box.append(seed);

		//Back
		let back = document.createElement("button");
		back.textContent = "Leave Lobby";
		back.onclick = () => {setLobbySection("notInLobby")};
		box.append(back);

		//Append to dom
		document.getElementById("lobbySection").append(box)
	}
}

export {setLobbySection,setupLeftMenu}
