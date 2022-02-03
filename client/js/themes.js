const title = document.getElementById("title");
const cards = document.getElementsByClassName("box");

let currentTheme = darkTheme;

function applyTheme() {
    
}

function darkTheme() {
    if(curentTheme != darkTheme) {
        currentTheme();
        title.classList.toggle("dark-title");
    }
}

function lightTheme() {
    currentTheme();
    title.classList.toggle("white-title");
}

function colorfulTheme() {
    currentTheme();
}