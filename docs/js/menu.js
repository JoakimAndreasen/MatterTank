import {notification} from "./gameElements.js"
import { gameInstance } from "./main.js";
import {debounce} from "./utils.js"


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
	usernameInput.addEventListener('keyup', () => {
		sendUsername();
	});

	lobbyCodeButton.onclick = () => {copyToClipboard(lobbyCode.innerHTML)};
	seedButton.onclick = () => {copyToClipboard(seed.innerHTML)};

	//left panel buttons
	createLobbyButton.onclick = function () {
		socket.emit("create-room", seedInput.value);
	};

	joinLobbyButton.onclick = function () {
		socket.emit("join-room", joinLobbyInput.value);
	};

	startGameButton.onclick = function () {
		socket.emit("start-game");
	}

	colorPicker.onchange = function () {
		gameInstance.player.updateColor(colorPicker.value)
		socket.emit("updateColor", colorPicker.value);
	};

} 
export {setupLeftMenu}