// Get the modal
let modal = document.getElementById("settingsModal");

// Get the button that opens the modal
let btn = document.getElementById("openSettingsModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let save = document.getElementById("saveSettings");

// When the user clicks on the button, open the modal
btn.onclick = function () {
	modal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

save.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
