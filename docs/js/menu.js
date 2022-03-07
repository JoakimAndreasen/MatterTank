import {notification} from "./gameElements.js"
import { gameInstance } from "./main.js";
import { debounce } from "./utils.js"
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

	seedInput.onfocus = startTyping;
	seedInput.onblur = stopTyping;

	joinLobbyInput.onfocus = startTyping;
	joinLobbyInput.onblur = stopTyping;

	messageInput.onfocus = startTyping;
	messageInput.onblur = stopTyping;

} 
export {setupLeftMenu}