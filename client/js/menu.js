//Handle username
let sendUsername = debounce( (e) => {
	if (usernameInput.value){
		socket.emit("updateUsername", usernameInput.value);
	}
}, 300);

usernameInput.addEventListener('keyup', () => {
	sendUsername();
});

//Copy to clipboard Buttons
function copyToClipboard(text) {
	navigator.clipboard.writeText(text);
	notification("Copied to clipboard","success");
}
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
